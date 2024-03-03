use argon2::password_hash::rand_core::{OsRng, RngCore};
use hex;
use pasetors::claims::Claims;

const SESSION_KEY_PREFIX: &str = "valid_session_key_for_";

// Get session key
pub fn get_session_key(claims: &Claims) -> Result<String, String> {
    let session_key = serde_json::to_value(claims.get_claim("session_key").unwrap()).unwrap();

    match serde_json::from_value::<String>(session_key) {
        Ok(session_key) => return Ok(session_key),
        Err(e) => return Err(format!("{}", e)),
    };
}

// Get user's ID
pub fn get_user_id(claims: &Claims) -> Result<uuid::Uuid, String> {
    let user_id = serde_json::to_value(claims.get_claim("user_id").unwrap()).unwrap();

    match serde_json::from_value::<uuid::Uuid>(user_id) {
        Ok(user_id) => return Ok(user_id),
        Err(e) => return Err(format!("{}", e)),
    };
}

// Get redis key
pub fn get_redis_key(session_key: &str, is_for_password_change: Option<bool>) -> String {
    let redis_key;

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

// Calc TTL and DT for the PASETO | Start
#[derive(Debug)]
pub struct TimeManager {
    pub dt: chrono::prelude::DateTime<chrono::prelude::Local>,
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
pub fn set_claims(
    dt: chrono::prelude::DateTime<chrono::prelude::Local>,
    user_id: uuid::Uuid,
    session_key: String,
) -> Claims {
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
pub fn generate_random_shit() -> String {
    let mut buff = [0_u8; 128]; // 128 bytes

    OsRng.fill_bytes(&mut buff);
    hex::encode(buff)
}
