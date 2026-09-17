"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "../components/Nav";
import SiteFooter from "../components/SiteFooter";
import { useReveal } from "../components/useReveal";
import { useLang } from "../contexts/LanguageContext";

// 2026 출판 데이터 마케팅 포럼 발표 청중용 페이지 (한국어 청중 대상, 영문은 요약만)

const TAKEAWAYS = [
  { num: "01", title: "서점 데이터 = 관심사 데이터", desc: "검색은 관심, 구매는 결심. 서점에는 독자가 궁금해한 것, 망설인 것, 돈과 시간을 쓴 것, 읽고 남긴 것이 쌓입니다." },
  { num: "02", title: "발견 · 구매 · 추천으로 쪼개진 여정", desc: "데이터는 서점에 쌓이지만 결정은 피드와 AI에서 일어납니다. 가장 빠르게 크는 채널이 가장 안 보입니다." },
  { num: "03", title: "기술은 쉬워졌고, 어려워진 건 결정", desc: "도구는 대부분 무료이거나 월 몇 만 원대. 남은 일은 무엇을 바꾸고 싶은지 먼저 정하는 것입니다." },
];

const FIVE_NOTES = [
  { title: "ISBN을 모든 파일의 연결 키로", desc: "엑셀 서식은 '텍스트'로. 숫자 서식이면 13자리가 깨집니다." },
  { title: "마케팅 일지 쓰기", desc: "영상 · 광고 · 이벤트를 날짜별 한 줄로. 안 적으면 나중에 판매 변화의 이유를 찾을 수 없습니다." },
  { title: "바꾸고 싶은 결정부터 정하기", desc: "재쇄 부수 · 광고비 배분 · 출간 시기 중 하나를 먼저 고르세요." },
  { title: "AI에는 배경 · 예시 · 형식을 함께", desc: "우리 출판사와 독자층 · 잘 쓴 소개문 하나 · 원하는 형식을 같이 주면 결과가 달라집니다." },
  { title: "계약 전에 네 가지 묻기", desc: "데이터 반출 · 소유권 · 비용 변화 · 작게 써보기가 가능한지." },
];

const PUBLIC_DATA = [
  { name: "출판유통통합전산망", url: "https://bnk.kpipa.or.kr", what: "서점 판매 데이터 · 채널·성별·연령·지역·주제별", tip: "도서 정보를 한 번 입력하면 연계 서점으로 자동 전송. 보도자료·카탈로그 생성에도 활용." },
  { name: "도서관 정보나루", url: "https://www.data4library.kr", what: "구매로 안 잡히는 수요 · 인기대출도서", tip: "지역·연령별 대출 흐름으로 구간 재발굴, 리커버 근거를 찾습니다. 공개 데이터는 가입 없이 조회." },
  { name: "공공데이터포털 (희망도서 구입 목록)", url: "https://www.data.go.kr", what: "독자가 도서관에 들여 달라고 요청한 책", tip: "기관마다 형식이 달라 서명·저자·출판사·출판년 기준으로 맞춰 봅니다." },
  { name: "네이버 데이터랩 · 구글 트렌드", url: "https://datalab.naver.com", what: "검색어 트렌드 (상대값 0~100)", tip: "영상 공개·방송 시점과 겹쳐 보면 '왜 팔렸는지'의 첫 단서가 됩니다." },
];

const GEO_METHODS = [
  { k: "첫 문단", v: "누구의 어떤 문제를 푸는 책인지 한 문장으로" },
  { k: "저자 정보", v: "서점 · 포털 · 출판사 사이트에서 같은 이름과 소개" },
  { k: "목차 · 서문", v: "이미지 말고 텍스트로 공개, 발췌도 함께" },
  { k: "도서 페이지", v: "ISBN · 저자 · 출간일을 기계가 읽는 형식(schema.org Book)으로" },
  { k: "인용될 근거", v: "서평 · 기사 · 수상 링크, 소개문에 수치 · 인용문" },
  { k: "수집 정책", v: "AI 수집 허용 여부 결정 — 노출과 학습은 따로" },
];

const GEO_CHECKS = [
  { q: "“○○한 사람에게 맞는 책 추천해줘”", check: "추천에 나오나" },
  { q: "“『책 제목』은 어떤 책이야?”", check: "설명이 맞나" },
  { q: "“저자 ○○의 책을 알려줘”", check: "저자와 이어지나" },
  { q: "“○○ 입문서 비교해줘”", check: "경쟁서 속 위치" },
];

