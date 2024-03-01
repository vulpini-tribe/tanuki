use crate::service::data_providers::WebDataPool;
use actix_web::{web, Error, HttpResponse};
use r2d2_redis::redis::{Commands, Value};
use serde::{Deserialize, Serialize};
use serde_json::json;
use uuid::Uuid;

use crate::utils::auth::tokens::issue_confirmation_token_paseto;

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

    // let mut redis_connection = dp.redis.get().expect("Cannot get redis connection");

    // redis_connection
    //     .set::<&str, String, Value>(&user_id.to_string(), serde_json::to_string(&user).unwrap())
    //     .expect("Cannot set user in redis");

    // let test = redis_connection
    //     .get::<String, String>("123123123".to_string())
    //     .unwrap();

    // println!(
    //     "{:?} : {:?}",
    //     test,
    //     serde_json::from_str::<User>(&test).unwrap()
    // );

    issue_confirmation_token_paseto(*user_id, dp.redis.clone(), None)
        .await
        .unwrap();

    Ok(HttpResponse::Ok().json(json!(user)))
}
