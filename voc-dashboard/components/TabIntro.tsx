import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MermaidDiagram from "@/components/MermaidDiagram";

const CLASSIFICATION_FLOW = `flowchart LR
  A[전처리된 리뷰] --> B[20건 단위 배치]
  R[classification.md] --> C
  B --> C[Claude Haiku 4.5]
  C --> D[다중 라벨 결과<br/>버그 · 요청 · UX · 평가]
  D --> E{샘플 30건<br/>육안 검토}
  E -->|정확도 &ge; 90%| F[채택]:::ok
  E -->|< 90%| G[카테고리 분류 기준 보완]:::fix
  G --> R

  classDef ok fill:#dcfce7,stroke:#15803d,color:#052e16;
  classDef fix fill:#fee2e2,stroke:#b91c1c,color:#450a0a;
`;

const TOC = [
  { id: "summary", label: "요약" },
  { id: "background", label: "1. 배경" },
  { id: "data", label: "2. 데이터" },
  { id: "method", label: "3. 데이터 처리" },
  { id: "dashboard", label: "4. 대시보드" },
];

export default function TabIntro() {
  return (
    <div className="max-w-[1400px] mx-auto py-10 px-6">
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

          {/* 요약 */}
          <section id="summary" className="scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4">요약</h2>
            <div className="max-w-5xl rounded-lg border border-dashed border-border bg-slate-50 px-5 py-4">
              <p className="text-base text-foreground leading-relaxed">
                <span className="text-muted-foreground">[</span>
                OO
                <span className="text-muted-foreground">해서</span> OO
                <span className="text-muted-foreground">달성]</span>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                placeholder: 한 문장 요약 채우기
              </p>
            </div>
          </section>

          {/* 1. 배경 */}
          <section id="background" className="scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4">1. 배경</h2>

            <h3 className="text-base font-semibold mb-2">목적</h3>
            <p className="text-base text-foreground leading-relaxed max-w-5xl mb-6">
              본 프로젝트의 목적은 생성형 AI를 활용해 앱 리뷰에 올라온 VOC
              수집과 분석을 자동화하는 것이다.
            </p>

            <h3 className="text-base font-semibold mb-2">문제 정의 및 해결방법</h3>
            <p className="text-base text-foreground leading-relaxed max-w-5xl mb-4">
              전통적인 분석은 키워드 빈도와 별점 분포를 집계하는 데서
              시작한다. 단순하고 빠르지만 문장 맥락을 놓쳐 정확도가 떨어지고,
              결국 사람이 리뷰를 일일이 읽어 보완해야 한다. 정확도를
              끌어올리려면 지도학습 분류 모델을 학습시키는 방법도 있다. Maalej
              et al.(2016)은 약 4,000건의 리뷰를 직접 레이블링해 정확도 90%의
              분류 모델을 만들어냈다. 다만 이 방식은 머신러닝 지식이 필요한
              데다, 모델 업데이트를 위해 주기적으로 레이블링을 반복해야 하므로
              지속 가능성이 떨어진다.
            </p>

            <h4 className="text-sm font-semibold mb-2 text-muted-foreground max-w-5xl">
              표 1. 분석 기법별 한계와 본 프로젝트의 해결
            </h4>
            <div className="rounded-lg border border-border overflow-hidden mb-6 max-w-5xl">
              <Table className="table-fixed">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[18%]">기법</TableHead>
                    <TableHead className="w-[22%]">방식</TableHead>
                    <TableHead className="w-[26%]">한계</TableHead>
                    <TableHead className="w-[34%]">해결</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium align-top">
                      키워드 + 별점
                    </TableCell>
                    <TableCell className="align-top">
                      특정 단어 빈도와 평점 분포를 집계
                    </TableCell>
                    <TableCell className="align-top">
                      문맥 미반영 → 결국 사람이 다 읽어야 함
                    </TableCell>
                    <TableCell className="align-top">
                      생성형 AI로 직접 리뷰를 읽고 분류한다.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium align-top">
                      머신러닝 분류 모델
                    </TableCell>
                    <TableCell className="align-top">
                      수동 레이블링 → 학습 → 예측
                    </TableCell>
                    <TableCell className="align-top">
                      ML 지식 필요, 주기적 재레이블링 비용
                    </TableCell>
                    <TableCell className="align-top">
                      분류 결과를 사람이 검토해 분류 기준 문서(
                      <code className="px-1 py-0.5 rounded bg-slate-100 text-sm font-mono">
                        classification.md
                      </code>
                      )를 보완. 단일 소스로 일관성 재현.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
              추가 제공
            </h4>
            <ul className="max-w-5xl space-y-2 text-base text-foreground leading-relaxed mb-6">
              <li>
                <strong className="font-semibold">챗봇 인터페이스:</strong>{" "}
                대시보드와 함께 자연어 질의 챗봇을 두어, 사용자가 분석 결과를
                바로 들여다볼 수 있게 한다.
              </li>
            </ul>

            <h3 className="text-base font-semibold mt-6 mb-2">평가지표</h3>
            <ul className="max-w-5xl space-y-2 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong className="font-semibold">카테고리 분류:</strong> 결과에서 30건
                무작위 표본을 직접 검토, 범주별 정확도 90% 이상이면 채택.
              </li>
              <li>
                <strong className="font-semibold">주제 추출:</strong> 사용자
                시나리오 기반 정성 평가.
              </li>
              <li>
                <strong className="font-semibold">챗봇:</strong> 사용자
                시나리오 기반 정성 평가.
              </li>
            </ul>

            <h3 className="text-base font-semibold mt-6 mb-2">참고 자료</h3>
            <ul className="max-w-5xl space-y-2 text-base text-foreground leading-relaxed">
              <li>
                최세나 외(2025){" "}
                <em>
                  &ldquo;사용자 경험 문제 발견을 위한 생성형 AI 기반 앱 리뷰
                  데이터 분석 도구 개발 및 유용성 검증&rdquo;
                </em>{" "}
                <a
                  href="https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12419970"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground underline underline-offset-2 hover:text-foreground text-sm"
                >
                  (링크)
                </a>
              </li>
              <li>
                Maalej et al.(2016){" "}
                <em>
                  &ldquo;On the automatic classification of app reviews&rdquo;
                </em>{" "}
                <a
                  href="https://cs.uwaterloo.ca/~dberry/ATRE/Slides/HairyToolsTalk/DanCommentedMaalejEtAl.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground underline underline-offset-2 hover:text-foreground text-sm"
                >
                  (링크)
                </a>
              </li>
              <li>
                imweb-tech{" "}
                <em>
                  &ldquo;고객의 목소리를 한눈에! — VoC 대시보드 편&rdquo;
                </em>{" "}
                <a
                  href="https://medium.com/imweb-tech/%EA%B3%A0%EA%B0%9D%EC%9D%98-%EB%AA%A9%EC%86%8C%EB%A6%AC%EB%A5%BC-%ED%95%9C%EB%88%88%EC%97%90-voc-%EB%8C%80%EC%8B%9C%EB%B3%B4%EB%93%9C-%ED%8E%B8-1b2b0452b734"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground underline underline-offset-2 hover:text-foreground text-sm"
                >
                  (링크)
                </a>
              </li>
            </ul>
          </section>

          {/* 2. 데이터 */}
          <section id="data" className="scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4">2. 데이터</h2>
            <ul className="max-w-5xl list-disc pl-5 space-y-1 text-base text-foreground leading-relaxed">
              <li>
                <strong className="font-semibold">대상:</strong> 토스 (Viva
                Republica)
              </li>
              <li>
                <strong className="font-semibold">출처:</strong> Google Play,
                App Store
              </li>
              <li>
                <strong className="font-semibold">기간:</strong> 2026년 3월
              </li>
              <li>
                <strong className="font-semibold">규모:</strong> 644건 (Google
                Play 461 + App Store 183)
              </li>
            </ul>
          </section>

          {/* 3. 방법 */}
          <section id="method" className="scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4">3. 데이터 처리</h2>

            <h3 className="text-base font-semibold mb-2">전처리</h3>
            <p className="text-base text-foreground leading-relaxed max-w-5xl mb-4">
              분류에 부적합한 리뷰를 세 단계로 걸러낸다. 중복 → 특수문자·자모만
              → 노이즈 순으로 적용한다.
            </p>
            <h4 className="text-sm font-semibold mb-2 text-muted-foreground max-w-5xl">
              표 2. 전처리 필터링 기준
            </h4>
            <div className="rounded-lg border border-border overflow-hidden mb-4 max-w-5xl">
              <Table className="table-fixed">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[18%]">기준</TableHead>
                    <TableHead className="w-[44%]">규칙</TableHead>
                    <TableHead className="w-[38%]">예시</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">중복</TableCell>
                    <TableCell>
                      (스토어, 작성자, 본문) 완전 동일
                    </TableCell>
                    <TableCell className="italic text-muted-foreground">
                      동일 사용자의 반복 등록
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      특수문자·자모만
                    </TableCell>
                    <TableCell>
                      완성 한글·영문·숫자가 0자 (자음·모음 단독, 이모지,
                      특수문자만 포함)
                    </TableCell>
                    <TableCell className="italic text-muted-foreground">
                      &ldquo;ㅋㅋㅋ&rdquo;, &ldquo;!!!&rdquo;,
                      &ldquo;😀😀&rdquo;
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">노이즈</TableCell>
                    <TableCell>
                      실질 문자(한·영·숫자) 1~10자
                    </TableCell>
                    <TableCell className="italic text-muted-foreground">
                      &ldquo;굳&rdquo;, &ldquo;조아요&rdquo;
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <h3 className="text-base font-semibold mt-8 mb-2">카테고리 분류</h3>
            <p className="text-base text-foreground leading-relaxed max-w-5xl mb-4">
              각 리뷰를 Maalej의 4분류(버그·요청·UX·평가)에 다중 라벨로
              매핑한다. 한 리뷰가 두 가지 이상 성격을 가지는 경우가 흔해 단일
              라벨로는 정보가 손실된다. Claude Haiku 4.5에 20건씩 묶어
              호출하며, 판별 기준은{" "}
              <code className="px-1 py-0.5 rounded bg-slate-100 text-sm font-mono">
                classification.md
              </code>{" "}
              에서 단일 소스로 관리한다.
            </p>

            <h4 className="text-sm font-semibold mb-2 text-muted-foreground max-w-5xl">
              표 3. 카테고리 분류 라벨과 활용 목적
            </h4>
            <div className="rounded-lg border border-border overflow-hidden mb-6 max-w-5xl">
              <Table className="table-fixed">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[18%]">라벨</TableHead>
                    <TableHead className="w-[42%]">정의</TableHead>
                    <TableHead className="w-[40%]">목적</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium align-top">
                      버그 리포트
                    </TableCell>
                    <TableCell className="align-top">
                      앱의 오류·비정상 동작 신고
                    </TableCell>
                    <TableCell className="align-top">
                      안정성 이슈 우선순위 식별, QA·엔지니어링 액션 인풋
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium align-top">
                      기능 요청
                    </TableCell>
                    <TableCell className="align-top">
                      새 기능·개선 제안
                    </TableCell>
                    <TableCell className="align-top">
                      제품 로드맵 인풋, PM 의사결정
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium align-top">
                      사용자 경험
                    </TableCell>
                    <TableCell className="align-top">
                      사용 중 경험·감정·불편·만족 서술
                    </TableCell>
                    <TableCell className="align-top">
                      UX 개선점 발굴, 디자이너·PM 인사이트
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium align-top">
                      평가
                    </TableCell>
                    <TableCell className="align-top">
                      단순 칭찬·비난, 분석 가치가 낮은 의견
                    </TableCell>
                    <TableCell className="align-top">
                      노이즈 분리 (집계 통계용, 주제 추출 제외)
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <h4 className="text-sm font-semibold mb-2 text-muted-foreground max-w-5xl">
              카테고리 분류 흐름
            </h4>
            <div className="max-w-5xl rounded-lg border border-border bg-white p-6 mb-4">
              <MermaidDiagram chart={CLASSIFICATION_FLOW} />
            </div>

            <h3 className="text-base font-semibold mt-8 mb-2">주제 분류</h3>
            <p className="text-base text-foreground leading-relaxed max-w-5xl mb-4">
              카테고리 분류는 리뷰의 &lsquo;성격&rsquo;만 구분한다.
              &lsquo;어떤 이슈가 많은가&rsquo;를 보려면 그 안에서 한 단계 더
              들어가야 한다. 카테고리별(버그·요청·UX)로 100건 무작위 표본을
              뽑아 생성형 AI가 상위 5개 주제와 대표 리뷰 3건을 추출한다. 평가
              카테고리는 분석 가치가 낮아 제외한다. 주제 명명 규칙은 표 4를
              기준으로{" "}
              <code className="px-1 py-0.5 rounded bg-slate-100 text-sm font-mono">
                theme-classification.md
              </code>{" "}
              에 단일 소스로 둔다.
            </p>
            <ul className="max-w-5xl space-y-3 text-base text-foreground leading-relaxed mb-4">
              <li>
                <strong className="font-semibold">자동 추출:</strong> 생성형
                AI가 카테고리별 표본에서 주제를 추출한다.
              </li>
              <li>
                <strong className="font-semibold">명시 규칙:</strong> 결과
                일관성을 위해 아래 규칙을 단일 소스로 관리한다.
              </li>
            </ul>

            <h4 className="text-sm font-semibold mb-2 text-muted-foreground max-w-5xl">
              표 4. 주제 분류 규칙과 예시
            </h4>
            <div className="rounded-lg border border-border overflow-hidden mb-4 max-w-5xl">
              <Table className="table-fixed">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[22%]">규칙</TableHead>
                    <TableHead className="w-[38%]">설명</TableHead>
                    <TableHead className="w-[40%]">예시</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium align-top">
                      같은 내용은 같은 이름
                    </TableCell>
                    <TableCell className="align-top">
                      표면형이 달라도 같은 사안이면 한 주제로 묶는다.
                    </TableCell>
                    <TableCell className="align-top text-muted-foreground">
                      &lsquo;로그인 오류&rsquo;, &lsquo;로그인 안됨&rsquo;
                      <br />→ &lsquo;로그인 오류&rsquo;
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium align-top">
                      추상도 일관
                    </TableCell>
                    <TableCell className="align-top">
                      너무 광범위하지도 너무 좁지도 않게, 비교 가능한 단위로
                      유지한다.
                    </TableCell>
                    <TableCell className="align-top text-muted-foreground">
                      ✗ &lsquo;앱 문제&rsquo;, &lsquo;로그인 버튼 색상&rsquo;
                      <br />✓ &lsquo;로그인 오류&rsquo;
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium align-top">
                      명사구 형태
                    </TableCell>
                    <TableCell className="align-top">
                      주제명은 문장형 대신 명사구로 통일한다.
                    </TableCell>
                    <TableCell className="align-top text-muted-foreground">
                      ✗ &lsquo;로그인이 자꾸 안 돼요&rsquo;
                      <br />✓ &lsquo;로그인 오류&rsquo;
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium align-top">
                      중립적 표현
                    </TableCell>
                    <TableCell className="align-top">
                      평가성 단어를 배제하고 사실 기반 표현을 쓴다.
                    </TableCell>
                    <TableCell className="align-top text-muted-foreground">
                      ✗ &lsquo;끔찍한 송금 UX&rsquo;
                      <br />✓ &lsquo;송금 흐름의 혼란&rsquo;
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium align-top">
                      카테고리 성격 유지
                    </TableCell>
                    <TableCell className="align-top">
                      한 카테고리에서 추출한 주제는 그 카테고리 안에 머문다.
                    </TableCell>
                    <TableCell className="align-top text-muted-foreground">
                      버그 카테고리에서 &lsquo;결제 화면 디자인&rsquo; 같은 UX
                      주제 추출 X
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium align-top">
                      표기 통일
                    </TableCell>
                    <TableCell className="align-top">
                      고유명·약어 표기를 하나로 고정한다.
                    </TableCell>
                    <TableCell className="align-top text-muted-foreground">
                      &lsquo;2FA&rsquo; vs &lsquo;이중인증&rsquo;
                      <br />→ 하나 선택
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

          </section>

          {/* 4. 대시보드 */}
          <section id="dashboard" className="scroll-mt-24">
            <h2 className="text-lg font-semibold mb-4">4. 대시보드</h2>
            <p className="text-base text-foreground leading-relaxed max-w-5xl mb-6">
              사용자가 다른 의사결정을 내리도록 두 가지 대시보드를 분리한다.
              현황 대시보드는 빈도·변화·이상 신호를 즉시 보여주고, 인사이트
              대시보드는 주제와 맥락을 깊이 탐색하게 한다.
            </p>

            <h3 className="text-base font-semibold mb-2">현황 대시보드</h3>
            <ul className="max-w-5xl space-y-2 text-base text-foreground leading-relaxed mb-2">
              <li>
                <strong className="font-semibold">사용자:</strong> PM·CS·운영.
                매일·매주 모니터링.
              </li>
              <li>
                <strong className="font-semibold">목적:</strong> 지금 무슨 일이
                벌어지고 있는지 파악, 즉각 대응 필요 여부 판단.
              </li>
            </ul>
            <h4 className="text-sm font-semibold mb-2 mt-4 text-muted-foreground">
              위젯 후보
            </h4>
            <ul className="max-w-5xl list-disc pl-5 space-y-1 text-base text-foreground leading-relaxed mb-6">
              <li>기간별 리뷰 유입량 (일·주 추이)</li>
              <li>카테고리별 비율과 변화</li>
              <li>평균 별점 (CSAT proxy)</li>
              <li>스토어별 차이 (Google Play vs App Store)</li>
              <li>이상 신호 알림 (평소 대비 급증·급감)</li>
            </ul>

            <h3 className="text-base font-semibold mb-2">인사이트 대시보드</h3>
            <ul className="max-w-5xl space-y-2 text-base text-foreground leading-relaxed mb-2">
              <li>
                <strong className="font-semibold">사용자:</strong>{" "}
                PM·디자이너·리서처. 분기·기획 시점에 깊이 본다.
              </li>
              <li>
                <strong className="font-semibold">목적:</strong> 데이터에서
                무엇을 배울 수 있는지 탐색, 다음에 풀 문제 우선순위 판단.
              </li>
            </ul>
            <h4 className="text-sm font-semibold mb-2 mt-4 text-muted-foreground">
              위젯 후보
            </h4>
            <ul className="max-w-5xl list-disc pl-5 space-y-1 text-base text-foreground leading-relaxed mb-4">
              <li>카테고리별 상위 주제</li>
              <li>주제 시간 추이 (떠오르는·지나가는 주제)</li>
              <li>주제별 대표 리뷰 원문</li>
              <li>신규 등장 주제 (지난 기간엔 없던)</li>
              <li>자유 질의 챗봇 (가설 탐색)</li>
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
