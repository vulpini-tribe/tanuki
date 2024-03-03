use crate::types::auth::UserToRegister;

pub async fn create_user(
    _db_connection: sqlx::pool::PoolConnection<sqlx::Postgres>,
    _user: UserToRegister,
) {
}
