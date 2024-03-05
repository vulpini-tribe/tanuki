use crate::errors::reg_errors;
use crate::service::data_providers::WebDataPool;
use actix_web::{web, HttpResponse};
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::fmt::Debug;

use crate::utils::auth::tokens::verify_confirmation_token_paseto;

#[derive(Serialize, Deserialize, Debug)]
pub struct TokenData {
    token: String,
}

pub async fn verify_email(
    token_data: web::Form<TokenData>,
    dp: web::Data<WebDataPool>,
) -> Result<HttpResponse, actix_web::Error> {
    let token_data = token_data.into_inner();

    // get token from the redis storage
    let conf_token = verify_confirmation_token_paseto(token_data.token, dp.redis.clone(), None)
        .await
        .map_err(|_| {
            actix_web::error::InternalError::new(
                json!({"errors": { "verification": "Verification failed" }}),
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
            )
        })?;

    // Open connection with db
    let mut pg_transaction = dp
        .pg
        .begin()
        .await
        .map_err(|_| reg_errors::system(reg_errors::DEFAULT_MSG))?;

    // Update the user's is_active field
    sqlx::query("UPDATE users SET is_active = true WHERE id = $1")
        .bind(&conf_token.user_id)
        .execute(&mut *pg_transaction)
        .await
        .map_err(|_| reg_errors::system(reg_errors::DEFAULT_MSG))?;

    // Complete the transaction
    pg_transaction
        .commit()
        .await
        .map_err(|_| reg_errors::system(reg_errors::DEFAULT_MSG))?;

    Ok(HttpResponse::Ok().json(json!({
        "info": {
            "verification": "Verification has been successful. You can now login."
        }
    })))
}
