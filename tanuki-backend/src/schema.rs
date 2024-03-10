// @generated automatically by Diesel CLI.

pub mod sql_types {
    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "activity_levels"))]
    pub struct ActivityLevels;

    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "calorie_floors"))]
    pub struct CalorieFloors;

    #[derive(diesel::query_builder::QueryId, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "cooking_types"))]
    pub struct CookingTypes;

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
        description -> Nullable<Text>,
        color -> Nullable<Text>,
        icons_list -> Nullable<Array<Nullable<Text>>>,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::CookingTypes;

    cooking_steps (id) {
        id -> Uuid,
        name -> Text,
        cook_type -> CookingTypes,
        food_used -> Nullable<Uuid>,
        kcal_100 -> Nullable<Float4>,
        protein_100 -> Nullable<Float4>,
        fat_100 -> Nullable<Float4>,
        carbs_100 -> Nullable<Float4>,
    }
}

diesel::table! {
    cooking_steps_food_used_bridge (cooking_step_id, food_id) {
        cooking_step_id -> Uuid,
        food_id -> Uuid,
    }
}

diesel::table! {
    dishes (id) {
        id -> Uuid,
        name -> Text,
        photo -> Nullable<Text>,
        total_kcal_100 -> Float4,
        total_protein_100 -> Float4,
        total_fat_100 -> Float4,
        total_carbs_100 -> Float4,
        portion_weight -> Float4,
        steps -> Nullable<Uuid>,
    }
}

diesel::table! {
    dishes_cooking_steps_bridge (dish_id, step_id) {
        dish_id -> Uuid,
        step_id -> Uuid,
    }
}

diesel::table! {
    food_consumptions (id) {
        id -> Uuid,
        consumed_at -> Nullable<Text>,
        food_list -> Nullable<Uuid>,
        dishes_list -> Nullable<Uuid>,
        meal_type -> Nullable<Text>,
    }
}

diesel::table! {
    food_consumptions_dish_id_bridge (food_consumptions, dish_id) {
        food_consumptions -> Uuid,
        dish_id -> Uuid,
    }
}

diesel::table! {
    food_consumptions_food_id_bridge (food_consumptions_id, food_id) {
        food_consumptions_id -> Uuid,
        food_id -> Uuid,
    }
}

diesel::table! {
    foods (id) {
        id -> Uuid,
        category_id -> Uuid,
        name -> Text,
        photo -> Nullable<Text>,
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
        user_id -> Nullable<Uuid>,
        day -> Nullable<Text>,
        consumed_food -> Nullable<Uuid>,
    }
}

diesel::table! {
    history_entry_consumed_food_bridge (history_entry_id, consumed_food_id) {
        history_entry_id -> Uuid,
        consumed_food_id -> Uuid,
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

diesel::joinable!(cooking_steps -> foods (food_used));
diesel::joinable!(cooking_steps_food_used_bridge -> cooking_steps (cooking_step_id));
diesel::joinable!(cooking_steps_food_used_bridge -> foods (food_id));
diesel::joinable!(dishes -> cooking_steps (steps));
diesel::joinable!(dishes_cooking_steps_bridge -> cooking_steps (step_id));
diesel::joinable!(dishes_cooking_steps_bridge -> dishes (dish_id));
diesel::joinable!(food_consumptions_dish_id_bridge -> dishes (dish_id));
diesel::joinable!(food_consumptions_dish_id_bridge -> food_consumptions (food_consumptions));
diesel::joinable!(food_consumptions_food_id_bridge -> food_consumptions (food_consumptions_id));
diesel::joinable!(food_consumptions_food_id_bridge -> foods (food_id));
diesel::joinable!(foods -> categories (category_id));
diesel::joinable!(history_entries -> users (user_id));
diesel::joinable!(history_entry_consumed_food_bridge -> food_consumptions (consumed_food_id));
diesel::joinable!(history_entry_consumed_food_bridge -> history_entries (history_entry_id));
diesel::joinable!(user_goals -> users (user_id));
diesel::joinable!(user_profile -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    categories,
    cooking_steps,
    cooking_steps_food_used_bridge,
    dishes,
    dishes_cooking_steps_bridge,
    food_consumptions,
    food_consumptions_dish_id_bridge,
    food_consumptions_food_id_bridge,
    foods,
    history_entries,
    history_entry_consumed_food_bridge,
    user_goals,
    user_profile,
    users,
);
