use actix_web::{Error, HttpResponse};
use serde_json::json;

pub async fn create_dish() -> Result<HttpResponse, Error> {
    Ok(HttpResponse::Ok().json(json!("create_dish")))
}
