use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::{fmt, EnvFilter};

pub fn get_subscriber(with_debug: bool) -> impl tracing::Subscriber {
    let env_filter = if with_debug {
        "trace".to_string()
    } else {
        "info".to_string()
    };

    let env_filter =
        EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new(env_filter));

    let stdout_log = fmt::layer().pretty();
    let subscriber = tracing_subscriber::Registry::default()
        .with(env_filter)
        .with(stdout_log);

    let json_log = if !with_debug {
        Some(fmt::layer().json())
    } else {
        None
    };
    let subscriber = subscriber.with(json_log);

    subscriber
}

pub fn init_subscriber(subscriber: impl tracing::Subscriber + Send + Sync) {
    tracing::subscriber::set_global_default(subscriber).expect("Failed to set subscriber")
}