const PROMPTS = [
  {
    title: "독자의 언어 뽑기",
    input: "우리 책과 경쟁서 리뷰를 붙여넣고",
    body: `아래는 우리 책과 경쟁서의 독자 리뷰입니다.

[리뷰 붙여넣기]

다음을 정리해줘.
① 독자가 반복해 쓰는 표현 10개
② 좋아한 점 / 아쉬운 점
③ 어떤 상황의 사람이 샀는지
각 항목마다 근거가 된 리뷰 문장을 함께 인용해줘.`,
  },
  {
    title: "빈자리 찾기",
    input: "경쟁서 10종 소개문을 붙여넣고",
    body: `아래는 같은 분야 경쟁서 10종의 소개문입니다.

[소개문 붙여넣기]

공통으로 강조하는 것과 아무도 말하지 않는 것을 나눠 정리하고,
우리 책이 설 수 있는 자리 3가지를 각각 한 문장으로 제안해줘.`,
  },
  {
    title: "한 권 → 세 버전",
    input: "우리 책 소개문을 붙여넣고",
    body: `아래는 우리 책 소개문입니다.

[소개문 붙여넣기]

이 소개문을 세 가지 버전으로 바꿔줘.
① AI 검색에 걸리도록 (누구의 어떤 문제를 푸는 책인지 첫 문장에)
② SNS용 3문장
③ 보도자료 리드
사실은 바꾸지 말고, 각 버전이 누구를 향하는지 밝혀줘.`,
  },
];

const START_HERE = [
  { area: "기획 먼저", items: ["경쟁서 소개문 비교", "독자 리뷰 요약", "제목 · 부제 후보", "목차 구조 점검"] },
  { area: "제작 · 편집", items: ["교정 · 교열 1차", "사실 확인 목록화", "요약 · 발췌 작성", "번역 초벌"] },
  { area: "마케팅 먼저", items: ["보도자료 초안", "채널별 소개문", "SNS 카피 변주", "이벤트 기획안"] },
  { area: "독자 소통 먼저", items: ["문의 답변 템플릿", "리뷰 감성 분류", "설문 자유응답 요약", "뉴스레터 초안"] },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          /* clipboard unavailable */
        }
      }}
      className="text-[0.6rem] tracking-[0.2em] uppercase px-3 py-1.5 border transition-colors"
      style={{ borderColor: copied ? "#B8965A" : "rgba(255,255,255,0.15)", color: copied ? "#B8965A" : "#A8A49E" }}
    >
      {copied ? "복사됨 ✓" : "복사"}
    </button>
  );
}

function SectionHead({ id, eyebrow, title, desc }: { id: string; eyebrow: string; title: React.ReactNode; desc?: string }) {
  return (
    <div id={id} className="scroll-mt-24 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 mb-12">
      <div className="md:col-span-6">
        <p data-reveal className="text-[0.65rem] tracking-[0.4em] uppercase text-[#B8965A] mb-6">{eyebrow}</p>
        <h2 data-reveal data-reveal-delay="1" className="text-[clamp(1.8rem,4vw,3.25rem)] font-extralight leading-[1.12] tracking-tight">{title}</h2>
      </div>
      {desc && (
        <div className="md:col-span-6 flex items-end">
          <p data-reveal className="text-[#8A8780] text-sm md:text-base leading-[1.9] font-light">{desc}</p>
        </div>
      )}
    </div>
  );
}

