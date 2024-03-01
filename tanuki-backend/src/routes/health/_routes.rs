use super::heartbeat;

use actix_web::{web, Resource};

pub fn get_routes() -> Resource {
    let auth_routes = web::resource("/heartbeat").route(web::get().to(heartbeat));

    auth_routes
}
