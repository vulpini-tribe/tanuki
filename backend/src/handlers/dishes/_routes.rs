use super::create_dish::create_dish;
use super::delete_dishes::delete_dishes;
use super::get_dish::get_dish;
use super::get_dishes::get_dishes;
use super::update_dish::update_dish;

use actix_web::{web, Scope};

pub fn get_routes() -> Scope {
    let dishes_routes = web::scope("/dishes")
        .service(
            web::resource("")
                .route(web::get().to(get_dishes))
                .route(web::post().to(create_dish)),
        )
        .service(
            web::resource("/{dish_id}")
                .route(web::get().to(get_dish))
                .route(web::put().to(update_dish))
                .route(web::delete().to(delete_dishes)),
        );

    dishes_routes
}
