pub mod routes;
pub mod service;

use log;
extern crate diesel;
use actix_web::{self, web, App, HttpServer};
use routes::{auth, health, users};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    service::service_logger::init_logger();
    log::info!("Main bootstrap tanuki server starts");

    let env_config = service::env::EnvConfig::new();

    let tel_subscriber = service::telemetry::get_subscriber(env_config.with_debug);
    service::telemetry::init_subscriber(tel_subscriber);

    service::in_deploy_migrations::run_migrations(
        env_config.database_url.clone(),
        env_config.with_migration,
    );

    tracing::event!(target: "backend", tracing::Level::INFO, "Listening on http://{}:{}", env_config.hostname, env_config.port);

    HttpServer::new(move || {
        let data_providers = service::data_providers::WebDataPool::new(
            env_config.redis_url.clone(),
            env_config.database_url.clone(),
        );

        let middlewares = service::middlewares::Middlewares::new();

        App::new()
            .wrap(middlewares.governor)
            .wrap(middlewares.cors)
            .wrap(middlewares.compress)
            .wrap(middlewares.logger)
            .app_data(web::Data::new(data_providers))
            .service(auth::_routes::get_routes())
            .service(users::_routes::get_routes())
            .service(health::_routes::get_routes())
    })
    .bind((env_config.hostname, env_config.port))?
    .workers(1)
    .run()
    .await
}
