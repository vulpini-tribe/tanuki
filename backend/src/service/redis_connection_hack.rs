use r2d2_redis::redis::{ConnectionAddr, ConnectionInfo};
use url::Url;

pub fn parse_redis_url(redis_url: &str) -> Result<ConnectionInfo, url::ParseError> {
    let url = Url::parse(redis_url)?;

    let username = if !url.username().is_empty() {
        Some(url.username().to_string())
    } else {
        None
    };

    // let passwd = url.password().map(|p| p.to_string());
    let host = url
        .host_str()
        .ok_or_else(|| url::ParseError::IdnaError)?
        .to_string();
    let port = url.port().unwrap_or(6379);

    Ok(ConnectionInfo {
        username: None,
        passwd: username,
        addr: Box::<ConnectionAddr>::new(ConnectionAddr::Tcp(host, port)),
        db: 0,
    })
}
