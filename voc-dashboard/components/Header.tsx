"use client";

import { useEffect, useState } from "react";
import { getReviewCount, getDateRange } from "@/lib/queries";

interface HeaderProps {
  tabs: readonly string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

function fmt(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export default function Header({ tabs, activeTab, onTabChange }: HeaderProps) {
  const [count, setCount] = useState(0);
  const [range, setRange] = useState<{ from: string | null; to: string | null }>({ from: null, to: null });

  useEffect(() => {
    getReviewCount().then(setCount);
    getDateRange().then(setRange);
  }, []);

  const rangeText = range.from && range.to ? `${fmt(range.from)} ~ ${fmt(range.to)}` : "";

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-12">
        <div className="flex items-center gap-8">
          <span className="text-sm font-semibold tracking-tight text-foreground">토스 VOC 대시보드</span>
          <nav className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-3 py-1 text-sm transition-colors rounded-md ${
                  activeTab === tab
                    ? "font-semibold text-foreground bg-muted"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <span className="text-xs text-muted-foreground">
          {count.toLocaleString()}건{rangeText && <> · {rangeText}</>}
        </span>
      </div>
    </header>
  );
}
