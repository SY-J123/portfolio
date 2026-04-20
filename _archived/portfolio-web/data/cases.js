const CASE_LABELS = {
  ko: { home: "홈으로", back: "홈으로 돌아가기", outline: "Outline", appendix: "Appendix" },
  en: { home: "Home", back: "Back to Home", outline: "Outline", appendix: "Appendix" }
};

const caseContent = {
  "case-ux-guideline": {
    ko: {
      description: "UI 기능 정의 부재로 발생한 비효율을 속성·메서드 기준 구조화와 시각화 문서로 해결한 사례",
      title: "UI 기능 정의 및 사용 가이드라인 작성",
      meta: "LULU.AI · 26년 1월 ~ 2월",
      headline: "UI 기능을 속성과 메서드 기준으로 구조화하고, 시각화된 컴포넌트 라이브러리 문서를 제작한 프로젝트입니다.",
      sections: [
        {
          id: "problem",
          title: "문제 정의",
          items: ["UI 기능 정의 부재로 불필요한 컴포넌트 제작을 반복했다.", "UI 사용 기준 부재로 서비스 내 UX 일관성이 저하됐다."]
        },
        {
          id: "goal",
          title: "목적",
          items: ["UI 기능 정의 표준화", "직군 무관 컴포넌트 파악 구조 구축", "일관된 UX 판단 기준 제공"]
        },
        {
          id: "approach",
          title: "해결 방법",
          items: ["공통 UI를 컴포넌트 단위로 정의했다.", "Claude Code로 시각화하여 컴포넌트 라이브러리 문서를 제작했다.", "기능별 의사결정 트리와 체크리스트를 설계했다."]
        },
        {
          id: "impact",
          title: "결과",
          items: ["중복 기능 컴포넌트 제작 0회", "디자인 리뷰 횟수 감소", "UI 관련 QA 티켓 발생 빈도 30% 감소"]
        },
        {
          id: "appendix",
          title: "Appendix",
          items: ["UI 기능 14종 정리", "시각화된 가이드 문서 제작", "의사결정 트리와 체크리스트 세트 정리"]
        }
      ]
    },
    en: {
      description: "Resolved inefficiencies from missing UI feature definitions through attribute/method-based structuring and visualized documentation.",
      title: "UI Feature Definition & Usage Guideline",
      meta: "LULU.AI · Jan 2026 - Feb 2026",
      headline: "Structured UI features by attributes and methods, and produced a visualized component library document.",
      sections: [
        {
          id: "problem",
          title: "Problem",
          items: [
            "Lack of UI feature definitions caused repeated creation of redundant components.",
            "Absence of UI usage standards degraded UX consistency across the service."
          ]
        },
        {
          id: "goal",
          title: "Goal",
          items: [
            "Standardize UI feature definitions",
            "Build a structure for cross-functional component comprehension",
            "Provide consistent UX decision-making criteria"
          ]
        },
        {
          id: "approach",
          title: "Approach",
          items: [
            "Defined common UI as component units.",
            "Created visualized component library documentation with Claude Code.",
            "Designed per-feature decision trees and checklists."
          ]
        },
        {
          id: "impact",
          title: "Result",
          items: [
            "Zero redundant component production",
            "Reduced design review frequency",
            "30% decrease in UI-related QA tickets"
          ]
        },
        {
          id: "appendix",
          title: "Appendix",
          items: [
            "Structured 14 UI feature types",
            "Created a visualized guideline document",
            "Compiled a decision-tree and checklist set"
          ]
        }
      ]
    }
  },
  "case-ai-doc-process": {
    ko: {
      description: "공통 프로세스 부재와 협업 도구별 자료 분산으로 단절된 워크플로우가 발생했고, 내부 제작 효율과 AI 대응 및 확장 측면에서 구조적 한계를 겪었습니다.",
      title: "AI 기반 업무 프로세스 개선",
      meta: "LULU.AI · 25년 12월 ~ 26년 3월",
      headline: "업무 프로세스 개선을 통해 분산된 자산을 통합하고, AI 중심의 통합 체계를 수립했습니다.",
      sections: [
        {
          id: "problem",
          title: "문제 정의",
          items: ["넓은 범위의 업무를 맡아 많은 산출물이 발생했고 문서 유지보수에 어려움이 있었다.", "문서 작성에 많은 시간을 사용해 제작을 위한 문서 전달이 늦어졌다."]
        },
        {
          id: "goal",
          title: "목표",
          items: [
            "제작에 필요한 기획 산출물(문서)을 2개 이하로 줄인다.",
            "모든 산출물을 하나의 플랫폼 또는 도구로 관리한다.",
            "스토리보드, 와이어 프레임을 하나의 자료로 병합하고 인터랙션이 가능한 형태로 제공한다.",
            "새로운 업무 프로세스에 동료들이 쉽게 적응할 수 있도록 한다.",
            "기획자는 문서 유지보수에 시간을 할애하지않는다."
          ]
        },
        {
          id: "approach",
          title: "방법",
          items: [
            "와이어프레임과 스토리보드를 바이브 코딩 프로토타입으로 대체해 직접 상호작용하며 UX 흐름을 파악할 수 있게 했다.",
            "기존 노션 문서에 있던 PRD, 정책, 개발 문서를 프로젝트 폴더에 업로드했다.",
            "문서를 웹에 배포해 문서와 프로토타입의 버전을 관리했다.",
            "Claude Code 에이전트를 생성해 주기적으로 문서의 정합성과 논리적 오류를 검사하도록 했다.",
            "문서를 HTML, JS, CSS 구조로 리팩터링했다.",
            "공통 UI를 컴포넌트화하여 토큰 사용량과 응답시간을 절감하였다.",
            "GitHub에서 프로젝트 폴더를 관리해 변경사항을 쉽게 추적하고 필요시 롤백할 수 있게 했다."
          ]
        },
        {
          id: "impact",
          title: "성과",
          items: [
            "핵심 산출물 2개 이하로 축소, 리드타임 1주 → 3일 단축",
            "정식 프로세스로 채택"
          ]
        }
      ]
    },
    en: {
      description: "Identified structural inefficiencies in document-heavy collaboration and reduced review lead time by 57% through prototyping and deployment integration.",
      title: "AI-Driven Workflow Process Improvement",
      meta: "LULU.AI · Dec 2025 - Mar 2026",
      headline: "Unified documents, prototypes, and deployment into one workflow to shorten production handoff lead time.",
      sections: [
        {
          id: "problem",
          title: "Problem",
          items: [
            "A broad scope of work generated too many deliverables and made documentation hard to maintain.",
            "Too much time went into writing documents, which delayed handoff to the production stage."
          ]
        },
        {
          id: "goal",
          title: "Goal",
          items: [
            "Reduce planning deliverables needed for production to two documents or fewer",
            "Manage all deliverables in a single platform or tool",
            "Merge them into one and provide them in an interactive format",
            "Help teammates adapt easily to the new workflow",
            "Automate document management"
          ]
        },
        {
          id: "approach",
          title: "Approach",
          items: [
            "Replaced wireframes and storyboards with vibe-coded prototypes so teammates could understand UX flow through direct interaction.",
            "Uploaded PRD, policy, and development documents from Notion into the project folder.",
            "Published the documents to the web to manage versions of both documents and prototypes.",
            "Created Claude Code agents to regularly check document consistency and logical errors.",
            "Refactored the documents into HTML, JS, and CSS.",
            "Componentized reusable UI.",
            "Managed the project folder in GitHub so changes were easy to track and roll back when needed."
          ]
        },
        {
          id: "impact",
          title: "Impact",
          items: [
            "Reduced key deliverables to 2 or fewer, lead time from 1 week to 3 days",
            "Adopted as the official process"
          ]
        }
      ]
    }
  }
};

