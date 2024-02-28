#[tracing::instrument]
pub async fn heartbeat() -> actix_web::HttpResponse {
    tracing::event!(target: "backend", tracing::Level::DEBUG, "Accessing health-check endpoint.");
    actix_web::HttpResponse::Ok().json("Application is safe and healthy.")
}
