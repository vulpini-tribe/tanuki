use serde::{Deserialize, Serialize};
use sqlx::Row;

#[derive(Debug, Deserialize, Serialize)]
pub struct HistoryEntry {
    day: String,
}

impl HistoryEntry {
    pub fn from_row(row: &sqlx::postgres::PgRow) -> Self {
        Self {
            day: row.get("day"),
        }
    }
}
