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
  E -->|< 90%| G[분류 기준 보완]:::fix
  G --> R

  classDef ok fill:#dcfce7,stroke:#15803d,color:#052e16;
  classDef fix fill:#fee2e2,stroke:#b91c1c,color:#450a0a;
`;

const TOC = [
  { id: "summary", label: "요약" },
  { id: "background", label: "1. 배경" },
  { id: "data", label: "2. 데이터" },
  { id: "method", label: "3. 방법" },
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
                <strong className="font-semibold">분류:</strong> 결과에서 30건
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
            <h2 className="text-lg font-semibold mb-4">3. 방법</h2>

            <h3 className="text-base font-semibold mb-2">전처리</h3>
            <p className="text-base text-foreground leading-relaxed max-w-5xl mb-4">
              분류에 부적합한 리뷰를 두 단계로 걸러낸다.
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
                    <TableCell className="font-medium">노이즈</TableCell>
                    <TableCell>
                      실질 문자(한·영·숫자) 10자 이하
                    </TableCell>
                    <TableCell className="italic text-muted-foreground">
                      &ldquo;ㅋㅋㅋ&rdquo;, &ldquo;굳&rdquo;,
                      &ldquo;조아요&rdquo;
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">중복</TableCell>
                    <TableCell>
                      (스토어, 작성자, 본문) 완전 동일
                    </TableCell>
                    <TableCell className="italic text-muted-foreground">
                      동일 사용자의 반복 등록
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <h3 className="text-base font-semibold mt-8 mb-2">분류</h3>
            <p className="text-base text-muted-foreground italic leading-relaxed max-w-5xl mb-4">
              [분류 방식 설명 작성]
            </p>

            <h4 className="text-sm font-semibold mb-2 text-muted-foreground max-w-5xl">
              표 3. 분류 라벨과 활용 목적
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
              분류 흐름
            </h4>
            <div className="max-w-5xl rounded-lg border border-border bg-white p-6 mb-4">
              <MermaidDiagram chart={CLASSIFICATION_FLOW} />
            </div>

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
