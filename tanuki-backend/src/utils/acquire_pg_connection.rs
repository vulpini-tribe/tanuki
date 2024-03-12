use actix_web::{web, Error};

use crate::errors::reg_errors;
use crate::service::data_providers::WebDataPool;

pub async fn acquire_pg_connection(
    dp: web::Data<WebDataPool>,
) -> Result<sqlx::pool::PoolConnection<sqlx::Postgres>, Error> {
    let pg_connection = dp
        .pg
        .acquire()
        .await
        .map_err(|_| reg_errors::system(reg_errors::DEFAULT_MSG))?;

    Ok(pg_connection)
}
