use actix_web::{Error, HttpResponse};
use serde_json::json;

pub async fn get_user() -> Result<HttpResponse, Error> {
    Ok(HttpResponse::Ok().json(json!("get_user")))
}
