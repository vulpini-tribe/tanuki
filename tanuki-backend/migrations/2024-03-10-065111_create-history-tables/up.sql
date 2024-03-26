-- Your SQL goes here
CREATE TABLE IF NOT EXISTS "history_entries" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL,
  "day" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "proteins" FLOAT(2) NOT NULL DEFAULT 0,
  "fats" FLOAT(2) NOT NULL DEFAULT 0,
  "carbs" FLOAT(2) NOT NULL DEFAULT 0,
  "weight" FLOAT(2) NOT NULL DEFAULT 100,
  "icon" TEXT,
  "color" TEXT,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),

  PRIMARY KEY ("id"),
  FOREIGN KEY ("user_id") REFERENCES "users"("id")
);

CREATE INDEX IF NOT EXISTS "idx_history_entry_user_id_id" ON "history_entries"("id", "user_id", "day");