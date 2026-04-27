# VOC Dashboard

## 1. 한 줄 소개

생성형 AI로 앱 리뷰를 자동 분류해, 기업이 사용자 피드백을 의사결정에 활용할 수 있도록 시각화한 VOC 대시보드.

## 2. 배경

모바일 앱 리뷰는 사용자의 불만·요청·경험이 담긴 풍부한 피드백 자원이지만, 일일 수백~수천 건 규모의 리뷰를 실무자가 수작업으로 분류·분석하는 것은 현실적으로 어렵다. 전통적 토픽모델링 방식도 전처리 부담과 문맥 해석의 한계로 실무 적용이 제한적이었다. 본 프로젝트는 생성형 AI(LLM)를 활용해 이 과정을 자동화하고, 결과를 대시보드로 제공하여 여러 부서가 공통의 근거 위에서 사용자 피드백에 대응할 수 있도록 한다.

## 3. 데이터

- **대상 앱**: 토스 (Viva Republica) — 금융 결제·송금 앱
- **수집처**: Google Play Store, Apple App Store
- **분석 기간**: 2026년 3월 (한 달)
- **규모**:
  - Google Play: 461건
  - Apple App Store: 183건
  - **합계 644건**
- **전처리 기준**:
  - 실질 문자(한글·영문·숫자) 10자 이하 리뷰 제외
  - `(스토어, 작성자, 본문)` 완전 동일 중복 제거

## 4. 수동 검수 → Golden Label → 정확도 평가 (rule 개선 루프)

자동 분류기를 점진적으로 개선하기 위한 작업 사이클.

### 흐름

1. 실제 리뷰(google-play + app-store preprocessed, 약 2,200건)에서 20건 stratified 샘플
2. 현재 분류기(`lib/voc-classify.ts`)로 `auto` 라벨 생성
3. 사람이 `auto`를 보고 **틀린 필드만 `correction`에 입력**
4. correction이 있으면 correction, 없으면 auto를 사용해 **golden label 확정**
5. golden label은 이후 평가의 고정 기준
6. 분류기 재실행 결과를 golden과 비교 → 필드별 정확도 + mismatch 출력
7. 정확도 80% 초과 필드는 `[LOCKED]` 태그가 붙는다 → 룰 고정, 더 이상 손대지 않음
8. 80% 이하 필드만 `lib/voc-classify.ts`의 룰을 개선해 다시 평가

### 검수 필드 (5개)

- `category_primary` — bug / performance / usability / policy / feature_request
- `service_area_primary` — login / payment / transfer / ... / etc
- `severity` — critical / major / minor
- `is_meaningful` — 분석 가치 있는 리뷰인지 (true/false)
- `sentiment` — positive / neutral / negative (별점 기본 + 텍스트 강신호 오버라이드)

(`category_secondary`, `service_area_secondary`, `keywords`는 검수 대상 제외)

### 파일

- `data/label-review.sample.json` — 작업 파일. `auto` + `correction` + `memo`
- `data/golden-labels.sample.json` — 확정된 정답셋. **rule 개선 중 함부로 수정하지 않는다**
- `data/*.holdout.json` — 별도 시드의 holdout. 룰이 새 데이터에서도 80%를 유지하는지 확인용
- `data/*.v1.json` — 30건 시드의 1차 라운드 백업 (category/service_area/severity가 모두 LOCKED 됐을 때의 기준)

### 명령

```bash
npm run labels:create     # 실제 리뷰 20건 샘플 + auto 라벨 생성
# → 사람이 data/label-review.sample.json 열어서 correction 채우기
npm run labels:finalize   # correction 반영해 golden-labels.sample.json 생성
npm run labels:evaluate   # 현재 분류기로 다시 예측 → gold와 비교, 필드별 정확도 + LOCKED 표시
```

`labels:evaluate`는 `lib/voc-classify.ts`를 고치고 다시 실행하면 새 정확도가 나온다. golden 재라벨링은 필요할 때만 (`labels:create` 다시 → correction → `labels:finalize`).

### Lock 정책

필드별 정확도 > 80% → `[LOCKED]` (룰 고정, 다음 라운드에서는 미개선 대상). 1차 라운드(30건)에서 다음 3개가 LOCKED 됨:

- `category_primary` 100% (sample) / 96.4% (holdout)
- `service_area_primary` 100% (sample) / 95.8% (holdout)
- `severity` 100% (sample) / 100% (holdout)

2차 라운드(20건)에서 신규 평가 대상: `is_meaningful`, `sentiment`.
