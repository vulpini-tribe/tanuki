use crate::service::data_providers::WebDataPool;
use actix_web::{web, HttpResponse};
use serde::{Deserialize, Serialize};
use serde_json::json;

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
    let _ = verify_confirmation_token_paseto(token_data.token, dp.redis.clone(), None)
        .await
        .map_err(|_| {
            actix_web::error::InternalError::new(
                json!({"errors": { "verification": "Verification failed" }}),
                actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
            )
        })?;

    // if exists, mark the user as verified and delete the token from the redis storage

    Ok(HttpResponse::Ok().json(json!({
        "info": {
            "verification": "Verification has been successful. You can now login."
        }
    })))
}
