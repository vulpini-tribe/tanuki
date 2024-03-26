use actix_web::{web, Error, HttpResponse};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::Row;

use crate::errors::reg_errors;
use crate::service::data_providers::WebDataPool;
use crate::types::food::HistoryFoodEntry;

use crate::utils::{acquire_pg_connection, session_user_id};

const SHARED_USER_ID: &str = "'00000000-0000-0000-0000-000000000000'";

#[tracing::instrument(name = "Get history entry", skip(session, dp))]
pub async fn get_history_entry(
    day: web::Path<String>,
    session: actix_session::Session,
    dp: web::Data<WebDataPool>,
) -> Result<HttpResponse, Error> {
    let day = day.into_inner();

    let user_id = match session_user_id(&session).await {
        Ok(user_id) => Ok(user_id),
        Err(_) => Err(reg_errors::not_authenticated(
            "Please authorize in order to retrieve history.",
        )),
    };

    let user_id = user_id?;
    let mut pg_connection = acquire_pg_connection(dp).await?;

    let data = retrieve_consumed_food_data(user_id, day.clone(), &mut pg_connection).await?;

    Ok(HttpResponse::Ok().json(json!({ "data": data })))
}

#[derive(Debug, Deserialize, Serialize)]
pub struct HistoryEntryFull {
    id: uuid::Uuid,
    day: String,
    calories: Option<i32>,
    meals: Vec<HistoryFoodEntry>,
}

impl HistoryEntryFull {
    fn calc_calories(food_entries: &Vec<HistoryFoodEntry>) -> i32 {
        let calories = food_entries
            .iter()
            .map(|entry| {
                let weight = entry.weight;
                let kcal = entry.proteins * 4.0 + entry.fats * 9.0 + entry.carbs * 4.0;

                (weight / 100.0) * kcal
            })
            .sum::<f32>();

        calories as i32
    }

    pub fn from_row(row: &sqlx::postgres::PgRow, food_entries: Vec<HistoryFoodEntry>) -> Self {
        Self {
            id: row.get("id"),
            day: row.get("day"),
            calories: Some(Self::calc_calories(&food_entries)),
            meals: food_entries,
        }
    }
}

async fn retrieve_consumed_food_data(
    user_id: uuid::Uuid,
    day: String,
    pg_connection: &mut sqlx::PgConnection,
) -> Result<HistoryEntryFull, Error> {
    let history_entry_query = format!(
        "
            SELECT * FROM history_entries
            WHERE day = $1
            AND (user_id = $2 OR user_id = {})
        ",
        SHARED_USER_ID
    );

    let history_entry = sqlx::query(&history_entry_query)
        .bind(&day)
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
            let food_entry = HistoryFoodEntry::from_row(row);

            food_entry
        })
        .collect::<Vec<HistoryFoodEntry>>();

    let row = match history_entry.get(0) {
        Some(row) => row,
        None => return Err(reg_errors::not_found("History entry not found.")),
    };

    let history_entry = HistoryEntryFull::from_row(&row, food_entries);

    Ok(history_entry)
}
