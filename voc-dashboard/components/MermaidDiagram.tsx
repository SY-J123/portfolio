"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "neutral",
  fontFamily: "inherit",
  flowchart: { htmlLabels: true, curve: "basis" },
});

let counter = 0;

export default function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const idRef = useRef(`mermaid-${++counter}-${Date.now()}`);

  useEffect(() => {
    if (!ref.current) return;
    let cancelled = false;
    mermaid
      .render(idRef.current, chart)
      .then(({ svg }) => {
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      })
      .catch((e) => {
        if (!cancelled && ref.current)
          ref.current.innerHTML = `<pre class="text-xs text-red-600">${String(e)}</pre>`;
      });
    return () => {
      cancelled = true;
    };
  }, [chart]);

  return <div ref={ref} className="flex justify-center" />;
}
