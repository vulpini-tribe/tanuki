use super::delete_measurement::delete_measurement;
use super::get_measurement::get_measurement;
use super::update_measurement::update_measurement;

use actix_web::{web, Scope};

pub fn get_routes() -> Scope {
    let measurement_routes = web::scope("/measurements").service(
        web::resource("/{measurement_id}")
            .route(web::get().to(get_measurement))
            .route(web::put().to(update_measurement))
            .route(web::delete().to(delete_measurement)),
    );

    measurement_routes
}
