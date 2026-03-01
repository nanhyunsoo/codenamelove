-- Frequently asked questions table
CREATE TABLE IF NOT EXISTS frequently_asked_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE frequently_asked_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for faq" ON frequently_asked_questions
  FOR SELECT USING (true);
