"""
Full analysis script — runs end-to-end and prints all numbers needed for the notebook.
This script is the source of truth for numbers; notebook will mirror its results.
"""
import warnings
warnings.filterwarnings('ignore')

import pandas as pd
import numpy as np
from scipy import stats
from statsmodels.stats.proportion import proportion_confint, confint_proportions_2indep

pd.set_option('display.max_columns', 50)
pd.set_option('display.width', 200)

print("=" * 80)
print("HOTEL CANCELLATION ANALYSIS — full run")
print("=" * 80)

df = pd.read_csv('data/hotel_bookings.csv')
N = len(df)
print(f"\n[LOAD] rows={N:,}  cols={df.shape[1]}")


# ─────────────────────────────────────────────────────────────────────────────
# EDA — data quality + baseline
# ─────────────────────────────────────────────────────────────────────────────
print("\n" + "=" * 80)
print("EDA — 데이터 검수 + 베이스라인")
print("=" * 80)

# 결측
miss = df.isna().sum()
miss = miss[miss > 0].sort_values(ascending=False)
print("\n[결측]")
print(miss)

# 중복
dup = df.duplicated().sum()
print(f"\n[중복 행] {dup:,} ({dup/N*100:.1f}%)")

# adr 이상치
print(f"\n[adr 이상치]")
print(f"  음수: {(df['adr'] < 0).sum()}건")
print(f"  >1000: {(df['adr'] > 1000).sum()}건")
print(f"  =0:   {(df['adr'] == 0).sum()}건")

# 베이스라인 취소율
baseline = df['is_canceled'].mean()
ci_low, ci_high = proportion_confint(df['is_canceled'].sum(), N, alpha=0.05, method='wilson')
print(f"\n[전체 취소율 베이스라인]")
print(f"  {baseline*100:.2f}% (95% CI: {ci_low*100:.2f}% ~ {ci_high*100:.2f}%)")

# 호텔별
print(f"\n[호텔별 취소율]")
for h, g in df.groupby('hotel'):
    rate = g['is_canceled'].mean()
    lo, hi = proportion_confint(g['is_canceled'].sum(), len(g), alpha=0.05, method='wilson')
    print(f"  {h:14s}  n={len(g):>6,}  취소율={rate*100:5.2f}%  CI=[{lo*100:.2f}, {hi*100:.2f}]")

# 연도별
print(f"\n[연도별 취소율]")
for y, g in df.groupby('arrival_date_year'):
    rate = g['is_canceled'].mean()
    print(f"  {y}  n={len(g):>6,}  취소율={rate*100:5.2f}%")


# ─────────────────────────────────────────────────────────────────────────────
# H1 — lead_time
# ─────────────────────────────────────────────────────────────────────────────
print("\n" + "=" * 80)
print("H1 — lead_time이 길수록 취소율이 높다")
print("=" * 80)

# lead_time 구간 분석
bins = [-1, 7, 30, 90, 180, 365, 9999]
labels = ['0-7일', '8-30일', '31-90일', '91-180일', '181-365일', '365일+']
df['lt_bucket'] = pd.cut(df['lead_time'], bins=bins, labels=labels)

print("\n[lead_time 구간별 취소율]")
print(f"{'구간':<12}{'n':>10}{'취소율':>12}{'95% CI':>22}")
print("-" * 60)
h1_results = []
for b in labels:
    g = df[df['lt_bucket'] == b]
    if len(g) == 0:
        continue
    n = len(g)
    cancel = g['is_canceled'].sum()
    rate = cancel / n
    lo, hi = proportion_confint(cancel, n, alpha=0.05, method='wilson')
    print(f"{b:<12}{n:>10,}  {rate*100:>8.2f}%   [{lo*100:5.2f}, {hi*100:5.2f}]")
    h1_results.append((b, n, rate, lo, hi))

# 카이제곱 (구간 × 취소)
ct = pd.crosstab(df['lt_bucket'], df['is_canceled'])
chi2, p, dof, exp = stats.chi2_contingency(ct)
n_total = ct.values.sum()
cramers_v = np.sqrt(chi2 / (n_total * (min(ct.shape) - 1)))
print(f"\n[카이제곱 검정] chi2={chi2:.1f}  p={p:.2e}  dof={dof}  Cramer's V={cramers_v:.3f}")

