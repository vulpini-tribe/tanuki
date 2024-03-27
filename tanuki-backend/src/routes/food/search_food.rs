use actix_web::{web, Error, HttpResponse};
use serde::{Deserialize, Serialize};
use serde_json::json;

use crate::errors::reg_errors;
use crate::service::data_providers::WebDataPool;
use crate::types::food::FoodSearchEntry;
use crate::utils::{acquire_pg_connection, session_user_id};

const SHARED_USER_ID: &str = "'00000000-0000-0000-0000-000000000000'";

#[derive(Debug, Serialize, Deserialize)]
pub struct SearchData {
    pub query: String,
}

#[tracing::instrument(name = "Search for food", skip(session, dp))]
pub async fn search_food(
    query_data: web::Query<SearchData>,
    session: actix_session::Session,
    dp: web::Data<WebDataPool>,
) -> Result<HttpResponse, Error> {
    let query = query_data.into_inner();

    let user_id: Result<_, _> = match session_user_id(&session).await {
        Ok(user_id) => Ok(user_id),
        Err(_) => Err(reg_errors::not_authenticated(
            "Please authorize in order to search for food",
        )),
    };

    let user_id = user_id?;
    let mut pg_connection = acquire_pg_connection(dp).await?;
    let data = search_for_data(user_id, query.query, &mut pg_connection).await?;

    Ok(HttpResponse::Ok().json(json!({ "data": data })))
}

async fn search_for_data(
    user_id: uuid::Uuid,
    query: String,
    pg_connection: &mut sqlx::PgConnection,
) -> Result<Vec<FoodSearchEntry>, Error> {
    let search_query_full = format!(
        "
        SELECT id, name FROM foods WHERE name %> $1
        AND (foods.user_id = $2 OR foods.user_id = {}) LIMIT 10;
        ",
        SHARED_USER_ID
    );

    let search_query_empty = format!(
        "SELECT id, name FROM foods WHERE (foods.user_id = $2 OR foods.user_id = {}) LIMIT 10;",
        SHARED_USER_ID
    );

    let search_query = if query.is_empty() {
        search_query_empty
    } else {
        search_query_full
    };

    let search_results = sqlx::query(&search_query)
        .bind(&query)
        .bind(&user_id)
        .fetch_all(&mut *pg_connection)
        .await
        .map_err(|e| {
            tracing::event!(target: "sqlx", tracing::Level::ERROR, "retrieve_consumed_food_data: {:#?}", e);

            reg_errors::not_found("Food entries not found.")
        })?;

    let search_results = search_results
        .iter()
        .map(|row| {
            let food_entry = FoodSearchEntry::from_row(row);

            food_entry
        })
        .collect::<Vec<FoodSearchEntry>>();

    Ok(search_results)
}
