use argon2::password_hash::{rand_core, PasswordHash, SaltString};
use argon2::Argon2;
use argon2::{PasswordHasher, PasswordVerifier};

#[tracing::instrument(name = "Hashing user password", skip(password))]
pub async fn hash_password(password: &[u8]) -> Result<String, String> {
    let salt = SaltString::generate(&mut rand_core::OsRng);

    match Argon2::default().hash_password(password, &salt) {
        Ok(hash) => Ok(hash.to_string()),
        Err(_) => Err(
            "An error has been occurred during the registration process. Please try again later."
                .to_string(),
        ),
    }
}

#[tracing::instrument(name = "Verifying user password", skip(password, hash))]
pub async fn verify_password(hash: &str, password: &[u8]) -> bool {
    let parsed_hash = PasswordHash::new(hash).expect("Unable to parse hash");

    Argon2::default()
        .verify_password(password, &parsed_hash)
        .is_ok()
}
