"use client";

import { useEffect, useState } from "react";
import { useLang } from "../contexts/LanguageContext";

// Illustrative product UI for the dataSimplr hero. Sample data only.

type View = "table" | "document" | "graph" | "ontology";

const VIEWS: { id: View; label: string; ko: string }[] = [
  { id: "table", label: "RDB", ko: "표" },
  { id: "document", label: "NoSQL", ko: "문서" },
  { id: "graph", label: "Graph", ko: "연결" },
  { id: "ontology", label: "Ontology", ko: "의미" },
];

const SOURCES = [
  { name: "orders.xlsx", kind: "Sheet", view: "table" as View },
  { name: "customers", kind: "MySQL", view: "table" as View },
  { name: "events.json", kind: "JSON", view: "document" as View },
  { name: "reviews.pdf", kind: "Docs", view: "document" as View },
];

const ROWS = [
  ["A-1042", "c_381", "Summer Essay Set", "2", "$38.00"],
  ["A-1043", "c_207", "Refill Notebook", "1", "$12.50"],
  ["A-1044", "c_381", "Book Cover L", "1", "$9.90"],
  ["A-1045", "c_•••", "Summer Essay Set", "3", "$57.00"],
];

function TableView() {
  return (
    <div className="text-[11px] font-mono">
      <div className="grid grid-cols-[1fr_0.8fr_1.8fr_0.5fr_0.9fr] gap-3 px-4 py-2 text-text-muted border-b border-border">
        <span>order_id</span><span>customer</span><span>product</span><span>qty</span><span className="text-right">amount</span>
      </div>
      {ROWS.map((r, i) => (
        <div key={i} className="grid grid-cols-[1fr_0.8fr_1.8fr_0.5fr_0.9fr] gap-3 px-4 py-2.5 text-text border-b border-border">
          <span>{r[0]}</span>
          <span className={r[1].includes("•") ? "text-accent" : ""}>{r[1]}</span>
          <span className="truncate">{r[2]}</span>
          <span>{r[3]}</span>
          <span className="text-right">{r[4]}</span>
        </div>
      ))}
      <p className="px-4 pt-3 text-[10px] text-text-muted">join key detected · orders.customer → customers.id</p>
    </div>
  );
}

function DocumentView() {
  return (
    <pre className="px-5 py-4 text-[11px] leading-[1.8] font-mono text-text-secondary whitespace-pre">
{`{
  "event": "add_to_cart",
  "user": "c_381",
  "item": { "sku": "SE-01", "source": "youtube" },
  "ts": "2026-09-01T09:17:02Z",
  "review": {
    "stars": 5,
    "text": "Came for the cover, stayed for the prose",
    "topics": ["design", "writing"]  `}<span className="text-accent">{"// extracted"}</span>{`
  }
}`}
    </pre>
  );
}

function GraphView() {
  const nodes = [
    { x: 70, y: 70, l: "Customer", gold: true },
    { x: 230, y: 45, l: "Order" },
    { x: 380, y: 85, l: "Product", gold: true },
    { x: 150, y: 175, l: "Channel" },
    { x: 330, y: 190, l: "Review" },
  ];
  const edges: [number, number, string][] = [
    [0, 1, "PLACED"], [1, 2, "CONTAINS"], [0, 3, "CAME_FROM"], [0, 4, "WROTE"], [4, 2, "ABOUT"],
  ];
  return (
    <svg viewBox="0 0 450 230" className="w-full h-full" aria-hidden>
      {edges.map(([a, b, l], i) => (
        <g key={i}>
          <line x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="var(--ds-accent)" strokeOpacity=".35" className="ds-dash" />
          <text x={(nodes[a].x + nodes[b].x) / 2} y={(nodes[a].y + nodes[b].y) / 2 - 5} fill="var(--ds-text-muted)" fontSize="8" textAnchor="middle" fontFamily="monospace">{l}</text>
        </g>
      ))}
      {nodes.map((n) => (
        <g key={n.l}>
          <circle cx={n.x} cy={n.y} r="22" fill="var(--ds-elevated)" stroke="var(--ds-accent)" strokeOpacity={n.gold ? 0.9 : 0.4} />
          <text x={n.x} y={n.y + 3} fill={n.gold ? "var(--ds-accent-strong)" : "var(--ds-text-secondary)"} fontSize="9" textAnchor="middle">{n.l}</text>
        </g>
      ))}
    </svg>
  );
}

