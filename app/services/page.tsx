import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";

export const metadata: Metadata = {
  title: "서비스 — simplyciety | AX 컨설팅·데이터 플랫폼·AI 교육",
  description:
    "simplyciety는 AX 컨설팅(AI 전환 전략), 데이터·AI 플랫폼 구축, AX/DX 교육·조직문화빌딩 세 가지 방법으로 조직의 복잡성을 AI로 걷어냅니다.",
  keywords: [
    "AX 컨설팅", "AI 전환 컨설팅", "AI 전환 전략", "DX 컨설팅",
    "데이터 플랫폼 구축", "데이터 파이프라인", "AWS 데이터 구축",
    "Snowflake", "데이터 거버넌스", "AI 교육", "데이터 리터러시",
    "조직문화 빌딩", "AX 교육", "simplyciety",
  ],
  openGraph: {
    title: "simplyciety 서비스 — AX 컨설팅·플랫폼 구축·AI 교육",
    description: "AI로 조직의 복잡성을 제거합니다. 컨설팅·구축·교육 세 가지 방법으로.",
    type: "website",
    url: "https://simplyciety.com/services",
  },
};

const LINES = [
  {
    num: "01",
    id: "consulting",
    tag: "AX 컨설팅",
    title: "진단과 방향",
    overview:
      "AI를 도입하고 싶은데 어디서부터 시작해야 할지 모르는 조직의 첫 번째 파트너. 현장 경험 기반의 시니어가 직접 들어가 방향을 잡습니다.",
    products: [
      {
        name: "Simpli-Scan",
        sub: "AI 준비도 진단",
        desc: "조직의 데이터 성숙도, AI 준비도, 복잡성 병목 지점을 분석해 실행 가능한 로드맵을 제공합니다.",
        duration: "2 — 4주",
        for: "AI 도입 검토 단계 기업",
      },
      {
        name: "Simpli-Map",
        sub: "AX 전환 전략 수립",
        desc: "임원진과 함께 AI 도입 우선순위, 거버넌스 체계, OKR을 설계합니다. 방향은 있지만 실행 설계가 없는 조직에 적합합니다.",
        duration: "1 — 3개월",
        for: "전략 수립 단계 기업",
      },
      {
        name: "Simpli-Advisor",
        sub: "월간 자문 리테이너",
        desc: "AI 의사결정 지원, 벤더 검토, 프로젝트 진척 관리를 정기적으로 수행합니다. 내부 인력은 있지만 판단이 필요한 조직에 적합합니다.",
        duration: "월 단위 계약",
        for: "자문 파트너 필요 기업",
      },
    ],
  },
  {
    num: "02",
    id: "platform",
    tag: "AI/Data 플랫폼 구축",
    title: "실행과 구축",
    overview:
      "방향이 잡힌 조직에 실제로 시스템을 만들어주는 실행 파트너. 교보문고 파이프라인, 카카오뱅크·나이스평가정보 대상 데이터 API 등 실전 레퍼런스 기반.",
    products: [
      {
        name: "Simpli-Pipeline",
        sub: "데이터 파이프라인 구축",
        desc: "데이터 수집부터 DW 적재까지 AWS·Snowflake 기반 표준 파이프라인을 구축합니다. 국내 최대 도서 유통사 구축 사례 기반.",
        duration: "2 — 4개월",
        for: "데이터 기반 구조가 없는 기업",
      },
      {
        name: "Simpli-Brain",
        sub: "AI 기능 연동·구현",
        desc: "기존 시스템에 수요예측, LLM, 분류 모델을 연동합니다. MVP 설계부터 운영까지 전 과정을 지원합니다.",
        duration: "3 — 6개월",
        for: "AI 기능 도입 기업",
      },
      {
        name: "Simpli-Portal",
        sub: "사내 데이터 포털",
        desc: "비개발자도 데이터를 직접 조회·분석할 수 있는 Streamlit 기반 사내 데이터 포털을 구축합니다.",
        duration: "1 — 2개월",
        for: "데이터 민주화 추진 기업",
      },
      {
        name: "Simpli-API",
        sub: "데이터 수익화 API",
        desc: "내부 데이터 자산을 외부 파트너·금융사에 제공하는 API 서비스를 구축합니다. 대안신용평가 API 운영 경험 기반.",
        duration: "2 — 4개월",
        for: "데이터 비즈니스 수익화 목표 기업",
      },
    ],
  },
  {
    num: "03",
    id: "education",
    tag: "교육·조직문화빌딩",
    title: "사람과 문화",
    overview:
      "시스템을 만들어도 사람이 쓰지 않으면 무용지물입니다. AWS Summit 발표, KMA 인터뷰, 대학 강의 경험을 바탕으로 조직이 AI를 일상으로 받아들이게 합니다.",
    products: [
      {
        name: "Simpli-Literacy",
        sub: "데이터 리터러시 교육",
        desc: "비개발자 임직원이 데이터로 판단하는 능력을 기릅니다. 레벨별 커리큘럼(경영진·팀장·실무자)으로 운영됩니다.",
        duration: "4 — 8주 과정",
        for: "전사 데이터 문화 구축 기업",
      },
      {
        name: "Simpli-Leader",
        sub: "경영진 AX 브리핑",
        desc: "C-level·임원이 AI를 올바르게 이해하고 지시·판단할 수 있도록 하는 Executive 대상 집중 프로그램입니다.",
        duration: "반일 — 1일",
        for: "경영진 AI 인식 수준 제고",
      },
      {
        name: "Simpli-Culture",
        sub: "DX 조직문화 워크샵",
        desc: "데이터 기반 의사결정 문화를 설계하는 월간 시리즈 워크샵. 현장 실무 중심으로 진행합니다.",
        duration: "월간 시리즈",
        for: "의사결정 문화 혁신 기업",
      },
    ],
  },
];

