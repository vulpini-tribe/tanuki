use serde::{Deserialize, Serialize};
use sqlx::postgres::PgRow;
use sqlx::Row;

#[derive(Debug, Serialize, Deserialize)]
pub struct Category {
    id: uuid::Uuid,
    name: String,
    icon: Option<String>,
    color: Option<String>,
    is_private: bool,
}

impl Category {
    pub fn from_row(row: &PgRow) -> Self {
        let user_id: Option<uuid::Uuid> = row.get("user_id");

        Self {
            id: row.get("id"),
            name: row.get("name"),
            icon: row.get("icon"),
            color: row.get("color"),
            is_private: user_id.is_some(),
        }
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct CategorySearchEntry {
    pub id: uuid::Uuid,
    pub name: String,
}

impl CategorySearchEntry {
    pub fn from_row(row: &sqlx::postgres::PgRow) -> Self {
        Self {
            id: row.get("id"),
            name: row.get("name"),
        }
    }
}
