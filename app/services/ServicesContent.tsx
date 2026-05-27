"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "../components/Nav";
import Logo from "../components/Logo";
import { useLang } from "../contexts/LanguageContext";

type S = { ko: string; en: string };
const s = (ko: string, en: string): S => ({ ko, en });

const LINES = [
  {
    num: "01", id: "consulting",
    tag: s("AX 컨설팅", "AX Consulting"),
    title: s("진단과 방향", "Diagnose & Direct"),
    overview: s(
      "AI를 도입하고 싶은데 어디서부터 시작해야 할지 모르는 조직의 첫 번째 파트너. 현장 경험 기반의 시니어가 직접 들어가 방향을 잡습니다.",
      "Your first partner when you want AI but don't know where to start. A senior practitioner with real field experience steps in to set the direction."
    ),
    products: [
      { name: "Simpli-Scan", sub: s("AI 준비도 진단", "AI Readiness Assessment"),
        desc: s("조직의 데이터 성숙도, AI 준비도, 복잡성 병목 지점을 분석해 실행 가능한 로드맵을 제공합니다.", "Analyzes your organization's data maturity, AI readiness, and complexity bottlenecks to deliver an actionable roadmap."),
        duration: "2 — 4w", for: s("AI 도입 검토 단계", "Early AI exploration") },
      { name: "Simpli-Map", sub: s("AX 전환 전략 수립", "AX Transformation Strategy"),
        desc: s("임원진과 함께 AI 도입 우선순위, 거버넌스 체계, OKR을 설계합니다. 방향은 있지만 실행 설계가 없는 조직에 적합합니다.", "Co-designs AI priorities, governance, and OKRs with your leadership. Right for organizations with a vision but no execution plan."),
        duration: "1 — 3mo", for: s("전략 수립 단계", "Strategy design stage") },
      { name: "Simpli-Advisor", sub: s("월간 자문 리테이너", "Monthly Advisory Retainer"),
        desc: s("AI 의사결정 지원, 벤더 검토, 프로젝트 진척 관리를 정기적으로 수행합니다. 판단이 필요한 조직에 적합합니다.", "Ongoing AI decision support, vendor review, and project governance. Right for organizations with internal talent that need senior judgment."),
        duration: s("월 단위 계약", "Monthly contract"), for: s("자문 파트너 필요 기업", "Need ongoing advisory") },
    ],
  },
  {
    num: "02", id: "platform",
    tag: s("AI/Data 플랫폼 구축", "AI/Data Platform"),
    title: s("실행과 구축", "Build & Execute"),
    overview: s(
      "방향이 잡힌 조직에 실제로 시스템을 만들어주는 실행 파트너. 교보문고 파이프라인, 카카오뱅크·나이스평가정보 대상 데이터 API 등 실전 레퍼런스 기반.",
      "The execution partner that actually builds the system for organizations with a clear direction. Built on real references: Kyobo pipeline, KakaoBank & NICE credit API."
    ),
    products: [
      { name: "Simpli-Pipeline", sub: s("데이터 파이프라인 구축", "Data Pipeline Build"),
        desc: s("데이터 수집부터 DW 적재까지 AWS·Snowflake 기반 표준 파이프라인을 구축합니다.", "Builds a standard AWS·Snowflake pipeline from data ingestion to data warehouse loading."),
        duration: "2 — 4mo", for: s("데이터 기반 구조가 없는 기업", "No data infrastructure yet") },
      { name: "Simpli-Brain", sub: s("AI 기능 연동·구현", "AI Feature Integration"),
        desc: s("기존 시스템에 수요예측, LLM, 분류 모델을 연동합니다. MVP 설계부터 운영까지 전 과정을 지원합니다.", "Integrates demand forecasting, LLMs, and classification models into existing systems. Supports the full cycle from MVP to production."),
        duration: "3 — 6mo", for: s("AI 기능 도입 기업", "Adding AI to existing stack") },
      { name: "Simpli-Portal", sub: s("사내 데이터 포털", "Internal Data Portal"),
        desc: s("비개발자도 데이터를 직접 조회·분석할 수 있는 Streamlit 기반 사내 데이터 포털을 구축합니다.", "A Streamlit-based internal portal so non-engineers can query and analyze data without code."),
        duration: "1 — 2mo", for: s("데이터 민주화 추진 기업", "Democratizing data access") },
      { name: "Simpli-API", sub: s("데이터 수익화 API", "Data Monetization API"),
        desc: s("내부 데이터 자산을 외부 파트너·금융사에 제공하는 API 서비스를 구축합니다. 대안신용평가 API 운영 경험 기반.", "Builds an API service to expose internal data assets to partners or financial institutions. Based on real alternative credit scoring API experience."),
        duration: "2 — 4mo", for: s("데이터 비즈니스 수익화", "Monetizing data assets") },
    ],
  },
  {
    num: "03", id: "education",
    tag: s("교육·조직문화빌딩", "Education & Culture"),
    title: s("사람과 문화", "People & Culture"),
    overview: s(
      "시스템을 만들어도 사람이 쓰지 않으면 무용지물입니다. AWS Summit 발표, KMA 인터뷰, 대학 강의 경험을 바탕으로 조직이 AI를 일상으로 받아들이게 합니다.",
      "A system no one uses is worthless. Drawing on experience from AWS Summit talks, KMA interviews, and university lectures, we make AI a daily habit for your organization."
    ),
    products: [
      { name: "Simpli-Literacy", sub: s("데이터 리터러시 교육", "Data Literacy Program"),
        desc: s("비개발자 임직원이 데이터로 판단하는 능력을 기릅니다. 레벨별 커리큘럼(경영진·팀장·실무자)으로 운영됩니다.", "Builds data-driven decision-making skills across non-technical staff. Tiered curriculum for executives, managers, and individual contributors."),
        duration: "4 — 8w", for: s("전사 데이터 문화 구축", "Building org-wide data culture") },
      { name: "Simpli-Leader", sub: s("경영진 AX 브리핑", "Executive AI Briefing"),
        desc: s("C-level·임원이 AI를 올바르게 이해하고 지시·판단할 수 있도록 하는 Executive 대상 집중 프로그램입니다.", "An intensive program for C-level and executives to understand AI correctly and make informed decisions and directives."),
        duration: s("반일 — 1일", "Half-day — Full day"), for: s("경영진 AI 인식 수준 제고", "Elevating executive AI literacy") },
      { name: "Simpli-Culture", sub: s("DX 조직문화 워크샵", "DX Culture Workshop"),
        desc: s("데이터 기반 의사결정 문화를 설계하는 월간 시리즈 워크샵. 현장 실무 중심으로 진행합니다.", "A monthly workshop series to design a data-driven decision culture. Grounded in real on-the-ground practice."),
        duration: s("월간 시리즈", "Monthly series"), for: s("의사결정 문화 혁신", "Decision culture transformation") },
    ],
  },
];

