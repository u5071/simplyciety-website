import type { Metadata } from "next";
import CeoContent from "./CeoContent";
import { CONTACT_EMAIL, CONTACT_PHONE_INTL, LINKEDIN_URL } from "../../lib/contact";

export const metadata: Metadata = {
  title: "대표 소개 — 양성열",
  description:
    "simplyciety 대표 양성열. AWS Summit Seoul·출판 데이터 마케팅 포럼 연사. 13년 넘게 데이터 민주화, AI 적용, 데이터 수익화를 이끌었고, 지금은 AI를 위한 데이터 플랫폼 dataSimplr를 만듭니다.",
  alternates: { canonical: "https://simplyciety.com/ceo" },
  openGraph: {
    type: "profile",
    url: "https://simplyciety.com/ceo",
    title: "양성열 — simplyciety 대표",
    description: "AI와 데이터로 비즈니스를 단순하게. 데이터 조직의 네 단계를 모두 지나온 데이터·AI 리더.",
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
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE_INTL,
  sameAs: [LINKEDIN_URL],
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
