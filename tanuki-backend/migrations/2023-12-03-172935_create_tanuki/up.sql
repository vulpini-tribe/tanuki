-- Your SQL goes here
CREATE TABLE IF NOT EXISTS users (
	id uuid NOT NULL,
	nickname TEXT,
	avatar_url TEXT,
	profile_link TEXT,
	body_constitution TEXT,
	general_goal TEXT,
	dob date,
	activity_level TEXT,
	weight_loss NUMERIC,
	weight_goal NUMERIC,
	settings_id uuid,
	measurements_id uuid,
	
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS settings (
	id uuid NOT NULL,
	theme TEXT,
	language TEXT,
	units TEXT,
	
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS measurements (
	id UUID NOT NULL,
	height NUMERIC,
	weight NUMERIC,
	hips NUMERIC,
	waist NUMERIC,
	chest NUMERIC,
	
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS dishes (
	id uuid NOT NULL,
	title TEXT,
	description TEXT,
	image_url TEXT,
	proteins DECIMAL,
	fats DECIMAL,
	carbs DECIMAL,
	calories NUMERIC,
	portion_weight DECIMAL,
	tag_ids UUID[],
	is_deleted BOOL,
	
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS tags (
	id uuid NOT NULL,
	title TEXT,
	description TEXT,
	color TEXT,
	
	PRIMARY KEY(id)
);


