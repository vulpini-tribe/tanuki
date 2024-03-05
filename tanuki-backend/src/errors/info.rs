use actix_web::HttpResponse;
use serde::Serialize;
use serde_json::json;
use std::fmt::Debug;

pub fn system_msg<T: Debug + Serialize>(msg: T) -> HttpResponse {
    HttpResponse::Ok().json(json!({
        "info": {
            "system": msg,
        }
    }))
}
