use super::{get_categories, search_category};

use actix_web::{web, Scope};

pub fn get_routes() -> Scope {
    let auth_routes = web::scope("/categories")
        .service(web::resource("/search").route(web::get().to(search_category)))
        .service(web::resource("").route(web::get().to(get_categories)));

    auth_routes
}
