// CMS-ready content layer for the AI Readiness Assessment.
// Edit questions, scoring copy, and recommendations here — the page reads everything from this module.

export type B = { ko: string; en: string };

/* ─────────────────────────── Context questions ─────────────────────────── */

export type ContextId = "industry" | "size" | "goal";

export type ContextQuestion = {
  kind: "context";
  id: ContextId;
  question: B;
  help?: B;
  options: { id: string; label: B }[];
};

/* ─────────────────────────── Maturity dimensions ───────────────────────── */

export type DimensionId = "foundation" | "semantics" | "unstructured" | "governance" | "adoption" | "people";

export type DimensionQuestion = {
  kind: "dimension";
  id: DimensionId;
  short: B; // label on the radar chart
  question: B;
  help: B;
  // index 0..3 → maturity score 1..4
  options: [B, B, B, B];
  // shown when this dimension scores ≤ 2
  action: B;
};

export type Question = ContextQuestion | DimensionQuestion;

const L = (ko: string, en: string): B => ({ ko, en });

export const QUESTIONS: Question[] = [
  {
    kind: "context",
    id: "industry",
    question: L("어떤 산업에 계신가요?", "Which industry are you in?"),
    options: [
      { id: "retail", label: L("유통 · 커머스", "Retail & commerce") },
      { id: "media", label: L("출판 · 미디어 · 콘텐츠", "Publishing & media") },
      { id: "finance", label: L("금융 · 보험", "Finance & insurance") },
      { id: "manufacturing", label: L("제조", "Manufacturing") },
      { id: "logistics", label: L("물류 · SCM", "Logistics & SCM") },
      { id: "services", label: L("서비스 · B2B SaaS", "Services & B2B SaaS") },
      { id: "public", label: L("공공 · 교육", "Public sector & education") },
      { id: "other", label: L("기타", "Other") },
    ],
  },
  {
    kind: "context",
    id: "size",
    question: L("조직 규모와 데이터 인력은 어느 정도인가요?", "How large is your organization and data team?"),
    options: [
      { id: "solo", label: L("50명 미만 · 데이터 전담 없음", "Under 50 · no dedicated data role") },
      { id: "small", label: L("50–300명 · 데이터 담당 1–2명", "50–300 · 1–2 data people") },
      { id: "mid", label: L("300–1,000명 · 데이터팀 운영", "300–1,000 · a data team") },
      { id: "large", label: L("1,000명 이상 · 데이터/AI 조직 보유", "1,000+ · a data & AI organization") },
    ],
  },
  {
    kind: "dimension",
    id: "foundation",
    short: L("데이터 기반", "Data foundation"),
    question: L("업무 데이터는 얼마나 연결돼 있나요?", "How connected is your business data?"),
    help: L("주문·고객·재고·마케팅 데이터가 한곳에서 같은 키로 이어지는지", "Whether orders, customers, inventory and marketing data meet in one place on shared keys"),
    options: [
      L("엑셀·개별 시스템에 흩어져 있고, 필요할 때마다 수작업으로 합친다", "Scattered across spreadsheets and systems; merged by hand when needed"),
      L("일부는 DB에 있지만 시스템 간 연결 키가 맞지 않는다", "Some data is in databases, but join keys don't line up across systems"),
      L("DW·레이크하우스에 주요 데이터가 매일 자동으로 모인다", "Core data lands in a warehouse or lakehouse daily, automatically"),
      L("실시간에 가깝게 통합되고, 계보(lineage)와 품질 모니터링이 있다", "Near-real-time integration with lineage and quality monitoring"),
    ],
    action: L(
      "핵심 엔터티(고객·상품·주문)의 연결 키를 정하고, 수작업 병합을 자동 적재로 바꾸는 것부터 시작하세요.",
      "Define join keys for core entities (customer, product, order) and replace manual merges with automated loading."
    ),
  },
  {
    kind: "dimension",
    id: "semantics",
    short: L("정의 · 품질", "Semantics & quality"),
    question: L("'매출', '활성 고객' 같은 지표의 뜻이 조직 전체에서 같나요?", "Do metrics like “revenue” or “active customer” mean the same thing everywhere?"),
    help: L("AI가 정확히 답하려면 지표 정의와 데이터 설명(카탈로그)이 필요합니다", "AI needs shared metric definitions and a data catalog to answer correctly"),
    options: [
      L("부서마다 기준이 달라 같은 질문에 숫자가 여러 개 나온다", "Each team has its own definition; one question yields many numbers"),
      L("핵심 지표 몇 개만 문서로 정리돼 있다", "A few key metrics are documented"),
      L("전사 지표 정의와 데이터 카탈로그가 운영된다", "Company-wide metric definitions and a data catalog are in place"),
      L("시맨틱 레이어·온톨로지로 정의가 코드화돼 AI와 BI가 함께 쓴다", "Definitions are codified in a semantic layer or ontology shared by AI and BI"),
    ],
    action: L(
      "자주 묻는 지표 10개의 정의를 한 장에 적고, 칼럼 설명을 붙인 카탈로그를 만드세요. AI 답변 정확도가 가장 크게 오르는 지점입니다.",
      "Write down definitions for your ten most-asked metrics and start a catalog with column descriptions — the single biggest lever for AI answer accuracy."
    ),
  },
  {
    kind: "dimension",
    id: "unstructured",
    short: L("비정형 데이터", "Unstructured data"),
    question: L("문서·상담 기록·리뷰 같은 비정형 데이터를 활용하고 있나요?", "Do you make use of documents, support logs and reviews?"),
    help: L("RAG·에이전트 시대에는 텍스트·음성이 가장 큰 자산입니다", "In the era of RAG and agents, text and voice are among your biggest assets"),
    options: [
      L("파일로 쌓여만 있고 검색도 어렵다", "Stored as files only; hard even to search"),
      L("일부를 사람이 읽고 수작업으로 분류한다", "People read and tag some of it by hand"),
      L("텍스트화·분류를 자동화해 분석에 쓴다", "Transcription and classification are automated for analysis"),
      L("사내 문서를 RAG·지식그래프로 연결해 AI가 근거로 인용한다", "Company documents feed RAG or a knowledge graph that AI cites as sources"),
    ],
    action: L(
      "상담·리뷰·계약서 중 한 영역을 골라 텍스트화 → 분류 → 검색까지 작게 파일럿하세요.",
      "Pick one area — support calls, reviews or contracts — and pilot transcription → classification → search."
    ),
  },
  {
    kind: "dimension",
    id: "governance",
    short: L("거버넌스 · 보안", "Governance & security"),
    question: L("AI에 데이터를 넣을 때의 기준과 통제가 있나요?", "Do you have rules and controls for putting data into AI?"),
    help: L("개인정보 마스킹, 접근 권한, 생성형 AI 사용 정책, 감사 기록", "PII masking, access control, a generative-AI usage policy, audit trails"),
    options: [
      L("기준이 없어 개인정보 때문에 AI 활용을 아예 막고 있다", "No rules — AI use is blocked because of personal data"),
      L("금지 사항 위주의 가이드만 있다", "Only a list of don'ts"),
      L("개인정보 가림·권한 관리·AI 사용 정책이 운영된다", "PII masking, access management and an AI usage policy are in place"),
      L("모델·에이전트 단위 권한과 감사 로그, 평가(eval) 체계까지 갖췄다", "Per-model and per-agent permissions, audit logs and evaluation are in place"),
    ],
    action: L(
      "외부 AI에 넣지 않을 데이터 목록, 가림 규칙, 승인 절차를 한 페이지 정책으로 먼저 정하세요.",
      "Start with a one-page policy: data that never goes to external AI, masking rules, and an approval path."
    ),
  },
  {
    kind: "dimension",
    id: "adoption",
    short: L("AI 활용", "AI adoption"),
    question: L("생성형 AI를 업무에 어떻게 쓰고 있나요?", "How is generative AI used in your work today?"),
    help: L("개인 사용 → 팀 워크플로 → 에이전트·자동화 → 운영 중인 AI 제품", "Individual use → team workflows → agents & automation → AI in production"),
    options: [
      L("개인이 가끔 ChatGPT·Claude를 쓰는 수준", "Individuals occasionally use ChatGPT or Claude"),
      L("팀 단위로 프롬프트·템플릿을 공유해 반복 업무에 쓴다", "Teams share prompts and templates for repeat work"),
      L("사내 데이터와 연결된 어시스턴트·에이전트를 파일럿 중이다", "Piloting assistants or agents connected to company data"),
      L("에이전트·AI 기능이 운영 중이며 성과를 측정한다", "Agents or AI features run in production with measured outcomes"),
    ],
    action: L(
      "반복되고 · 형식이 있고 · 사람이 검수할 수 있는 업무 한 가지를 골라 에이전트로 자동화하고 효과를 측정하세요.",
      "Choose one task that is repetitive, structured and human-reviewable, automate it with an agent, and measure the effect."
    ),
  },
  {
    kind: "dimension",
    id: "people",
    short: L("조직 · 역량", "People & operating model"),
    question: L("AI·데이터를 추진하는 조직과 역량은 어떤가요?", "How ready are your people and operating model?"),
    help: L("경영진 스폰서십, 책임자, 현업의 데이터·AI 리터러시", "Executive sponsorship, clear ownership, and data & AI literacy in the business"),
    options: [
      L("책임자가 없고 관심 있는 개인에 의존한다", "No owner — it depends on a few interested individuals"),
      L("담당자는 있지만 현업의 참여와 역량이 부족하다", "There is an owner, but business teams lack skills and engagement"),
      L("경영진 목표가 있고 현업 교육·챔피언 제도가 운영된다", "Leadership sets goals; training and champion programs run"),
      L("AI가 조직 목표·예산·평가 체계에 녹아 있다", "AI is built into goals, budgets and performance reviews"),
    ],
    action: L(
      "경영진 한 명을 스폰서로 두고, 현업 챔피언과 함께 '읽히는' 분석물·교육을 분기마다 돌리세요.",
      "Secure one executive sponsor and run a quarterly cadence of readable analyses and training with business champions."
    ),
  },
  {
    kind: "context",
    id: "goal",
    question: L("AI로 가장 먼저 풀고 싶은 문제는 무엇인가요?", "What do you most want AI to solve first?"),
    options: [
      { id: "analytics", label: L("자연어 데이터 분석 · 리포트 자동화", "Natural-language analytics & reporting") },
      { id: "agents", label: L("업무 자동화 · AI 에이전트", "Workflow automation & AI agents") },
      { id: "knowledge", label: L("사내 지식 검색 (RAG · 지식그래프)", "Knowledge search (RAG & knowledge graph)") },
      { id: "cx", label: L("고객 경험 · 추천 · 상담", "Customer experience, recommendations & support") },
      { id: "forecast", label: L("수요예측 · 의사결정 지원", "Forecasting & decision support") },
      { id: "strategy", label: L("AI 전략 · 거버넌스 수립", "AI strategy & governance") },
    ],
  },
];

