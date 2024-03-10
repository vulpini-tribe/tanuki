-- This file should undo anything in `up.sql`
DROP TABLE IF EXISTS cooking_steps, dishes, cooking_steps_food_used_bridge, dishes_cooking_steps_bridge;

DROP TYPE cooking_types;
