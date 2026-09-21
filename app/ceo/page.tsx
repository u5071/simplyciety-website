import type { Metadata } from "next";
import CeoContent from "./CeoContent";

export const metadata: Metadata = {
  title: "대표 소개 — 양성열",
  description:
    "simplyciety 대표 양성열. 금융·데이터·AI·유통/문화를 거쳐 데이터 조직을 이끌었고, 지금은 AI를 위한 데이터 플랫폼 dataSimplr를 만들고 있습니다.",
  alternates: { canonical: "https://simplyciety.com/ceo" },
  openGraph: {
    type: "profile",
    url: "https://simplyciety.com/ceo",
    title: "양성열 — simplyciety 대표",
    description: "AI와 데이터를 더 쉽게. 데이터 조직의 네 단계를 모두 지나온 데이터·AI 실무 리더.",
  },
};

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "양성열",
  alternateName: ["Sungreul Yang", "Mr. Simpler"],
  jobTitle: "Founder & CEO",
  worksFor: { "@type": "Organization", name: "simplyciety", url: "https://simplyciety.com" },
  url: "https://simplyciety.com/ceo",
  email: "yang5071@gmail.com",
  sameAs: ["https://www.linkedin.com/in/%EC%84%B1%EC%97%B4-%EC%96%91-bab2b4153/"],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "서울과학종합대학원 (aSSIST)" },
    { "@type": "CollegeOrUniversity", name: "경희대학교" },
  ],
  knowsAbout: ["Data Engineering", "Data Platform", "AI Transformation", "Demand Forecasting", "Data Monetization"],
};

export default function CeoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }} />
      <CeoContent />
    </>
  );
}
