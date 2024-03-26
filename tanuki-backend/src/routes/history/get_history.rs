use actix_web::{web, Error, HttpResponse};
use serde::Deserialize;
use serde_json::json;

use crate::errors::reg_errors;
use crate::service::data_providers::WebDataPool;
use crate::types::history::HistoryEntry;
use crate::utils::{acquire_pg_connection, session_user_id};

#[derive(Debug, Deserialize)]
pub struct QueryParamsT {
    pub from: String,
    pub to: String,
}

#[tracing::instrument(name = "Get history", skip(session, dp))]
pub async fn get_history(
    query_params: web::Query<QueryParamsT>,
    session: actix_session::Session,
    dp: web::Data<WebDataPool>,
) -> Result<HttpResponse, Error> {
    let mut pg_connection = acquire_pg_connection(dp).await?;

    let user_id = match session_user_id(&session).await {
        Ok(user_id) => Ok(user_id),
        Err(_) => Err(reg_errors::not_authenticated(
            "Please authorize in order to get retrieve history.",
        )),
    };

    let user_id = user_id?;

    let data = retrieve_history_entries_from_db(
        user_id,
        query_params.from.clone(),
        query_params.to.clone(),
        &mut pg_connection,
    )
    .await?;

    Ok(HttpResponse::Ok().json(json!({
        "data": data
    })))
}

async fn retrieve_history_entries_from_db(
    user_id: uuid::Uuid,
    from: String,
    to: String,
    pg_connection: &mut sqlx::PgConnection,
) -> Result<Vec<HistoryEntry>, Error> {
    let query = "
        SELECT day FROM history_entries
        WHERE user_id = ($1) AND \"day\" >= ($2) AND \"day\" <= ($3)
        GROUP BY day;
    ";

    match sqlx::query(query)
        .bind(&user_id)
        .bind(&to)
        .bind(&from)
        .fetch_all(pg_connection)
        .await
    {
        Ok(rows) => {
            let categories = rows
                .iter()
                .map(|row| HistoryEntry::from_row(row))
                .collect::<Vec<HistoryEntry>>();

            Ok(categories)
        }
        Err(e) => {
            tracing::event!(target: "sqlx", tracing::Level::ERROR, "retrieve_history_entries_from_db: {:#?}", e);

            Err(reg_errors::system(reg_errors::DEFAULT_MSG))
        }
    }
}