const CASES = [
  {
    id: "retail",
    industry: s("유통 / 리테일", "Retail"),
    filter: "retail",
    challenge: s(
      "온·오프라인 고객 데이터가 분산되어 개인화 마케팅이 불가능한 상황. 경쟁사 대비 전환율이 지속 하락하고 있었습니다.",
      "Customer data scattered across channels made personalization impossible, causing conversion rates to fall behind competitors."
    ),
    steps: [
      s("채널별 고객 데이터 통합 파이프라인 구축", "Unified customer data pipeline across all channels"),
      s("ML 기반 개인화 추천 모델 개발 및 A/B 검증", "ML personalization model development & A/B testing"),
      s("마케팅·상품팀 AI 활용 교육 및 내재화", "AI literacy training for marketing & merchandising teams"),
    ],
    outcomes: [
      { value: "18%", label: s("전환율 향상", "Conversion rate ↑") },
      { value: "31%", label: s("고객 생애가치 증가", "CLV increase") },
      { value: "24%", label: s("마케팅 비용 절감", "Marketing cost ↓") },
    ],
  },
  {
    id: "finance",
    industry: s("금융 / 보험", "Finance & Insurance"),
    filter: "finance",
    challenge: s(
      "수동 심사 방식으로 대출 처리가 평균 5일 소요. 신용 이력이 부족한 고객은 승인조차 받기 어려웠습니다.",
      "Manual underwriting took an average of 5 days per loan. Customers with thin credit files were routinely declined."
    ),
    steps: [
      s("대안 데이터 기반 AI 신용평가 모델 구축", "Built AI credit scoring model with alternative data"),
      s("Snowflake 기반 실시간 심사 자동화 파이프라인", "Real-time underwriting automation on Snowflake"),
      s("리스크 모니터링 대시보드 및 데이터 거버넌스 수립", "Risk monitoring dashboard & data governance setup"),
    ],
    outcomes: [
      { value: "89%", label: s("심사 시간 단축", "Faster processing") },
      { value: "27%", label: s("승인율 개선", "Approval rate ↑") },
      { value: "35%", label: s("운영 비용 절감", "Operating cost ↓") },
    ],
  },
  {
    id: "manufacturing",
    industry: s("제조", "Manufacturing"),
    filter: "manufacturing",
    challenge: s(
      "육안 검사에 의존하던 품질관리. 미세 불량 검출이 어려워 클레임과 재작업 비용이 누적되고 있었습니다.",
      "Quality control relied on manual visual inspection. Micro-defects were missed, generating costly claims and rework."
    ),
    steps: [
      s("컴퓨터 비전 기반 자동 불량 검출 시스템 도입", "Computer vision automated defect detection system"),
      s("IoT 센서 데이터 기반 장비 예측 유지보수 구축", "Predictive maintenance via IoT sensor data analytics"),
      s("생산 현장 데이터 리터러시 교육 및 운영 체계 정착", "Shop-floor data literacy training & ops system rollout"),
    ],
    outcomes: [
      { value: "52%", label: s("불량률 감소", "Defect rate ↓") },
      { value: "21%", label: s("생산성 향상", "Productivity ↑") },
      { value: "38%", label: s("유지보수 비용 절감", "Maintenance cost ↓") },
    ],
  },
  {
    id: "hr",
    industry: s("서비스 / HR", "Service & HR"),
    filter: "hr",
    challenge: s(
      "DX 선언 1년 후, 현장은 여전히 엑셀과 감(感)에 의존하고 있었습니다. 구성원의 피로감과 저항이 쌓여가는 상황.",
      "One year after declaring DX, teams were still running on spreadsheets and instinct — with mounting fatigue and resistance from staff."
    ),
    steps: [
      s("조직 AI 준비도 진단 및 부서별 Pain Point 매핑", "AI readiness diagnosis & department-level pain-point mapping"),
      s("Quick Win 과제 우선순위화 및 실행 로드맵 수립", "Quick-win prioritization & concrete execution roadmap"),
      s("경영진 AI 브리핑 및 변화관리 워크샵 시리즈", "Executive AI briefings & change management workshop series"),
    ],
    outcomes: [
      { value: "19%", label: s("이직률 감소", "Turnover ↓") },
      { value: "26%", label: s("조직 생산성 향상", "Productivity ↑") },
      { value: "89%", label: s("AI 도입 만족도", "AI adoption satisfaction") },
    ],
  },
  {
    id: "logistics",
    industry: s("물류 / SCM", "Logistics & SCM"),
    filter: "logistics",
    challenge: s(
      "시스템마다 분산된 재고·주문 데이터. 수요 예측 오차로 과잉 재고와 배송 지연이 반복되고 있었습니다.",
      "Inventory and order data trapped in silos. Demand forecasting errors led to recurring overstocking and delivery delays."
    ),
    steps: [
      s("판매·재고·주문 데이터 실시간 통합 파이프라인 구축", "Real-time unified pipeline for sales, inventory & orders"),
      s("시계열 ML 수요예측 + AI 배송 경로 최적화", "Time-series ML demand forecasting + AI route optimization"),
      s("물류팀 셀프서비스 BI 대시보드 및 자동 알림 구축", "Self-service BI dashboard & automated alerts for ops team"),
    ],
    outcomes: [
      { value: "29%", label: s("재고 비용 절감", "Inventory cost ↓") },
      { value: "17%", label: s("배송 시간 단축", "Delivery time ↓") },
      { value: "31%", label: s("운영 비용 절감", "Operating cost ↓") },
    ],
  },
];

