use actix_web::{web, Error, HttpResponse};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::Row;
use std::collections::HashMap;

use crate::errors::reg_errors;
use crate::service::data_providers::WebDataPool;
use crate::utils::{acquire_pg_connection, session_user_id};

// const SHARED_USER_ID = "00000000-0000-0000-0000-000000000000";

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
            consumed_food: food_entries
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
    // STEP 1: select related foods ids to the day in the history_entry_food_bridge
    let food_ids =
        sqlx::query("SELECT food_id FROM history_entry_food_bridge WHERE history_entry_id = $1")
            .bind(&history_id)
            .fetch_all(&mut *pg_connection)
            .await
            .map_err(|e| {
                tracing::event!(target: "sqlx", tracing::Level::ERROR, "retrieve_consumed_food_data: {:#?}", e);
                
                reg_errors::not_found("Food entries not found.")
            })?;

    let food_ids: Vec<uuid::Uuid> = food_ids
        .iter()
        .map(|row| row.get("food_id"))
        .collect();

    // STEP 2: Match food ids with the real food entries
    let query = format!(
        "SELECT * FROM foods WHERE id IN ({})",
        food_ids
            .iter()
            .map(|id| format!("'{}'", id))
            .collect::<Vec<String>>()
            .join(",")
    );

    let food_entries = sqlx::query(&query)
        .fetch_all(&mut *pg_connection)
        .await
        .map_err(|e| {
            tracing::event!(target: "sqlx", tracing::Level::ERROR, "retrieve_consumed_food_data: {:#?}", e);
            
            reg_errors::not_found("Food entries not found.")
        })?;

    let food_entries: Vec<FoodEntry> = food_entries
        .iter()
        .map(|row| FoodEntry::from_row(row))
        .collect();

    // STEP 3: select * from history_entries where user_id = $1 and id = $2
    let history_entry = match sqlx::query(
        "
        SELECT * FROM history_entries WHERE user_id = $1 AND id = $2
    ",
    )
    .bind(&user_id)
    .bind(&history_id)
    .fetch_one(&mut *pg_connection)
    .await
    {
        Ok(row) => HistoryEntryFull::from_row(&row, food_entries),
        Err(e) => {
            tracing::event!(target: "sqlx", tracing::Level::ERROR, "retrieve_consumed_food_data: {:#?}", e);

            return Err(reg_errors::not_found("History entry not found."));
        }
    };


    Ok(history_entry)
}
