-- This file should undo anything in `up.sql`
DROP TABLE IF EXISTS users, user_profile, user_goals;

DROP TYPE hormonal_sex, fat_levels, activity_levels, goals, calorie_floors;
