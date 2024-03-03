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
        let redis_url = "rediss://red-cnf1qof109ks73a2a5b0:sKBJhrljdaeKVhHW8MdQoc3ucmgaG8Uc@frankfurt-redis.render.com:6379";
        let manager =
            RedisConnectionManager::new(redis_url).expect("Redis connection should be successful");

        log::info!("[+] Redis connection manager created.");

        let redis = r2d2::Pool::builder()
            .build(manager)
            .expect("Redis pool creation should be successful");

        log::info!("[+] Redis connection pool created.");

        redis
    }

    async fn create_db() -> sqlx::Pool<sqlx::Postgres> {
        println!("[+] Postgres connection pool creating.");

        let connect_options = PgConnectOptions::new()
            .username("dev_tanuki_psql_user")
            .password("msjUdSLfpMpxU2yP0Puf7JhHqqsJwPnF")
            .database("dev_tanuki_psql")
            .host("dpg-cnf1r36d3nmc73f0tde0-a.oregon-postgres.render.com")
            .ssl_mode(PgSslMode::Require); // Set SSL mode to Require

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
