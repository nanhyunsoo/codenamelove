-- Supabase schema helper for CodenameLove
-- Run these in your Supabase SQL editor or migrations.

-- 1) feedback 테이블 (이미 존재한다고 가정)
-- message: text
-- email: text
-- emotion: text
-- created_at: timestamptz (default now())
-- notified_at: 사용자가 캠페인 이메일을 받은 시각

alter table if exists feedback
add column if not exists notified_at timestamptz null;

-- 2) waitlist_users 테이블 (이미 존재한다고 가정)
-- email: text
-- relationship_intent: text
-- source: text
-- created_at: timestamptz (default now())
-- notified_at: 사용자가 캠페인 이메일을 받은 시각

alter table if exists waitlist_users
add column if not exists notified_at timestamptz null;
