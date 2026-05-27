import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "서비스 — simplyciety | AX 컨설팅·데이터 플랫폼·AI 교육",
  description:
    "simplyciety는 AX 컨설팅(AI 전환 전략), 데이터·AI 플랫폼 구축, AX/DX 교육·조직문화빌딩으로 조직의 복잡성을 AI로 걷어냅니다.",
  keywords: [
    "AX 컨설팅", "AI 전환 컨설팅", "AI 전환 전략", "DX 컨설팅",
    "데이터 플랫폼 구축", "데이터 파이프라인", "AWS", "Snowflake",
    "데이터 거버넌스", "AI 교육", "데이터 리터러시", "조직문화 빌딩",
    "AX consulting Korea", "AI transformation Korea", "data platform AWS Snowflake",
  ],
  openGraph: {
    title: "simplyciety Services — AX Consulting · Data Platform · AI Education",
    description: "We cut organizational complexity with AI. Three ways: consulting, platform build, and culture education.",
    type: "website",
    url: "https://simplyciety.com/services",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
