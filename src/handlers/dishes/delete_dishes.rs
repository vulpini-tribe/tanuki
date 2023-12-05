use actix_web::{Error, HttpResponse};
use serde_json::json;

pub async fn delete_dishes() -> Result<HttpResponse, Error> {
    Ok(HttpResponse::Ok().json(json!("delete_dishes")))
}
