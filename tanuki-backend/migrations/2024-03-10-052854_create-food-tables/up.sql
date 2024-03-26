-- Your SQL goes here
-- categories
CREATE TABLE IF NOT EXISTS "categories" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "name" TEXT,
  "icon" TEXT,
  "color" TEXT,
  "user_id" UUID,

  PRIMARY KEY ("id"),
  FOREIGN KEY("user_id") REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "categories_id_name_index" ON "categories"("id", "name");

-- foods
CREATE TABLE IF NOT EXISTS "foods" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "proteins" FLOAT(2) NOT NULL DEFAULT 0,
  "fats" FLOAT(2) NOT NULL DEFAULT 0,
  "carbs" FLOAT(2) NOT NULL DEFAULT 0,
  "portion_weight" FLOAT(2) NOT NULL DEFAULT 100,
  "user_id" UUID NOT NULL,

  PRIMARY KEY ("id"),
  FOREIGN KEY("user_id") REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "foods_id_name_index" ON "foods"("id", "name");