# 0-7일 vs 365일+ 비교
g_short = df[df['lt_bucket'] == '0-7일']
g_long = df[df['lt_bucket'] == '365일+']
diff_lo, diff_hi = confint_proportions_2indep(
    g_long['is_canceled'].sum(), len(g_long),
    g_short['is_canceled'].sum(), len(g_short),
    method='wald', alpha=0.05
)
print(f"\n[극단 비교: 365일+ vs 0-7일]")
print(f"  취소율 차이 95% CI: [{diff_lo*100:+.2f}%p, {diff_hi*100:+.2f}%p]")


# ─────────────────────────────────────────────────────────────────────────────
# H2 — deposit_type
# ─────────────────────────────────────────────────────────────────────────────
print("\n" + "=" * 80)
print("H2 — No Deposit가 압도적으로 취소율이 높다")
print("=" * 80)

print("\n[deposit_type별 취소율]")
print(f"{'타입':<14}{'n':>10}{'취소율':>12}{'95% CI':>22}")
print("-" * 62)
h2_results = []
for d, g in df.groupby('deposit_type'):
    n = len(g)
    cancel = g['is_canceled'].sum()
    rate = cancel / n
    lo, hi = proportion_confint(cancel, n, alpha=0.05, method='wilson')
    print(f"{d:<14}{n:>10,}  {rate*100:>8.2f}%   [{lo*100:5.2f}, {hi*100:5.2f}]")
    h2_results.append((d, n, rate, lo, hi))

# 카이제곱
ct = pd.crosstab(df['deposit_type'], df['is_canceled'])
chi2, p, dof, _ = stats.chi2_contingency(ct)
print(f"\n[카이제곱 검정] chi2={chi2:.1f}  p={p:.2e}  dof={dof}")

# Non Refund vs No Deposit 직접 비교 (반전 결과 예상)
g_nr = df[df['deposit_type'] == 'Non Refund']
g_nd = df[df['deposit_type'] == 'No Deposit']
diff_lo, diff_hi = confint_proportions_2indep(
    g_nr['is_canceled'].sum(), len(g_nr),
    g_nd['is_canceled'].sum(), len(g_nd),
    method='wald', alpha=0.05
)
print(f"\n[비교: Non Refund vs No Deposit]")
print(f"  취소율 차이 95% CI: [{diff_lo*100:+.2f}%p, {diff_hi*100:+.2f}%p]")
print(f"  → 음수면 Non Refund가 낮음, 양수면 높음")


# ─────────────────────────────────────────────────────────────────────────────
# H3 — previous_cancellations
# ─────────────────────────────────────────────────────────────────────────────
print("\n" + "=" * 80)
print("H3 — 이전 취소 이력자는 재취소 위험이 크다")
print("=" * 80)

df['has_prev_cancel'] = (df['previous_cancellations'] > 0).astype(int)
print("\n[이전 취소 이력 유무별]")
for v, g in df.groupby('has_prev_cancel'):
    label = '이력 있음' if v == 1 else '이력 없음'
    n = len(g)
    cancel = g['is_canceled'].sum()
    rate = cancel / n
    lo, hi = proportion_confint(cancel, n, alpha=0.05, method='wilson')
    print(f"  {label:10s}  n={n:>6,}  취소율={rate*100:6.2f}%   CI=[{lo*100:5.2f}, {hi*100:5.2f}]")

g_yes = df[df['has_prev_cancel'] == 1]
g_no = df[df['has_prev_cancel'] == 0]
diff_lo, diff_hi = confint_proportions_2indep(
    g_yes['is_canceled'].sum(), len(g_yes),
    g_no['is_canceled'].sum(), len(g_no),
    method='wald', alpha=0.05
)
print(f"\n[차이 95% CI: 이력 있음 - 이력 없음]")
print(f"  [{diff_lo*100:+.2f}%p, {diff_hi*100:+.2f}%p]")


# ─────────────────────────────────────────────────────────────────────────────
# H4 — market_segment
# ─────────────────────────────────────────────────────────────────────────────
print("\n" + "=" * 80)
print("H4 — 마켓 세그먼트별 취소율 차이")
print("=" * 80)

print("\n[세그먼트별 취소율 (정렬: 취소율 내림차순)]")
print(f"{'세그먼트':<22}{'n':>10}{'취소율':>12}{'95% CI':>22}")
print("-" * 70)
h4_results = []
for s, g in df.groupby('market_segment'):
    n = len(g)
    cancel = g['is_canceled'].sum()
    rate = cancel / n
    lo, hi = proportion_confint(cancel, n, alpha=0.05, method='wilson')
    h4_results.append((s, n, rate, lo, hi))

