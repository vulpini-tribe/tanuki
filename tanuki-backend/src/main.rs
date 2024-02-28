pub mod routes;
pub mod service;

use log;
extern crate diesel;
use actix_web::{self, web, App, HttpServer};
use routes::{auth, health};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    service::service_logger::init_logger();
    log::info!("Main bootstrap tanuki server starts");

    let settings = service::settings::SettingsConfig::new();

    let tel_subscriber = service::telemetry::get_subscriber(settings.debug.clone());
    service::telemetry::init_subscriber(tel_subscriber);

    service::in_deploy_migrations::run_migrations(
        settings.database_url.clone(),
        settings.db.migration.clone(),
    );

    tracing::event!(target: "backend", tracing::Level::INFO, "Listening on {}://{}:{}", settings.application.protocol, settings.application.host, settings.application.port);

    HttpServer::new(move || {
        let data_providers = service::data_providers::WebDataPool::new(
            settings.redis_url.clone(),
            settings.database_url.clone(),
        );

        let middlewares = service::middlewares::Middlewares::new();

        App::new()
            .wrap(middlewares.governor)
            .wrap(middlewares.cors)
            .wrap(middlewares.compress)
            .wrap(middlewares.logger)
            .app_data(web::Data::new(data_providers))
            .service(auth::_routes::get_routes())
            .service(health::_routes::get_routes())
    })
    .bind((settings.application.host, settings.application.port))?
    .workers(1)
    .run()
    .await
}
