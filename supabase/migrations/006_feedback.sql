-- Feedback table: API expects id, message, email, emotion, created_at
-- (001_initial may have created feedback without email; this ensures full schema.)
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  email TEXT,
  emotion TEXT DEFAULT 'curious',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  notified_at TIMESTAMPTZ
);

-- Add columns if table already existed from an older migration
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS notified_at TIMESTAMPTZ;

-- RLS
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Allow anonymous insert for form submission (POST /api/feedback)
DROP POLICY IF EXISTS "Allow anonymous insert for feedback" ON feedback;
CREATE POLICY "Allow anonymous insert for feedback" ON feedback
  FOR INSERT WITH CHECK (true);
