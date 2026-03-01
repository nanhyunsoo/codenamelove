-- waitlist_users: 이메일 중복 방지 (같은 이메일 재등록 시 409 처리)
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_users_email_key ON waitlist_users (email);
