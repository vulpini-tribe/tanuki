use crate::service::data_providers::WebDataPool;
use crate::types::auth::UserToRegister;
use actix_web::{web, Error, HttpResponse};
use email_address::*;
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::types::JsonValue;
use sqlx::Row;

#[derive(Serialize, Deserialize, Debug)]
pub struct RawUserData {
    name: String,
    email: String,
    password: String,
}

use actix_web::ResponseError;
use std::fmt;

pub struct MyError(sqlx::Error);

impl fmt::Debug for MyError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt::Debug::fmt(&self.0, f)
    }
}

impl fmt::Display for MyError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt::Display::fmt(&self.0, f)
    }
}

impl ResponseError for MyError {
    fn error_response(&self) -> HttpResponse {
        HttpResponse::InternalServerError().json(self.to_string())
    }
}

async fn rollback_tr(pg_transaction: sqlx::Transaction<'_, sqlx::Postgres>) -> () {
    let _ = pg_transaction.rollback().await.map_err(|_| {
        actix_web::error::InternalError::new(
            json!({
                "errors": {
                    "rust": "Failed to rollback transaction"
                }
            }),
            actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
        )
    });
}

#[derive(Serialize, Deserialize, Debug)]
pub struct FormVal {
    pub data: RawUserData,
}

pub async fn register(
    new_user: web::Form<RawUserData>,
    dp: web::Data<WebDataPool>,
) -> Result<HttpResponse, Error> {
    let new_user = new_user.into_inner();

    // Check if E-Mail is valid
    if EmailAddress::is_valid(&new_user.email) == false {
        return Err(actix_web::error::InternalError::new(
            json!({
                "errors": {
                    "email": "E-mail is not valid"
                }
            }),
            actix_web::http::StatusCode::BAD_REQUEST,
        )
        .into());
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
            json!({
                "errors": {
                    "rust": "Failed to acquire database connection"
                }
            }),
            actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
        )
    })?;

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
            Err(e) => {
                rollback_tr(pg_transaction).await;

                return Err(MyError(e).into());
            }
        };

    // create entry in user_profile
    match sqlx::query("INSERT INTO user_profile (user_id, nickname) VALUES ($1, $2)")
        .bind(&user_id)
        .bind(&new_user.name)
        .execute(&mut *pg_transaction)
        .await
    {
        Ok(_) => {}
        Err(e) => {
            rollback_tr(pg_transaction).await;

            return Err(MyError(e).into());
        }
    }

    pg_transaction.commit().await.map_err(|_| {
        actix_web::error::InternalError::new(
            json!({
                "errors": {
                    "rust": "Failed to commit transaction"
                }
            }),
            actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
        )
    })?;

    Ok(HttpResponse::Ok().json(json!("register")))
}
