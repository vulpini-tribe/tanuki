use super::get_history::get_history;

use actix_web::{web, Scope};

pub fn get_routes() -> Scope {
    let history_routes =
        web::scope("/history").service(web::resource("").route(web::get().to(get_history)));

    history_routes
}