export default function ForumContent() {
  const { lang } = useLang();
  useReveal();

  return (
    <div className="bg-[#080808] text-[#F0EDE8] min-h-screen">
      <Nav />

      {/* ─── HERO ─── */}
      <section className="relative px-5 md:px-16 pt-32 md:pt-44 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[60vw] h-[70vh] pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, rgba(184,150,90,0.07) 0%, transparent 65%)" }} />
        <div className="relative max-w-screen-xl mx-auto">
          <div className="hero-eyebrow flex flex-wrap items-center gap-3 mb-10">
            <span className="text-[0.6rem] tracking-[0.25em] uppercase border border-[#B8965A]/50 text-[#B8965A] px-3 py-1">2026.09.18</span>
            <span className="text-[0.7rem] text-[#8A8780]">제1회 2026 출판 데이터 마케팅 포럼 · 데이터로 읽는 출판시장</span>
          </div>
          <h1 className="hero-title text-[clamp(2.8rem,8vw,7.5rem)] font-extralight leading-[1.02] tracking-[-0.03em] mb-8">
            서점은 독자를
            <br />
            <span className="italic text-[#B8965A]">어떻게 읽는가</span>
          </h1>
          <p className="hero-body text-[#A8A49E] text-lg md:text-2xl font-extralight tracking-tight mb-12">
            대형서점의 데이터·AI 활용 전략 <span className="text-[#5A5A5A] mx-2">|</span> Data → AI → 단순화
          </p>
          {lang === "en" && (
            <p className="hero-body text-[#8A8780] text-sm max-w-2xl mb-10 font-light">
              Resources for the talk “How Bookstores Read Their Readers” at the 2026 Publishing Data Marketing Forum (Korean). The checklists below were written for Korean publishers.
            </p>
          )}
          <div className="hero-cta flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <Link href="/ceo" className="group flex items-center gap-4">
              <span className="w-12 h-12 rounded-full flex items-center justify-center text-[#B8965A] text-lg font-extralight" style={{ border: "1px solid rgba(184,150,90,0.5)" }}>양</span>
              <span>
                <span className="block text-base font-light group-hover:text-[#B8965A] transition-colors">양성열 · simplyciety 대표</span>
                <span className="block text-xs text-[#6A6A6A] mt-0.5">AI와 데이터를 더 쉽게 — 발표자 소개 보기 →</span>
              </span>
            </Link>
            <nav className="flex flex-wrap gap-2" aria-label="페이지 목차">
              {[
                ["#takeaways", "핵심 메시지"],
                ["#checklist", "실무 체크리스트"],
                ["#public-data", "무료 데이터"],
                ["#geo", "AI 노출 점검"],
                ["#prompts", "프롬프트"],
              ].map(([href, label]) => (
                <a key={href} href={href} className="text-xs px-3 py-2 text-[#A8A49E] hover:text-[#B8965A] transition-colors" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* ─── TAKEAWAYS ─── */}
      <section className="py-20 md:py-28 px-5 md:px-16 bg-[#060606]" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto">
          <SectionHead id="takeaways" eyebrow="Takeaways" title={<>오늘 가져가실 <span className="italic text-[#B8965A]">세 가지</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(255,255,255,0.06)]">
            {TAKEAWAYS.map((tk, i) => (
              <div key={tk.num} data-reveal data-reveal-delay={String(i + 1)} className="bg-[#060606] p-8 md:p-10 flex flex-col gap-4">
                <span className="text-[0.6rem] tracking-[0.3em] text-[#B8965A]">{tk.num}</span>
                <h3 className="text-2xl font-extralight tracking-tight leading-snug">{tk.title}</h3>
                <p className="text-[#8A8780] text-sm leading-[1.9] font-light">{tk.desc}</p>
              </div>
            ))}
          </div>
          <blockquote data-reveal className="mt-16 text-center text-[clamp(1.4rem,3vw,2.4rem)] font-extralight leading-[1.4] tracking-tight text-[#D4D0CA]">
            &ldquo;도구는 6개월마다 바뀌지만,
            <br />
            <span className="text-[#B8965A]">오늘부터 쌓은 데이터는 10년 간다.</span>&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ─── FIVE NOTES ─── */}
      <section className="py-20 md:py-28 px-5 md:px-16" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto">
          <SectionHead
            id="checklist"
            eyebrow="Checklist"
            title={<>엔지니어가 드리는 <span className="italic text-[#B8965A]">다섯 가지</span></>}
            desc="도구를 사기 전에 먼저 해두면 좋은 것들. 순서는 내 데이터 → 공개 데이터 → AI. 뒤집으면 비용만 듭니다."
          />
          <ol className="flex flex-col">
            {FIVE_NOTES.map((n, i) => (
              <li key={i} data-reveal className="grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr_1.4fr] gap-x-4 gap-y-2 py-7 items-baseline" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: i === FIVE_NOTES.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                <span className="text-2xl font-extralight text-[#B8965A]">{i + 1}</span>
                <h3 className="text-lg md:text-xl font-light tracking-tight">{n.title}</h3>
                <p className="col-start-2 md:col-start-3 text-[#8A8780] text-sm leading-[1.8] font-light">{n.desc}</p>
              </li>
            ))}
          </ol>

          {/* Where to start */}
          <div className="mt-20">
            <p data-reveal className="text-[0.6rem] tracking-[0.3em] uppercase text-[#8A8780] mb-6">AI를 어디에 쓸 것인가 — 시작할 자리 한 곳 고르기</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(255,255,255,0.06)]">
              {START_HERE.map((a) => (
                <div key={a.area} data-reveal className="bg-[#080808] p-6">
                  <h3 className="text-base font-light text-[#B8965A] mb-4">{a.area}</h3>
                  <ul className="flex flex-col gap-2">
                    {a.items.map((it) => (
                      <li key={it} className="text-[#A8A49E] text-sm font-light">{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm font-light">
              <p className="px-5 py-4 text-[#D4D0CA]" style={{ border: "1px solid rgba(184,150,90,0.35)" }}>
                <span className="text-[#B8965A] mr-2">여기부터</span> 반복된다 · 형식이 있다 · 내가 검수할 수 있다
              </p>
              <p className="px-5 py-4 text-[#8A8780]" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="text-[#6A6A6A] mr-2">당분간 미뤄둘 것</span> 창작 · 사실 판단 · 고객에게 직접 노출
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PUBLIC DATA ─── */}
      <section className="py-20 md:py-28 px-5 md:px-16 bg-[#060606]" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto">
          <SectionHead
            id="public-data"
            eyebrow="Free data"
            title={<>계정만 만들면 <span className="italic text-[#B8965A]">오늘부터</span> 볼 수 있는 데이터</>}
            desc="밖에서 구하기 전에 안에 쌓인 것부터(자사몰 주문, 서점별 판매·정산, 뉴스레터, SNS 반응). 그다음 공개 데이터를 겹쳐 봅니다."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(255,255,255,0.06)]">
            {PUBLIC_DATA.map((d) => (
              <a key={d.name} href={d.url} target="_blank" rel="noopener noreferrer" data-reveal className="group bg-[#060606] p-8 flex flex-col gap-3 hover:bg-[#0A0A0A] transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-extralight tracking-tight group-hover:text-[#B8965A] transition-colors">{d.name}</h3>
                  <span className="text-[#B8965A]/60 group-hover:text-[#B8965A] text-sm">↗</span>
                </div>
                <p className="text-[#D4D0CA] text-sm font-light">{d.what}</p>
                <p className="text-[#8A8780] text-sm leading-[1.8] font-light">{d.tip}</p>
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs text-[#6A6A6A] leading-relaxed">
            한계: 전산망에 연계되지 않은 채널이 있고, 아동·학습서는 실제보다 작게 보일 수 있습니다. 빠르게 크는 채널일수록 집계에 안 잡히므로 검색량 · SNS 언급량 · 판매지수 변화를 겹쳐 보세요.
          </p>
        </div>
      </section>

      {/* ─── GEO ─── */}
      <section className="py-20 md:py-28 px-5 md:px-16" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto">
          <SectionHead
            id="geo"
            eyebrow="AI Discoverability · GEO"
            title={<>우리 책, <span className="italic text-[#B8965A]">AI는 알고 있을까</span></>}
            desc="검색 상위 노출(SEO) 다음 단계는 AI 답변에 인용되게 만드는 일(GEO)입니다. AI 답변에 안 나오면 독자도 모릅니다 — 메타데이터가 새 발견 경로입니다."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#8A8780] mb-5">방법 · AI가 읽고 인용할 재료 만들기</p>
              <ul className="flex flex-col">
                {GEO_METHODS.map((m, i) => (
                  <li key={m.k} data-reveal className="grid grid-cols-[2rem_7rem_1fr] gap-3 py-4 items-baseline" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    <span className="text-[#B8965A] text-sm">{i + 1}</span>
                    <span className="text-[#F0EDE8] text-sm font-light">{m.k}</span>
                    <span className="text-[#8A8780] text-sm font-light leading-relaxed">{m.v}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#8A8780] mb-5">점검 · 한 달에 한 번 같은 질문을 AI에게</p>
              <ul className="flex flex-col gap-2">
                {GEO_CHECKS.map((c) => (
                  <li key={c.q} data-reveal className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-5 py-4" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                    <span className="text-[#D4D0CA] text-sm font-light">{c.q}</span>
                    <span className="text-[0.65rem] tracking-[0.1em] text-[#B8965A] flex-shrink-0">→ {c.check}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-[#8A8780] font-light leading-relaxed">
                기록할 것: 나왔나 · 맞나 · 어디를 근거로 댔나(출처 링크). 정해진 공식은 아직 없지만, 통계·인용문을 더한 글이 AI 답변에 더 많이 인용된다는 연구 결과가 있습니다(GEO, KDD 2024).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROMPTS ─── */}
      <section className="py-20 md:py-28 px-5 md:px-16 bg-[#060606]" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto">
          <SectionHead
            id="prompts"
            eyebrow="Copy & Paste"
            title={<>그대로 복사해 쓰는 <span className="italic text-[#B8965A]">프롬프트 셋</span></>}
            desc="오늘 돌아가서 한 번씩 돌려보세요. 공통 규칙: 배경 · 예시 · 형식을 함께 / 숫자와 인용은 원문 대조 / 독자 개인정보는 넣지 않기."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {PROMPTS.map((p, i) => (
              <div key={p.title} data-reveal data-reveal-delay={String(i + 1)} className="flex flex-col" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="flex items-center justify-between gap-3 px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <div>
                    <p className="text-[0.6rem] tracking-[0.2em] text-[#B8965A] mb-1">{i + 1} · {p.input} →</p>
                    <h3 className="text-lg font-light">{p.title}</h3>
                  </div>
                  <CopyButton text={p.body} />
                </div>
                <pre className="px-5 py-5 text-[0.8rem] leading-[1.8] text-[#A8A49E] whitespace-pre-wrap font-[inherit] flex-1">{p.body}</pre>
              </div>
            ))}
          </div>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { k: "표시", v: "AI 활용 범위를 어떻게 밝힐 것인가" },
              { k: "계약", v: "저자 계약에 AI 학습 조항이 있는가" },
              { k: "정보", v: "무엇을 넣지 않을 것인가 — 독자 개인정보는 외부 AI 금지" },
            ].map((r) => (
              <div key={r.k} data-reveal className="pt-5" style={{ borderTop: "1px solid rgba(184,150,90,0.35)" }}>
                <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#B8965A] mb-2">AI 쓰기 전에 정해둘 것 · {r.k}</p>
                <p className="text-[#D4D0CA] text-sm font-light leading-relaxed">{r.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEXT ─── */}
      <section className="py-20 md:py-32 px-5 md:px-16" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(255,255,255,0.06)]">
          <div data-reveal className="bg-[#080808] p-8 md:p-12 flex flex-col gap-5">
            <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#B8965A]">simplyciety</p>
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight leading-tight">
              우리 출판사 데이터,
              <br />
              <span className="italic text-[#B8965A]">어디서부터?</span>
            </h2>
            <p className="text-[#8A8780] text-sm leading-[1.9] font-light">
              서점에서 해온 일 — 데이터 기반 정리, 사람을 단계별로 길러낸 일, 읽히는 분석물로 조직을 설득한 일 — 을 출판사와 다른 조직에 그대로 적용하고 있습니다. 발표 내용에 대한 질문도 편하게 남겨주세요.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <Link href="/contact?service=forum" className="btn-gold">문의 · 자료 요청 →</Link>
              <Link href="/diagnosis" className="btn-primary">3분 AI 준비도 진단</Link>
            </div>
          </div>
          <div data-reveal data-reveal-delay="1" className="bg-[#080808] p-8 md:p-12 flex flex-col gap-5">
            <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#B8965A]">dataSimplr · 2026.10.18 출시</p>
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight leading-tight">
              데이터팀이 없어도
              <br />
              <span className="italic text-[#B8965A]">AI가 읽는 데이터로</span>
            </h2>
            <p className="text-[#8A8780] text-sm leading-[1.9] font-light">
              판매·정산 파일, 회원 DB, 리뷰를 올리면 표·문서·연결·의미로 정리하고, 에이전트가 그 위에서 분석합니다. 발표에서 말씀드린 &lsquo;AI가 쓸 수 있는 데이터 여섯 조건&rsquo;을 제품으로 만들고 있습니다.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <Link href="/datasimplr#waitlist" className="btn-gold">대기명단 등록 →</Link>
              <Link href="/datasimplr" className="btn-primary">제품 보기</Link>
            </div>
          </div>
        </div>
        <p className="max-w-screen-xl mx-auto mt-8 text-[0.7rem] text-[#5A5A5A] leading-relaxed">
          발표 중 서점 재직 시 자료에서 인용한 내용은 방향과 구조만 제시했으며, 내부 운영 수치는 포함하지 않았습니다. 주최: 한국출판문화산업진흥원 · 운영: 데이터마케팅코리아.
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
