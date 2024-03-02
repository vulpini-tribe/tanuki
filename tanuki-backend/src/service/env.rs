use dotenvy::dotenv;
use log;
use std::env;

#[derive(Debug, Clone)]
pub struct EnvConfig {
    // Base
    pub port: u16,
    pub hostname: String,
    pub redis_url: String,
    pub database_url: String,

    // Params
    pub with_migration: bool,
    pub with_debug: bool,

    // Secrets
    pub secret_key: String,
    pub token_expiration: i64,
    pub hmac_secret: String,

    // Email
    pub smtp_server: String,
    pub smtp_port: u16,
    pub smtp_username: String,
    pub smtp_token: String,
    pub email_from: String,
}

impl EnvConfig {
    pub fn new() -> EnvConfig {
        dotenv().ok();
        log::info!("[+] Reading ENV configuration.");

        let with_migration = env::var("MIGRATION").unwrap_or("NOPE".to_string());
        let with_debug = env::var("DEBUG").unwrap_or("NOPE".to_string());

        EnvConfig {
            // base params
            hostname: env::var("HOSTNAME").expect("HOSTNAME must be set"),
            port: env::var("PORT")
                .expect("PORT must be set")
                .parse::<u16>()
                .expect("PORT must be a number"),

            redis_url: env::var("REDIS_URL").expect("REDIS_URL must be set"),
            database_url: env::var("DATABASE_URL").expect("DATABASE_URL must be set"),

            // Additional params
            with_migration: with_migration == "MIGRATION",
            with_debug: with_debug == "DEBUG",

            // Secrets
            secret_key: env::var("SECRET_KEY").expect("SECRET_KEY must be set"),
            token_expiration: env::var("TOKEN_EXPIRATION")
                .expect("TOKEN_EXPIRATION must be set")
                .parse::<i64>()
                .expect("TOKEN_EXPIRATION must be a number"),
            hmac_secret: env::var("HMAC_SECRET").expect("HMAC_SECRET must be set"),

            // Email
            smtp_server: env::var("SMTP_SERVER").expect("SMTP_SERVER must be set"),
            smtp_port: env::var("SMTP_PORT")
                .expect("SMTP_PORT must be set")
                .parse::<u16>()
                .expect("SMTP_PORT must be a number"),
            smtp_username: env::var("SMTP_USERNAME").expect("SMTP_USERNAME must be set"),
            smtp_token: env::var("SMTP_TOKEN").expect("SMTP_TOKEN must be set"),
            email_from: env::var("EMAIL_FROM").expect("EMAIL_FROM must be set"),
        }
    }
}
