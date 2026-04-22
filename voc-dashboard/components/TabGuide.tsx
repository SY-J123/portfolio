"use client";

import { useState } from "react";
import { ATTRIBUTES, CATEGORIES, CAT_COLORS as CAT_DOT } from "@/lib/attributes";

export default function TabGuide() {
  const [activeCat, setActiveCat] = useState<string>("전략");

  const filtered = ATTRIBUTES.filter((a) => a.category === activeCat);

  return (
    <div>
      {/* 카테고리 필터 */}
      <div className="flex items-center gap-2 mb-4">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setActiveCat(c)}
            className={`px-3 py-1 text-base rounded-md transition ${
              activeCat === c ? "font-semibold bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"
            }`}>
            {c} <span className="text-xs opacity-60 ml-0.5">{ATTRIBUTES.filter(a => a.category === c).length}</span>
          </button>
        ))}
      </div>

      {/* 테이블 */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-base">
          <thead>
            <tr className="bg-slate-50 text-left text-xs text-slate-600 uppercase tracking-wider">
              <th className="px-4 py-3 w-10">#</th>
              <th className="px-4 py-3 w-24">카테고리</th>
              <th className="px-4 py-3 w-[160px]">속성명</th>
              <th className="px-4 py-3">설명</th>
              <th className="px-4 py-3">예시 VOC</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((attr, i) => (
              <tr key={attr.name} className="border-t border-slate-100 hover:bg-slate-50/50">
                <td className="px-4 py-3 tabular-nums">{i + 1}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${CAT_DOT[attr.category]}`} />
                    <span className="text-xs">{attr.category}</span>
                  </span>
                </td>
                <td className="px-4 py-3 font-medium">{attr.name}</td>
                <td className="px-4 py-3">{attr.desc}</td>
                <td className="px-4 py-3 italic">&ldquo;{attr.example}&rdquo;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
