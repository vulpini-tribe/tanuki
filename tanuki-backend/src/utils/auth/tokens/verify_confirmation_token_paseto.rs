use core::convert::TryFrom;
use pasetors::claims::ClaimsValidationRules;
use pasetors::keys::SymmetricKey;
use pasetors::token::UntrustedToken;
use pasetors::{local, version4::V4, Local};

use r2d2_redis::redis::{Commands, Value};
use r2d2_redis::RedisConnectionManager;

// Store the session key prefix as a const so it can't be typo'd anywhere it's used.
const SESSION_KEY_PREFIX: &str = "valid_session_key_for_";

/// Verifies and destroys a token. A token is destroyed immediately
/// it has successfully been verified and all encoded data extracted.
/// Redis is used for such destruction.
#[tracing::instrument(name = "Verify PASETO token", skip(token, redis))]
pub async fn verify_confirmation_token_paseto(
    token: String,
    redis: r2d2::Pool<RedisConnectionManager>,
    is_password: Option<bool>,
) -> Result<crate::types::tokens::ConfirmationToken, String> {
    let envs = crate::service::env::EnvConfig::new();
    let sk = SymmetricKey::<V4>::from(envs.secret_key.as_bytes()).unwrap();
    let mut redis_connection = redis.get().expect("Cannot get redis connection");

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
    .map_err(|e| format!("Pasetor: {}", e))?;
    let claims = trusted_token.payload_claims().unwrap();

    let uid = serde_json::to_value(claims.get_claim("user_id").unwrap()).unwrap();

    match serde_json::from_value::<String>(uid) {
        Ok(uuid_string) => match uuid::Uuid::parse_str(&uuid_string) {
            Ok(user_uuid) => {
                let sss_key =
                    serde_json::to_value(claims.get_claim("session_key").unwrap()).unwrap();
                let session_key = match serde_json::from_value::<String>(sss_key) {
                    Ok(session_key) => session_key,
                    Err(e) => return Err(format!("{}", e)),
                };

                let redis_key = {
                    if is_password.is_some() {
                        format!(
                            "{}{}is_for_password_change",
                            SESSION_KEY_PREFIX, session_key
                        )
                    } else {
                        format!("{}{}", SESSION_KEY_PREFIX, session_key)
                    }
                };

                let possible_token = redis_connection
                    .get::<String, Option<String>>(redis_key.clone())
                    .unwrap();

                let is_token_exists = possible_token.is_some();

                if !is_token_exists {
                    return Err("Token has been used or expired.".to_string());
                }

                // clear token from redis
                redis_connection
                    .del::<String, Value>(redis_key.clone())
                    .unwrap();

                Ok(crate::types::tokens::ConfirmationToken { user_id: user_uuid })
            }
            Err(e) => Err(format!("{}", e)),
        },

        Err(e) => Err(format!("{}", e)),
    }
}
