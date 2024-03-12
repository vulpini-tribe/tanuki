use actix_web::{web, Error, HttpResponse};
use email_address::EmailAddress;
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::Row;

use crate::errors::reg_errors;
use crate::service::data_providers::WebDataPool;
use crate::utils::auth::password::verify_password;

#[derive(Serialize, Deserialize, Debug)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

pub async fn login(
    user: web::Form<LoginRequest>,
    dp: web::Data<WebDataPool>,
    session: actix_session::Session,
) -> Result<HttpResponse, Error> {
    // Check if the email is valid
    if EmailAddress::is_valid(&user.email) == false {
        Err(reg_errors::email("Invalid E-Mail"))?
    }

    // Check if the password is valid
    if user.password.is_empty() {
        Err(reg_errors::password("Password too short"))?
    }

    // get user_id by email from db
    let pg_connection = dp
        .pg
        .acquire()
        .await
        .map_err(|_| reg_errors::system(reg_errors::DEFAULT_MSG))?;

    match get_active_user(pg_connection, user.email.clone()).await {
        Ok(loggedin_user) => {
            // get hashed password for user_id from db
            let is_valid =
                verify_password(loggedin_user.password.as_ref(), user.password.as_bytes()).await;

            if is_valid == true {
                session.renew();
                session
                    .insert(crate::types::USER_ID_KEY, loggedin_user.id)
                    .expect("`user_id` cannot be inserted into session");
                session
                    .insert(crate::types::USER_EMAIL_KEY, &loggedin_user.email)
                    .expect("`user_email` cannot be inserted into session");

                Ok(HttpResponse::Ok().json(json!({
                    "data": {
                        "user_id": loggedin_user.id,
                    }
                })))
            } else {
                Err(reg_errors::not_authenticated("Invalid e-mail or password"))?
            }
        }
        Err(e) => Err(e),
    }
}

pub async fn get_active_user(
    mut pg_connection: sqlx::pool::PoolConnection<sqlx::Postgres>,
    email: String,
) -> Result<crate::types::auth::User, Error> {
    match sqlx::query("SELECT id, email, password FROM users WHERE email = $1 AND is_active = TRUE")
        .bind(email)
        .map(|row: sqlx::postgres::PgRow| {
            let selected_user = crate::types::auth::User {
                id: row.get("id"),
                email: row.get("email"),
                password: row.get("password"),
                is_active: true,
            };

            selected_user
        })
        .fetch_one(&mut *pg_connection)
        .await
    {
        Ok(user) => Ok(user),
        Err(e) => {
            tracing::event!(target: "sqlx",tracing::Level::ERROR, "User not found in DB: {:#?}", e);

            Err(reg_errors::not_authenticated("Invalid e-mail or password"))?
        }
    }
}
