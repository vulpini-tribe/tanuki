use config;
use dotenvy::dotenv;

pub enum Environment {
    Dev,
    Prod,
}

impl Environment {
    pub fn as_str(&self) -> &str {
        match self {
            Environment::Dev => "dev",
            Environment::Prod => "prod",
        }
    }
}

#[derive(serde::Deserialize, Debug, Clone)]
pub struct ApplicationStruct {
    pub protocol: String,
    pub port: u16,
    pub host: String,
    pub base_url: String,
}

#[derive(serde::Deserialize, Debug, Clone)]
pub struct DBStruct {
    pub migration: String,
}

#[derive(serde::Deserialize, Debug, Clone)]
pub struct SettingsConfig {
    pub application: ApplicationStruct,
    pub debug: bool,
    pub db: DBStruct,
    pub redis_url: String,
    pub database_url: String,
}

impl SettingsConfig {
    pub fn new() -> SettingsConfig {
        dotenv().ok();
        log::info!("[+] Reading settings configuration.");

        let app_env: Environment = match std::env::var("APP_ENV") {
            Ok(env) => match env.as_str() {
                "dev" => Environment::Dev,
                "prod" => Environment::Prod,
                _ => Environment::Dev,
            },
            Err(_) => Environment::Dev,
        };

        let base_path = std::env::current_dir().expect("Failed to determine the current directory");
        let settings_directory = base_path.join("settings");
        let env_filename = format!("{}.yaml", app_env.as_str());

        let settings = config::Config::builder()
            // Merge base.yaml with env conf file
            .add_source(config::File::from(settings_directory.join("base.yaml")))
            .add_source(config::File::from(settings_directory.join(env_filename)))
            // merge resulting config with .env file
            .add_source(config::Environment::with_prefix("app"))
            .build()
            .expect("Failed to load settings configuration.");

        settings.try_deserialize::<SettingsConfig>().unwrap()
    }
}
