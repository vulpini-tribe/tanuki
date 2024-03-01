-- This file should undo anything in `up.sql`
DROP INDEX users_id_email_is_active_index ON users;
DROP INDEX user_profile_id_user_id_index ON user_profile;

DROP TABLE IF EXISTS users, user_profile;
