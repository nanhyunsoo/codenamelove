-- Waitlist users table
CREATE TABLE IF NOT EXISTS waitlist_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  relationship_intent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  source TEXT DEFAULT 'landing'
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  emotion TEXT DEFAULT 'curious',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security) - anon/authenticated can insert
ALTER TABLE waitlist_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert for waitlist" ON waitlist_users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous insert for feedback" ON feedback
  FOR INSERT WITH CHECK (true);
