// @generated automatically by Diesel CLI.

diesel::table! {
    user_profile (id) {
        id -> Uuid,
        user_id -> Uuid,
        theme -> Nullable<Text>,
        language -> Nullable<Text>,
        units -> Nullable<Text>,
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

diesel::joinable!(user_profile -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    user_profile,
    users,
);
