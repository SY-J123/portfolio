"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import TabIntro from "@/components/TabIntro";
import TabDashboard from "@/components/TabDashboard";
import TabVocFeed from "@/components/TabVocFeed";
import AskAI from "@/components/AskAI";

const TABS = ["프로젝트 소개", "대시보드", "VOC 피드"] as const;
type Tab = (typeof TABS)[number];

const TAB_HASH: Record<string, Tab> = {
  "#intro": "프로젝트 소개",
  "#dashboard": "대시보드",
  "#feed": "VOC 피드",
};
const HASH_TAB: Record<Tab, string> = {
  "프로젝트 소개": "#intro",
  "대시보드": "#dashboard",
  "VOC 피드": "#feed",
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("프로젝트 소개");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const tab = TAB_HASH[window.location.hash];
    if (tab) setActiveTab(tab);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.location.hash = HASH_TAB[activeTab];
  }, [activeTab, hydrated]);

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
      <Header tabs={TABS} activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as Tab)} />
      <main className="flex-1">
        {activeTab === "프로젝트 소개" && <TabIntro />}
        {activeTab === "대시보드" && <TabDashboard />}
        {activeTab === "VOC 피드" && <TabVocFeed />}
      </main>
      {(activeTab === "대시보드" || activeTab === "VOC 피드") && <AskAI />}
    </div>
  );
}
