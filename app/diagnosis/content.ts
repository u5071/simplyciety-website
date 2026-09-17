// CMS-ready content layer for the AI Readiness Diagnosis survey.
// To update questions, options, or service descriptions, edit this file only —
// the page component reads from here and does not need to change.
// When migrating to a headless CMS (Sanity, Contentful, etc.),
// replace this module's exports with async fetch calls from the CMS API.

export type B = { ko: string; en: string };
export type Level = 1 | 2 | 3 | 4;

export type Question = {
  id: "industry" | "maturity" | "pain" | "size";
  question: B;
  options: Array<{ id: string; label: B; hint?: B }>;
};

export const QUESTIONS: Question[] = [
  {
    id: "industry",
    question: {
      ko: "어떤 업종에 속해 있나요?",
      en: "What industry are you in?",
    },
    options: [
      { id: "retail", label: { ko: "유통 / 리테일", en: "Retail" } },
      { id: "finance", label: { ko: "금융 / 보험", en: "Finance & Insurance" } },
      { id: "manufacturing", label: { ko: "제조", en: "Manufacturing" } },
      { id: "service", label: { ko: "서비스 / HR", en: "Service & HR" } },
      { id: "logistics", label: { ko: "물류 / SCM", en: "Logistics & SCM" } },
      { id: "other", label: { ko: "기타", en: "Other" } },
    ],
  },
  {
    id: "maturity",
    question: {
      ko: "현재 조직의 AI/데이터 상황을 가장 잘 설명하는 것은?",
      en: "Which best describes your organization's current AI/data situation?",
    },
    options: [
      {
        id: "none",
        label: { ko: "AI/데이터를 전혀 활용하지 않고 있다", en: "Not using AI or data at all" },
        hint: { ko: "시작 방법조차 불분명한 상태", en: "Unclear even where to begin" },
      },
      {
        id: "exploring",
        label: { ko: "관심은 있지만 어디서 시작할지 모른다", en: "Interested but don't know where to start" },
        hint: { ko: "데이터는 있어도 활용 방법이 없음", en: "Have data but no way to act on it" },
      },
      {
        id: "building",
        label: { ko: "방향은 잡혔지만 실행 인프라·역량이 없다", en: "Have a direction but lack execution capability" },
        hint: { ko: "전략은 있고, 시스템이 필요한 단계", en: "Strategy set — need the systems to back it" },
      },
      {
        id: "scaling",
        label: { ko: "시스템은 있지만 현장에서 잘 활용하지 못한다", en: "Systems built but teams don't really use them" },
        hint: { ko: "기술보다 사람·문화가 병목인 상태", en: "People and culture are the bottleneck now, not tech" },
      },
    ],
  },
  {
    id: "pain",
    question: {
      ko: "지금 가장 급한 고민은 무엇인가요?",
      en: "What is your most pressing challenge right now?",
    },
    options: [
      {
        id: "roadmap",
        label: { ko: "AI 전략·로드맵이 없어서 뭘 해야 할지 모름", en: "No AI strategy or roadmap — unclear what to do" },
      },
      {
        id: "infra",
        label: { ko: "데이터 수집·저장 인프라 자체가 없음", en: "No data collection or storage infrastructure yet" },
      },
      {
        id: "feature",
        label: { ko: "기존 시스템에 AI/ML 기능을 추가하고 싶음", en: "Want to add AI/ML features to existing systems" },
      },
      {
        id: "literacy",
        label: { ko: "임직원 AI·데이터 활용 역량이 부족함", en: "Staff lack AI and data skills" },
      },
      {
        id: "exec",
        label: { ko: "경영진의 AI 이해와 의사결정 지원이 필요함", en: "Executives need AI understanding and decision support" },
      },
    ],
  },
  {
    id: "size",
    question: {
      ko: "회사 규모는 어느 정도인가요?",
      en: "What is your company size?",
    },
    options: [
      { id: "tiny", label: { ko: "10명 미만", en: "Under 10" } },
      { id: "small", label: { ko: "10 – 100명", en: "10 – 100" } },
      { id: "medium", label: { ko: "100 – 500명", en: "100 – 500" } },
      { id: "large", label: { ko: "500명 이상", en: "500+" } },
    ],
  },
];

export const LEVELS: Record<Level, { name: B; desc: B }> = {
  1: {
    name: { ko: "AI 준비 전 단계", en: "Pre-AI Stage" },
    desc: {
      ko: "AI 도입을 처음 검토하는 단계입니다. 조직 현황 진단과 방향 설정이 먼저입니다.",
      en: "You're exploring AI adoption for the first time. Diagnosis and direction-setting come before anything else.",
    },
  },
  2: {
    name: { ko: "AI 탐색 단계", en: "AI Exploration Stage" },
    desc: {
      ko: "데이터와 AI에 관심이 생긴 단계입니다. 명확한 로드맵과 우선순위가 필요합니다.",
      en: "You've developed interest in AI. You need a clear roadmap and prioritization to move forward.",
    },
  },
  3: {
    name: { ko: "AI 실행 단계", en: "AI Execution Stage" },
    desc: {
      ko: "전략은 있습니다. 이제 실제 시스템을 구축하고 AI를 작동시킬 실행 파트너가 필요합니다.",
      en: "You have a strategy. Now you need an execution partner to build real systems and make AI work.",
    },
  },
  4: {
    name: { ko: "AI 내재화 단계", en: "AI Embedding Stage" },
    desc: {
      ko: "기술은 갖춰졌습니다. 조직 전체가 AI를 일상으로 받아들이게 하는 것이 다음 과제입니다.",
      en: "The tech is in place. Making AI a daily habit across your entire organization is the next challenge.",
    },
  },
};

