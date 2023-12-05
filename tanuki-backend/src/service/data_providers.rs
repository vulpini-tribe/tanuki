use diesel_async::pooled_connection::{deadpool, AsyncDieselConnectionManager};
use diesel_async::AsyncPgConnection;
use log;
use r2d2_redis::RedisConnectionManager;

use super::redis_connection_hack::parse_redis_url;

pub struct WebDataPool {
    pub pg: deadpool::Pool<AsyncPgConnection>,
    pub redis: r2d2::Pool<RedisConnectionManager>,
}

impl WebDataPool {
    fn create_redis(redis_url: String) -> r2d2::Pool<RedisConnectionManager> {
        let redis_url = parse_redis_url(&redis_url).unwrap();
        let manager =
            RedisConnectionManager::new(redis_url).expect("Redis connection should be successful");

        log::info!("[+] Redis connection manager created.");

        let redis = r2d2::Pool::builder()
            .build(manager)
            .expect("Redis pool creation should be successful");

        log::info!("[+] Redis connection pool created.");

        redis
    }

    fn create_db(database_url: String) -> deadpool::Pool<AsyncPgConnection> {
        let tanuki_pg = AsyncDieselConnectionManager::<AsyncPgConnection>::new(database_url);

        log::info!("[+] PostgreSQL connection manager created.");

        let pg = deadpool::Pool::builder(tanuki_pg)
            .build()
            .expect("DB connect to tanuki should be established");
        log::info!("[+] PostgreSQL connection pool created.");

        pg
    }

    pub fn new(redis_url: String, database_url: String) -> WebDataPool {
        WebDataPool {
            pg: WebDataPool::create_db(database_url),
            redis: WebDataPool::create_redis(redis_url),
        }
    }
}
