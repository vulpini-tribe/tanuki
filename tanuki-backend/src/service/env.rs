use dotenvy::dotenv;
use log;
use std::env;

#[derive(Debug, Clone)]
pub struct EnvConfig {
    pub port: u16,
    pub hostname: String,
    pub redis_url: String,
    pub database_url: String,
    pub with_migration: bool,
    pub with_debug: bool,
}

impl EnvConfig {
    pub fn new() -> EnvConfig {
        dotenv().ok();
        log::info!("[+] Reading ENV configuration.");

        let with_migration = env::var("MIGRATION").unwrap_or("NOPE".to_string());
        let with_debug = env::var("DEBUG").unwrap_or("NOPE".to_string());

        EnvConfig {
            hostname: env::var("HOSTNAME").expect("HOSTNAME must be set"),
            port: env::var("PORT")
                .expect("PORT must be set")
                .parse::<u16>()
                .expect("PORT must be a number"),

            redis_url: env::var("REDIS_URL").expect("REDIS_URL must be set"),
            database_url: env::var("DATABASE_URL").expect("DATABASE_URL must be set"),
            with_migration: with_migration == "MIGRATION",
            with_debug: with_debug == "DEBUG",
        }
    }
}
