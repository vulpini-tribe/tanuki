use crate::service::data_providers::WebDataPool;
use actix_web::{web, Error, HttpResponse};
// use r2d2_redis::redis::{Commands, Value};
use serde::{Deserialize, Serialize};
use serde_json::json;
use uuid::Uuid;

use crate::utils::auth::tokens::issue_confirmation_token_paseto;
use crate::utils::emails::send_email;

#[derive(Deserialize, Serialize, Debug)]
struct User {
    id: String,
    name: String,
}

pub async fn get_user(
    user_id: web::Path<Uuid>,
    dp: web::Data<WebDataPool>,
) -> Result<HttpResponse, Error> {
    let user = User {
        id: user_id.to_string(),
        name: "John Doe".to_string(),
    };

    Ok(HttpResponse::Ok().json(json!(user)))
}
