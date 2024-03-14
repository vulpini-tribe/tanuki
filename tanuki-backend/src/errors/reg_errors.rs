use serde::Serialize;
use serde_json::json;
use std::fmt::Debug;

pub const DEFAULT_MSG: &str = "An error has been occurred. Please try again later.";

pub fn name<T: Debug + Serialize>(msg: T) -> actix_web::Error {
    actix_web::error::InternalError::new(
        json!({"errors": { "name": msg }}),
        actix_web::http::StatusCode::BAD_REQUEST,
    )
    .into()
}

pub fn email<T: Debug + Serialize>(msg: T) -> actix_web::Error {
    actix_web::error::InternalError::new(
        json!({"errors": { "email": msg }}),
        actix_web::http::StatusCode::BAD_REQUEST,
    )
    .into()
}

pub fn password<T: Debug + Serialize>(msg: T) -> actix_web::Error {
    actix_web::error::InternalError::new(
        json!({"errors": { "email": msg }}),
        actix_web::http::StatusCode::BAD_REQUEST,
    )
    .into()
}

pub fn system<T: Debug + Serialize>(msg: T) -> actix_web::Error {
    actix_web::error::InternalError::new(
        json!({"errors": { "system": msg }}),
        actix_web::http::StatusCode::INTERNAL_SERVER_ERROR,
    )
    .into()
}

pub fn not_authenticated<T: Debug + Serialize>(msg: T) -> actix_web::Error {
    actix_web::error::ErrorUnauthorized(json!({"errors": { "system": msg }}))
}

pub fn not_found<T: Debug + Serialize>(msg: T) -> actix_web::Error {
    actix_web::error::ErrorNotFound(json!({"errors": { "system": msg }}))
}
