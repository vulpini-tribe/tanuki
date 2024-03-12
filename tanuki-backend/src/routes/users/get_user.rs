use crate::errors::reg_errors;
use crate::utils::session_user_id;

use actix_web::{Error, HttpResponse};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
struct User {
    id: String,
    name: String,
}

pub async fn get_user(session: actix_session::Session) -> Result<HttpResponse, Error> {
    match session_user_id(&session).await {
        Ok(user_id) => {
            tracing::event!(target: "backend", tracing::Level::INFO, "Users retrieved from the DB.");

            Ok(HttpResponse::Ok().json(User {
                id: user_id.to_string(),
                name: "John Doe".to_string(),
            }))
        }
        Err(e) => {
            tracing::event!(target: "backend", tracing::Level::ERROR, "Fail to get user's profile: {:#?}", e);

            Err(reg_errors::not_authenticated(
                "You are not authenticated. Please login. 1",
            ))
        }
    }
}
