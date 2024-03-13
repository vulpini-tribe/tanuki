use serde::{Deserialize, Serialize};
use sqlx::Row;

#[derive(Debug, Deserialize, Serialize)]
pub struct HistoryEntry {
    id: uuid::Uuid,
    day: String,
    weight: f32,
    calories: f32,
}

impl HistoryEntry {
    pub fn from_row(row: &sqlx::postgres::PgRow) -> Self {
        Self {
            id: row.get("id"),
            day: row.get("day"),
            weight: row.get("weight"),
            calories: row.get("calories"),
        }
    }
}
