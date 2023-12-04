use dotenvy::dotenv;
use log;
use std::env;

#[derive(Debug, Clone)]
pub struct EnvConfig {
    pub port: u16,
    pub hostname: String,
    pub redis_url: String,
    pub database_url: String,
}

impl EnvConfig {
    fn get_platform_relationships() -> () {
        let relationships = env::var("PLATFORM_RELATIONSHIPS").unwrap_or_default();

        println!("PLATFORM_RELATIONSHIPS: {}", relationships);
    }

    pub fn new() -> EnvConfig {
        dotenv().ok();
        log::info!("[+] Reading ENV configuration.");

        EnvConfig::get_platform_relationships();
        // PLATFORM_RELATIONSHIPS

        EnvConfig {
            hostname: env::var("HOSTNAME").expect("HOSTNAME must be set"),
            port: env::var("PORT")
                .expect("PORT must be set")
                .parse::<u16>()
                .expect("PORT must be a number"),

            redis_url: env::var("REDIS_URL").expect("REDIS_URL must be set"),
            database_url: env::var("DATABASE_URL").expect("DATABASE_URL must be set"),
        }
    }
}
