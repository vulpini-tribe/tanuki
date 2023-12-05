use super::create_user::create_user;
use super::get_user::get_user;
use super::update_user::update_user;

use actix_web::{web, Scope};

pub fn get_routes() -> Scope {
    let user_routes = web::scope("/users")
        .service(web::resource("").route(web::post().to(create_user)))
        .service(
            web::resource("/{user_id}")
                .route(web::get().to(get_user))
                .route(web::put().to(update_user)),
        );

    user_routes
}
