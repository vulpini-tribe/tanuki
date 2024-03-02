use core::convert::TryFrom;
use pasetors::claims::ClaimsValidationRules;
use pasetors::keys::SymmetricKey;
use pasetors::token::UntrustedToken;
use pasetors::{local, version4::V4, Local};

use r2d2::PooledConnection;
use r2d2_redis::redis::{Commands, Value};
use r2d2_redis::RedisConnectionManager;

use super::utils::{get_redis_key, get_session_key, get_user_id};

fn manage_token(
    mut redis_connection: PooledConnection<RedisConnectionManager>,
    redis_key: String,
) -> Result<(), String> {
    let token = redis_connection
        .get::<String, Option<String>>(redis_key.clone())
        .unwrap();

    match token {
        Some(_) => {
            redis_connection
                .del::<String, Value>(redis_key.clone())
                .unwrap();

            return Ok(());
        }
        None => return Err("Token has been used or expired.".to_string()),
    }
}

#[tracing::instrument(name = "Verify PASETO token", skip(token, redis))]
pub async fn verify_confirmation_token_paseto(
    token: String,
    redis: r2d2::Pool<RedisConnectionManager>,
    is_password: Option<bool>,
) -> Result<crate::types::tokens::ConfirmationToken, String> {
    let envs = crate::service::env::EnvConfig::new();
    let sk: SymmetricKey<V4> = SymmetricKey::<V4>::from(envs.secret_key.as_bytes()).unwrap();
    let redis_connection = redis.get().expect("Cannot get redis connection");

    let validation_rules = ClaimsValidationRules::new();

    let untrusted_token = UntrustedToken::<Local, V4>::try_from(&token)
        .map_err(|e| format!("TokenValiation: {}", e))?;

    let trusted_token = local::decrypt(
        &sk,
        &untrusted_token,
        &validation_rules,
        None,
        Some(envs.hmac_secret.as_bytes()),
    )
    .map_err(|e| format!("PASETO: {}", e))?;

    let claims = trusted_token.payload_claims().unwrap();
    let user_id = get_user_id(claims)?;
    let session_key = get_session_key(claims)?;
    let redis_key = get_redis_key(&session_key, is_password);

    match manage_token(redis_connection, redis_key.clone()) {
        Ok(_) => Ok(crate::types::tokens::ConfirmationToken { user_id }),
        Err(e) => return Err(e),
    }
}
