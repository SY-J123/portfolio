import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TOC = [
  { id: "background", label: "1. 배경" },
  { id: "data", label: "2. 데이터" },
  { id: "method", label: "3. 방법" },
  { id: "dashboard", label: "4. 대시보드 구성" },
  { id: "limitations", label: "5. 한계 및 전제" },
  { id: "appendix", label: "부록" },
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
              VOC 자동수집·분석 대시보드
            </h1>
          </header>

          <Separator />

          {/* 1. 배경 */}
          <section id="background" className="scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4">1. 배경</h2>
            <p className="text-base text-foreground leading-relaxed max-w-3xl mb-4">
              앱 리뷰는 PM·CS·디자이너가 참조하는 1차 피드백 자료다. 하루
              수백~수천 건을 사람이 다 읽기는 어렵고, 전통 토픽모델링은
              한국어·문맥·비용에서 한계가 있다. 생성형 AI(LLM)로 이 과정을
              자동화하고, 결과를 대시보드에 모아 부서 간 공통 근거로 쓴다.
            </p>

            <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
              참고 자료
            </h3>
            <ul className="max-w-3xl list-disc pl-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>
                최세나 외(2025){" "}
                <em>
                  &ldquo;사용자 경험 문제 발견을 위한 생성형 AI 기반 앱 리뷰
                  데이터 분석 도구 개발 및 유용성 검증&rdquo;
                </em>{" "}
                — 접근 방법
              </li>
              <li>Maalej et al.(2016) — 4분류 체계</li>
            </ul>

            <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
              확장 지점
            </h3>
            <ul className="max-w-3xl list-disc pl-5 space-y-2 text-base text-foreground leading-relaxed">
              <li>
                <strong className="font-semibold">제품 전반으로 범위 확장</strong>{" "}
                — 선행 국내 연구의 UX 한정 스코프를 버그·요청·UX로 넓혔다.
              </li>
              <li>
                <strong className="font-semibold">표본 추출로 비용 효율화</strong>{" "}
                — 외부 소스 포함 시 수천~수만 건 규모가 되므로, 전수 LLM 호출
                대신 표본에서 주제를 추정한다.
              </li>
            </ul>
          </section>

          {/* 2. 데이터 */}
          <section id="data" className="scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4">2. 데이터</h2>
            <ul className="max-w-3xl list-disc pl-5 space-y-2 text-base text-foreground leading-relaxed">
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
                (한 달)
              </li>
              <li>
                <strong className="font-semibold">규모</strong> — Google Play
                461건 · App Store 183건 ·{" "}
                <strong className="font-semibold">합계 644건</strong>
              </li>
            </ul>
          </section>

          {/* 3. 방법 */}
          <section id="method" className="scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4">3. 방법</h2>

            <div className="max-w-3xl space-y-6">
              {/* 3.1 수집 */}
              <div>
                <h3 className="text-base font-semibold mb-2">
                  <span className="text-muted-foreground mr-2">3.1</span>
                  수집
                </h3>
                <ul className="max-w-3xl list-disc pl-5 space-y-2 text-base text-foreground leading-relaxed mb-4">
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
                  <li>
                    <strong className="font-semibold">저장</strong> — API 응답을
                    JSON 스냅샷으로 저장,{" "}
                    <code className="px-1 py-0.5 rounded bg-slate-100 text-sm font-mono">
                      external_id
                    </code>{" "}
                    기준 중복 병합
                  </li>
                  <li>
                    <strong className="font-semibold">범위</strong> — 내용
                    필터링(길이·노이즈)은 3.2 전처리로 넘긴다
                  </li>
                </ul>

                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                  수집 필드
                </h4>
                <div className="rounded-lg border border-border overflow-hidden mb-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-32">필드</TableHead>
                        <TableHead>설명</TableHead>
                        <TableHead className="w-24 text-center">
                          Google Play
                        </TableHead>
                        <TableHead className="w-24 text-center">
                          App Store
                        </TableHead>
                        <TableHead className="w-20 text-center">
                          분석 활용
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { f: "source", d: "스토어 구분", gp: true, as: true, use: true },
                        { f: "external_id", d: "스토어 고유 리뷰 ID", gp: true, as: true, use: true },
                        { f: "author", d: "작성자 이름", gp: true, as: true, use: true },
                        { f: "score", d: "별점 (1–5)", gp: true, as: true, use: false },
                        { f: "title", d: "리뷰 제목", gp: false, as: true, use: false },
                        { f: "text", d: "리뷰 본문", gp: true, as: true, use: true },
                        { f: "posted_at", d: "작성 시각 (ISO 8601)", gp: true, as: true, use: true },
                        { f: "app_version", d: "앱 버전", gp: true, as: true, use: false },
                        { f: "thumbs_up", d: "도움됨 수", gp: true, as: false, use: false },
                        { f: "reply", d: "개발사 답변 본문", gp: true, as: false, use: false },
                        { f: "reply_date", d: "답변 작성 시각", gp: true, as: false, use: false },
                      ].map((row) => (
                        <TableRow key={row.f}>
                          <TableCell className="font-mono text-sm">
                            {row.f}
                          </TableCell>
                          <TableCell>{row.d}</TableCell>
                          <TableCell className="text-center text-muted-foreground">
                            {row.gp ? "●" : "—"}
                          </TableCell>
                          <TableCell className="text-center text-muted-foreground">
                            {row.as ? "●" : "—"}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.use ? (
                              <span className="text-emerald-600 font-semibold">
                                ✓
                              </span>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <p className="text-xs text-muted-foreground">
                  ● 스토어 API에서 수집됨 · ✓ 본 분석에서 활용 · — 미해당
                </p>
              </div>

              {/* 3.2 전처리 */}
              <div>
                <h3 className="text-base font-semibold mb-2">
                  <span className="text-muted-foreground mr-2">3.2</span>
                  전처리
                </h3>
                <p className="text-base text-foreground leading-relaxed mb-4">
                  LLM 입력 품질을 위해 두 단계 필터링을 거친다. 다른 사용자가
                  비슷한 불만을 남긴 경우는 그대로 둔다 — 같은 문제를 여러 명이
                  겪었다는 빈도 신호가 중요하다.
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

              {/* 3.3 분류 */}
              <div>
                <h3 className="text-base font-semibold mb-2">
                  <span className="text-muted-foreground mr-2">3.3</span>
                  분류
                </h3>
                <p className="text-base text-foreground leading-relaxed mb-4">
                  Maalej et al.(2016)의 4분류를{" "}
                  <strong className="font-semibold">다중 라벨</strong>로
                  채택했다. 실제 리뷰는 버그·요청이 섞이는 경우가 흔해 단일
                  라벨은 정보 손실이 크다. 단 평가(rating)는 집계 통계에만
                  사용하고 주제 추출·드릴다운에서는 제외한다.
                </p>

                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                  분류 체계
                </h4>
                <div className="rounded-lg border border-border overflow-hidden mb-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-32">유형</TableHead>
                        <TableHead>정의</TableHead>
                        <TableHead>예시</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          버그 리포트
                        </TableCell>
                        <TableCell>앱의 오류·비정상 동작 신고</TableCell>
                        <TableCell className="italic text-muted-foreground">
                          &ldquo;로그인하면 계속 튕겨요&rdquo;
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">기능 요청</TableCell>
                        <TableCell>새 기능·개선 제안</TableCell>
                        <TableCell className="italic text-muted-foreground">
                          &ldquo;내역에 필터 기능 추가해주세요&rdquo;
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          사용자 경험
                        </TableCell>
                        <TableCell>사용 중 경험·감정·불편·만족 서술</TableCell>
                        <TableCell className="italic text-muted-foreground">
                          &ldquo;송금 흐름이 헷갈립니다&rdquo;
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">평가</TableCell>
                        <TableCell>단순 칭찬·비난</TableCell>
                        <TableCell className="italic text-muted-foreground">
                          &ldquo;최고의 앱입니다&rdquo;
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                  처리 방식
                </h4>
                <ul className="max-w-3xl list-disc pl-5 space-y-2 text-base text-foreground leading-relaxed">
                  <li>
                    <strong className="font-semibold">모델</strong> — Claude
                    Haiku 4.5 (
                    <code className="px-1 py-0.5 rounded bg-slate-100 text-sm font-mono">
                      claude-haiku-4-5
                    </code>
                    )
                  </li>
                  <li>
                    <strong className="font-semibold">배치</strong> — 20건
                    단위로 단일 API 호출
                  </li>
                  <li>
                    <strong className="font-semibold">다중 라벨</strong> — 최대
                    2~3개, 해당 없으면 빈 배열(
                    <code className="px-1 py-0.5 rounded bg-slate-100 text-sm font-mono">
                      []
                    </code>
                    )
                  </li>
                  <li>
                    <strong className="font-semibold">가이드</strong> — 4분류
                    정의·판별 규칙·경계 사례를{" "}
                    <code className="px-1 py-0.5 rounded bg-slate-100 text-sm font-mono">
                      classification.md
                    </code>
                    에 단일 소스로 관리. 규칙 수정만으로 재분류 일관성 유지.
                  </li>
                </ul>
              </div>

              {/* 3.4 주제 추출 */}
              <div>
                <h3 className="text-base font-semibold mb-2">
                  <span className="text-muted-foreground mr-2">3.4</span>
                  주제 추출
                </h3>
                <p className="text-base text-foreground leading-relaxed mb-4">
                  4분류는 리뷰의 성격만 구분한다. "버그 리포트 200건 중 어떤
                  버그가 가장 많은가"는 별도 분석이 필요하다. 범주 전수를 LLM에
                  넣으면 규모에 비례해 비용이 커지므로, 범주별 표본을 뽑아
                  주제를 추정한다. 대상은 3개 범주(버그·요청·UX)이며 평가는
                  제외한다.
                </p>

                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                  처리 방식
                </h4>
                <ul className="max-w-3xl list-disc pl-5 space-y-2 text-base text-foreground leading-relaxed">
                  <li>
                    <strong className="font-semibold">샘플링</strong> — 범주당
                    100건 무작위 추출 (100건 미만이면 전수)
                  </li>
                  <li>
                    <strong className="font-semibold">추출</strong> — Claude
                    API로 상위 주제 5개 + 주제별 대표 리뷰 3건 반환
                  </li>
                  <li>
                    <strong className="font-semibold">유사 주제 병합</strong> —
                    "로그인 오류" vs "로그인 안됨" 같은 케이스는 2차 LLM
                    호출로 통합
                  </li>
                  <li>
                    <strong className="font-semibold">출력</strong> —{" "}
                    <code className="px-1 py-0.5 rounded bg-slate-100 text-sm font-mono">
                      {`[{ theme, count, examples[] }]`}
                    </code>{" "}
                    형태로 대시보드 드릴다운 입력
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. 대시보드 구성 */}
          <section id="dashboard" className="scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4">4. 대시보드 구성</h2>

            <p className="text-base text-foreground leading-relaxed max-w-3xl mb-6">
              네 개 뷰로 분류·주제 추출 결과를 시각화한다. 상단 스토어 필터가
              모든 뷰에 공통 적용된다.
            </p>

            <div className="max-w-3xl space-y-5">
              {[
                {
                  no: "4.1",
                  title: "요약",
                  desc: "총 리뷰 수·기간·스토어별 비율·제외 건수를 카드로 집계. 일별 수집 추이 차트.",
                },
                {
                  no: "4.2",
                  title: "분류 분포",
                  desc: "4범주별 건수·비율 바 차트. Google Play vs App Store 비교 스택 바. 다중 라벨 구조라 합계는 리뷰 수와 일치하지 않음.",
                },
                {
                  no: "4.3",
                  title: "범주별 주제",
                  desc: "범주 탭(버그·요청·UX)에서 상위 5개 주제 + 대표 리뷰 3건. 평가(rating)는 드릴다운 제외.",
                },
                {
                  no: "4.4",
                  title: "리뷰 탐색",
                  desc: "분류·스토어·주제 필터로 원문 브라우징. 각 리뷰에 라벨·주제 태그 병기.",
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

          {/* 5. 한계 및 전제 */}
          <section id="limitations" className="scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4">5. 한계 및 전제</h2>
            <ul className="max-w-3xl list-disc pl-5 space-y-3 text-base text-foreground leading-relaxed">
              <li>
                <strong className="font-semibold">표본 대표성</strong> — 공개 앱
                스토어 리뷰에 한정. SNS·커뮤니티·내부 CS 로그 등은
                접근·라이선스·비용 제약으로 미포함.
              </li>
              <li>
                <strong className="font-semibold">LLM 판정 오차</strong> — 확률적
                모델이므로 완전히 결정적이지 않다.{" "}
                <code className="px-1 py-0.5 rounded bg-slate-100 text-sm font-mono">
                  classification.md
                </code>
                로 규칙을 단일 소스화했으나 모델 자체의 편향은 남는다.
              </li>
              <li>
                <strong className="font-semibold">품질 검증 범위</strong> —
                분류·주제 추출의 정확도를 수동 라벨링이나 정량 지표
                (precision·recall·F1)로 검증하지 않는다. LLM 판정에 전적으로
                의존하며, 품질 확인은 샘플 육안 검토에 그친다. 선행연구
                (Maalej et al., 2016)는 4,400건 peer 라벨링 + binary classifier
                기반 교차검증으로 88–92% 정확도를 산출했지만, 본 프로젝트는{" "}
                <strong className="font-semibold">다중 라벨 구조</strong>를
                채택하여 해당 수치가 직접 대응되지 않으며, 평가 절차 자체도
                생략했다.
              </li>
              <li>
                <strong className="font-semibold">분석 주기</strong> — 실행은
                비용 제약으로 3월 한 달 스냅샷. 파이프라인은 지속 운영 전제로
                설계되어, 스케줄만 붙이면 정기 운영 가능.
              </li>
              <li>
                <strong className="font-semibold">표본 추출의 한계</strong> —
                범주당 100건 표본 기반 추정이므로 희귀 주제(5% 미만)는 누락될
                수 있다.
              </li>
            </ul>
          </section>

          {/* 부록 */}
          <section id="appendix" className="scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4">부록</h2>
            <p className="text-sm text-muted-foreground">(추후 추가)</p>
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
