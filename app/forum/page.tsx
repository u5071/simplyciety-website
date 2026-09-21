import type { Metadata } from "next";
import ForumContent from "./ForumContent";

export const metadata: Metadata = {
  title: "서점은 독자를 어떻게 읽는가 — 2026 출판 데이터 마케팅 포럼 발표 자료",
  description:
    "2026 출판 데이터 마케팅 포럼 발표(양성열, simplyciety 대표)의 핵심 메시지와 슬라이드에 못 담은 실무 체크리스트 — 무료 데이터, AI 노출 점검(GEO), 복사해 쓰는 프롬프트.",
  // Unlisted: shared directly with attendees, kept out of search and the sitemap.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function ForumPage() {
  return (
    <ForumContent />
  );
}
