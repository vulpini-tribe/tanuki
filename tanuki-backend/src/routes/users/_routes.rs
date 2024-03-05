use super::get_user;

use actix_web::{web, Scope};

pub fn get_routes() -> Scope {
    let user_routes =
        web::scope("/users").service(web::resource("/me").route(web::get().to(get_user)));

    user_routes
}
