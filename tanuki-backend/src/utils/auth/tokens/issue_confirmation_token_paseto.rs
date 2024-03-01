use argon2::password_hash::rand_core::{OsRng, RngCore};
use chrono::prelude::{DateTime, Local};

use hex;

use pasetors::claims::Claims;
use pasetors::keys::SymmetricKey;
use pasetors::{local, version4::V4};

use r2d2_redis::redis::{Commands, Value};
use r2d2_redis::RedisConnectionManager;

// Store the session key prefix as a const so it can't be typo'd anywhere it's used.
const SESSION_KEY_PREFIX: &str = "valid_session_key_for_";

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

// Calc TTL and DT for the PASETO | Start
#[derive(Debug)]
struct TimeManager {
    pub dt: DateTime<Local>,
    pub ttl: chrono::Duration,
}

impl TimeManager {
    pub fn new(is_for_password_change: Option<bool>, token_expiration: i64) -> Self {
        let current_date_time = chrono::Local::now();
        let dt = {
            if is_for_password_change.is_some() {
                current_date_time + chrono::Duration::hours(1)
            } else {
                current_date_time + chrono::Duration::minutes(token_expiration)
            }
        };

        let ttl = {
            if is_for_password_change.is_some() {
                chrono::Duration::hours(1)
            } else {
                chrono::Duration::minutes(token_expiration)
            }
        };

        Self { dt, ttl }
    }
}
// Calc TTL and DT for the PASETO | End

// Set claims for the PASETO | Start
fn set_claims(dt: DateTime<Local>, user_id: uuid::Uuid, session_key: String) -> Claims {
    let mut claims = Claims::new().unwrap();

    // Set custom expiration, default is 1 hour
    claims.expiration(&dt.to_rfc3339()).unwrap();

    claims
        .add_additional("user_id", serde_json::json!(user_id))
        .unwrap();

    claims
        .add_additional("session_key", serde_json::json!(session_key))
        .unwrap();

    claims
}
// Set claims for the PASETO | End

// Generate 128 bytes of random shit for creating the PASETO
fn generate_random_shit() -> String {
    let mut buff = [0_u8; 128]; // 128 bytes

    OsRng.fill_bytes(&mut buff);
    hex::encode(buff)
}

// Get redis key
fn get_redis_key(session_key: &str, is_for_password_change: Option<bool>) -> String {
    let mut redis_key = "".to_string();

    if is_for_password_change.is_some() {
        redis_key = format!(
            "{}{}is_for_password_change",
            SESSION_KEY_PREFIX, session_key
        )
    } else {
        redis_key = format!("{}{}", SESSION_KEY_PREFIX, session_key)
    }

    redis_key
}
