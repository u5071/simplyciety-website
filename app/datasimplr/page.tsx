import type { Metadata } from "next";
import DataSimplrContent from "./DataSimplrContent";

export const metadata: Metadata = {
  title: "dataSimplr — 데이터팀 없는 팀을 위한 AI 데이터 플랫폼",
  description:
    "dataSimplr — 데이터팀이 없는 팀을 위한 AI 데이터 플랫폼. RDB·NoSQL·그래프·온톨로지로 데이터를 쉽게 적재하고, 에이전트가 분석하고 일합니다. 2026년 10월 18일 출시 · 대기명단 등록.",
  keywords: ["dataSimplr", "AI data platform", "AI 데이터 플랫폼", "multi-model database", "graph", "ontology", "data agents", "MCP", "waitlist", "simplyciety"],
  alternates: { canonical: "https://simplyciety.com/datasimplr" },
  openGraph: {
    url: "https://simplyciety.com/datasimplr",
    title: "dataSimplr — The data platform for teams without a data team",
    description: "Load tables, JSON and graphs. Ask in plain language. Let agents do the work. Launching Oct 18, 2026 — join the waitlist.",
  },
};

const PRODUCT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "dataSimplr",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  releaseNotes: "Public beta launching 2026-10-18",
  description: "The data platform for teams without a data team — multi-model loading (relational, document, graph, ontology) with agent-based analysis.",
  url: "https://simplyciety.com/datasimplr",
  publisher: { "@type": "Organization", name: "simplyciety", url: "https://simplyciety.com" },
};

export default function DataSimplrPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_SCHEMA) }} />
      <DataSimplrContent />
    </>
  );
}
