use serde::{Deserialize, Serialize};
use sqlx::postgres::PgRow;
use sqlx::Row;

#[derive(Debug, Serialize, Deserialize)]
pub struct Category {
    id: uuid::Uuid,
    name: String,
    description: Option<String>,
    color: Option<String>,
    icon: Option<String>,
    is_private: bool,
}

impl Category {
    pub fn from_row(row: &PgRow) -> Self {
        let id: uuid::Uuid = row.get("id");
        let name: String = row.get("category_name");
        let description: Option<String> = row.get("description");
        let color: Option<String> = row.get("color");
        let icon: Option<String> = row.get("icon");
        let user_id: Option<uuid::Uuid> = row.get("user_id");

        Self {
            id,
            name,
            description,
            color,
            icon,
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
            name: row.get("category_name"),
        }
    }
}
