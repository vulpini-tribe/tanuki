-- Your SQL goes here
CREATE TABLE IF NOT EXISTS "history_entries" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL,
  "day" TEXT NOT NULL,
  -- average weight at day
  "weight" REAL,

  PRIMARY KEY ("id"),
  FOREIGN KEY ("user_id") REFERENCES "users"("id")
);

CREATE TABLE IF NOT EXISTS "history_entry_food_bridge" (
  "history_entry_id" UUID NOT NULL,
  "food_id" UUID NOT NULL,
  "datetime" TEXT NOT NULL,

  CONSTRAINT "fk_history_entry_id"
  FOREIGN KEY ("history_entry_id") REFERENCES "history_entries"("id"),

  CONSTRAINT "fk_food_id"
  FOREIGN KEY ("food_id") REFERENCES "foods"("id"),

  PRIMARY KEY ("history_entry_id", "food_id")
);

CREATE INDEX IF NOT EXISTS "idx_hefc_history_entry_id_food_id" ON "history_entry_food_bridge"("history_entry_id", "food_id");

CREATE INDEX IF NOT EXISTS "idx_history_entry_user_id_id" ON "history_entries"("id", "user_id", "day");