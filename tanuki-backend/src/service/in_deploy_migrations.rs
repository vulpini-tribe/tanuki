pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("./migrations");
use crate::diesel::Connection;
use diesel::pg::PgConnection;
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};
use log;

pub fn run_migrations(db_connection_string: String, is_migration: String) -> () {
    if &is_migration == "MIGRATION" {
        let mut connection = PgConnection::establish(&db_connection_string)
            .expect("Failed to create DB for migrations.");

        match connection.run_pending_migrations(MIGRATIONS) {
            Ok(_) => log::info!("Migrations applied"),
            Err(e) => log::error!("Failed to apply migrations, {}", e),
        };
    };
}
