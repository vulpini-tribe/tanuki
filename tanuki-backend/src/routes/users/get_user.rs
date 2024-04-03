use crate::errors::reg_errors;
use crate::service::data_providers::WebDataPool;
use crate::types::auth::UserProfile;
use crate::utils::{acquire_pg_connection, session_user_id};

use actix_web::{web, Error, HttpResponse};
use serde::{Deserialize, Serialize};
use serde_json::json;

pub async fn get_user(
    dp: web::Data<WebDataPool>,
    session: actix_session::Session,
) -> Result<HttpResponse, Error> {
    let mut pg_connection = acquire_pg_connection(dp).await?;

    let user_id = match session_user_id(&session).await {
        Ok(user_id) => Ok(user_id),
        Err(_) => Err(reg_errors::not_authenticated(
            "Please authorize to get your profile",
        )),
    };

    let user_id = user_id?;

    let data = search_for_profile(user_id, &mut pg_connection).await?;

    match data {
        Some(user_profile) => Ok(HttpResponse::Ok().json(json!({
          "data": user_profile
        }))),
        None => Ok(HttpResponse::NotFound().finish()),
    }
}

async fn search_for_profile(
    user_id: uuid::Uuid,
    pg_connection: &mut sqlx::PgConnection,
) -> Result<Option<UserProfile>, Error> {
    let search_query = "SELECT * FROM user_profile WHERE user_id = $1;";

    let search_results = sqlx::query(&search_query)
        .bind(&user_id)
        .fetch_all(pg_connection)
        .await
        .map_err(|e| {
            tracing::event!(target: "sqlx", tracing::Level::ERROR, "search_for_profile: {:#?}", e);

            reg_errors::not_found("User profile not found.")
        })?;

    let search_result = match search_results.len() {
        1 => {
            let food = UserProfile::from_row(&search_results[0]);
            Some(food)
        }
        _ => None,
    };

    Ok(search_result)
}
