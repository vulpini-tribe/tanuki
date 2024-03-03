use dotenvy::dotenv;
use log;
use std::env;

#[derive(Debug, Clone)]
pub struct PgConfig {
    pub hostname: String,
    pub port: Option<i64>,
    pub username: String,
    pub password: String,
    pub database: String,
    pub ssl_mode: bool,
    pub as_string: String,
}

#[derive(Debug, Clone)]
pub struct SMTPConfig {
    pub server: String,
    pub port: u16,
    pub username: String,
    pub token: String,
}

#[derive(Debug, Clone)]
pub struct EnvConfig {
    // Base
    pub port: u16,
    pub hostname: String,
    pub redis_url: String,

    // Params
    pub with_migration: bool,
    pub with_debug: bool,

    // Secrets
    pub secret_key: String,
    pub token_expiration: i64,
    pub hmac_secret: String,

    pub pg: PgConfig,
    pub smtp: SMTPConfig,
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

            email_from: env::var("EMAIL_FROM").expect("EMAIL_FROM must be set"),

            smtp: SMTPConfig {
                server: env::var("SMTP_SERVER").expect("SMTP_SERVER must be set"),
                port: env::var("SMTP_PORT")
                    .expect("SMTP_PORT must be set")
                    .parse::<u16>()
                    .expect("SMTP_PORT must be a number"),
                username: env::var("SMTP_USERNAME").expect("SMTP_USERNAME must be set"),
                token: env::var("SMTP_TOKEN").expect("SMTP_TOKEN must be set"),
            },

            pg: PgConfig {
                hostname: env::var("PG.HOSTNAME").expect("PG.HOSTNAME must be set"),
                port: env::var("PG.PORT")
                    .unwrap_or("5432".to_string())
                    .parse::<i64>()
                    .ok(),
                username: env::var("PG.USERNAME").expect("PG.USERNAME must be set"),
                password: env::var("PG.PASSWORD").expect("PG.PASSWORD must be set"),
                database: env::var("PG.DATABASE").expect("PG.DATABASE must be set"),
                ssl_mode: env::var("PG.SSLMODE")
                    .expect("PG.SSLMODE must be set")
                    .parse::<bool>()
                    .unwrap(),
                as_string: env::var("PG.AS_STRING").expect("PG.AS_STRING must be set"),
            },
        }
    }
}
