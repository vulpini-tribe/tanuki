-- Your SQL goes here
-- categories
CREATE TABLE IF NOT EXISTS "categories" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "name" TEXT,
  "description" TEXT,
  "color" TEXT,
  "icon" TEXT,
  "user_id" UUID,

  PRIMARY KEY ("id"),
  FOREIGN KEY("user_id") REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "categories_id_name_index" ON "categories"("id", "name");

-- foods
CREATE TABLE IF NOT EXISTS "foods" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL,
  "category_id" UUID NOT NULL,
  "name" TEXT NOT NULL,
  "photo" TEXT,
  "kcal_100" FLOAT(2) NOT NULL,
  "protein_100" FLOAT(2) NOT NULL DEFAULT 0,
  "fat_100" FLOAT(2) NOT NULL DEFAULT 0,
  "carbs_100" FLOAT(2) NOT NULL DEFAULT 0,
  "portion_weight" FLOAT(2) NOT NULL DEFAULT 100,

  PRIMARY KEY ("id"),
  FOREIGN KEY("category_id") REFERENCES "categories"("id") ON DELETE CASCADE,
  FOREIGN KEY("user_id") REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "foods_id_index" ON "foods"("id");
