// @generated automatically by Diesel CLI.

pub mod sql_types {
    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "activity_levels"))]
    pub struct ActivityLevels;

    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "calorie_floors"))]
    pub struct CalorieFloors;

    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "fat_levels"))]
    pub struct FatLevels;

    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "goals"))]
    pub struct Goals;

    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "hormonal_sex"))]
    pub struct HormonalSex;
}

diesel::table! {
    categories (id) {
        id -> Uuid,
        category_name -> Nullable<Text>,
        description -> Nullable<Text>,
        color -> Nullable<Text>,
        icon -> Nullable<Text>,
        user_id -> Nullable<Uuid>,
    }
}

diesel::table! {
    foods (id) {
        id -> Uuid,
        user_id -> Uuid,
        category_id -> Uuid,
        food_name -> Text,
        kcal_100 -> Float4,
        protein_100 -> Float4,
        fat_100 -> Float4,
        carbs_100 -> Float4,
        portion_weight -> Float4,
    }
}

diesel::table! {
    history_entries (id) {
        id -> Uuid,
        user_id -> Uuid,
        day -> Text,
        weight -> Nullable<Float4>,
    }
}

diesel::table! {
    history_entry_food_bridge (history_entry_id, food_id) {
        history_entry_id -> Uuid,
        food_id -> Uuid,
        datetime -> Text,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::HormonalSex;
    use super::sql_types::FatLevels;
    use super::sql_types::ActivityLevels;
    use super::sql_types::Goals;
    use super::sql_types::CalorieFloors;

    user_goals (id) {
        id -> Uuid,
        user_id -> Uuid,
        sex -> HormonalSex,
        birthday -> Date,
        height -> Nullable<Int4>,
        fat_level -> Nullable<FatLevels>,
        activity_level -> Nullable<ActivityLevels>,
        goal -> Nullable<Goals>,
        rate -> Nullable<Int4>,
        target_weight -> Nullable<Int4>,
        calorie_floor -> Nullable<CalorieFloors>,
    }
}

diesel::table! {
    user_profile (id) {
        id -> Uuid,
        user_id -> Uuid,
        theme -> Text,
        language -> Text,
        units -> Text,
        nickname -> Text,
    }
}

diesel::table! {
    users (id) {
        id -> Uuid,
        email -> Text,
        password -> Text,
        is_active -> Nullable<Bool>,
        is_staff -> Nullable<Bool>,
        is_superuser -> Nullable<Bool>,
        with_full_access -> Nullable<Bool>,
        date_joined -> Timestamptz,
    }
}

diesel::joinable!(categories -> users (user_id));
diesel::joinable!(foods -> categories (category_id));
diesel::joinable!(foods -> users (user_id));
diesel::joinable!(history_entries -> users (user_id));
diesel::joinable!(history_entry_food_bridge -> foods (food_id));
diesel::joinable!(history_entry_food_bridge -> history_entries (history_entry_id));
diesel::joinable!(user_goals -> users (user_id));
diesel::joinable!(user_profile -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    categories,
    foods,
    history_entries,
    history_entry_food_bridge,
    user_goals,
    user_profile,
    users,
);
