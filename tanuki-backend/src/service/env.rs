use base64;
use dotenvy::dotenv;
use log;
use serde_json::{json, Value};
use std::env;

#[derive(Debug, Clone)]
pub struct EnvConfig {
    pub port: u16,
    pub hostname: String,
    pub redis_url: String,
    pub database_url: String,
}

impl EnvConfig {
    fn get_platform_relationships() -> Result<Value, env::VarError> {
        let relationships = env::var("PLATFORM_RELATIONSHIPS");

        match relationships {
            Ok(relationships) => {
                let relationships = base64::decode(relationships).unwrap();

                Ok(json!(relationships))
            }
            Err(e) => {
                log::info!("[+] PLATFORM_RELATIONSHIPS: {}", e);

                Err(e)
            }
        }
    }

    pub fn new() -> EnvConfig {
        dotenv().ok();
        log::info!("[+] Reading ENV configuration.");

        let platform_relationships = EnvConfig::get_platform_relationships();
        println!("PLATFORM_RELATIONSHIPS {:#?}", platform_relationships);

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
