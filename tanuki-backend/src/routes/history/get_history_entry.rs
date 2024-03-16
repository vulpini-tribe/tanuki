use actix_web::{web, Error, HttpResponse};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::Row;

use crate::errors::reg_errors;
use crate::service::data_providers::WebDataPool;
use crate::utils::{acquire_pg_connection, session_user_id};

const SHARED_USER_ID: &str = "'00000000-0000-0000-0000-000000000000'";

#[tracing::instrument(name = "Get history entry", skip(session, dp))]
pub async fn get_history_entry(
    id: web::Path<uuid::Uuid>,
    session: actix_session::Session,
    dp: web::Data<WebDataPool>,
) -> Result<HttpResponse, Error> {
    let history_id = id.into_inner();

    let user_id = match session_user_id(&session).await {
        Ok(user_id) => Ok(user_id),
        Err(_) => Err(reg_errors::not_authenticated(
            "Please authorize in order to retrieve history.",
        )),
    };

    let user_id = user_id?;
    let mut pg_connection = acquire_pg_connection(dp).await?;

    let data = retrieve_consumed_food_data(user_id, history_id.clone(), &mut pg_connection).await?;

    Ok(HttpResponse::Ok().json(json!({ "data": data })))
}

#[derive(Debug, Deserialize, Serialize)]
pub struct HistoryEntryFull {
    id: uuid::Uuid,
    day: String,
    weight: Option<f32>,
    calories: Option<f32>,
    consumed_food: Vec<FoodEntry>,
}

impl HistoryEntryFull {
    pub fn from_row(row: &sqlx::postgres::PgRow, food_entries: Vec<FoodEntry>) -> Self {
        Self {
            id: row.get("id"),
            day: row.get("day"),
            weight: Some(row.get("weight")),
            calories: Some(row.get("calories")),
            consumed_food: food_entries,
        }
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FoodEntry {
    id: uuid::Uuid,
    category_id: uuid::Uuid,
    name: String,
    photo: Option<String>,
    kcal_100: f32,
    protein_100: f32,
    fat_100: f32,
    carbs_100: f32,
    portion_weight: f32,
}

impl FoodEntry {
    pub fn from_row(row: &sqlx::postgres::PgRow) -> Self {
        Self {
            id: row.get("id"),
            category_id: row.get("category_id"),
            name: row.get("name"),
            photo: row.get("photo"),
            kcal_100: row.get("kcal_100"),
            protein_100: row.get("protein_100"),
            fat_100: row.get("fat_100"),
            carbs_100: row.get("carbs_100"),
            portion_weight: row.get("portion_weight"),
        }
    }
}

async fn retrieve_consumed_food_data(
    user_id: uuid::Uuid,
    history_id: uuid::Uuid,
    pg_connection: &mut sqlx::PgConnection,
) -> Result<HistoryEntryFull, Error> {
    let history_entry_query = format!("
        SELECT * FROM history_entry_food_bridge
        INNER JOIN foods ON history_entry_food_bridge.food_id = foods.id
        INNER JOIN history_entries ON history_entry_food_bridge.history_entry_id = history_entries.id
        WHERE history_entry_food_bridge.history_entry_id = $1
        AND (history_entries.user_id = $2 OR history_entries.user_id = {})
    ", SHARED_USER_ID);

    let history_entry = sqlx::query(&history_entry_query)
        .bind(&history_id)
        .bind(&user_id)
        .fetch_all(&mut *pg_connection)
        .await
        .map_err(|e| {
            tracing::event!(target: "sqlx", tracing::Level::ERROR, "retrieve_consumed_food_data: {:#?}", e);

            reg_errors::not_found("Food entries not found.")
        })?;

    let food_entries = history_entry
        .iter()
        .map(|row| {
            let food_entry = FoodEntry::from_row(row);

            food_entry
        })
        .collect::<Vec<FoodEntry>>();

    let row = match history_entry.get(0) {
        Some(row) => row,
        None => return Err(reg_errors::not_found("History entry not found.")),
    };

    let history_entry = HistoryEntryFull::from_row(&row, food_entries);

    Ok(history_entry)
}
