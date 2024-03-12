#[tracing::instrument(name = "Get user_id from session.", skip(session))]
pub async fn session_user_id(session: &actix_session::Session) -> Result<uuid::Uuid, String> {
    match session.get(crate::types::USER_ID_KEY) {
        Ok(user_id) => match user_id {
            None => Err("You are not authenticated".to_string()),
            Some(id) => Ok(id),
        },
        Err(e) => Err(format!("{e}")),
    }
}
