import type { Metadata } from "next";
import ForumContent from "./ForumContent";

export const metadata: Metadata = {
  title: "서점은 독자를 어떻게 읽는가 — 2026 출판 데이터 마케팅 포럼 발표 자료",
  description:
    "2026 출판 데이터 마케팅 포럼 발표(양성열, simplyciety 대표)의 핵심 메시지와 슬라이드에 못 담은 실무 체크리스트 — 무료 데이터, AI 노출 점검(GEO), 복사해 쓰는 프롬프트.",
  alternates: { canonical: "https://simplyciety.com/forum" },
  openGraph: {
    url: "https://simplyciety.com/forum",
    title: "서점은 독자를 어떻게 읽는가 — 발표 자료",
    description: "대형서점의 데이터·AI 활용 전략 · 출판사가 내일 할 수 있는 것 · 실무 체크리스트",
  },
};

const EVENT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "제1회 2026 출판 데이터 마케팅 포럼 — 서점은 독자를 어떻게 읽는가",
  startDate: "2026-09-18",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  organizer: { "@type": "Organization", name: "한국출판문화산업진흥원", url: "https://www.kpipa.or.kr/p/g1_2/2152" },
  performer: { "@type": "Person", name: "양성열", url: "https://simplyciety.com/ceo" },
  url: "https://simplyciety.com/forum",
};

export default function ForumPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(EVENT_SCHEMA) }} />
      <ForumContent />
    </>
  );
}
