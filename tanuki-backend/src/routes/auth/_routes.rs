use super::login;
use super::logout;
use super::refresh;
use super::register;

use actix_web::{web, Scope};

pub fn get_routes() -> Scope {
    let auth_routes = web::scope("/auth")
        .service(web::resource("/sign-in").route(web::post().to(login)))
        .service(web::resource("/sign-up").route(web::post().to(register)))
        .service(web::resource("/sign-out").route(web::post().to(logout)))
        .service(web::resource("/refresh").route(web::post().to(refresh)));

    auth_routes
}
