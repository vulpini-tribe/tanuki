use actix_cors::Cors;
use actix_governor::governor::clock::QuantaInstant;
use actix_governor::governor::middleware::NoOpMiddleware;
use actix_governor::{Governor, GovernorConfigBuilder, PeerIpKeyExtractor};
use actix_session::{storage::CookieSessionStore, SessionMiddleware};
use actix_web::middleware::{Compress, Logger};

pub struct Middlewares {
    pub cors: Cors,
    pub compress: Compress,
    pub logger: Logger,
    pub governor: Governor<PeerIpKeyExtractor, NoOpMiddleware<QuantaInstant>>,
    pub session: SessionMiddleware<CookieSessionStore>,
}

impl Middlewares {
    fn get_governor() -> Governor<PeerIpKeyExtractor, NoOpMiddleware<QuantaInstant>> {
        let governor_conf = GovernorConfigBuilder::default()
            .per_second(1)
            .burst_size(15)
            .finish()
            .expect("Governor config is not valid");

        let governor: Governor<PeerIpKeyExtractor, NoOpMiddleware<QuantaInstant>> =
            Governor::new(&governor_conf);

        governor
    }

    fn get_cors() -> Cors {
        Cors::default()
            .allow_any_origin()
            // .allowed_origin(&settings.frontend_url)
            .allowed_methods(vec!["GET", "POST", "PATCH", "DELETE"])
            .allowed_headers(vec![
                actix_web::http::header::AUTHORIZATION,
                actix_web::http::header::ACCEPT,
            ])
            .allowed_header(actix_web::http::header::CONTENT_TYPE)
            .expose_headers(&[actix_web::http::header::CONTENT_DISPOSITION])
            .supports_credentials()
            .max_age(3600)
    }

    fn get_session() -> SessionMiddleware<CookieSessionStore> {
        let envs = crate::service::env::EnvConfig::new();
        let secret_key = actix_web::cookie::Key::from(envs.hmac_secret.as_bytes());

        if envs.with_debug {
            actix_session::SessionMiddleware::builder(
                actix_session::storage::CookieSessionStore::default(),
                secret_key.clone(),
            )
            .cookie_http_only(true)
            .cookie_same_site(actix_web::cookie::SameSite::None)
            .cookie_secure(true)
            .build()
        } else {
            actix_session::SessionMiddleware::new(
                actix_session::storage::CookieSessionStore::default(),
                secret_key.clone(),
            )
        }
    }

    pub fn new() -> Middlewares {
        Middlewares {
            cors: Middlewares::get_cors(),
            compress: Compress::default(),
            logger: Logger::default(),
            governor: Middlewares::get_governor(),
            session: Middlewares::get_session(),
        }
    }
}
