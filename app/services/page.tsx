import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "서비스 — simplyciety | AX 컨설팅·AI 교육·플랫폼 구축·dataSimplr",
  description:
    "AI와 데이터로 비즈니스를 단순하게. simplyciety는 AX 컨설팅(Consult), AX/DX 교육(Educate), AI·데이터 플랫폼과 에이전트 구축(Build), 자체 솔루션 dataSimplr와 데이터 상품화(Create)를 제공합니다.",
  keywords: [
    "AX 컨설팅", "AI 전환 컨설팅", "AI 전환 전략", "DX 컨설팅",
    "데이터 플랫폼 구축", "데이터 파이프라인", "AI 에이전트 구축", "업무 자동화", "AWS", "Snowflake",
    "데이터 거버넌스", "AI 교육", "데이터 리터러시", "조직문화 빌딩",
    "AX consulting Korea", "AI transformation Korea", "data platform AWS Snowflake",
  ],
  openGraph: {
    title: "simplyciety Services — Consult · Educate · Build · Create",
    description: "Simplifying business with AI and data — four ways: AX consulting, education, platform & agent builds, and our own products.",
    type: "website",
    url: "https://simplyciety.com/services",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