export type ServiceId =
  | "Simpli-Scan"
  | "Simpli-Map"
  | "Simpli-Pipeline"
  | "Simpli-Brain"
  | "Simpli-Literacy"
  | "Simpli-Leader";

export type ServiceDef = {
  name: ServiceId;
  sub: B;
  desc: B;
  duration: B;
  serviceType: "consulting" | "platform" | "education";
};

export const SERVICES: Record<ServiceId, ServiceDef> = {
  "Simpli-Scan": {
    name: "Simpli-Scan",
    sub: { ko: "AI 준비도 진단", en: "AI Readiness Assessment" },
    desc: {
      ko: "조직의 데이터 성숙도, AI 준비도, 복잡성 병목 지점을 분석해 실행 가능한 로드맵을 제공합니다.",
      en: "Analyzes your organization's data maturity, AI readiness, and complexity bottlenecks to deliver an actionable roadmap.",
    },
    duration: { ko: "2 — 4주", en: "2 — 4 weeks" },
    serviceType: "consulting",
  },
  "Simpli-Map": {
    name: "Simpli-Map",
    sub: { ko: "AX 전환 전략 수립", en: "AX Transformation Strategy" },
    desc: {
      ko: "임원진과 함께 AI 도입 우선순위, 거버넌스 체계, OKR을 설계합니다.",
      en: "Co-designs AI priorities, governance, and OKRs with your leadership team.",
    },
    duration: { ko: "1 — 3개월", en: "1 — 3 months" },
    serviceType: "consulting",
  },
  "Simpli-Pipeline": {
    name: "Simpli-Pipeline",
    sub: { ko: "데이터 파이프라인 구축", en: "Data Pipeline Build" },
    desc: {
      ko: "데이터 수집부터 DW 적재까지 AWS·Snowflake 기반 표준 파이프라인을 구축합니다.",
      en: "Builds a standard AWS·Snowflake pipeline from data ingestion to data warehouse loading.",
    },
    duration: { ko: "2 — 4개월", en: "2 — 4 months" },
    serviceType: "platform",
  },
  "Simpli-Brain": {
    name: "Simpli-Brain",
    sub: { ko: "AI 기능 연동·구현", en: "AI Feature Integration" },
    desc: {
      ko: "기존 시스템에 수요예측, LLM, 분류 모델을 연동합니다. MVP부터 운영까지 전 과정을 지원합니다.",
      en: "Integrates demand forecasting, LLMs, and classification models into existing systems. Full-cycle support from MVP to production.",
    },
    duration: { ko: "3 — 6개월", en: "3 — 6 months" },
    serviceType: "platform",
  },
  "Simpli-Literacy": {
    name: "Simpli-Literacy",
    sub: { ko: "데이터 리터러시 교육", en: "Data Literacy Program" },
    desc: {
      ko: "비개발자 임직원이 데이터로 판단하는 능력을 기릅니다. 경영진·팀장·실무자 레벨별 커리큘럼으로 운영됩니다.",
      en: "Builds data-driven decision-making skills across non-technical staff. Tiered curriculum for executives, managers, and ICs.",
    },
    duration: { ko: "4 — 8주", en: "4 — 8 weeks" },
    serviceType: "education",
  },
  "Simpli-Leader": {
    name: "Simpli-Leader",
    sub: { ko: "경영진 AX 브리핑", en: "Executive AI Briefing" },
    desc: {
      ko: "C-level·임원이 AI를 올바르게 이해하고 지시·판단할 수 있도록 하는 집중 프로그램입니다.",
      en: "An intensive program for C-level and executives to understand AI correctly and make informed decisions.",
    },
    duration: { ko: "반일 — 1일", en: "Half-day — Full day" },
    serviceType: "education",
  },
};

export type Answers = {
  industry: string;
  maturity: string;
  pain: string;
  size: string;
};

export function computeResult(answers: Answers): { level: Level; service: ServiceId } {
  const maturityToLevel: Record<string, Level> = {
    none: 1,
    exploring: 2,
    building: 3,
    scaling: 4,
  };

  const level: Level = maturityToLevel[answers.maturity] ?? 2;

  const painToService: Record<string, ServiceId> = {
    roadmap: "Simpli-Scan",
    infra: "Simpli-Pipeline",
    feature: "Simpli-Brain",
    literacy: "Simpli-Literacy",
    exec: "Simpli-Leader",
  };

  const maturityFallback: Record<string, ServiceId> = {
    none: "Simpli-Scan",
    exploring: "Simpli-Scan",
    building: "Simpli-Map",
    scaling: "Simpli-Literacy",
  };

  const service: ServiceId =
    (painToService[answers.pain] as ServiceId | undefined) ??
    maturityFallback[answers.maturity] ??
    "Simpli-Scan";

  return { level, service };
}