const caseProjectConfigs = {
  "case-ux-guideline": {
    ko: {
      title: "UI 기능 정의 및 사용 가이드라인 작성",
      meta: "LULU.AI | 26년 1월 ~ 2월",
      summary: "UI 기능 정의 부재로 발생한 비효율을 속성·메서드 기준 구조화와 시각화 문서로 해결한 사례",
      tools: ["Notion", "Claude Code"],
      embed: {
        src: "https://docs.google.com/presentation/d/1DhTX-8InhJqA4VcBsKuDQQJUixgBSxnuT5aYxLHEcgg/embed?start=false&loop=false&delayms=3000",
        title: "UI 기획 / UX 가이드라인 제작 슬라이드"
      },
      href: "../cases/ko/case-ux-guideline.html",
      cta: "자세히 보기",
      appendixLink: undefined
    },
    en: {
      title: "UI Feature Definition & Usage Guideline",
      meta: "LULU.AI | Jan 2026 - Feb 2026",
      summary: "Resolved inefficiencies from missing UI feature definitions through attribute/method-based structuring and visualized documentation.",
      tools: ["Notion", "Claude Code"],
      embed: {
        src: "https://docs.google.com/presentation/d/1DhTX-8InhJqA4VcBsKuDQQJUixgBSxnuT5aYxLHEcgg/embed?start=false&loop=false&delayms=3000",
        title: "UI Planning / UX Guideline Development Slides"
      },
      href: "../cases/en/case-ux-guideline.html",
      cta: "View details",
      appendixLink: undefined
    }
  },
  "case-ai-doc-process": {
    ko: {
      title: "AI 기반 업무 프로세스 개선",
      meta: "LULU.AI | 25년 12월 ~ 26년 3월",
      summary: "공통 프로세스 부재와 협업 도구별 자료 분산으로 단절된 워크플로우가 발생했고, 내부 제작 효율과 AI 대응 및 확장 측면에서 구조적 한계를 겪었습니다.",
      tools: ["Claude Code", "GitHub"],
      embed: {
        src: "https://docs.google.com/presentation/d/12ibGkiLrSbeKzEz22CU-yXtYbGQJjqfX1J50p4LiF-o/embed?start=false&loop=false&delayms=3000",
        title: "AI 활용 업무 프로세스 개선 슬라이드"
      },
      href: "../cases/ko/case-ai-doc-process.html",
      cta: "자세히 보기",
      appendixLink: undefined
    },
    en: {
      title: "AI-Driven Workflow Process Improvement",
      meta: "LULU.AI | Dec 2025 - Mar 2026",
      summary: "Identified structural inefficiencies in document-heavy collaboration and reduced review lead time by 57% through prototyping and deployment integration.",
      tools: ["Claude Code", "GitHub"],
      embed: {
        src: "https://docs.google.com/presentation/d/12ibGkiLrSbeKzEz22CU-yXtYbGQJjqfX1J50p4LiF-o/embed?start=false&loop=false&delayms=3000",
        title: "AI-Driven Document Collaboration Process Improvement Slides"
      },
      href: "../cases/en/case-ai-doc-process.html",
      cta: "View details",
      appendixLink: undefined
    }
  }
};

function getSectionItems(data, id) {
  return data.sections.find((section) => section.id === id)?.items || [];
}

function buildCaseProject(slug, lang) {
  const data = caseContent[slug]?.[lang];
  const config = caseProjectConfigs[slug]?.[lang];

  if (!data || !config) return null;

  return {
    title: config.title || data.title,
    meta: config.meta || data.meta,
    summary: config.summary || data.description,
    problem: getSectionItems(data, "problem"),
    goal: getSectionItems(data, "goal"),
    approach: getSectionItems(data, "approach"),
    impact: getSectionItems(data, "impact"),
    appendix: getSectionItems(data, "appendix"),
    appendixLink: config.appendixLink,
    embed: config.embed,
    tools: config.tools || [],
    href: config.href,
    cta: config.cta,
  };
}

function buildCaseProjects(lang) {
  return Object.keys(caseProjectConfigs)
    .map((slug) => buildCaseProject(slug, lang))
    .filter(Boolean);
}

export { CASE_LABELS, caseContent, buildCaseProject, buildCaseProjects };
