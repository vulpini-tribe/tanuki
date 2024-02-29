use super::get_user;

use actix_web::{web, Scope};

pub fn get_routes() -> Scope {
    let user_routes =
        web::scope("/users").service(web::resource("/{user_id}").route(web::get().to(get_user)));

    user_routes
}