export const DIMENSIONS = QUESTIONS.filter((q): q is DimensionQuestion => q.kind === "dimension");

/* ─────────────────────────────── Results ──────────────────────────────── */

export type StageId = "foundation" | "explore" | "scale" | "native";

export const STAGES: Record<StageId, { name: B; desc: B; range: string }> = {
  foundation: {
    name: L("Foundation · 기반 구축", "Foundation"),
    range: "0–29",
    desc: L(
      "AI보다 데이터 기반이 먼저인 단계입니다. 흩어진 데이터를 잇고 기준을 세우면 이후 모든 AI 투자의 효과가 커집니다.",
      "Data foundations come before AI. Connecting scattered data and setting standards multiplies the return on every AI investment that follows."
    ),
  },
  explore: {
    name: L("Explore · 탐색", "Explore"),
    range: "30–54",
    desc: L(
      "가능성은 확인했지만 개인·부분 활용에 머물러 있습니다. 우선순위 한두 개에 집중해 사내 데이터와 연결된 파일럿이 필요합니다.",
      "You've seen the potential, but use is still individual or partial. Focus on one or two priorities and pilot AI connected to your own data."
    ),
  },
  scale: {
    name: L("Scale · 확산", "Scale"),
    range: "55–79",
    desc: L(
      "기반과 파일럿이 갖춰졌습니다. 정의·거버넌스를 코드화하고 에이전트를 운영 업무로 넓힐 시점입니다.",
      "Foundations and pilots are in place. Now codify definitions and governance, and extend agents into day-to-day operations."
    ),
  },
  native: {
    name: L("AI-native · 내재화", "AI-native"),
    range: "80–100",
    desc: L(
      "AI가 조직 운영에 녹아 있습니다. 평가 체계와 데이터 수익화 등 다음 가치를 설계할 단계입니다.",
      "AI is part of how you operate. The next step is rigorous evaluation and new value such as data products."
    ),
  },
};

