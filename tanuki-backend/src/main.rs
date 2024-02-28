pub mod handlers;
pub mod service;

use log;
extern crate diesel;
use actix_web::{self, web, App, HttpServer};
use handlers::{auth, dishes, history, measurements, tags, users};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    service::service_logger::init_logger();
    log::info!("Main bootstrap tanuki server starts");

    let env_config = service::env::EnvConfig::new();

    service::in_deploy_migrations::run_migrations(env_config.database_url.clone());

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
            .service(users::_routes::get_routes())
            .service(tags::_routes::get_routes())
            .service(measurements::_routes::get_routes())
            .service(dishes::_routes::get_routes())
            .service(history::_routes::get_routes())
            .service(auth::_routes::get_routes())
    })
    .bind((env_config.hostname, env_config.port))?
    .workers(1)
    .run()
    .await
}