const PROCESS = [
  { step: "01", title: s("문의 접수", "Inquiry"), desc: s("서비스 유형과 조직 상황을 간단히 공유해 주세요. 48시간 이내 회신합니다.", "Share your service type and situation briefly. We reply within 48 hours.") },
  { step: "02", title: s("초기 진단", "Initial Diagnosis"), desc: s("무료 30분 미팅으로 현황을 파악하고 최적 서비스를 제안합니다.", "A free 30-min meeting to understand your situation and propose the right service.") },
  { step: "03", title: s("실행", "Execution"), desc: s("합의된 범위와 일정에 따라 컨설팅·구축·교육을 진행합니다.", "Consulting, building, or education proceeds on the agreed scope and timeline.") },
  { step: "04", title: s("지속 개선", "Continuous Improvement"), desc: s("결과물을 토대로 다음 단계로 연결하거나 자문 파트너십을 이어갑니다.", "We connect to the next step or continue as an ongoing advisory partner.") },
];

const FAQ = [
  { q: s("simplyciety는 어떤 회사인가요?", "What does simplyciety do?"),
    a: s("simplyciety는 AI 기반 조직 단순화를 실현하는 전문 기업입니다. AX 컨설팅, 데이터·AI 플랫폼 구축, AX/DX 교육·조직문화빌딩으로 기업이 불필요한 복잡성을 걷어내고 AI로 더 빠르게 판단하고 실행할 수 있도록 돕습니다.", "simplyciety is a specialist firm in AI-driven organizational simplification. Through AX consulting, data & AI platform building, and education & culture work, we help companies cut complexity and move faster with AI.") },
  { q: s("AX 컨설팅과 일반 DX 컨설팅은 어떻게 다른가요?", "How is AX consulting different from typical DX consulting?"),
    a: s("DX가 시스템 도입에 초점을 맞춘다면, AX는 AI를 조직의 판단과 실행 방식 자체에 내재화하는 것입니다. simplyciety의 AX 컨설팅은 이론이 아닌 교보문고, 데이터마케팅코리아 등에서 직접 데이터 조직을 만들고 운영한 경험을 기반으로 합니다.", "DX focuses on system adoption; AX embeds AI into how your organization thinks and acts. Our consulting is grounded in real experience — having built and run data organizations at Kyobo and DMK, not in theory.") },
  { q: s("데이터 인프라가 전혀 없어도 서비스를 받을 수 있나요?", "Can we work together if we have no data infrastructure yet?"),
    a: s("가능합니다. Simpli-Scan 진단을 통해 현재 상태를 파악하고, 규모와 예산에 맞는 단계별 접근법을 설계합니다. 처음부터 모든 것을 갖출 필요 없이, 가장 임팩트가 큰 영역부터 시작합니다.", "Yes. Simpli-Scan diagnoses your current state and designs a phased approach matched to your scale and budget. You don't need everything from day one — we start where the impact is highest.") },
  { q: s("주로 어떤 규모의 기업과 일하나요?", "What size of company do you typically work with?"),
    a: s("스타트업부터 대기업 계열사까지 다양한 규모와 협업합니다. 중요한 것은 규모가 아니라 '데이터와 AI로 조직을 바꾸고자 하는 의지'입니다.", "From startups to large enterprise subsidiaries. What matters isn't size — it's the will to change through data and AI.") },
  { q: s("강연이나 사외 교육 요청도 가능한가요?", "Do you do external speaking or training?"),
    a: s("가능합니다. AWS Summit Seoul 2023 발표, KMA 인터뷰, 대학 교육과정 강의 등의 경험을 바탕으로 기업 행사, 컨퍼런스, 사내 교육 강연을 진행합니다.", "Yes. Based on our AWS Summit Seoul 2023 talk, KMA interview, and university course work, we speak at company events, conferences, and in-house education sessions.") },
];