export type ServiceId = "Simply-Scan" | "Simply-Map" | "Simply-Pipeline" | "Simply-Brain" | "Simply-Literacy" | "Simply-Leader";

export type ServiceDef = {
  name: ServiceId;
  sub: B;
  desc: B;
  duration: B;
  serviceType: "consulting" | "platform" | "education";
};

export const SERVICES: Record<ServiceId, ServiceDef> = {
  "Simply-Scan": {
    name: "Simply-Scan",
    sub: L("AI 준비도 정밀 진단", "In-depth AI readiness assessment"),
    desc: L(
      "6개 영역을 인터뷰·데이터 점검으로 정밀 진단하고, 우선순위가 매겨진 90일 실행 로드맵을 드립니다.",
      "Interviews and data checks across all six dimensions, delivered as a prioritized 90-day roadmap."
    ),
    duration: L("2 — 4주", "2 — 4 weeks"),
    serviceType: "consulting",
  },
  "Simply-Map": {
    name: "Simply-Map",
    sub: L("AX 전략 · AI 거버넌스 설계", "AX strategy & AI governance"),
    desc: L(
      "경영진과 함께 AI 우선순위, 데이터·AI 사용 정책, 권한·평가 체계, OKR을 설계합니다.",
      "Co-designs AI priorities, data & AI usage policy, access and evaluation frameworks, and OKRs with leadership."
    ),
    duration: L("1 — 3개월", "1 — 3 months"),
    serviceType: "consulting",
  },
  "Simply-Pipeline": {
    name: "Simply-Pipeline",
    sub: L("AI-ready 데이터 기반 구축", "AI-ready data foundation"),
    desc: L(
      "흩어진 데이터를 자동 적재하고 연결 키·카탈로그를 갖춘 데이터 기반을 구축합니다.",
      "Automated ingestion into a data foundation with shared keys and a catalog."
    ),
    duration: L("2 — 4개월", "2 — 4 months"),
    serviceType: "platform",
  },
  "Simply-Brain": {
    name: "Simply-Brain",
    sub: L("RAG · 에이전트 · AI 기능 구현", "RAG, agents & AI features"),
    desc: L(
      "사내 데이터에 연결된 RAG·에이전트·예측 모델을 MVP부터 운영까지 구현하고 평가 체계를 붙입니다.",
      "Builds RAG, agents and predictive models on your data — from MVP to production, with evaluation built in."
    ),
    duration: L("3 — 6개월", "3 — 6 months"),
    serviceType: "platform",
  },
  "Simply-Literacy": {
    name: "Simply-Literacy",
    sub: L("데이터 · AI 리터러시 프로그램", "Data & AI literacy program"),
    desc: L(
      "경영진·팀장·실무자 레벨별로 AI를 업무에 쓰는 역량과 챔피언 조직을 만듭니다.",
      "Level-based training for executives, managers and ICs, plus a champion network."
    ),
    duration: L("4 — 8주", "4 — 8 weeks"),
    serviceType: "education",
  },
  "Simply-Leader": {
    name: "Simply-Leader",
    sub: L("경영진 AX 브리핑", "Executive AX briefing"),
    desc: L(
      "C-level이 AI 투자와 리스크를 판단할 수 있도록 업계 사례 중심으로 브리핑합니다.",
      "Case-driven briefings so C-level leaders can judge AI investments and risks."
    ),
    duration: L("반일 — 1일", "Half day — full day"),
    serviceType: "education",
  },
};

