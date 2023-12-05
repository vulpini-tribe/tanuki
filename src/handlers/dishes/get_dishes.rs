use actix_web::{Error, HttpResponse};
use serde_json::json;

pub async fn get_dishes() -> Result<HttpResponse, Error> {
    Ok(HttpResponse::Ok().json(json!("get_dishes")))
}
