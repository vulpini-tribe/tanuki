use crate::service;
use log;

use sqlx::postgres::PgPoolOptions;
use sqlx::postgres::{PgConnectOptions, PgSslMode};

use r2d2_redis::RedisConnectionManager;
pub struct WebDataPool {
    pub pg: sqlx::Pool<sqlx::Postgres>,
    pub redis: r2d2::Pool<RedisConnectionManager>,
}

impl WebDataPool {
    fn create_redis() -> r2d2::Pool<RedisConnectionManager> {
        let env_config = service::env::EnvConfig::new();

        let manager = RedisConnectionManager::new(env_config.redis_url)
            .expect("Redis connection should be successful");

        log::info!("[+] Redis connection manager created.");

        let redis = r2d2::Pool::builder()
            .build(manager)
            .expect("Redis pool creation should be successful");

        log::info!("[+] Redis connection pool created.");

        redis
    }

    async fn create_db() -> sqlx::Pool<sqlx::Postgres> {
        println!("[+] Postgres connection pool creating.");
        let env_config = service::env::EnvConfig::new();

        let ssl_mode = if env_config.pg.ssl_mode {
            PgSslMode::Require
        } else {
            PgSslMode::Allow
        };

        let connect_options = PgConnectOptions::new()
            .username(&env_config.pg.username)
            .password(&env_config.pg.password)
            .database(&env_config.pg.database)
            .host(&env_config.pg.hostname)
            .ssl_mode(ssl_mode);

        let pool = PgPoolOptions::new()
            .max_connections(5)
            .connect_with(connect_options)
            .await
            .unwrap();

        println!("[+] Postgres connection pool created.");

        pool
    }

    pub async fn new() -> WebDataPool {
        WebDataPool {
            pg: WebDataPool::create_db().await.into(),
            redis: WebDataPool::create_redis(),
        }
    }
}
