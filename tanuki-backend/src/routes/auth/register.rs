use crate::service::data_providers::WebDataPool;
use actix_web::{web, Error, HttpResponse};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use serde_json::json;

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
    weight: f32,
    height: i8,
    age: i32,
    unit: UnitType,
    hormonal_sex: BodyConstitutions,

    activity_rate: ActivityLevels,
    goal: UsageGoals,
    per_week: i8,

    name: String,
    dob: DateTime<Utc>,
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
    println!("{:#?}", new_user);

    Ok(HttpResponse::Ok().json(json!("register")))
}
