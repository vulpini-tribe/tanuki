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
    calories: Option<i32>,
    consumed_food: Vec<FoodEntry>,
}

impl HistoryEntryFull {
    fn calc_calories(food_entries: &Vec<FoodEntry>) -> i32 {
        let calories = food_entries
            .iter()
            .map(|entry| {
                let weight = entry.portion_weight;
                let kcal = entry.kcal_100;

                (weight / 100.0) * kcal
            })
            .sum::<f32>();

        calories as i32
    }

    pub fn from_row(row: &sqlx::postgres::PgRow, food_entries: Vec<FoodEntry>) -> Self {
        Self {
            id: row.get("id"),
            day: row.get("day"),
            weight: Some(row.get("weight")),
            calories: Some(Self::calc_calories(&food_entries)),
            consumed_food: food_entries,
        }
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FoodEntry {
    id: uuid::Uuid,
    category: Category,
    name: String,
    kcal_100: f32,
    protein_100: f32,
    fat_100: f32,
    carbs_100: f32,
    portion_weight: f32,
    datetime: String,
}

impl FoodEntry {
    pub fn from_row(row: &sqlx::postgres::PgRow) -> Self {
        Self {
            id: row.get("food_id"),
            category: Category::from_row(row),
            name: row.get("food_name"),
            kcal_100: row.get("kcal_100"),
            protein_100: row.get("protein_100"),
            fat_100: row.get("fat_100"),
            carbs_100: row.get("carbs_100"),
            portion_weight: row.get("portion_weight"),
            datetime: row.get("datetime"),
        }
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Category {
    id: uuid::Uuid,
    color: String,
    icon: String,
    name: String,
}

impl Category {
    pub fn from_row(row: &sqlx::postgres::PgRow) -> Self {
        Self {
            id: row.get("category_id"),
            color: row.get("color"),
            name: row.get("category_name"),
            icon: row.get("icon"),
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
        INNER JOIN categories ON category_id = categories.id
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
