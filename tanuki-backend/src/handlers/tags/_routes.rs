use super::create_tags::create_tags;
use super::delete_tags::delete_tags;
use super::get_tags::get_tags;
use super::update_tags::update_tags;

use actix_web::{web, Scope};

pub fn get_routes() -> Scope {
    let tags_routes = web::scope("/tags").service(
        web::resource("")
            .route(web::get().to(get_tags))
            .route(web::post().to(create_tags))
            .route(web::put().to(update_tags))
            .route(web::delete().to(delete_tags)),
    );

    tags_routes
}
