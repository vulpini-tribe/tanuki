use actix_web::{Error, HttpResponse};
use serde_json::json;

pub async fn update_user() -> Result<HttpResponse, Error> {
    Ok(HttpResponse::Ok().json(json!("{\"info\": \"update_user\"}")))
}
