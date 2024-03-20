use actix_web::{web, Error, HttpResponse};
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Serialize, Deserialize)]
pub struct FoodData {
    id: uuid::Uuid,
}

pub async fn add_food(data: web::Data<FoodData>) -> Result<HttpResponse, Error> {
    let food = data.into_inner();

    Ok(HttpResponse::Created().json(json!({
        "status": "ok",
        "message": "Food added successfully",
        "data": food,
    })))
}
