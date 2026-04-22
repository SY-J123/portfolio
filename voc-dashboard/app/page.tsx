"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import TabIntro from "@/components/TabIntro";
import TabDashboard from "@/components/TabDashboard";

const TABS = ["프로젝트 소개", "대시보드"] as const;
type Tab = (typeof TABS)[number];

const TAB_HASH: Record<string, Tab> = {
  "#intro": "프로젝트 소개",
  "#dashboard": "대시보드",
};
const HASH_TAB: Record<Tab, string> = {
  "프로젝트 소개": "#intro",
  "대시보드": "#dashboard",
};

function getInitialTab(): Tab {
  if (typeof window === "undefined") return "프로젝트 소개";
  return TAB_HASH[window.location.hash] || "프로젝트 소개";
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>(getInitialTab);

  useEffect(() => {
    window.location.hash = HASH_TAB[activeTab];
  }, [activeTab]);

  useEffect(() => {
    const onHash = () => {
      const tab = TAB_HASH[window.location.hash];
      if (tab) setActiveTab(tab);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1">
        {activeTab === "프로젝트 소개" && <TabIntro />}
        {activeTab === "대시보드" && <TabDashboard />}
      </main>
    </div>
  );
}
