// @generated automatically by Diesel CLI.

diesel::table! {
    dishes (id) {
        id -> Uuid,
        title -> Nullable<Text>,
        description -> Nullable<Text>,
        image_url -> Nullable<Text>,
        proteins -> Nullable<Numeric>,
        fats -> Nullable<Numeric>,
        carbs -> Nullable<Numeric>,
        calories -> Nullable<Numeric>,
        portion_weight -> Nullable<Numeric>,
        tag_ids -> Nullable<Array<Nullable<Uuid>>>,
        is_deleted -> Nullable<Bool>,
    }
}

diesel::table! {
    measurements (id) {
        id -> Uuid,
        height -> Nullable<Numeric>,
        weight -> Nullable<Numeric>,
        hips -> Nullable<Numeric>,
        waist -> Nullable<Numeric>,
        chest -> Nullable<Numeric>,
    }
}

diesel::table! {
    settings (id) {
        id -> Uuid,
        theme -> Nullable<Text>,
        language -> Nullable<Text>,
        units -> Nullable<Text>,
    }
}

diesel::table! {
    tags (id) {
        id -> Uuid,
        title -> Nullable<Text>,
        description -> Nullable<Text>,
        color -> Nullable<Text>,
    }
}

diesel::table! {
    users (id) {
        id -> Uuid,
        nickname -> Nullable<Text>,
        avatar_url -> Nullable<Text>,
        profile_link -> Nullable<Text>,
        body_constitution -> Nullable<Text>,
        general_goal -> Nullable<Text>,
        dob -> Nullable<Date>,
        activity_level -> Nullable<Text>,
        weight_loss -> Nullable<Numeric>,
        weight_goal -> Nullable<Numeric>,
        settings_id -> Nullable<Uuid>,
        measurements_id -> Nullable<Uuid>,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    dishes,
    measurements,
    settings,
    tags,
    users,
);
