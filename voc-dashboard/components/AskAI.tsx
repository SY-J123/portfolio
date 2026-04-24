"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type Message = { role: "user" | "assistant"; content: string };

const PRESETS: { q: string; a: string; keys: string[] }[] = [
  {
    q: "이번 기간 가장 많은 이슈는?",
    keys: ["많은", "이슈", "상위", "전체"],
    a: "3월 1일~4월 15일 집계에서 광고·알림 과다(42건)와 앱 렉·속도 저하(33건)가 가장 많이 언급됐어요. 두 주제가 전체 버그 리포트 중 약 18%를 차지합니다.",
  },
  {
    q: "버그 리포트 상위 3개는?",
    keys: ["버그", "bug"],
    a: "1) 앱 렉·속도 저하 33건\n2) 만보기·복권 오류 21건\n3) 광고 보상 미지급 20건",
  },
  {
    q: "눈에 띄는 기능 요청은?",
    keys: ["기능", "요청", "feature"],
    a: "'필터 추가' 관련 요청이 12건으로 가장 많아요. 주로 거래내역·알림센터에서 기간·카테고리 필터를 요구합니다. 다음은 '다크모드 개선' 8건.",
  },
  {
    q: "스토어별 차이가 있어?",
    keys: ["app store", "앱스토어", "play", "플레이", "차이", "스토어"],
    a: "App Store는 UI/UX 관련 언급 비중(약 35%)이 더 높고, Google Play는 성능·광고 관련 비중(약 48%)이 더 큽니다. 사용자층과 업데이트 반영 속도 차이로 해석됩니다.",
  },
  {
    q: "지난주 대비 늘어난 주제는?",
    keys: ["지난주", "늘어난", "증가", "추이"],
    a: "4월 2주차에 'UI/UX 변경·불편'(30건)이 전주 대비 2.1배 증가했어요. 4/8 업데이트 이후 홈 개편에 대한 불만이 집중됐습니다.",
  },
  {
    q: "앱 렉 문제, 얼마나 심각해?",
    keys: ["렉", "느", "속도", "성능"],
    a: "'앱 렉·속도 저하' 주제는 기간 전체 33건. 주당 평균 5~7건으로 꾸준히 등장하는 장기 이슈이며, 별점 1~2점 리뷰에서 주로 발견됩니다.",
  },
];

const FALLBACK =
  "데모 환경이라 미리 준비된 질문에만 답할 수 있어요. 아래 추천 질문을 이용해 보세요.";

const INTRO =
  "안녕하세요. VOC 대시보드를 요약해 드려요. 비용 문제로 실제 LLM 호출 대신 미리 준비된 답변을 반환하는 데모이니, 아래 추천 질문을 눌러 보세요.";

function matchPreset(input: string): string {
  const lower = input.toLowerCase().trim();
  if (!lower) return FALLBACK;
  for (const p of PRESETS) {
    if (p.q === input) return p.a;
    if (p.keys.some((k) => lower.includes(k.toLowerCase()))) return p.a;
  }
  return FALLBACK;
}

export default function AskAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: INTRO },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing, open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: "user", content: trimmed }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: matchPreset(trimmed) },
      ]);
      setTyping(false);
    }, 450);
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="AI에게 질문하기"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z" />
            <path d="M19 3 L19.6 5 L21.5 5.5 L19.6 6 L19 8 L18.4 6 L16.5 5.5 L18.4 5 Z" />
          </svg>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[560px] rounded-2xl border border-border bg-background shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                >
                  <path d="M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z" />
                </svg>
              </span>
              <p className="text-sm font-semibold leading-tight">
                VOC에게 물어보기
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => setOpen(false)}
              aria-label="닫기"
            >
              ✕
            </Button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-3 py-3 space-y-2"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm whitespace-pre-line leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="rounded-xl px-3 py-2 bg-muted text-muted-foreground text-sm">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce" />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Suggested chips */}
          <div className="px-3 pt-2 pb-1 border-t border-border">
            <p className="text-[11px] text-muted-foreground mb-1.5">
              추천 질문
            </p>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p.q}
                  type="button"
                  onClick={() => send(p.q)}
                  disabled={typing}
                  className="text-[11px] px-2 py-1 rounded-full border border-border bg-background hover:bg-muted disabled:opacity-50 transition"
                >
                  {p.q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 px-3 py-3 border-t border-border"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="질문을 입력해 보세요"
              className="flex-1 h-9 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
              disabled={typing}
            />
            <Button
              type="submit"
              size="sm"
              disabled={typing || !input.trim()}
            >
              전송
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
