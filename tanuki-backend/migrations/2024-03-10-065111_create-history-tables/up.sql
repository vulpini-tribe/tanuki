-- Your SQL goes here
-- food_consumptions
CREATE TABLE IF NOT EXISTS "food_consumptions" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  -- ISO DATE
  "consumed_at" TEXT,
  "food_list" UUID,
  "dishes_list" UUID,
  -- breakfast \ lunch \ dinner
  "meal_type" TEXT,

  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "food_consumptions_food_id_bridge" (
  "food_consumptions_id" UUID NOT NULL,
  "food_id" UUID NOT NULL,

  PRIMARY KEY ("food_consumptions_id", "food_id"),
  CONSTRAINT "fk_food_consumptions_id" FOREIGN KEY ("food_consumptions_id") REFERENCES "food_consumptions"("id"),
  CONSTRAINT "fk_food_id" FOREIGN KEY ("food_id") REFERENCES "foods"("id")
);

CREATE TABLE IF NOT EXISTS "food_consumptions_dish_id_bridge" (
  "food_consumptions" UUID NOT NULL,
  "dish_id" UUID NOT NULL,

  PRIMARY KEY ("food_consumptions", "dish_id"),
  CONSTRAINT "fk_food_consumptions" FOREIGN KEY ("food_consumptions") REFERENCES "food_consumptions"("id"),
  CONSTRAINT "fk_dish_id" FOREIGN KEY ("dish_id") REFERENCES "dishes"("id")
);

CREATE INDEX IF NOT EXISTS "idx_food_consumptions_id" ON "food_consumptions"("id");

-- history
CREATE TABLE IF NOT EXISTS "history_entries" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" UUID,
  "day" TEXT,
  "consumed_food" UUID,

  PRIMARY KEY ("id"),
  FOREIGN KEY ("user_id") REFERENCES "users"("id")
);

CREATE TABLE IF NOT EXISTS "history_entry_consumed_food_bridge" (
  "history_entry_id" UUID NOT NULL,
  "consumed_food_id" UUID NOT NULL,

  PRIMARY KEY ("history_entry_id", "consumed_food_id"),
  CONSTRAINT "fk_history_entry_id" FOREIGN KEY ("history_entry_id") REFERENCES "history_entries"("id"),
  CONSTRAINT "fk_consumed_food_id" FOREIGN KEY ("consumed_food_id") REFERENCES "food_consumptions"("id")
);

CREATE INDEX IF NOT EXISTS "idx_history_entry_user_id_id" ON "history_entries"("id", "user_id");