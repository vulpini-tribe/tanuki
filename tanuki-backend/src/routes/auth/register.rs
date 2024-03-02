use crate::service::data_providers::WebDataPool;
use actix_web::{web, Error, HttpResponse};
use chrono::{DateTime, Utc};
use email_address::*;
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::str::FromStr;

#[derive(Serialize, Deserialize, Debug)]
pub enum BodyConstitutions {
    #[serde(rename = "female")]
    Female,

    #[serde(rename = "male")]
    Male,
}

#[derive(Serialize, Deserialize, Debug)]
pub enum UsageGoals {
    #[serde(rename = "loss")]
    Loss,

    #[serde(rename = "gain")]
    Gain,

    #[serde(rename = "maintain")]
    Maintain,
}

#[derive(Serialize, Deserialize, Debug)]
pub enum ActivityLevels {
    #[serde(rename = "extra_small")]
    ExtraSmall,

    #[serde(rename = "small")]
    Small,

    #[serde(rename = "medium")]
    Medium,

    #[serde(rename = "large")]
    Large,

    #[serde(rename = "extra_large")]
    ExtraLarge,
}

#[derive(Serialize, Deserialize, Debug)]
pub enum UnitType {
    #[serde(rename = "metric")]
    Metric,

    #[serde(rename = "retarded")]
    Retarded,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RegisterRequest {
    name: String,
    email: String,
    password: String,
    password_repeat: String,
}

// pub struct RegisterResponse {
//     pub bearer_token: String,
//     pub refresh_token: String,
// }

#[derive(Serialize, Deserialize, Debug)]
pub struct FormVal {
    pub data: RegisterRequest,
}

pub async fn register(
    new_user: web::Form<RegisterRequest>,
    _dp: web::Data<WebDataPool>,
) -> Result<HttpResponse, Error> {
    let new_user = new_user.into_inner();

    // check if passwords equal
    if new_user.password != new_user.password_repeat {
        return Ok(HttpResponse::BadRequest().json(json!({
            "data": "passwords do not match"
        })));
    }

    // check if email is valid
    if EmailAddress::is_valid(&new_user.email) == false {
        return Ok(HttpResponse::BadRequest().json(json!({
            "data": "email is not valid"
        })));
    }

    // check if email is already in use
    // check if name is valid
    if new_user.name.len() < 3 {
        return Ok(HttpResponse::BadRequest().json(json!({
            "data": "name is too short"
        })));
    }

    Ok(HttpResponse::Ok().json(json!("register")))
}
