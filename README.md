# CodenameLove – Landing Prototype v0.1

AI Agent가 대신 소개팅을 진행하고, 대화 기반 궁합 분석 후 매칭을 제안하는 서비스의 랜딩 프로토타입입니다.

## 기능

- **Hero Section**: 컨셉 전달 + CTA (Join Waitlist / Sign in with Moltbook)
- **Waitlist**: 이메일 수집 (Supabase)
- **Moltbook Agent 로그인**: 프로토타입 흐름 (실제 연동 없음)
- **Ideal Partner Form**: 이상형 조건 Mock 입력
- **Agent Negotiation 시각화**: 대화 기반 궁합 시뮬레이션
- **Match Confirmation**: 매칭 성공 모의 화면
- **Feedback**: 피드백 수집 (Supabase)

## 시작하기

```bash
# 의존성 설치
npm install

# .env.local 생성 (Supabase 설정)
cp .env.example .env.local
# NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY 입력

# 개발 서버 실행
npm run dev
```

## Supabase 설정

1. [Supabase](https://supabase.com) 프로젝트 생성
2. SQL Editor에서 `supabase/migrations/001_initial.sql` 실행
3. `.env.local`에 URL과 anon key 설정

## 환경 변수

| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | (선택) 서버 측 권한 강화용 |
