-- This file should undo anything in `up.sql`
TRUNCATE users;
DELETE FROM users;

TRUNCATE categories;
DELETE FROM categories;

TRUNCATE foods;
DELETE FROM foods;

TRUNCATE history_entries;
DELETE FROM history_entries;