use crate::errors::reg_errors;
use crate::service::data_providers::WebDataPool;
use crate::types::categories::Category;
use crate::utils::{acquire_pg_connection, session_user_id};

use actix_web::{web, Error, HttpResponse};
use serde_json::json;

// main function | start
#[tracing::instrument(name = "Get categories list", skip(session, dp))]
pub async fn get_categories(
    session: actix_session::Session,
    dp: web::Data<WebDataPool>,
) -> Result<HttpResponse, Error> {
    let mut pg_connection = acquire_pg_connection(dp).await?;

    let shared_categories = get_shared_categories(&mut pg_connection).await?;
    let private_categories = get_private_categories(session, &mut pg_connection).await;

    let all_categories = merge_categories(private_categories, shared_categories);

    Ok(HttpResponse::Ok().json(json!({
      "data": all_categories,
    })))
}
// main function | end

// get_private_categories | Start
async fn get_private_categories(
    session: actix_session::Session,
    pg_connection: &mut sqlx::PgConnection,
) -> Result<Vec<Category>, Error> {
    // Get user if from session in order to access private categories
    let user_id = match session_user_id(&session).await {
        Ok(user_id) => Ok(user_id),
        Err(_) => Err(reg_errors::not_authenticated(
            "Please authorize to get your personal categories.",
        )),
    };

    let user_id = user_id?;

    match sqlx::query("SELECT * FROM categories WHERE user_id = ($1);")
        .bind(&user_id)
        .fetch_all(pg_connection)
        .await
    {
        Ok(rows) => {
            let categories = rows
                .iter()
                .map(|row| Category::from_row(row))
                .collect::<Vec<Category>>();

            Ok(categories)
        }
        Err(_) => Err(reg_errors::system(reg_errors::DEFAULT_MSG)),
    }
}
// get_private_categories | End

// get_shared_categories | Start
async fn get_shared_categories(
    pg_connection: &mut sqlx::PgConnection,
) -> Result<Vec<Category>, Error> {
    let shared_categories = match sqlx::query("SELECT * FROM categories WHERE user_id IS NULL;")
        .fetch_all(&mut *pg_connection)
        .await
    {
        Ok(rows) => {
            let categories = rows
                .iter()
                .map(|row| Category::from_row(row))
                .collect::<Vec<Category>>();

            Ok(categories)
        }
        Err(_) => Err(reg_errors::system(reg_errors::DEFAULT_MSG))?,
    };

    shared_categories
}
// get_shared_categories | End

// merge shared & private categories | Start
fn merge_categories(
    private_categories: Result<Vec<Category>, Error>,
    shared_categories: Vec<Category>,
) -> Vec<Category> {
    match private_categories {
        Ok(private_categories) => {
            let mut all_categories = shared_categories;
            all_categories.extend(private_categories);

            all_categories
        }
        Err(_) => shared_categories,
    }
}
// merge shared & private categories | End
