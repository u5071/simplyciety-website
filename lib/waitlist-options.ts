// Waitlist form options — shared by the form (labels) and the API (allow-lists).

export type Opt = { value: string; ko: string; en: string };

export const WAITLIST_OPTIONS = {
  role: [
    { value: "exec", ko: "대표 · 경영진", en: "Founder · Executive" },
    { value: "product_ops", ko: "프로덕트 · 운영", en: "Product · Operations" },
    { value: "growth", ko: "마케팅 · 그로스", en: "Marketing · Growth" },
    { value: "data", ko: "데이터 · 분석", en: "Data · Analytics" },
    { value: "engineering", ko: "엔지니어 · AI 빌더", en: "Engineering · AI builder" },
    { value: "other", ko: "기타", en: "Other" },
  ],
  teamSize: [
    { value: "1-10", ko: "1–10명", en: "1–10" },
    { value: "11-50", ko: "11–50명", en: "11–50" },
    { value: "51-200", ko: "51–200명", en: "51–200" },
    { value: "201-1000", ko: "201–1,000명", en: "201–1,000" },
    { value: "1000+", ko: "1,000명+", en: "1,000+" },
  ],
  dataSources: [
    { value: "spreadsheets", ko: "스프레드시트", en: "Spreadsheets" },
    { value: "rdb", ko: "관계형 DB", en: "Relational DB" },
    { value: "nosql", ko: "NoSQL · 이벤트", en: "NoSQL · events" },
    { value: "graph", ko: "그래프 · 지식그래프", en: "Graph · knowledge graph" },
    { value: "docs", ko: "문서 · PDF", en: "Docs · PDF" },
    { value: "saas", ko: "SaaS (CRM·커머스·GA4)", en: "SaaS (CRM, commerce, GA4)" },
  ],
  aiStage: [
    { value: "exploring", ko: "검토 중", en: "Exploring" },
    { value: "adhoc", ko: "개인적으로 ChatGPT·Claude 사용", en: "Ad-hoc ChatGPT / Claude" },
    { value: "pilot", ko: "RAG · 에이전트 파일럿", en: "Piloting RAG / agents" },
    { value: "production", ko: "AI 기능 운영 중", en: "AI in production" },
  ],
  useCases: [
    { value: "nl_analytics", ko: "자연어 분석 · 리포트", en: "Natural-language analytics" },
    { value: "agents", ko: "에이전트 · 업무 자동화", en: "Agents & automation" },
    { value: "knowledge_graph", ko: "지식그래프 · 온톨로지", en: "Knowledge graph · ontology" },
    { value: "rag", ko: "사내 문서 RAG", en: "RAG over company docs" },
    { value: "integration", ko: "데이터 통합 (단일 기준)", en: "Data integration (single source of truth)" },
    { value: "governance", ko: "거버넌스 · 개인정보 보호", en: "Governance · PII protection" },
  ],
  timeline: [
    { value: "launch", ko: "출시 즉시", en: "At launch" },
    { value: "3m", ko: "3개월 내", en: "Within 3 months" },
    { value: "later", ko: "탐색 중", en: "Just exploring" },
  ],
} as const satisfies Record<string, readonly Opt[]>;

export const allowed = (key: keyof typeof WAITLIST_OPTIONS) =>
  new Set<string>(WAITLIST_OPTIONS[key].map((o) => o.value));
