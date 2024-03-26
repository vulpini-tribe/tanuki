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
        name -> Nullable<Text>,
        icon -> Nullable<Text>,
        color -> Nullable<Text>,
        user_id -> Nullable<Uuid>,
    }
}

diesel::table! {
    foods (id) {
        id -> Uuid,
        name -> Text,
        proteins -> Float4,
        fats -> Float4,
        carbs -> Float4,
        portion_weight -> Float4,
        user_id -> Uuid,
    }
}

diesel::table! {
    history_entries (id) {
        id -> Uuid,
        user_id -> Uuid,
        day -> Text,
        name -> Text,
        proteins -> Float4,
        fats -> Float4,
        carbs -> Float4,
        weight -> Float4,
        icon -> Nullable<Text>,
        color -> Nullable<Text>,
        created_at -> Nullable<Timestamptz>,
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
diesel::joinable!(foods -> users (user_id));
diesel::joinable!(history_entries -> users (user_id));
diesel::joinable!(user_goals -> users (user_id));
diesel::joinable!(user_profile -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    categories,
    foods,
    history_entries,
    user_goals,
    user_profile,
    users,
);