const PROCESS = [
  { step: "01", title: "문의 접수", desc: "서비스 유형과 조직 상황을 간단히 공유해 주세요. 48시간 이내 회신합니다." },
  { step: "02", title: "초기 진단", desc: "무료 30분 미팅으로 현황을 파악하고 최적 서비스를 제안합니다." },
  { step: "03", title: "실행", desc: "합의된 범위와 일정에 따라 컨설팅·구축·교육을 진행합니다." },
  { step: "04", title: "지속 개선", desc: "결과물을 토대로 다음 단계로 연결하거나 자문 파트너십을 이어갑니다." },
];

const FAQ = [
  {
    q: "simplyciety는 어떤 회사인가요?",
    a: "simplyciety는 AI 기반 조직 단순화를 실현하는 전문 기업입니다. AX 컨설팅, 데이터·AI 플랫폼 구축, AX/DX 교육·조직문화빌딩 세 가지 서비스를 통해 기업이 불필요한 복잡성을 걷어내고 AI로 더 빠르게 판단하고 실행할 수 있도록 돕습니다.",
  },
  {
    q: "AX 컨설팅과 일반 DX 컨설팅은 어떻게 다른가요?",
    a: "DX(디지털 전환)가 시스템 도입에 초점을 맞춘다면, AX(AI 전환)는 AI를 조직의 판단과 실행 방식 자체에 내재화하는 것입니다. simplyciety의 AX 컨설팅은 이론이 아닌 교보문고, 데이터마케팅코리아 등에서 직접 데이터 조직을 만들고 운영한 경험을 기반으로 합니다.",
  },
  {
    q: "데이터 인프라가 전혀 없어도 서비스를 받을 수 있나요?",
    a: "가능합니다. Simpli-Scan 진단을 통해 현재 상태를 파악하고, 규모와 예산에 맞는 단계별 접근법을 설계합니다. 처음부터 모든 것을 갖출 필요 없이, 가장 임팩트가 큰 영역부터 시작합니다.",
  },
  {
    q: "주로 어떤 규모의 기업과 일하나요?",
    a: "스타트업부터 대기업 계열사까지 다양한 규모와 협업합니다. 중요한 것은 규모가 아니라 '데이터와 AI로 조직을 바꾸고자 하는 의지'입니다. 현재 대기업 계열사 AI/데이터 플랫폼 구축 프로젝트를 PL로 진행 중입니다.",
  },
  {
    q: "강연이나 사외 교육 요청도 가능한가요?",
    a: "가능합니다. AWS Summit Seoul 2023 발표, KMA 인터뷰, 대학 교육과정 강의 등의 경험을 바탕으로 기업 행사, 컨퍼런스, 사내 교육 강연을 진행합니다. 문의 유형에서 '강연 요청'을 선택해 주세요.",
  },
];

