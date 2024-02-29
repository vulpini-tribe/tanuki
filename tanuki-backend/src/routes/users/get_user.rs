use crate::service::data_providers::WebDataPool;
use actix_web::{web, Error, HttpResponse};
use serde::Serialize;
use serde_json::json;

#[derive(Serialize, Debug)]
struct User {
    id: String,
    name: String,
}

pub async fn get_user(
    user_id: web::Path<String>,
    _dp: web::Data<WebDataPool>,
) -> Result<HttpResponse, Error> {
    let user = User {
        id: user_id.to_string(),
        name: "John".to_string(),
    };

    Ok(HttpResponse::Ok().json(json!(user)))
}
