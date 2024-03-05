use crate::errors::reg_errors;
use actix_web::{Error, HttpResponse};
use serde::{Deserialize, Serialize};
use serde_json::json;

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

#[tracing::instrument(name = "Get user_id from session.", skip(session))]
async fn session_user_id(session: &actix_session::Session) -> Result<uuid::Uuid, String> {
    match session.get(crate::types::USER_ID_KEY) {
        Ok(user_id) => match user_id {
            Some(id) => Ok(id),
            None => Err("".to_string()),
        },
        Err(_) => Err("".to_string()),
    }
}
