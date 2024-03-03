-- Your SQL goes here
-- users
CREATE TABLE IF NOT EXISTS users (
	id UUID NOT NULL DEFAULT gen_random_uuid(),
	email TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL,
	is_active BOOLEAN DEFAULT FALSE,
  is_staff BOOLEAN DEFAULT FALSE,
  is_superuser BOOLEAN DEFAULT FALSE,
	with_full_access BOOLEAN DEFAULT FALSE,
	date_joined TIMESTAMPTZ NOT NULL DEFAULT NOW(),

	PRIMARY KEY(id)
);

CREATE INDEX IF NOT EXISTS users_id_email_is_active_index ON users(id, email, is_active);

-- user_profile data
CREATE TABLE IF NOT EXISTS user_profile (
	id UUID NOT NULL DEFAULT gen_random_uuid(),
	user_id UUID NOT NULL UNIQUE,
	theme TEXT,
	language TEXT,
	units TEXT,
	nickname TEXT,

	PRIMARY KEY(id),
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS user_profile_id_user_id_index ON user_profile(id, user_id);