function OntologyView() {
  const terms = [
    { t: "Repeat buyer", d: "Customer with 2+ orders in 90 days", s: "approved" },
    { t: "Net revenue", d: "amount − refunds − coupons", s: "approved" },
    { t: "Active customer", d: "Any event in the last 30 days", s: "suggested" },
  ];
  return (
    <div className="px-4 py-3 flex flex-col gap-2">
      {terms.map((x) => (
        <div key={x.t} className="flex items-center justify-between gap-3 px-3 py-2.5 border border-border">
          <div className="min-w-0">
            <p className="text-[12px] text-text">{x.t}</p>
            <p className="text-[10px] text-text-muted font-mono truncate">{x.d}</p>
          </div>
          <span
            className="text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 flex-shrink-0"
            style={{ color: x.s === "approved" ? "var(--ds-accent)" : "var(--ds-text-muted)", border: `1px solid ${x.s === "approved" ? "rgb(var(--accent-rgb) / .4)" : "rgb(var(--hairline) / .1)"}` }}
          >
            {x.s}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ProductWindow() {
  const { lang } = useLang();
  const [view, setView] = useState<View>("table");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setView((v) => VIEWS[(VIEWS.findIndex((x) => x.id === v) + 1) % VIEWS.length].id);
    }, 3600);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="surface-dark relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* glow */}
      <div className="absolute -inset-px pointer-events-none" style={{ background: "linear-gradient(180deg, rgb(var(--accent-rgb) / .35), rgb(var(--accent-rgb) / 0) 60%)", padding: 1 }} />
      <div className="relative bg-elevated border border-border shadow-[0_40px_120px_-40px_rgb(var(--accent-rgb)/0.25)]">
        {/* title bar */}
        <div className="flex items-center gap-2 px-4 h-10 border-b border-border">
          <span className="w-2.5 h-2.5 rounded-full bg-border" />
          <span className="w-2.5 h-2.5 rounded-full bg-border" />
          <span className="w-2.5 h-2.5 rounded-full bg-border" />
          <span className="ml-3 text-[11px] text-text-muted">
            data<span className="italic text-accent">Simplr</span> · acme-books
          </span>
          <span className="ml-auto text-[10px] text-text-muted hidden sm:inline">{lang === "ko" ? "화면 예시 · 가상 데이터" : "Illustrative · sample data"}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[190px_1fr]">
          {/* sources */}
          <aside className="hidden md:flex flex-col gap-1 p-3 border-r border-border">
            <p className="px-2 pt-1 pb-2 text-[9px] tracking-[0.25em] uppercase text-text-muted">Sources</p>
            {SOURCES.map((s) => (
              <button
                key={s.name}
                type="button"
                onClick={() => setView(s.view)}
                className="flex items-center justify-between px-2 py-2 text-left hover:bg-surface-tint transition-colors"
              >
                <span className="text-[12px] text-text truncate">{s.name}</span>
                <span className="text-[9px] text-text-muted">{s.kind}</span>
              </button>
            ))}
            <div className="mt-3 mx-2 flex items-center gap-2 text-[10px] text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {lang === "ko" ? "동기화됨 · 2분 전" : "Synced · 2 min ago"}
            </div>
            <div className="mt-2 mx-2 flex items-center gap-2 text-[10px] text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              {lang === "ko" ? "개인정보 3개 칼럼 가림" : "3 PII columns masked"}
            </div>
          </aside>

          {/* main */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1 px-3 h-11 border-b border-border overflow-x-auto" role="tablist">
              {VIEWS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  role="tab"
                  aria-selected={view === v.id}
                  onClick={() => setView(v.id)}
                  className="relative px-3 h-full text-[11px] tracking-wide whitespace-nowrap transition-colors"
                  style={{ color: view === v.id ? "var(--ds-text)" : "var(--ds-text-muted)" }}
                >
                  {v.label}
                  <span className="ml-1.5 text-[10px] text-text-muted">{lang === "ko" ? v.ko : ""}</span>
                  {view === v.id && <span className="absolute left-2 right-2 bottom-0 h-px bg-accent" />}
                </button>
              ))}
            </div>

            <div key={view} className="ds-fade h-[230px] overflow-hidden">
              {view === "table" && <TableView />}
              {view === "document" && <DocumentView />}
              {view === "graph" && <GraphView />}
              {view === "ontology" && <OntologyView />}
            </div>

            {/* agent bar */}
            <div className="border-t border-border p-3 md:p-4 flex flex-col gap-2.5">
              <div className="flex items-center gap-3 px-3 py-2.5 bg-surface-tint border border-border">
                <span className="text-accent text-xs">✦</span>
                <span className="text-[12px] text-text truncate">
                  {lang === "ko" ? "지난달 재구매 고객이 가장 많이 산 상품은?" : "What did repeat buyers purchase most last month?"}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-1 text-[11px]">
                <span className="text-accent">Analyst</span>
                <span className="text-text">Summer Essay Set · 41%</span>
                <span className="text-text-muted">|</span>
                <span className="text-text-muted font-mono text-[10px]">sources: orders ⋈ customers · def: Repeat buyer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
