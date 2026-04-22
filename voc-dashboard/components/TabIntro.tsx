import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TabGuide from "@/components/TabGuide";

export default function TabIntro() {
  return (
    <article className="max-w-5xl mx-auto py-10 space-y-12">
      {/* 제목 */}
      <header>
        <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">Project Overview</p>
        <h1 className="text-3xl font-bold tracking-tight leading-tight">
          VOC 자동수집·분석 대시보드
        </h1>
        <p className="mt-3 text-foreground leading-relaxed max-w-2xl">
          (placeholder)
        </p>
      </header>

      <Separator />

      {/* 1. 개요 */}
      <section>
        <h2 className="text-lg font-semibold mb-4">1. 개요</h2>

        <div className="max-w-3xl space-y-6">
          <div>
            <h3 className="text-base font-semibold mb-2">목적</h3>
            <p className="text-base text-foreground leading-relaxed">
              앱마켓 및 커뮤니티 등 여러 채널에 분산된 VOC를 통합 수집·정량화하고,
              이를 근거로 차기 개선 과제의 우선순위를 도출한다.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-2">분석 대상</h3>
            <p className="text-base text-foreground leading-relaxed">
              토스
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-2">수집 플랫폼</h3>
            <p className="text-base text-foreground leading-relaxed">
              Google Play · App Store · 뽐뿌 · 네이버 카페
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-2">사용 도구</h3>
            <p className="text-base text-foreground leading-relaxed">
              Claude Code · Codex · Python
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* 2. 분석 방법 */}
      <section>
        <h2 className="text-lg font-semibold mb-4">2. 분석 방법</h2>

        <div className="space-y-6">
          {/* 2.1 수집 */}
          <div>
            <h3 className="text-base font-semibold mb-3">
              <span className="text-muted-foreground mr-2">2.1</span>
              수집
            </h3>

            <p className="text-base text-foreground leading-relaxed max-w-3xl mb-4">
              토스가 언급되는 공개 채널 중 접근 가능한 곳(앱마켓 2곳·커뮤니티 2곳)에서 수집했다.
              수집 스크립트를 일회성으로 실행해 결과를 JSON 파일로 저장하며, 이후 단계의 모든 분석은 해당 스냅샷을 입력으로 삼는다.
              채널별 포맷 차이는 있지만 이후 단계에서는 통합된 하나의 VOC 풀로 다루며,
              의미 분류·점수화는 LLM에 위임한다.
            </p>

            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>플랫폼</TableHead>
                    <TableHead>유형</TableHead>
                    <TableHead>수집 방식</TableHead>
                    <TableHead>난이도</TableHead>
                    <TableHead>데모그래픽</TableHead>
                    <TableHead>특성</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Google Play",
                      type: "앱마켓",
                      method: "오픈소스 라이브러리",
                      difficulty: "낮음",
                      demo: "Android 사용자 전반",
                      note: "리뷰 · 별점",
                    },
                    {
                      name: "App Store",
                      type: "앱마켓",
                      method: "오픈소스 라이브러리",
                      difficulty: "낮음",
                      demo: "iOS 사용자 전반",
                      note: "리뷰 · 별점",
                    },
                    {
                      name: "뽐뿌",
                      type: "커뮤니티",
                      method: "HTML 스크래핑",
                      difficulty: "중간",
                      demo: "30–40대, 성별 혼합",
                      note: "재테크 · 금융 관심층",
                    },
                    {
                      name: "네이버 카페",
                      type: "커뮤니티",
                      method: "검색 API (스니펫)",
                      difficulty: "중간 (본문 제한)",
                      demo: "30–50대, 여성 비중 높음",
                      note: "육아 · 재테크 카페 중심",
                    },
                  ].map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.method}</TableCell>
                      <TableCell>{row.difficulty}</TableCell>
                      <TableCell className="whitespace-normal">{row.demo}</TableCell>
                      <TableCell className="whitespace-normal">{row.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* 2.2 전처리 */}
          <div className="max-w-3xl">
            <h3 className="text-base font-semibold mb-3">
              <span className="text-muted-foreground mr-2">2.2</span>
              전처리
            </h3>

            <p className="text-base text-foreground leading-relaxed mb-3">
              LLM 분류가 의미 판단에만 집중할 수 있도록, 그 앞단에서 입력의
              균일성·품질·중복을 정리한다. 세 가지를 수행한다.
            </p>

            <ul className="list-disc pl-5 space-y-2 text-base text-foreground leading-relaxed">
              <li>
                <strong className="font-semibold">통일된 스키마</strong> —
                앱마켓 리뷰와 커뮤니티 글은 필드 구성(별점 유무, 본문 길이, 작성자 메타)이 다르다.
                이후 단계가 단일 포맷만 다루도록 공통 스키마로 정규화한다.
              </li>
              <li>
                <strong className="font-semibold">노이즈 제거</strong> —
                의미 추출이 불가능한 리뷰는 분류 단계 이전에 걸러낸다.
                N자 미만, 이모지·특수문자만으로 구성된 글, 한국어 비율이 낮은 글이 해당한다.
              </li>
              <li>
                <strong className="font-semibold">중복 제거</strong> —
                같은 리뷰가 여러 번 저장되는 건 걸러낸다. 반면 서로 다른 사람이 비슷한 불만을 남긴 경우
                (예: &ldquo;앱 느려요&rdquo; vs &ldquo;속도 진짜 느림&rdquo;)는 그대로 둔다 —
                같은 문제를 여러 명이 겪었다는 신호이기 때문이다.
              </li>
            </ul>
          </div>

          {/* 2.3 의미 기반 분류 */}
          <div className="max-w-3xl">
            <h3 className="text-base font-semibold mb-3">
              <span className="text-muted-foreground mr-2">2.3</span>
              의미 기반 분류
            </h3>

            <p className="text-base text-foreground leading-relaxed mb-3">
              전처리가 끝난 각 VOC에 대해 LLM이 세 가지를 판정한다.
            </p>

            <ul className="list-disc pl-5 space-y-2 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong className="font-semibold">품질 속성</strong> —
                <strong className="font-semibold">전략 · UX · 운영 · 기술</strong> 4개 카테고리 아래
                29개 하위 속성을 정의해두고, 리뷰가 어떤 속성에 해당하는지 판정한다.
                한 리뷰가 여러 속성에 걸치는 경우가 많아
                (예: &ldquo;토스 느리고 자꾸 튕김&rdquo; → 로딩 속도 + 크래시 빈도),
                해당되는 속성을 모두 뽑는다.
              </li>
              <li>
                <strong className="font-semibold">감정 극성</strong> —
                매우 긍정부터 매우 부정까지 5단계.
              </li>
              <li>
                <strong className="font-semibold">심각도</strong> —
                일반부터 반복+이탈까지 4단계.
              </li>
            </ul>

            <p className="text-base text-foreground leading-relaxed mb-3">
              세 판정값은 2.4의 점수화 공식에 투입된다.
            </p>

            <p className="text-xs text-muted-foreground leading-relaxed">
              ※ 29개 품질 속성의 전체 목록과 각 속성의 예시 VOC는 아래 <strong className="font-semibold">부록. 분석 기준</strong> 섹션에서 확인할 수 있다.
            </p>
          </div>

          {/* 2.4 점수화 · 저장 */}
          <div>
            <h3 className="text-base font-semibold mb-3">
              <span className="text-muted-foreground mr-2">2.4</span>
              점수화 · 저장
            </h3>

            <p className="text-base text-foreground leading-relaxed mb-4">
              2.3에서 얻은 세 판정값(품질 속성·감정 극성·심각도)을 아래 공식에 대입해 속성별 점수를 계산한다.
              기본 중립값 80점에서 감정 점수만큼 가감하고, 심각도 배수로 가중한 값이 최종 점수다.
            </p>

            <section className="border rounded-lg p-5 mb-6">
              <code className="block text-center py-3 bg-slate-50 rounded font-mono text-base">
                score_reality = 80 + (sentiment_score × severity_multiplier)
              </code>
              <p className="text-xs text-slate-500 text-center mt-2">
                최종 점수는 0~100 범위로 clip · 80점이 기본 중립값
              </p>
            </section>

            <h4 className="text-base font-semibold mb-2">감정 점수 판정</h4>
            <div className="border rounded-lg overflow-hidden mb-6">
              <table className="w-full text-base">
                <thead>
                  <tr className="bg-slate-50 text-left text-xs text-slate-600 uppercase tracking-wider">
                    <th className="px-4 py-2 w-28">단계</th>
                    <th className="px-4 py-2 w-20 text-right">점수</th>
                    <th className="px-4 py-2 w-[320px]">판정 기준</th>
                    <th className="px-4 py-2">예시 VOC</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { l: "매우 긍정", s: "+20", c: "text-emerald-600", crit: "강한 긍정·대체 불가·감탄 표현", ex: "토스 없으면 못 삽니다. 진짜 혁신이에요" },
                    { l: "긍정", s: "+10", c: "text-emerald-600", crit: "단순 만족 (좋다·편하다·만족)", ex: "송금 빠르고 편해서 만족합니다" },
                    { l: "중립", s: "0", c: "text-slate-500", crit: "평가 없이 사용 사실만 언급", ex: "그냥저냥 씁니다" },
                    { l: "부정", s: "−10", c: "text-red-500", crit: "단순 불만 (불편·아쉬움)", ex: "가끔 느려서 불편함" },
                    { l: "매우 부정", s: "−20", c: "text-red-600", crit: "신뢰 훼손·금전 피해·이탈 의지", ex: "이 앱 때문에 돈 날릴 뻔. 다신 안 씀" },
                  ].map((r) => (
                    <tr key={r.l} className="border-t border-slate-100">
                      <td className="px-4 py-2">{r.l}</td>
                      <td className={`px-4 py-2 text-right font-bold tabular-nums ${r.c}`}>{r.s}</td>
                      <td className="px-4 py-2">{r.crit}</td>
                      <td className="px-4 py-2 italic">&ldquo;{r.ex}&rdquo;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className="text-base font-semibold mb-2">심각도 배수 판정</h4>
            <div className="border rounded-lg overflow-hidden mb-6">
              <table className="w-full text-base">
                <thead>
                  <tr className="bg-slate-50 text-left text-xs text-slate-600 uppercase tracking-wider">
                    <th className="px-4 py-2 w-28">단계</th>
                    <th className="px-4 py-2 w-20 text-right">배수</th>
                    <th className="px-4 py-2 w-[320px]">판정 기준</th>
                    <th className="px-4 py-2">예시 VOC</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { l: "일반", s: "×1.0", c: "text-slate-500", crit: "1회성 불만, 중립적 어조", ex: "글자가 좀 작아요" },
                    { l: "반복/누적", s: "×1.5", c: "text-amber-600", crit: "반복·누적 단서 (또·매번·N번째·계속)", ex: "또 버그나요... 이번 주만 벌써 세 번째" },
                    { l: "이탈/강한 부정", s: "×2.0", c: "text-red-500", crit: "이탈 명시 또는 신뢰 훼손 (넘어갔다·신고·사기)", ex: "결국 카뱅으로 넘어갔습니다" },
                    { l: "반복+이탈", s: "×2.5", c: "text-red-600", crit: "반복 단서 + 이탈 단서 동시", ex: "매번 튕겨서 결국 지웠어요. 앞으로 안 씁니다" },
                  ].map((r) => (
                    <tr key={r.l} className="border-t border-slate-100">
                      <td className="px-4 py-2">{r.l}</td>
                      <td className={`px-4 py-2 text-right font-bold tabular-nums ${r.c}`}>{r.s}</td>
                      <td className="px-4 py-2">{r.crit}</td>
                      <td className="px-4 py-2 italic">&ldquo;{r.ex}&rdquo;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className="text-base font-semibold mb-2">상태 판정</h4>
            <div className="border rounded-lg overflow-hidden mb-4">
              <table className="w-full text-base">
                <tbody>
                  {[
                    { range: "75 ~ 100", label: "양호", cls: "bg-emerald-50 text-emerald-700" },
                    { range: "60 ~ 74", label: "보통", cls: "bg-amber-50 text-amber-700" },
                    { range: "45 ~ 59", label: "주의", cls: "bg-orange-50 text-orange-700" },
                    { range: "0 ~ 44", label: "위험", cls: "bg-red-50 text-red-700" },
                  ].map((r, i) => (
                    <tr key={r.label} className={i === 0 ? "" : "border-t border-slate-100"}>
                      <td className="px-4 py-2 tabular-nums w-32">{r.range}점</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${r.cls}`}>{r.label}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-base text-foreground leading-relaxed">
              계산된 속성별 점수는 리뷰 원문·판정값과 함께 JSON 파일에 저장되어 대시보드에서 시각화의 입력으로 쓰인다.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* 3. 대시보드 구성 */}
      <section>
        <h2 className="text-lg font-semibold mb-4">3. 대시보드 구성</h2>

        <p className="text-base text-foreground leading-relaxed max-w-3xl mb-6">
          분석된 VOC 데이터를 의사결정에 활용 가능한 형태로 시각화한다.
          상단 기간 필터(최근 1주·4주·12주·전체)가 교차 축으로 작동하여,
          아래 네 개 뷰 모두 동일한 범위의 데이터를 공유한다.
        </p>

        <div className="max-w-3xl space-y-6">
          {[
            {
              no: "3.1",
              title: "요약",
              purpose: "이번 기간의 VOC 볼륨과 평균 만족도를 확인해 전체 흐름의 건강 상태를 파악한다.",
              desc: "총 VOC 수, 평균 만족도 점수(0–100, baseline 80), 부정 VOC 건수를 카드 형태로 집계한다.",
            },
            {
              no: "3.2",
              title: "카테고리별 점수",
              purpose: "4개 도메인(전략 · UX · 운영 · 기술) 중 개선 압력이 가장 큰 영역을 식별하고, 그 원인 속성을 빠르게 파악한다.",
              desc: "카테고리별 평균 만족도, 신호 건수, 부정 비중, 등급을 카드로 제시한다. 각 카드 하단에 해당 카테고리에서 가장 많이 나타난 부정 속성을 한 줄로 요약한다.",
            },
            {
              no: "3.3",
              title: "채널별 감정 분포 · 주간 추이",
              purpose: "채널 간 온도 차이를 비교해 단일 채널 편향을 검증하고, 시간 흐름에 따른 만족도 변화를 추적한다.",
              desc: "한 행을 좌우로 분할한다. 좌측은 수집 채널 4곳(미수집 채널 포함)의 감정 극성 5단계 분포, 우측은 카테고리별 점수의 주간 추이 선 차트이다. 추이는 4주 이동평균으로 표본 부족 주의 편차를 완화한다.",
            },
            {
              no: "3.4",
              title: "카테고리 상세",
              purpose: "카테고리 점수 변동의 원인을 속성·원문 수준까지 드릴다운해 차기 개선 과제 우선순위 판단 근거를 제공한다.",
              desc: "상단 칩 필터로 단일 카테고리를 선택하면, 해당 카테고리 하위의 속성별 부정·전체 건수 테이블, LLM이 생성한 공통 불만 패턴 요약, 매칭 리뷰 원문 리스트가 함께 나타난다.",
            },
          ].map((view) => (
            <div key={view.no}>
              <h3 className="text-base font-semibold mb-2">
                <span className="text-muted-foreground mr-2">{view.no}</span>
                {view.title}
              </h3>
              <p className="text-sm text-foreground leading-relaxed mb-1.5">
                <span className="font-semibold">목적</span>
                <span className="mx-1 text-muted-foreground">—</span>
                {view.purpose}
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-semibold">구성</span>
                <span className="mx-1 text-muted-foreground">—</span>
                {view.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* 4. 한계 및 전제 */}
      <section>
        <h2 className="text-lg font-semibold mb-4">4. 한계 및 전제</h2>

        <ul className="max-w-3xl list-disc pl-5 space-y-2 text-base text-foreground leading-relaxed">
          <li>
            <strong className="font-semibold">표본 대표성 부족</strong> —
            본 프로젝트에서 수집한 VOC는 토스 사용자 모집단을 대표하지 못한다.
            이는 외부에서 접근 가능한 공개 채널만을 활용한 결과이며,
            아래와 같은 <strong className="font-semibold">기술적·약관상·예산상의 제약</strong>으로 인해 불가피하게 선택된 구성이다.
            <ul className="list-[circle] pl-5 mt-1 space-y-1">
              <li>
                <strong className="font-semibold">SNS 채널 제외</strong> — X(구 트위터)는 API 유료화 정책(Basic 플랜 월 $100 이상)으로 무료 범위에서 검색이 불가능하며,
                Threads 및 Instagram은 공식 API의 승인 절차 및 제약으로 인해 외부 키워드 기반 수집이 실질적으로 차단되어 있다.
              </li>
              <li>
                <strong className="font-semibold">여성 사용자 중심 커뮤니티 제외</strong> — 여성시대, 소울드레서 등 Daum 카페는 멤버십 기반으로 외부 공개가 제한되어 있고,
                네이트판은 자동화 접근 차단이 강력하며, 더쿠는 Cloudflare 우회 및 유지 비용이 과다하여 본 프로젝트 범위에서 제외하였다.
              </li>
              <li>
                <strong className="font-semibold">내부 채널 부재</strong> — 토스 고객센터 로그, 앱 내 피드백, 이탈 및 에러 로그 등
                가장 직접적인 VOC 시그널은 외부에서 접근할 수 없으므로 본 분석에 포함되지 않는다.
              </li>
            </ul>
            결과적으로 현재 구성은 <strong className="font-semibold">20–50대, 남성 비중이 높으며 테크·재테크 관심층</strong>에 편중되어 있으며,
            20–30대 여성, 50–60대 사용자, 비발화층은 구조적으로 과소표집된다.
          </li>
          <li>
            <strong className="font-semibold">자기선택 편향</strong> —
            VOC는 본질적으로 자발 발화자 중심의 표집이며, 침묵하는 다수(참여 불평등 법칙상 하위 약 90%)는 관측되지 않는다.
            본 프로젝트는 이를 보정하기 위해 <strong className="font-semibold">의견을 남기지 않은 사용자를 기본 만족 상태로 간주(만족도 80점 baseline)</strong>하고,
            발화된 VOC가 해당 점수를 가감하는 구조로 설계하였다.
          </li>
          <li>
            <strong className="font-semibold">LLM 분류 오차</strong> —
            의미 기반 분류 및 점수화는 완전히 결정적이지 않으며, 프롬프트 또는 모델 변경 시 결과의 일관성이 저하될 수 있다.
          </li>
          <li>
            <strong className="font-semibold">운영 파이프라인 미구현</strong> —
            본 프로젝트는 단일 시점의 분석 프로토타입이며, 지속적인 자동 수집·분류·갱신을 위한 운영 파이프라인은 구축하지 않는다.
            결과 데이터는 특정 시점의 스냅샷이므로, 시계열 추적이나 릴리스 이벤트 전후 비교 분석은 본 범위에 포함되지 않는다.
          </li>
        </ul>
      </section>

      <Separator />

      {/* 부록 */}
      <section>
        <h2 className="text-lg font-semibold mb-4">부록. 분석 기준</h2>
        <TabGuide />
      </section>
    </article>
  );
}
