-- waitlist_users: source, created_at, relationship_intent 제거 (email + notified_at만 유지)
ALTER TABLE waitlist_users DROP COLUMN IF EXISTS source;
ALTER TABLE waitlist_users DROP COLUMN IF EXISTS created_at;
ALTER TABLE waitlist_users DROP COLUMN IF EXISTS relationship_intent;
