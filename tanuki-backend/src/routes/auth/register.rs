use crate::service::data_providers::WebDataPool;
use crate::types::auth::UserToRegister;
use crate::utils::emails::send_email;
use actix_web::{web, HttpResponse};
use email_address::EmailAddress;
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::Row;
use std::fmt::Debug;

use crate::errors::reg_errors;

#[derive(Serialize, Deserialize, Debug)]
pub struct RawUserData {
    name: String,
    email: String,
    password: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct FormVal {
    pub data: RawUserData,
}

pub async fn rollback(
    pg_transaction: sqlx::Transaction<'_, sqlx::Postgres>,
) -> Result<(), actix_web::Error> {
    let result = pg_transaction.rollback().await;

    match result {
        Ok(_) => Ok(()),
        Err(_) => Err(reg_errors::system(reg_errors::DEFAULT_MSG))?,
    }
}

pub async fn commit(
    pg_transaction: sqlx::Transaction<'_, sqlx::Postgres>,
) -> Result<(), actix_web::Error> {
    let result = pg_transaction.commit().await;

    match result {
        Ok(_) => Ok(()),
        Err(_) => Err(reg_errors::system(reg_errors::DEFAULT_MSG))?,
    }
}

pub async fn register(
    new_user: web::Form<RawUserData>,
    dp: web::Data<WebDataPool>,
) -> Result<HttpResponse, actix_web::Error> {
    let new_user = new_user.into_inner();

    // Check if the username is valid
    if new_user.name.is_empty() {
        Err(reg_errors::name("Username too short"))?
    }

    // Check if the password is valid
    if new_user.password.is_empty() {
        Err(reg_errors::password("Password too short"))?
    }

    // Check if the email is valid
    if EmailAddress::is_valid(&new_user.email) == false {
        Err(reg_errors::email("Invalid E-Mail"))?
    }

    // Hash the password
    let hashed_password = crate::utils::auth::password::hash_password(new_user.password.as_bytes())
        .await
        .map_err(reg_errors::system)?;

    // Create a new user
    let user = UserToRegister {
        email: new_user.email,
        password: hashed_password,
    };

    // Open connection with db
    let mut pg_transaction = dp
        .pg
        .begin()
        .await
        .map_err(|_| reg_errors::system(reg_errors::DEFAULT_MSG))?;

    // ref-deref problem ,so we can use commit, or rollback
    let mut is_rollback_needed = false;

    // Create user & get user_id
    let user_id =
        match sqlx::query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id")
            .bind(&user.email)
            .bind(&user.password)
            .fetch_one(&mut *pg_transaction)
            .await
        {
            Ok(row) => {
                let user_id: uuid::Uuid = row.get("id");

                user_id
            }
            Err(_) => Err(reg_errors::system(reg_errors::DEFAULT_MSG))?,
        };

    // Create user profile
    match sqlx::query("INSERT INTO user_profile (user_id, nickname) VALUES ($1, $2) ON CONFLICT (user_id) DO NOTHING")
        .bind(&user_id)
        .bind(&new_user.name)
        .execute(&mut *pg_transaction)
        .await
    {
        Ok(_) => {}
        Err(_) => {
            is_rollback_needed = true;
        }
    }

    if is_rollback_needed == true {
        rollback(pg_transaction).await?;

        return Err(reg_errors::system(reg_errors::DEFAULT_MSG))?;
    } else {
        commit(pg_transaction).await?;
    }

    // Check if redis is available
    dp.redis
        .get()
        .map_err(|_| reg_errors::system(reg_errors::DEFAULT_MSG))?;

    // send email with PASETO token
    send_email(
        "E-Mail Verification".to_string(),
        new_user.name.clone(),
        user.email.clone(),
        "verification_email".to_string(),
        user_id,
        dp.redis.clone(), 
    )
    .await
    .map_err(|_| {
        reg_errors::system(
            "An error has been occurred during sending the verification e-mail. Please try again later.",
        )
    })?;

    Ok(HttpResponse::Ok().json(json!({
        "data": {
            "user_id": user_id,
        },
        "info": {
            "user": "User registered successfully",
            "verification": "Verification email has been sent"
        }
    })))
}
