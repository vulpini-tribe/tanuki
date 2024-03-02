use pasetors::keys::SymmetricKey;
use pasetors::{local, version4::V4};

use r2d2_redis::redis::{Commands, Value};
use r2d2_redis::RedisConnectionManager;

use super::utils::{generate_random_shit, get_redis_key, set_claims, TimeManager};

#[tracing::instrument(name = "Issue PASETO token", skip(redis))]
pub async fn issue_confirmation_token_paseto(
    user_id: uuid::Uuid,
    redis: r2d2::Pool<RedisConnectionManager>,
    is_for_password_change: Option<bool>,
) -> Result<String, r2d2::Error> {
    let envs = crate::service::env::EnvConfig::new();
    let mut redis_connection = redis.get().expect("Cannot get redis connection");

    let session_key: String = generate_random_shit();
    let redis_key = get_redis_key(&session_key, is_for_password_change);
    let time_manager = TimeManager::new(is_for_password_change, envs.token_expiration);
    let claims = set_claims(time_manager.dt, user_id, session_key);

    // Just validation that the key exists and indication that the session is "live".
    redis_connection
        .set::<&str, String, Value>(&redis_key, String::new())
        .expect("Cannot set key in redis");

    // Utilize redis' ttl mechanism: the record will be auto-deleted after N seconds
    redis_connection
        .expire::<String, Value>(
            redis_key.clone(),
            time_manager.ttl.num_seconds().try_into().unwrap(),
        )
        .expect("Cannot set expiry for key in redis");

    let sk = SymmetricKey::<V4>::from(envs.secret_key.as_bytes()).unwrap();
    Ok(local::encrypt(&sk, &claims, None, Some(envs.hmac_secret.as_bytes())).unwrap())
}
