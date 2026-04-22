-- VOC 대시보드 Supabase 스키마
-- Supabase SQL Editor에서 실행

-- 1. 리뷰 원문 테이블
create table if not exists reviews (
  id bigint generated always as identity primary key,
  source text not null check (source in ('google_play', 'app_store', 'dcinside', 'ppomppu')),
  external_id text,                    -- 소스별 고유 ID (중복 방지)
  author text,
  score smallint,                      -- 별점 (1~5), DC는 null
  text text not null,
  posted_at timestamptz,               -- 원문 작성일
  crawled_at timestamptz default now(),
  app_version text,
  thumbs_up int default 0,
  extra jsonb default '{}',            -- 소스별 추가 데이터

  -- AI 분석 결과
  sentiment text check (sentiment in ('매우 긍정','긍정','중립','부정','매우 부정')),
  sentiment_score smallint,            -- +20 ~ -20
  severity text,
  severity_multiplier numeric(2,1),
  score_reality numeric(5,1),          -- 0~100
  categories text[] default '{}',      -- {'전략','UX','운영','기술'}
  ai_summary text,                     -- AI 한줄 요약
  classified_at timestamptz,

  unique (source, external_id)
);

-- 인덱스
create index if not exists idx_reviews_source on reviews (source);
create index if not exists idx_reviews_posted_at on reviews (posted_at desc);
create index if not exists idx_reviews_categories on reviews using gin (categories);
create index if not exists idx_reviews_sentiment on reviews (sentiment);
create index if not exists idx_reviews_score_reality on reviews (score_reality);

-- 2. 일별 스코어 스냅샷 (대시보드 추이용)
create table if not exists daily_scores (
  id bigint generated always as identity primary key,
  date date not null,
  category text not null,              -- '전체','전략','UX','운영','기술'
  avg_score numeric(5,1),
  review_count int,
  negative_count int,
  created_at timestamptz default now(),

  unique (date, category)
);

-- 3. 크롤링 실행 로그
create table if not exists crawl_logs (
  id bigint generated always as identity primary key,
  source text not null,
  started_at timestamptz default now(),
  finished_at timestamptz,
  new_reviews int default 0,
  status text default 'running',       -- running, success, error
  error_message text
);

-- RLS 비활성화 (서버사이드 전용)
alter table reviews enable row level security;
alter table daily_scores enable row level security;
alter table crawl_logs enable row level security;

-- service_role key 사용 시 전체 접근 허용
create policy "service_role_all" on reviews for all using (true) with check (true);
create policy "service_role_all" on daily_scores for all using (true) with check (true);
create policy "service_role_all" on crawl_logs for all using (true) with check (true);

-- anon key로 읽기만 허용 (대시보드 조회용)
create policy "anon_read_reviews" on reviews for select using (true);
create policy "anon_read_scores" on daily_scores for select using (true);
