use actix_web::{Error, HttpResponse};
use serde_json::json;

pub async fn update_measurement() -> Result<HttpResponse, Error> {
    Ok(HttpResponse::Ok().json(json!("update_measurement")))
}