const FILTERS = [
  { id: "all", label: s("전체", "All") },
  { id: "retail", label: s("유통·리테일", "Retail") },
  { id: "finance", label: s("금융·보험", "Finance") },
  { id: "manufacturing", label: s("제조", "Manufacturing") },
  { id: "hr", label: s("서비스·HR", "Service & HR") },
  { id: "logistics", label: s("물류·SCM", "Logistics") },
];

export default function ServicesContent() {
  const { lang, t } = useLang();
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredCases = activeFilter === "all" ? CASES : CASES.filter((c) => c.filter === activeFilter);

  return (
    <div className="bg-[#080808] text-[#F0EDE8] font-[var(--font-geist-sans)] min-h-screen">
      <Nav />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "simplyciety 서비스",
            url: "https://simplyciety.com/services",
            itemListElement: LINES.map((line, i) => ({
              "@type": "ListItem", position: i + 1,
              item: { "@type": "Service", name: line.tag.ko, description: line.overview.ko,
                provider: { "@type": "Organization", name: "simplyciety", url: "https://simplyciety.com" }, areaServed: "KR" },
            })),
          }),
        }}
      />

      {/* HERO */}
      <section className="relative min-h-[70vh] flex flex-col justify-end px-8 md:px-16 pb-20 pt-40 overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-[60vh] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top right, rgba(184,150,90,0.05) 0%, transparent 65%)" }} />
        <div className="relative max-w-screen-xl mx-auto w-full">
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-8 flex items-center gap-3">
            <span className="w-6 h-px bg-[#B8965A]" />
            Services
          </p>
          <h1 className="text-[clamp(3.5rem,9vw,11rem)] font-extralight leading-[0.9] tracking-[-0.03em] mb-8">
            {t("세 가지 방법으로", "Three ways to")}<br />
            <span className="italic text-[#B8965A]">{t("단순화합니다.", "simplify.")}</span>
          </h1>
          <p className="text-[#4A4A4A] text-sm font-light tracking-wide mb-10 max-w-xl">
            {t(
              "데이터로 진단하고, AI로 실행합니다. 조직의 복잡성을 걷어내는 세 가지 접근 방식을 제공합니다.",
              "Diagnose with data. Execute with AI. Three service lines to cut the complexity out of your organization."
            )}
          </p>
          <div className="flex items-center gap-8 mt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem" }}>
            {LINES.map((line) => (
              <a key={line.id} href={`#${line.id}`} className="flex items-center gap-2 group">
                <span className="text-[0.55rem] tracking-[0.2em] uppercase text-[#B8965A]">{line.num}</span>
                <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#3A3A3A] group-hover:text-[#6A6A6A] transition-colors">{line.tag[lang]}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE LINES */}
      {LINES.map((line) => (
        <section key={line.id} id={line.id} className="py-28 md:py-40 px-8 md:px-16"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 mb-16">
              <div className="md:col-span-4">
                <p className="text-[0.55rem] tracking-[0.3em] uppercase text-[#B8965A] mb-3">{line.num}</p>
                <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extralight tracking-tight leading-[1.05]">{line.tag[lang]}</h2>
                <p className="text-[#B8965A]/60 text-sm font-light mt-2 italic">{line.title[lang]}</p>
              </div>
              <div className="md:col-span-8 flex items-center">
                <p className="text-[#6A6A6A] text-lg leading-[1.9] font-light">{line.overview[lang]}</p>
              </div>
            </div>
            <div className={`grid grid-cols-1 gap-px bg-[rgba(255,255,255,0.04)] ${line.products.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
              {line.products.map((p) => (
                <div key={p.name}
                  className="bg-[#080808] p-8 md:p-10 flex flex-col gap-5 group hover:bg-[#0D0D0D] transition-colors duration-500">
                  <div>
                    <h3 className="text-base font-light tracking-wide text-[#F0EDE8] group-hover:text-[#B8965A] transition-colors duration-400">{p.name}</h3>
                    <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#3A3A3A] mt-1">{p.sub[lang]}</p>
                  </div>
                  <p className="text-[#5A5A5A] text-sm leading-[1.85] font-light flex-1">{p.desc[lang]}</p>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "1rem" }}>
                    <p className="text-[0.55rem] tracking-[0.2em] uppercase text-[#2A2A2A] mb-1">{t("기간", "Duration")}</p>
                    <p className="text-xs text-[#4A4A4A]">{typeof p.duration === "string" ? p.duration : p.duration[lang]}</p>
                    <p className="text-[0.55rem] tracking-[0.2em] uppercase text-[#2A2A2A] mb-1 mt-3">{t("적합 대상", "Best for")}</p>
                    <p className="text-xs text-[#4A4A4A]">{p.for[lang]}</p>
                  </div>
                  <Link href={`/contact?service=${line.id}`}
                    className="text-[0.55rem] tracking-[0.2em] uppercase text-[#B8965A]/50 group-hover:text-[#B8965A] transition-colors">
                    {t("문의하기 →", "Inquire →")}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ─── CASE STUDIES ─── */}
      <section className="py-28 md:py-40 px-8 md:px-16 bg-[#050505]"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
            <div className="md:col-span-4">
              <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-4">
                {t("적용 사례", "Case Studies")}
              </p>
              <h2 className="text-[clamp(2rem,4vw,4rem)] font-extralight tracking-tight leading-[1.05]">
                {t("분야별", "By")}<br />
                <span className="italic text-[#B8965A]">{t("실제 성과", "Industry")}</span>
              </h2>
            </div>
            <div className="md:col-span-8 flex items-end">
              <p className="text-[#4A4A4A] text-sm leading-relaxed font-light">
                {t(
                  "아래는 simplyciety의 접근 방식이 실제 산업 현장에서 어떤 프로세스로 진행되고, 어떤 성과를 만들어냈는지 보여주는 대표 사례입니다.",
                  "These representative cases show how simplyciety's approach plays out in real industry contexts — the process we follow and the outcomes delivered."
                )}
              </p>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {FILTERS.map((f) => (
              <button key={f.id} onClick={() => setActiveFilter(f.id)}
                className="text-[0.55rem] tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-200"
                style={{
                  borderColor: activeFilter === f.id ? "#B8965A" : "rgba(255,255,255,0.06)",
                  color: activeFilter === f.id ? "#B8965A" : "#3A3A3A",
                  background: activeFilter === f.id ? "rgba(184,150,90,0.06)" : "transparent",
                }}>
                {f.label[lang]}
              </button>
            ))}
          </div>

          {/* Case cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(255,255,255,0.04)]">
            {filteredCases.map((c) => (
              <div key={c.id} className="bg-[#050505] p-8 md:p-10 flex flex-col gap-7">
                {/* Industry tag */}
                <div>
                  <span className="inline-block text-[0.5rem] tracking-[0.25em] uppercase border border-[#B8965A]/40 text-[#B8965A] px-3 py-1 mb-4">
                    {c.industry[lang]}
                  </span>
                  <p className="text-[#5A5A5A] text-sm leading-[1.8] font-light">{c.challenge[lang]}</p>
                </div>

                {/* Process */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "1.5rem" }}>
                  <p className="text-[0.5rem] tracking-[0.25em] uppercase text-[#3A3A3A] mb-4">
                    {t("진행 프로세스", "Process")}
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {c.steps.map((step, si) => (
                      <div key={si} className="flex items-start gap-3">
                        <span className="text-[0.5rem] tracking-[0.1em] text-[#B8965A]/40 pt-0.5 flex-shrink-0 w-4">
                          {String(si + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[#4A4A4A] text-xs leading-relaxed font-light">{step[lang]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcomes */}
                <div className="grid grid-cols-3 gap-px bg-[rgba(255,255,255,0.04)]" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "0" }}>
                  {c.outcomes.map((o) => (
                    <div key={o.value} className="bg-[#050505] pt-5 pr-4">
                      <p className="text-[clamp(1.4rem,3vw,2rem)] font-extralight text-[#B8965A] leading-none mb-1">{o.value}</p>
                      <p className="text-[0.5rem] tracking-[0.15em] uppercase text-[#3A3A3A] leading-relaxed">{o.label[lang]}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[#2A2A2A] text-[0.55rem] tracking-widest uppercase">
            {t("* 위 수치는 유사 프로젝트 기반 참고 성과이며, 실제 결과는 조직 상황에 따라 다를 수 있습니다.", "* Figures are reference outcomes based on comparable projects. Actual results may vary by organization.")}
          </p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-28 md:py-40 px-8 md:px-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto">
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-16">
            {t("진행 방식", "How We Work")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[rgba(255,255,255,0.03)]">
            {PROCESS.map((p) => (
              <div key={p.step} className="bg-[#080808] p-8 md:p-10 flex flex-col gap-4">
                <span className="text-[0.6rem] tracking-[0.3em] text-[#B8965A]">{p.step}</span>
                <h3 className="text-xl font-extralight tracking-tight text-[#F0EDE8]">{p.title[lang]}</h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed">{p.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 md:py-40 px-8 md:px-16 bg-[#050505]"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto">
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-16">FAQ</p>
          <div className="flex flex-col">
            {FAQ.map((item, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 py-10"
                style={{ borderBottom: i < FAQ.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <div className="md:col-span-5">
                  <p className="text-[#F0EDE8] font-light leading-snug text-base">{item.q[lang]}</p>
                </div>
                <div className="md:col-span-7">
                  <p className="text-[#5A5A5A] text-sm leading-[1.9] font-light">{item.a[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-36 px-8 md:px-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-4">
              {t("시작하기", "Get Started")}
            </p>
            <h2 className="text-[clamp(2rem,5vw,5rem)] font-extralight leading-[0.95] tracking-tight">
              {t("어떤 서비스가 맞는지", "Not sure which service fits?")}<br />
              <span className="italic text-[#B8965A]">{t("함께 찾아봅시다.", "Let's find out together.")}</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <Link href="/contact" className="btn-gold">
              {t("무료 초기 상담 신청 →", "Book a free consultation →")}
            </Link>
            <p className="text-[#2A2A2A] text-[0.6rem] tracking-widest uppercase">
              {t("48시간 이내 회신", "Reply within 48 hours")}
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-16 py-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <Link href="/" className="hover:opacity-70 transition-opacity">
            <Logo markColor="rgba(184,150,90,0.25)" textColor="#2A2A2A" />
          </Link>
          <div className="flex items-center gap-8">
            {[
              [t("서비스", "Services"), "/services"],
              ["CEO", "/ceo"],
              [t("문의하기", "Contact"), "/contact"],
            ].map(([l, h]) => (
              <Link key={h} href={h} className="text-[0.6rem] tracking-[0.2em] uppercase text-[#2A2A2A] hover:text-[#5A5A5A] transition-colors">{l} →</Link>
            ))}
          </div>
          <span className="text-[0.6rem] tracking-[0.35em] uppercase text-[#1A1A1A]">Less noise. More signal.</span>
        </div>
      </footer>
    </div>
  );
}
