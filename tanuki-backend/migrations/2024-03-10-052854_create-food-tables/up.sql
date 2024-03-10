-- Your SQL goes here
-- categories
CREATE TABLE IF NOT EXISTS "categories" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "name" TEXT,
  "description" TEXT,
  "color" TEXT,
  "icons_list" TEXT[],

  PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "categories_id_name_index" ON "categories"("id", "name");

-- foods
CREATE TABLE IF NOT EXISTS "foods" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "category_id" UUID NOT NULL,
  "name" TEXT NOT NULL,
  "photo" TEXT,
  "kcal_100" FLOAT(2) NOT NULL,
  "protein_100" FLOAT(2) NOT NULL,
  "fat_100" FLOAT(2) NOT NULL,
  "carbs_100" FLOAT(2) NOT NULL,
  "portion_weight" FLOAT(2) NOT NULL,

  PRIMARY KEY ("id"),
  FOREIGN KEY("category_id") REFERENCES "categories"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "foods_id_index" ON "foods"("id");