export default function ServicesPage() {
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
            description: "AI 기반 조직 단순화 — AX 컨설팅, 데이터 플랫폼 구축, AX/DX 교육",
            url: "https://simplyciety.com/services",
            itemListElement: LINES.map((line, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Service",
                name: line.tag,
                description: line.overview,
                provider: {
                  "@type": "Organization",
                  name: "simplyciety",
                  url: "https://simplyciety.com",
                },
                areaServed: "KR",
              },
            })),
          }),
        }}
      />

      {/* HERO */}
      <section className="relative min-h-[70vh] flex flex-col justify-end px-8 md:px-16 pb-20 pt-40 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[50vw] h-[60vh] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top right, rgba(184,150,90,0.05) 0%, transparent 65%)" }}
        />
        <div className="relative max-w-screen-xl mx-auto w-full">
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-8 flex items-center gap-3">
            <span className="w-6 h-px bg-[#B8965A]" />
            Services
          </p>
          <h1 className="text-[clamp(3.5rem,9vw,11rem)] font-extralight leading-[0.9] tracking-[-0.03em] mb-10">
            세 가지 방법으로<br />
            <span className="italic text-[#B8965A]">단순화합니다.</span>
          </h1>
          <div className="flex items-center gap-8 mt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem" }}>
            {LINES.map((line) => (
              <a key={line.id} href={`#${line.id}`} className="flex items-center gap-2 group">
                <span className="text-[0.55rem] tracking-[0.2em] uppercase text-[#B8965A]">{line.num}</span>
                <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[#3A3A3A] group-hover:text-[#6A6A6A] transition-colors">{line.tag}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE LINES */}
      {LINES.map((line, li) => (
        <section
          key={line.id}
          id={line.id}
          className="py-28 md:py-40 px-8 md:px-16"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="max-w-screen-xl mx-auto">
            {/* Line header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 mb-16">
              <div className="md:col-span-4">
                <p className="text-[0.55rem] tracking-[0.3em] uppercase text-[#B8965A] mb-3">{line.num}</p>
                <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extralight tracking-tight leading-[1.05]">
                  {line.tag}
                </h2>
                <p className="text-[#B8965A]/60 text-sm font-light mt-2 italic">{line.title}</p>
              </div>
              <div className="md:col-span-8 flex items-center">
                <p className="text-[#6A6A6A] text-lg leading-[1.9] font-light">{line.overview}</p>
              </div>
            </div>

            {/* Products */}
            <div className={`grid grid-cols-1 gap-px bg-[rgba(255,255,255,0.04)] ${line.products.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
              {line.products.map((p) => (
                <div
                  key={p.name}
                  className="bg-[#080808] p-8 md:p-10 flex flex-col gap-5 group hover:bg-[#0D0D0D] transition-colors duration-500"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-light tracking-wide text-[#F0EDE8] group-hover:text-[#B8965A] transition-colors duration-400">
                        {p.name}
                      </h3>
                      <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#3A3A3A] mt-1">{p.sub}</p>
                    </div>
                  </div>
                  <p className="text-[#5A5A5A] text-sm leading-[1.85] font-light flex-1">{p.desc}</p>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "1rem" }}>
                    <p className="text-[0.55rem] tracking-[0.2em] uppercase text-[#2A2A2A] mb-1">기간</p>
                    <p className="text-xs text-[#4A4A4A]">{p.duration}</p>
                    <p className="text-[0.55rem] tracking-[0.2em] uppercase text-[#2A2A2A] mb-1 mt-3">적합 대상</p>
                    <p className="text-xs text-[#4A4A4A]">{p.for}</p>
                  </div>
                  <Link
                    href={`/contact?service=${line.id}`}
                    className="text-[0.55rem] tracking-[0.2em] uppercase text-[#B8965A]/50 group-hover:text-[#B8965A] transition-colors"
                  >
                    문의하기 →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* PROCESS */}
      <section
        className="py-28 md:py-40 px-8 md:px-16 bg-[#050505]"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-screen-xl mx-auto">
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-16">진행 방식</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[rgba(255,255,255,0.03)]">
            {PROCESS.map((p) => (
              <div key={p.step} className="bg-[#050505] p-8 md:p-10 flex flex-col gap-4">
                <span className="text-[0.6rem] tracking-[0.3em] text-[#B8965A]">{p.step}</span>
                <h3 className="text-xl font-extralight tracking-tight text-[#F0EDE8]">{p.title}</h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-28 md:py-40 px-8 md:px-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-screen-xl mx-auto">
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-16">FAQ</p>
          <div className="flex flex-col">
            {FAQ.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 py-10"
                style={{ borderBottom: i < FAQ.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
              >
                <div className="md:col-span-5">
                  <p className="text-[#F0EDE8] font-light leading-snug text-base">{item.q}</p>
                </div>
                <div className="md:col-span-7">
                  <p className="text-[#5A5A5A] text-sm leading-[1.9] font-light">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-28 md:py-36 px-8 md:px-16 bg-[#050505]"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-4">시작하기</p>
            <h2 className="text-[clamp(2rem,5vw,5rem)] font-extralight leading-[0.95] tracking-tight">
              어떤 서비스가 맞는지<br />
              <span className="italic text-[#B8965A]">함께 찾아봅시다.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <Link href="/contact" className="btn-gold">
              무료 초기 상담 신청 →
            </Link>
            <p className="text-[#2A2A2A] text-[0.6rem] tracking-widest uppercase">48시간 이내 회신</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-16 py-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <Link href="/" className="text-[0.6rem] tracking-[0.3em] uppercase text-[#2A2A2A] hover:text-[#5A5A5A] transition-colors">
            simplyciety
          </Link>
          <div className="flex items-center gap-8">
            {[["서비스", "/services"], ["CEO", "/ceo"], ["문의하기", "/contact"]].map(([l, h]) => (
              <Link key={h} href={h} className="text-[0.6rem] tracking-[0.2em] uppercase text-[#2A2A2A] hover:text-[#5A5A5A] transition-colors">{l}</Link>
            ))}
          </div>
          <span className="text-[0.6rem] tracking-[0.35em] uppercase text-[#1A1A1A]">Less noise. More signal.</span>
        </div>
      </footer>
    </div>
  );
}
