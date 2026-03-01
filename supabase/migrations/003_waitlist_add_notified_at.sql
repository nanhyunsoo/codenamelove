-- Add notified_at to waitlist_users (campaign email sent timestamp)
ALTER TABLE waitlist_users
ADD COLUMN IF NOT EXISTS notified_at TIMESTAMPTZ;
