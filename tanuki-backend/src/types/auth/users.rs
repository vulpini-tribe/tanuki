use crate::schema::{user_profile, users};
use diesel;
use diesel::{Insertable, Queryable, Selectable};
use serde::{Deserialize, Serialize};
use sqlx::postgres::PgRow;
use sqlx::Row;

#[derive(Insertable, Queryable, Selectable, Serialize, Deserialize, Debug)]
#[diesel(table_name = users)]
pub struct UserToRegister {
    pub email: String,
    pub password: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserProfile {
    pub id: uuid::Uuid,
    pub avatar_url: Option<String>,
    pub nickname: Option<String>,
    pub theme: Option<String>,
    pub language: Option<String>,
    pub units: Option<String>,
}

impl UserProfile {
    pub fn from_row(row: &PgRow) -> Self {
        Self {
            id: row.get("user_id"),
            theme: row.get("theme"),
            language: row.get("language"),
            units: row.get("units"),
            nickname: row.get("nickname"),
            avatar_url: row.get("avatar_url"),
        }
    }
}

#[derive(Insertable, Queryable, Selectable, Serialize, Deserialize, Debug)]
pub struct User {
    pub id: uuid::Uuid,
    pub email: String,
    pub password: String,
    pub is_active: bool,
}
