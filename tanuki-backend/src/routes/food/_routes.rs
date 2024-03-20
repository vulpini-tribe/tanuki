use super::{add_food, search_food};

use actix_web::{web, Scope};

pub fn get_routes() -> Scope {
    let auth_routes = web::scope("/food")
        .service(web::resource("").route(web::get().to(search_food)))
        .service(web::resource("").route(web::post().to(add_food)));

    auth_routes
}
