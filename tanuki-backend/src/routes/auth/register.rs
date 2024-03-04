use crate::service::data_providers::WebDataPool;
use crate::types::auth::UserToRegister;
use crate::utils::emails::send_email;
use actix_web::{web, HttpResponse};
use email_address::*;
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::Row;

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

pub async fn register(
    new_user: web::Form<RawUserData>,
    dp: web::Data<WebDataPool>,
) -> Result<HttpResponse, actix_web::Error> {
    let new_user = new_user.into_inner();

    // Check if username is valid
    if new_user.name.len() < 3 {
        Err(actix_web::error::InternalError::new(
            json!({"errors": { "name": "Username too short" }}),
            actix_web::http::StatusCode::BAD_REQUEST,
        ))?
    }

    // Check if password is valid
    if new_user.password.len() < 8 {
        Err(actix_web::error::InternalError::new(
            json!({"errors": { "password": "Password too short" }}),
            actix_web::http::StatusCode::BAD_REQUEST,
        ))?
    }

    // // Check if E-Mail is valid
    if EmailAddress::is_valid(&new_user.email) == false {
        Err(actix_web::error::InternalError::new(
            json!({"errors": { "email": "Invalid E-Mail" }}),
            actix_web::http::StatusCode::BAD_REQUEST,
        ))?
    }

    // hash the password
    let hashed_password =
        crate::utils::auth::password::hash_password(new_user.password.as_bytes()).await;

    // create user with hashed password for insert into users table
    let user = UserToRegister {
        email: new_user.email,
        password: hashed_password,
    };

    // Open connection with db
    let mut pg_transaction = dp.pg.begin().await.map_err(|_| {
        actix_web::error::InternalError::new(
            json!({"errors": { "rust": "Failed to acquire database connection" }}),
            actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
        )
    })?;

    let mut is_rollback_needed = false;

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
            Err(_) => {
                is_rollback_needed = true;

                Err(actix_web::error::InternalError::new(
                    json!({"errors": { "rust": "Transaction failed to create the user" }}),
                    actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                ))?
            }
        };

    match sqlx::query("INSERT INTO user_profile (user_id, nickname) VALUES ($1, $2)")
        .bind(&user_id)
        .bind(&new_user.name)
        .execute(&mut *pg_transaction)
        .await
    {
        Ok(_) => {}
        Err(_) => {
            is_rollback_needed = true;

            Err(actix_web::error::InternalError::new(
                json!({"errors": { "rust": "Transaction failed to create the user" }}),
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
            ))?
        }
    }

    match is_rollback_needed {
        true => {
            pg_transaction.rollback().await.map_err(|_| {
                actix_web::error::InternalError::new(
                    json!({"errors": { "rust": "Transaction failed to create the user" }}),
                    actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                )
            })?;
        }
        false => {
            pg_transaction.commit().await.map_err(|_| {
                actix_web::error::InternalError::new(
                    json!({"errors": {"rust": "Unable to close transaction"}}),
                    actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
                )
            })?;
        }
    }

    dp.redis.get().map_err(|_| {
        actix_web::error::InternalError::new(
            json!({"errors": {"rust": "Failed to acquire redis connection"}}),
            actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
        )
    })?;

    // send email
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
        actix_web::error::InternalError::new(
            json!({"errors": {"rust": "Failed to send email"}}),
            actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
        )
    })?;

    Ok(HttpResponse::Ok().json(json!({
        "data": {
            "user_id": user_id
        },
        "info": {
            "user": "User registered successfully",
            "verification": "Verification email sent successfully"
        }
    })))
}
