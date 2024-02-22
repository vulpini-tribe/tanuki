use actix_web::{Error, HttpResponse};
use serde_json::json;

pub struct TokenRefreshRequest {
    pub refresh_token: String,
}

pub struct TokenRefreshResponse {
    pub bearer_token: String,
    pub refresh_token: String,
}

pub async fn refresh() -> Result<HttpResponse, Error> {
    Ok(HttpResponse::Ok().json(json!("refresh")))
}
