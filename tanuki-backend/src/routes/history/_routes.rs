use super::get_history;
use super::get_history_entry;

use actix_web::{web, Scope};

pub fn get_routes() -> Scope {
    let auth_routes = web::scope("/history")
        .service(web::resource("/{id}").route(web::get().to(get_history_entry)))
        .service(web::resource("").route(web::get().to(get_history)));

    auth_routes
}
