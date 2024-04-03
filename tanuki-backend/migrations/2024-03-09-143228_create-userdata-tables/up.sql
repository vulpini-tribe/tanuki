-- Your SQL goes here
-- extensions
CREATE EXTENSION pg_trgm;

-- users table
CREATE TABLE  IF NOT EXISTS "users" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "is_active" BOOLEAN DEFAULT false,
  "is_staff" BOOLEAN DEFAULT false,
  "is_superuser" BOOLEAN DEFAULT false,
  "with_full_access" BOOLEAN DEFAULT false,
  "date_joined" TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  PRIMARY KEY(id)
);

CREATE INDEX IF NOT EXISTS "users_id_email_active_index" ON "users"("id", "email", "is_active");

-- user profile table
CREATE TABLE IF NOT EXISTS "user_profile" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL UNIQUE,
  "theme" TEXT NOT NULL DEFAULT 'system',
  "language" TEXT NOT NULL DEFAULT 'en',
  "units" TEXT NOT NULL DEFAULT 'metric',
  "nickname" TEXT NOT NULL,
  "avatar_url" TEXT,  

  PRIMARY KEY("id"),
  FOREIGN KEY("user_id") REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "user_profile_id_user_id_index" ON "user_profile"("id", "user_id");

-- user goals table
CREATE TYPE "hormonal_sex" AS ENUM (
  'female',
  'male'
);

CREATE TYPE "fat_levels" AS ENUM (
  '10',
  '14',
  '18',
  '24',
  '29',
  '34',
  '38',
  '43',
  '50'
);

CREATE TYPE "activity_levels" AS ENUM (
  'extra_small',
  'small',
  'moderate',
  'high',
  'extreme'
);

CREATE TYPE "goals" AS ENUM (
  'loss',
  'maintain',
  'gain'
);

CREATE TYPE "calorie_floors" AS ENUM (
  'standard',
  'extreme_low'
);

CREATE TABLE IF NOT EXISTS "user_goals" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL UNIQUE,
  "sex" hormonal_sex NOT NULL,
  "birthday" DATE NOT NULL,
  "height" INT,
  "fat_level" fat_levels,
  "activity_level" activity_levels,
  "goal" goals,
  "rate" INT,
  "target_weight" INT,
  "calorie_floor" calorie_floors,

  PRIMARY KEY("id"),
  FOREIGN KEY("user_id") REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "user_goals_id_index" ON "user_goals"("id");
