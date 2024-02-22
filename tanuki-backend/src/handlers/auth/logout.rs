use crate::service::data_providers::WebDataPool;
use actix_web::{web, Error, HttpResponse};
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Serialize, Deserialize, Debug)]
pub struct LogoutRequest {
    pub username: String,
}

pub struct LogoutResponse {
    status: String,
}

pub async fn logout(
    user: web::Form<LogoutRequest>,
    _dp: web::Data<WebDataPool>,
) -> Result<HttpResponse, Error> {
    println!("{:#?}", user.username);

    Ok(HttpResponse::Ok().json(json!("logout")))
}
