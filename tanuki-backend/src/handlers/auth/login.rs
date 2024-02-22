use crate::service::data_providers::WebDataPool;
use actix_web::{web, Error, HttpResponse};
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Serialize, Deserialize, Debug)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
}

pub struct LoginResponse {
    pub bearer_token: String,
    pub refresh_token: String,
}

pub async fn login(
    user: web::Form<LoginRequest>,
    _dp: web::Data<WebDataPool>,
) -> Result<HttpResponse, Error> {
    if user.username.is_empty() {
        return Ok(HttpResponse::BadRequest().body("username is required"));
    } else if user.password.is_empty() {
        return Ok(HttpResponse::BadRequest().body("password is required"));
    }

    println!("{:#?}", user.password);
    println!("{:#?}", user.username);

    Ok(HttpResponse::Ok().json(json!("login")))
}
