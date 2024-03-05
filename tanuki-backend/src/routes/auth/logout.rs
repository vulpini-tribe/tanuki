use crate::errors::{info, reg_errors};
use actix_web::{Error, HttpResponse};

#[tracing::instrument(name = "Log out user", skip(session))]
pub async fn logout(session: actix_session::Session) -> Result<HttpResponse, Error> {
    match session_user_id(&session).await {
        Ok(_) => {
            tracing::event!(target: "backend", tracing::Level::INFO, "Users retrieved from the DB.");
            session.purge();

            Ok(info::system_msg("You have successfully logged out"))
        }
        Err(e) => {
            tracing::event!(target: "backend", tracing::Level::ERROR, "Failed to get user from session: {:#?}", e);

            Err(reg_errors::system("We can't log you out for now"))
        }
    }
}

#[tracing::instrument(name = "Get user_id from session.", skip(session))]
async fn session_user_id(session: &actix_session::Session) -> Result<uuid::Uuid, String> {
    match session.get(crate::types::USER_ID_KEY) {
        Ok(user_id) => match user_id {
            None => Err("You are not authenticated".to_string()),
            Some(id) => Ok(id),
        },
        Err(e) => Err(format!("{e}")),
    }
}