const WEAKEST_TO_SERVICE: Record<DimensionId, ServiceId> = {
  foundation: "Simply-Pipeline",
  semantics: "Simply-Scan",
  unstructured: "Simply-Brain",
  governance: "Simply-Map",
  adoption: "Simply-Brain",
  people: "Simply-Literacy",
};

export type Answers = Partial<Record<ContextId, string>> & Partial<Record<DimensionId, number>>;

export type Result = {
  score: number; // 0–100
  stage: StageId;
  dims: { id: DimensionId; score: number }[]; // 1–4
  gaps: DimensionId[]; // weakest first, score ≤ 2, max 3
  service: ServiceId;
  dataSimplrFit: boolean;
};

export function computeResult(a: Answers): Result {
  const dims = DIMENSIONS.map((d) => ({ id: d.id, score: (a[d.id] as number | undefined) ?? 1 }));
  const avg = dims.reduce((s, d) => s + d.score, 0) / dims.length;
  const score = Math.round(((avg - 1) / 3) * 100);
  const stage: StageId = score < 30 ? "foundation" : score < 55 ? "explore" : score < 80 ? "scale" : "native";

  const gaps = [...dims]
    .filter((d) => d.score <= 2)
    .sort((x, y) => x.score - y.score)
    .slice(0, 3)
    .map((d) => d.id);

  const weakest = [...dims].sort((x, y) => x.score - y.score)[0].id;
  let service: ServiceId = WEAKEST_TO_SERVICE[weakest];
  if (a.goal === "strategy" && (a.size === "mid" || a.size === "large")) service = "Simply-Leader";
  else if (a.goal === "strategy") service = "Simply-Map";

  const dataGap = (a.foundation ?? 1) <= 2 || (a.semantics ?? 1) <= 2;
  const dataSimplrFit = dataGap && (a.size === "solo" || a.size === "small");

  return { score, stage, dims, gaps, service, dataSimplrFit };
}
