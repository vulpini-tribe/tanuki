use serde::{Deserialize, Serialize};
use sqlx::Row;

#[derive(Debug, Deserialize, Serialize)]
pub struct Category {
    pub id: uuid::Uuid,
    pub color: String,
    pub icon: String,
    pub name: String,
}

impl Category {
    pub fn from_row(row: &sqlx::postgres::PgRow) -> Self {
        Self {
            id: row.get("category_id"),
            color: row.get("color"),
            name: row.get("category_name"),
            icon: row.get("icon"),
        }
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct HistoryFoodEntry {
    pub id: uuid::Uuid,
    pub name: String,
    pub proteins: f32,
    pub fats: f32,
    pub carbs: f32,
    pub weight: f32,
    pub icon: String,
    pub color: String,
    pub created_at: chrono::DateTime<chrono::Utc>,
}

impl HistoryFoodEntry {
    pub fn from_row(row: &sqlx::postgres::PgRow) -> Self {
        Self {
            id: row.get("id"),
            name: row.get("name"),
            proteins: row.get("proteins"),
            fats: row.get("fats"),
            carbs: row.get("carbs"),
            weight: row.get("weight"),
            icon: row.get("icon"),
            color: row.get("color"),
            created_at: row.get("created_at"),
        }
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FoodEntryRaw {
    pub id: uuid::Uuid,
    pub name: String,
    pub kcal_100: f32,
    pub protein_100: f32,
    pub fat_100: f32,
    pub carbs_100: f32,
    pub portion_weight: f32,
}

impl FoodEntryRaw {
    pub fn from_row(row: &sqlx::postgres::PgRow) -> Self {
        Self {
            id: row.get("id"),
            name: row.get("food_name"),
            kcal_100: row.get("kcal_100"),
            protein_100: row.get("protein_100"),
            fat_100: row.get("fat_100"),
            carbs_100: row.get("carbs_100"),
            portion_weight: row.get("portion_weight"),
        }
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct FoodSearchEntry {
    pub id: uuid::Uuid,
    pub name: String,
}

impl FoodSearchEntry {
    pub fn from_row(row: &sqlx::postgres::PgRow) -> Self {
        Self {
            id: row.get("id"),
            name: row.get("food_name"),
        }
    }
}
