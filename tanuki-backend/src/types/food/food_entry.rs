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
pub struct FoodEntry {
    pub id: uuid::Uuid,
    pub category: Category,
    pub name: String,
    pub kcal_100: f32,
    pub protein_100: f32,
    pub fat_100: f32,
    pub carbs_100: f32,
    pub portion_weight: f32,
    pub datetime: String,
}

impl FoodEntry {
    pub fn from_row(row: &sqlx::postgres::PgRow) -> Self {
        Self {
            id: row.get("food_id"),
            category: Category::from_row(row),
            name: row.get("food_name"),
            kcal_100: row.get("kcal_100"),
            protein_100: row.get("protein_100"),
            fat_100: row.get("fat_100"),
            carbs_100: row.get("carbs_100"),
            portion_weight: row.get("portion_weight"),
            datetime: row.get("datetime"),
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
