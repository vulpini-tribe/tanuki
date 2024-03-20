use actix_web::{web, Error, HttpResponse};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct SearchData {
    query: String,
}

pub async fn search_food(_: web::Data<SearchData>) -> Result<HttpResponse, Error> {
    Ok(HttpResponse::Ok().json(()))
}
