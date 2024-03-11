-- Your SQL goes here
-- cooking_steps
CREATE TYPE "cooking_types" AS ENUM (
  'fry',
  'boil',
  'steam'
);

CREATE TABLE IF NOT EXISTS "cooking_steps" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "cook_type" cooking_types NOT NULL,
  "food_used" UUID,
  "kcal_100" FLOAT(2),
  "protein_100" FLOAT(2),
  "fat_100" FLOAT(2),
  "carbs_100" FLOAT(2),

  PRIMARY KEY ("id"),
  FOREIGN KEY("food_used") REFERENCES "foods"("id") ON DELETE CASCADE
);

CREATE TABLE cooking_steps_food_used_bridge (
  "step_id" UUID NOT NULL
  REFERENCES "cooking_steps"("id") ON UPDATE CASCADE ON DELETE CASCADE,

  "food_id" UUID NOT NULL
  REFERENCES "foods"("id") ON UPDATE CASCADE,

  CONSTRAINT "fk_cooking_steps_food_used_bridge"
  PRIMARY KEY ("step_id", "food_id")
);

CREATE INDEX IF NOT EXISTS "foods_id_index" ON "foods"("id");

-- dishes
CREATE TABLE IF NOT EXISTS "dishes" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "photo" TEXT,
  "total_kcal_100" FLOAT(2) NOT NULL,
  "total_protein_100" FLOAT(2) NOT NULL,
  "total_fat_100" FLOAT(2) NOT NULL,
  "total_carbs_100" FLOAT(2) NOT NULL,
  "portion_weight" FLOAT(2) NOT NULL,
  -- @TODO: create a bridge table, as a psql does not implement arrays of foreign keys
  "steps" UUID,

  PRIMARY KEY ("id"),
  FOREIGN KEY("steps") REFERENCES "cooking_steps"("id") ON DELETE CASCADE
);

CREATE TABLE dishes_cooking_steps_bridge (
  "dish_id" UUID NOT NULL
  REFERENCES "dishes"("id") ON UPDATE CASCADE ON DELETE CASCADE,

  "step_id" UUID NOT NULL
  REFERENCES "cooking_steps"("id") ON UPDATE CASCADE,

  CONSTRAINT "fk_dishes_cooking_steps_bridge"
  PRIMARY KEY ("dish_id", "step_id")
);

CREATE INDEX IF NOT EXISTS "dishes_id_index" ON "dishes"("id");