use crate::errors::reg_errors;
use crate::service::data_providers::WebDataPool;
use crate::types::categories::Category;
use crate::utils::{acquire_pg_connection, session_user_id};

use actix_web::{web, Error, HttpResponse};
use serde_json::json;

const SHARED_USER_ID: &str = "'00000000-0000-0000-0000-000000000000'";

pub async fn get_category(
    path_data: web::Path<uuid::Uuid>,
    session: actix_session::Session,
    dp: web::Data<WebDataPool>,
) -> Result<HttpResponse, Error> {
    let category_id = path_data.into_inner();

    let mut pg_connection = acquire_pg_connection(dp).await?;

    let user_id = match session_user_id(&session).await {
        Ok(user_id) => Ok(user_id),
        Err(_) => Err(reg_errors::not_authenticated(
            "Please authorize to get category entry",
        )),
    };

    let user_id = user_id?;

    let data = search_for_category(user_id, category_id, &mut pg_connection).await?;

    match data {
        Some(category) => Ok(HttpResponse::Ok().json(json!({
          "data": category
        }))),
        None => Ok(HttpResponse::NotFound().finish()),
    }
}

async fn search_for_category(
    user_id: uuid::Uuid,
    category_id: uuid::Uuid,
    pg_connection: &mut sqlx::PgConnection,
) -> Result<Option<Category>, Error> {
    let search_query = format!(
        "
          SELECT * FROM categories WHERE id = $1
          AND (categories.user_id = $2 OR categories.user_id = {});
        ",
        SHARED_USER_ID
    );

    let search_results = sqlx::query(&search_query)
        .bind(&category_id)
        .bind(&user_id)
        .fetch_all(pg_connection)
        .await
        .map_err(|e| {
            tracing::event!(target: "sqlx", tracing::Level::ERROR, "search_for_category: {:#?}", e);

            reg_errors::not_found("Category entry not found.")
        })?;

    let search_result = match search_results.len() {
        1 => {
            let food = Category::from_row(&search_results[0]);
            Some(food)
        }
        _ => None,
    };

    Ok(search_result)
}
