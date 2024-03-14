use actix_web::{web, Error, HttpResponse};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::Row;

use crate::errors::reg_errors;
use crate::service::data_providers::WebDataPool;
use crate::utils::{acquire_pg_connection, session_user_id};

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

    Ok(HttpResponse::Ok().json(json!({
        "data": data
    })))
}

#[derive(Debug, Deserialize, Serialize)]
pub struct HistoryEntryT {
    id: uuid::Uuid,
    weight: Option<f32>,
    calories: Option<f32>,
}

impl HistoryEntryT {
    pub fn from_row(row: &sqlx::postgres::PgRow) -> Self {
        Self {
            id: row.get("id"),
            weight: Some(row.get("weight")),
            calories: Some(row.get("calories")),
        }
    }
}

// @todo: inner join
async fn retrieve_consumed_food_data(
    user_id: uuid::Uuid,
    history_id: uuid::Uuid,
    pg_connection: &mut sqlx::PgConnection,
) -> Result<Vec<HistoryEntryT>, Error> {
    match sqlx::query(
        "
        SELECT * FROM history_entry_consumed_food_bridge hecf
        INNER JOIN history_entries he ON he.id = hecf.history_entry_id
        WHERE hecf.history_entry_id = $1
        ",
    )
    .bind(&history_id)
    .fetch_all(pg_connection)
    .await
    {
        Ok(rows) => {
            let food_data = rows
                .iter()
                .map(|row| HistoryEntryT::from_row(row))
                .collect::<Vec<HistoryEntryT>>();

            Ok(food_data)
        }
        Err(e) => {
            tracing::event!(target: "sqlx", tracing::Level::ERROR, "retrieve_consumed_food_data: {:#?}", e);

            Err(reg_errors::not_found("History entry not found."))
        }
    }
}
