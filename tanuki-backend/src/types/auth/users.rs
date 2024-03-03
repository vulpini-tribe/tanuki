use crate::schema::{user_profile, users};
use diesel;
use diesel::{Insertable, Queryable, Selectable};
use serde::{Deserialize, Serialize};

#[derive(Insertable, Queryable, Selectable, Serialize, Deserialize, Debug)]
#[diesel(table_name = users)]
pub struct UserToRegister {
    pub email: String,
    pub password: String,
}

#[derive(Insertable, Queryable, Selectable, Serialize, Deserialize, Debug)]
#[diesel(table_name = user_profile)]
pub struct UserProfile {
    pub nickname: Option<String>,
    pub theme: Option<String>,
    pub language: Option<String>,
    pub units: Option<String>,
}