for s, n, rate, lo, hi in sorted(h4_results, key=lambda x: -x[2]):
    print(f"{s:<22}{n:>10,}  {rate*100:>8.2f}%   [{lo*100:5.2f}, {hi*100:5.2f}]")

ct = pd.crosstab(df['market_segment'], df['is_canceled'])
chi2, p, dof, _ = stats.chi2_contingency(ct)
print(f"\n[카이제곱] chi2={chi2:.1f}  p={p:.2e}")


# ─────────────────────────────────────────────────────────────────────────────
# H5 — booking_changes
# ─────────────────────────────────────────────────────────────────────────────
print("\n" + "=" * 80)
print("H5 — 예약 변경 횟수와 취소율 관계")
print("=" * 80)

df['bc_bucket'] = pd.cut(df['booking_changes'], bins=[-1, 0, 1, 2, 100], labels=['0회', '1회', '2회', '3회+'])
print("\n[변경 횟수별 취소율]")
print(f"{'변경':<8}{'n':>10}{'취소율':>12}{'95% CI':>22}")
print("-" * 56)
for b in ['0회', '1회', '2회', '3회+']:
    g = df[df['bc_bucket'] == b]
    if len(g) == 0:
        continue
    n = len(g)
    cancel = g['is_canceled'].sum()
    rate = cancel / n
    lo, hi = proportion_confint(cancel, n, alpha=0.05, method='wilson')
    print(f"{b:<8}{n:>10,}  {rate*100:>8.2f}%   [{lo*100:5.2f}, {hi*100:5.2f}]")

# 0회 vs 3회+ 비교
g_zero = df[df['bc_bucket'] == '0회']
g_many = df[df['bc_bucket'] == '3회+']
diff_lo, diff_hi = confint_proportions_2indep(
    g_many['is_canceled'].sum(), len(g_many),
    g_zero['is_canceled'].sum(), len(g_zero),
    method='wald', alpha=0.05
)
print(f"\n[3회+ vs 0회 차이 95% CI]")
print(f"  [{diff_lo*100:+.2f}%p, {diff_hi*100:+.2f}%p]")


# ─────────────────────────────────────────────────────────────────────────────
# H6 — 시즌성 (월별)
# ─────────────────────────────────────────────────────────────────────────────
print("\n" + "=" * 80)
print("H6 — 월별 취소율 차이")
print("=" * 80)

month_order = ['January', 'February', 'March', 'April', 'May', 'June',
               'July', 'August', 'September', 'October', 'November', 'December']
df['arrival_date_month'] = pd.Categorical(df['arrival_date_month'], categories=month_order, ordered=True)

print("\n[월별 취소율]")
print(f"{'월':<12}{'n':>10}{'취소율':>12}")
print("-" * 38)
for m, g in df.groupby('arrival_date_month'):
    n = len(g)
    rate = g['is_canceled'].mean()
    print(f"{str(m):<12}{n:>10,}  {rate*100:>8.2f}%")

ct = pd.crosstab(df['arrival_date_month'], df['is_canceled'])
chi2, p, dof, _ = stats.chi2_contingency(ct)
print(f"\n[카이제곱] chi2={chi2:.1f}  p={p:.2e}")


# ─────────────────────────────────────────────────────────────────────────────
# 추가: 이전 취소 이력 정량 효과
# ─────────────────────────────────────────────────────────────────────────────
print("\n" + "=" * 80)
print("ADDITIONAL — previous_cancellations 단계별 효과")
print("=" * 80)
df['pc_bucket'] = pd.cut(df['previous_cancellations'], bins=[-1, 0, 1, 5, 100],
                          labels=['0회', '1회', '2~5회', '6회+'])
for b in ['0회', '1회', '2~5회', '6회+']:
    g = df[df['pc_bucket'] == b]
    if len(g) == 0:
        continue
    n = len(g)
    rate = g['is_canceled'].mean()
    lo, hi = proportion_confint(g['is_canceled'].sum(), n, alpha=0.05, method='wilson')
    print(f"  {b:<8}  n={n:>6,}  취소율={rate*100:6.2f}%   CI=[{lo*100:5.2f}, {hi*100:5.2f}]")


print("\n" + "=" * 80)
print("DONE")
print("=" * 80)
