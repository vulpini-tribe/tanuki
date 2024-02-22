use crate::service::data_providers::WebDataPool;
use actix_web::{web, Error, HttpResponse};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

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
    pub username: String,
    pub password: String,
    pub body_constitution: BodyConstitutions,
    pub general_goal: UsageGoals,
    pub birthday: DateTime<Utc>,
    pub activity_level: ActivityLevels,
    pub weight_loss: f32,
    pub weight_goal: f32,
    pub height: Option<i8>,
    pub weight: Option<f32>,
    pub hips: Option<i8>,
    pub waist: Option<i8>,
    pub chest: Option<i8>,
    pub unit: Option<UnitType>,
}

pub struct RegisterResponse {
    pub bearer_token: String,
    pub refresh_token: String,
}

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
