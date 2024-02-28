use super::heartbeat;

use actix_web::{web, Scope};

pub fn get_routes() -> Scope {
    let auth_routes =
        web::scope("/heartbeat").service(web::resource("/").route(web::get().to(heartbeat)));

    auth_routes
}
