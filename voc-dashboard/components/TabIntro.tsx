import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Mermaid from "@/components/Mermaid";

const CLASSIFY_PIPELINE_CHART = `flowchart TD
  A["classification.md<br/><span style='color:#64748b'>분류 규칙</span>"]
  B["classification-examples.md<br/><span style='color:#64748b'>정정 기록 누적</span>"]
  C["LLM 분류"]
  D["분류 결과"]
  E["샘플 검토 + 오분류 정정"]

  A --> C
  B --> C
  C --> D
  D --> E
  E -. "정정 케이스 추가" .-> B

  classDef default fill:#ffffff,stroke:#e2e8f0,stroke-width:1px,color:#0f172a
  classDef loop fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#78350f
  class B,E loop`;

const TOC = [
  { id: "background", label: "1. 개요" },
  { id: "problem", label: "2. 문제 정의 및 해결 계획" },
  { id: "data", label: "3. 데이터" },
  { id: "method", label: "4. 방법" },
  { id: "dashboard", label: "5. 대시보드 구성" },
  { id: "limitations", label: "6. 한계 및 전제" },
];

export default function TabIntro() {
  return (
    <div className="max-w-[1200px] mx-auto py-10 px-6">
      <div className="flex gap-16">
        <article className="flex-1 min-w-0 space-y-12">
          {/* 제목 */}
          <header>
            <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2">
              Project Overview
            </p>
            <h1 className="text-3xl font-bold tracking-tight leading-tight">
              VOC 자동수집 자동화
            </h1>
          </header>

          <Separator />

          {/* 1. 개요 */}
          <section id="background" className="scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4">1. 개요</h2>
            <p className="text-base text-foreground leading-relaxed max-w-3xl mb-6">
              이 프로젝트는 앱 리뷰 VOC 분석을 자동화된 데이터 파이프라인으로
              구축한다. 수집, 전처리, 분류, 주제 추출, 대시보드 갱신을 하나의
              스크립트 흐름으로 연결해 주기적으로 데이터가 갱신될 수 있도록
              설계했다. Maalej et al.(2016)과 최세나 외(2025)의 선행 연구에서
              제시된 방법을 참고하되, 각 방법이 가진 실무 적용 제약을 회피하는
              방향으로 구조를 조정했다. 분류, 감정 판정, 주제 추출은 모두
              생성형 AI(LLM)가 처리하고, 결과는 대시보드로 모아 PM, CS,
              디자이너가 별도의 분석 환경이나 지식 없이 주요 이슈와 흐름을 바로
              확인할 수 있게 했다.
            </p>

            <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
              참고 자료
            </h3>
            <ul className="max-w-3xl list-disc pl-5 space-y-1 text-base text-foreground leading-relaxed">
              <li>
                최세나 외 (2025). &ldquo;사용자 경험 문제 발견을 위한 생성형
                AI 기반 앱 리뷰 데이터 분석 도구 개발 및 유용성 검증.&rdquo;{" "}
                <a
                  href="https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12419970"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-muted-foreground hover:text-foreground"
                >
                  링크
                </a>
              </li>
              <li>
                Maalej, W., Kurtanović, Z., Nabil, H., &amp; Stanik, C.
                (2016). &ldquo;On the automatic classification of app
                reviews.&rdquo; <em>Requirements Engineering</em>, 21(3),
                311–331.{" "}
                <a
                  href="https://doi.org/10.1007/s00766-016-0251-9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-muted-foreground hover:text-foreground"
                >
                  링크
                </a>
              </li>
            </ul>
          </section>

          {/* 2. 문제 정의 및 해결 계획 */}
          <section id="problem" className="scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4">
              2. 문제 정의 및 해결 계획
            </h2>
            <p className="text-base text-foreground leading-relaxed max-w-3xl mb-5">
              앱 리뷰는 매일 수백~수천 건 쌓이는 1차 VOC 자원이다. 사람이
              전수로 읽기는 불가능하고, 별점과 키워드 필터만으로는 맥락을
              놓친다. 선행 연구 두 편은 이 공백을 각각 다른 방식으로 메웠지만
              실무 도입 관점에서 제약이 남는다. 각 제약에 대한 이 프로젝트의
              해결 계획은 다음과 같다.
            </p>

            <div className="max-w-3xl space-y-5">
              <div>
                <h3 className="text-base font-semibold mb-2">
                  Maalej et al. (2016)
                </h3>
                <p className="text-base text-foreground leading-relaxed mb-2">
                  <strong className="font-semibold">제약 —</strong> ML 기반
                  분류기가 정확도 90%대의 높은 성능을 보였지만, 설계에 ML
                  전문지식이 필요하고 학습 데이터를 사람이 수동으로 레이블링해야
                  한다. 실무 상시 운영 부담이 크다.
                </p>
                <p className="text-base text-foreground leading-relaxed">
                  <strong className="font-semibold">해결 계획 —</strong> 분류
                  규칙 문서와 생성형 LLM 호출로 ML 지식 없이 분류한다. 결과를
                  소규모 샘플로 검토해 사람이 정정한 케이스를 문서화하고, 다음
                  분류 호출에 참고 자료로 함께 주입한다.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold mb-2">
                  최세나 외 (2025)
                </h3>
                <p className="text-base text-foreground leading-relaxed mb-2">
                  <strong className="font-semibold">제약 —</strong> 생성형
                  AI로 분류기 설계 부담은 낮췄지만, 분석 실행이 연구자의 수동
                  프로세스에 머물러 있다. 실무자가 주기적으로 데이터를 갱신하고
                  변화를 추적할 수 있는 파이프라인 형태로는 제공되지 않는다.
                </p>
                <p className="text-base text-foreground leading-relaxed">
                  <strong className="font-semibold">해결 계획 —</strong> 수집,
                  전처리, 분류, 주제 추출, 대시보드 갱신을 스크립트와 LLM
                  호출로 이어 자동화된 데이터 파이프라인으로 구축한다. 실무자가
                  별도 조작 없이 주기적으로 VOC 변화를 추적할 수 있다. 분석
                  범위는 UX에서 버그, 기능 요청, 사용자 경험 세 범주로
                  확장했다.
                </p>
              </div>
            </div>
          </section>

          {/* 3. 데이터 */}
          <section id="data" className="scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4">3. 데이터</h2>
            <ul className="max-w-3xl list-disc pl-5 space-y-2 text-base text-foreground leading-relaxed mb-6">
              <li>
                <strong className="font-semibold">대상 앱</strong> — 토스 (Viva
                Republica). 사용자 규모·리뷰 밀도가 높고 업데이트가 빈번해 VOC
                변동이 활발한 사례로 선정.
              </li>
              <li>
                <strong className="font-semibold">수집처</strong> — Google Play
                Store, Apple App Store
              </li>
              <li>
                <strong className="font-semibold">기간</strong> — 2026년 3월
                1일 이후
              </li>
              <li>
                <strong className="font-semibold">도구</strong> —{" "}
                <code className="px-1 py-0.5 rounded bg-slate-100 text-sm font-mono">
                  google-play-scraper
                </code>
                ,{" "}
                <code className="px-1 py-0.5 rounded bg-slate-100 text-sm font-mono">
                  app-store-scraper
                </code>{" "}
                (오픈소스)
              </li>
            </ul>

            <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
              수집 필드
            </h3>
            <div className="max-w-3xl rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-40">필드</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { f: "source", d: "스토어 구분" },
                    { f: "external_id", d: "스토어 고유 리뷰 ID" },
                    { f: "author", d: "작성자 이름" },
                    { f: "score", d: "별점 (1~5)" },
                    { f: "text", d: "리뷰 본문" },
                    { f: "posted_at", d: "작성 시각 (ISO 8601)" },
                  ].map((row) => (
                    <TableRow key={row.f}>
                      <TableCell className="font-mono text-sm">
                        {row.f}
                      </TableCell>
                      <TableCell>{row.d}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          {/* 4. 방법 */}
          <section id="method" className="scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4">4. 방법</h2>

            <div className="max-w-3xl space-y-6">
              {/* 4.1 전처리 */}
              <div>
                <h3 className="text-base font-semibold mb-2">
                  <span className="text-muted-foreground mr-2">4.1</span>
                  전처리
                </h3>
                <p className="text-base text-foreground leading-relaxed mb-4">
                  LLM 입력 품질을 높이기 위해 무의미한 리뷰를 1차적으로
                  걸러낸다.
                </p>

                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                  필터링 기준
                </h4>
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-32">기준</TableHead>
                        <TableHead>판정 규칙</TableHead>
                        <TableHead>예시 (제외 대상)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">노이즈</TableCell>
                        <TableCell>
                          한글·영문·숫자 실질 문자 수가 10자 이하인 리뷰
                        </TableCell>
                        <TableCell className="italic text-muted-foreground">
                          &ldquo;ㅋㅋㅋ&rdquo;, &ldquo;굳&rdquo;,
                          &ldquo;머냐&rdquo;, &ldquo;조아요&rdquo;
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          특수문자 제거
                        </TableCell>
                        <TableCell>
                          자모 단독(ㅋ, ㅠ 등), 반복 기호, 이모지 등 실질 내용이
                          없는 문자 정리 — 본문은 유지
                        </TableCell>
                        <TableCell className="italic text-muted-foreground">
                          &ldquo;ㅠㅠㅠㅠ&rdquo;, &ldquo;🥲🥲🥲&rdquo;
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">중복</TableCell>
                        <TableCell>
                          (스토어, 작성자, 본문)이 완전히 동일 — 첫 1건만 유지
                        </TableCell>
                        <TableCell className="italic text-muted-foreground">
                          동일 사용자의 반복 등록
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* 4.2 LLM 분석 (분류·감정·주제) */}
              <div>
                <h3 className="text-base font-semibold mb-2">
                  <span className="text-muted-foreground mr-2">4.2</span>
                  LLM 분석: 분류·감정·주제
                </h3>
                <p className="text-base text-foreground leading-relaxed mb-3">
                  LLM에 리뷰 본문을 넣어 세 가지 결과를 얻는다.
                </p>
                <ul className="max-w-3xl list-disc pl-5 space-y-1.5 text-base text-foreground leading-relaxed mb-4">
                  <li>
                    <strong className="font-semibold">유형 분류</strong> —
                    버그·요청·UX·단순 소감 중 하나 이상. 한 리뷰에 여러 개 붙일
                    수 있게 했다. &ldquo;튕기는데 다크모드도 추가해주세요&rdquo;
                    처럼 버그와 기능 요청이 한 문장에 공존하는 경우가 많기
                    때문이다.
                  </li>
                  <li>
                    <strong className="font-semibold">감정</strong> —
                    긍정·부정·중립 중 하나. 별점은 쓰지 않고 본문 텍스트만 보고
                    판정한다. Maalej et al.(2016)에서 확인했듯 메타데이터
                    만으로는 리뷰 성격을 안정적으로 구분하기 어렵기 때문이다.
                  </li>
                  <li>
                    <strong className="font-semibold">주제 추출</strong> —
                    주차별 대표 이슈. 단순 소감은 정보 가치가 낮아 제외한다.
                  </li>
                </ul>
                <p className="text-base text-foreground leading-relaxed mb-4">
                  유형 분류와 감정은 리뷰 단건에 대해 한 번의 호출에서 함께
                  반환하고, 주제 추출은 주차별·범주별 집계 단위로 별도 호출한다.
                </p>

                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                  분류 체계
                </h4>
                <div className="rounded-lg border border-border overflow-hidden mb-4">
                  <Table className="table-fixed">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-24">유형</TableHead>
                        <TableHead className="w-[45%]">정의</TableHead>
                        <TableHead>예시</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium whitespace-normal align-top">
                          버그 리포트
                        </TableCell>
                        <TableCell className="whitespace-normal align-top">
                          앱의 오류·비정상 동작 신고
                        </TableCell>
                        <TableCell className="italic text-muted-foreground whitespace-normal align-top">
                          &ldquo;로그인하면 계속 튕겨요&rdquo;
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium whitespace-normal align-top">
                          기능 요청
                        </TableCell>
                        <TableCell className="whitespace-normal align-top">
                          새 기능·개선 제안
                        </TableCell>
                        <TableCell className="italic text-muted-foreground whitespace-normal align-top">
                          &ldquo;내역에 필터 기능 추가해주세요&rdquo;
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium whitespace-normal align-top">
                          사용자 경험
                        </TableCell>
                        <TableCell className="whitespace-normal align-top">
                          사용 중 경험·감정·불편·만족 서술
                        </TableCell>
                        <TableCell className="italic text-muted-foreground whitespace-normal align-top">
                          &ldquo;송금 흐름이 헷갈립니다&rdquo;
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium whitespace-normal align-top">
                          단순 소감
                        </TableCell>
                        <TableCell className="whitespace-normal align-top">
                          구체 내용 없는 칭찬·비난·감탄. 전처리 뒤에도 남은
                          무의미 리뷰를 LLM이 한 번 더 걸러낸 버킷
                        </TableCell>
                        <TableCell className="italic text-muted-foreground whitespace-normal align-top">
                          &ldquo;최고의 앱입니다&rdquo;
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                  분류·감정 처리 방식
                </h4>
                <ul className="max-w-3xl list-disc pl-5 space-y-2 text-base text-foreground leading-relaxed">
                  <li>
                    <strong className="font-semibold">모델·배치</strong> —
                    Claude Haiku 4.5, 20건 단위로 호출.
                  </li>
                  <li>
                    <strong className="font-semibold">다중 라벨</strong> — 한
                    리뷰에 최대 2~3개, 해당 없으면 빈 배열.
                  </li>
                  <li>
                    <strong className="font-semibold">버그 우선</strong> —
                    애매한 케이스는 버그 리포트로 기울여 놓치지 않도록 지시.
                  </li>
                  <li>
                    <strong className="font-semibold">중립 지양</strong> — 순수
                    문의·정보성에만 neutral. 조건부 칭찬·미묘한 불만은
                    positive/negative 중 한쪽으로 판정.
                  </li>
                  <li>
                    <strong className="font-semibold">부정 우선</strong> — 한
                    리뷰에 긍정·부정이 섞여 있으면 negative. VOC 목적이 고칠
                    거리를 찾는 것이므로 부정 신호를 놓치지 않도록 기운다.
                  </li>
                  <li>
                    <strong className="font-semibold">가이드</strong> — 분류
                    정의·규칙·경계 사례와 감정 판정 기준을{" "}
                    <code className="px-1 py-0.5 rounded bg-slate-100 text-sm font-mono">
                      classification.md
                    </code>
                    에 단일 소스로 관리.
                  </li>
                  <li>
                    <strong className="font-semibold">Few-shot 참고 자료</strong>{" "}
                    — 사람이 정정한 오분류를{" "}
                    <code className="px-1 py-0.5 rounded bg-slate-100 text-sm font-mono">
                      classification-examples.md
                    </code>
                    에 (원문 → 정답 → 근거)로 누적하고, 다음 호출 프롬프트에
                    주입해 동일 패턴에 일관 적용. 누적된 정정은 규칙으로 승격.
                  </li>
                </ul>

                <h4 className="text-sm font-semibold mt-5 mb-2 text-muted-foreground">
                  분류 파이프라인 구조
                </h4>
                <div className="max-w-3xl border border-border rounded-lg p-5 bg-slate-50/50 flex justify-center">
                  <Mermaid
                    chart={CLASSIFY_PIPELINE_CHART}
                    className="[&_svg]:max-w-full [&_svg]:h-auto"
                  />
                </div>
                <p className="max-w-3xl text-xs text-muted-foreground mt-2 leading-relaxed">
                  점선은 <strong>피드백 루프</strong>. 샘플 검토에서 나온 정정
                  케이스가{" "}
                  <code className="px-1 py-0.5 rounded bg-slate-100 text-[11px] font-mono">
                    classification-examples.md
                  </code>
                  에 누적되고, 다음 분류 호출 때 few-shot으로 함께 주입된다.
                </p>

                <h4 className="text-sm font-semibold mt-5 mb-2 text-muted-foreground">
                  주제 추출 처리 방식
                </h4>
                <p className="text-base text-foreground leading-relaxed mb-3">
                  유형 분류는 리뷰의 성격만 구분한다. &ldquo;버그 리포트 N건 중
                  어떤 버그가 가장 많은가&rdquo;는 별도 분석이 필요하다. 주간
                  추이와 신규 이슈 감지를 위해{" "}
                  <strong>주차별 × 범주별</strong>로 호출을 쪼개 주제를 추출한다.
                  대상은 3개 범주(버그·요청·UX)이며 단순 소감은 제외한다.
                </p>
                <ul className="max-w-3xl list-disc pl-5 space-y-2 text-base text-foreground leading-relaxed">
                  <li>
                    <strong className="font-semibold">입력</strong> — 해당
                    주차의 해당 범주 리뷰만 단일 프롬프트에 투입 (현재 주당
                    범주당 수십~백여 건). 6주 × 3범주 = 18회 호출.
                  </li>
                  <li>
                    <strong className="font-semibold">추출</strong> — 각 (주,
                    범주)마다 상위 5개 주제 + 각 주제의{" "}
                    <code className="px-1 py-0.5 rounded bg-slate-100 text-sm font-mono">
                      review_ids
                    </code>{" "}
                    반환.
                  </li>
                  <li>
                    <strong className="font-semibold">기존 주제 재사용</strong>{" "}
                    — 같은 범주의 직전 3주 주제 이름을 프롬프트에 주입. 같은
                    개념이 주마다 다른 이름으로 흩어지지 않도록 의미 동등한
                    경우 기존 이름을 그대로 쓰게 지시.
                  </li>
                  <li>
                    <strong className="font-semibold">범주간 배타성</strong> —
                    같은 주에 다른 범주가 이미 배정한 주제 이름도 전달. 이
                    이름은 이 범주에서 쓰지 않도록 해 범주간 중복 방지.
                  </li>
                </ul>
              </div>

              {/* 4.3 검토 */}
              <div>
                <h3 className="text-base font-semibold mb-2">
                  <span className="text-muted-foreground mr-2">4.3</span>
                  검토
                </h3>
                <p className="text-base text-foreground leading-relaxed">
                  분류·주제 추출 결과를 소규모 샘플로 직접 읽으며 오판정·경계
                  사례를 찾았다. 규칙 차원의 교정은{" "}
                  <code className="px-1 py-0.5 rounded bg-slate-100 text-sm font-mono">
                    classification.md
                  </code>
                  수정으로, 개별 케이스 차원의 교정은{" "}
                  <code className="px-1 py-0.5 rounded bg-slate-100 text-sm font-mono">
                    classification-examples.md
                  </code>
                  에 (원문 → 정답 → 근거) 추가로 처리했다. 후자는 다음 재분류
                  호출에 few-shot으로 주입된다.
                </p>
              </div>
            </div>
          </section>

          {/* 5. 대시보드 구성 */}
          <section id="dashboard" className="scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4">5. 대시보드 구성</h2>

            <p className="text-base text-foreground leading-relaxed max-w-3xl mb-6">
              이번 주 VOC 상태를 한 화면에서 파악할 수 있도록 설계했다. 대시보드
              탭은 이번 주 요약 중심으로, VOC 피드 탭은 원문 리뷰 탐색
              중심으로 구성된다.
            </p>

            <div className="max-w-3xl space-y-5">
              {[
                {
                  no: "5.1",
                  title: "이번 주 리포트",
                  desc: "최상단에 이번 주 리뷰 수와 부정·긍정 비중 요약 스트립. 아래 3카드: 평균 별점과 전주 대비 델타, 이번 주 대표 주제와 건수·부정 비중·별점 추이를 엮은 리포트 문장, 상위 이슈 3개 리스트. 한 눈에 '이번 주는 어떤 상태인가'가 읽히도록 정량 지표와 서사형 요약을 함께 배치했다.",
                },
                {
                  no: "5.2",
                  title: "범주별 요약",
                  desc: "버그 리포트 · 기능 요청 · 사용자 경험 세 범주를 1행 3열 카드로 배치. 각 카드에 이번 주 건수와 전주 대비 델타(▲/▼), 최근 3주 대비 이번 주 동향을 서술한 보고서 문장, top 5 주제 리스트가 들어간다. 직전 3주에 없던 주제는 '신규' 배지로 표시해 구조적 변화를 바로 드러낸다.",
                },
                {
                  no: "5.3",
                  title: "감정 분포 추이",
                  desc: "좌: 최근 4주간 범주별 부정 리뷰 건수 라인 차트(버그 · 요청 · UX 3개 라인). 우: 범주 × 주차 부정 비중 히트맵(5 범주 × 6주). 히트맵은 관측된 값으로 분위수 기반 6단계 색상 스케일을 구성해 실제 데이터 분포에서도 대비가 유지되도록 했다.",
                },
                {
                  no: "5.4",
                  title: "AI 챗봇 (FAB)",
                  desc: "우하단 플로팅 버튼. 자연어 질문에 대시보드 요약을 답하는 챗봇 UI. 현재는 비용 문제로 실제 LLM 호출 없이 미리 준비된 답변을 반환하는 데모.",
                },
                {
                  no: "5.5",
                  title: "VOC 피드 (별도 탭)",
                  desc: "원문 리뷰 탐색 전용 탭. 좌측에 출처(구글 플레이 · 앱스토어)와 감성(긍정 · 중립 · 부정) 체크박스 필터, 상단에 범주 탭(전체 · 버그 · 요청 · UX · 소감)과 원문 검색, 최신/오래된순 정렬. 리뷰 카드에는 스토어, 날짜, 본문, 범주 배지, 별점, 감성이 표시된다. 30건 페이지네이션.",
                },
              ].map((view) => (
                <div key={view.no}>
                  <h3 className="text-base font-semibold mb-1">
                    <span className="text-muted-foreground mr-2">
                      {view.no}
                    </span>
                    {view.title}
                  </h3>
                  <p className="text-base text-foreground leading-relaxed">
                    {view.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 6. 한계 및 전제 */}
          <section id="limitations" className="scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4">6. 한계 및 전제</h2>
            <ul className="max-w-3xl list-disc pl-5 space-y-3 text-base text-foreground leading-relaxed">
              <li>
                <strong className="font-semibold">품질 검증</strong> — 정답
                데이터셋(golden set)을 따로 만들지 않아 분류 정확도를 수치로
                측정하지는 않았다. 대신 LLM 분류 결과를 소규모 샘플로 훑으며
                오분류를 찾고, 규칙 차원의 교정은{" "}
                <code className="px-1 py-0.5 rounded bg-slate-100 text-sm font-mono">
                  classification.md
                </code>
                수정으로, 개별 케이스 차원의 교정은{" "}
                <code className="px-1 py-0.5 rounded bg-slate-100 text-sm font-mono">
                  classification-examples.md
                </code>
                에 (원문 → 정답 → 근거) 추가로 처리해 다음 재분류에 few-shot
                으로 주입했다. 수치 기반 벤치마크를 대체하지는 못하지만,
                실무자가 직접 품질을 개선하면서 근거를 남길 수 있는 실용적
                대안이다.
              </li>
              <li>
                <strong className="font-semibold">LLM 의존</strong> — 분류·주제
                추출이 단일 모델(Claude Haiku)에 의존한다. 모델이 업데이트되거나
                API 응답이 흔들리면 동일 입력에도 결과가 달라질 수 있다. 분류
                기준 문서와 프롬프트 버전을 함께 고정해 재현성을 확보했지만,
                장기 운영에선 시점별 결과 차이가 누적될 여지가 남는다.
              </li>
              <li>
                <strong className="font-semibold">분석 주기</strong> — 3월
                1일~4월 11일의 6주 스냅샷만 사용했다. 개인 프로젝트 특성상 LLM
                API 호출 비용 제약으로 현재는 스냅샷 데이터에 대해서만 분류·주제
                추출을 수행했고, 주기적인 재실행은 붙이지 않았다. 업데이트 전후
                VOC 변화 추적과 이상 급증 조기 탐지를 위해서는 주·월 단위 정기
                실행이 필요하며, 파이프라인은 스케줄러만 붙이면 그대로 정기
                운영 가능한 구조다.
              </li>
            </ul>
          </section>

        </article>

        {/* 목차 */}
        <aside className="hidden xl:block w-44 shrink-0">
          <nav className="sticky top-8">
            <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-3">
              목차
            </p>
            <ul className="space-y-2 text-sm">
              {TOC.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
}
