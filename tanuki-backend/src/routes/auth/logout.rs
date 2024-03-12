use crate::errors::{info, reg_errors};
use crate::utils::session_user_id;

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
