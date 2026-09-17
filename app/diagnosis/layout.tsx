import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 준비도 진단 — 3분 AI Readiness Assessment",
  description:
    "데이터 기반, 정의·품질, 비정형 데이터, 거버넌스, AI 활용, 조직 역량 6개 영역으로 우리 조직의 AI 준비도를 진단하고 우선 개선 과제를 확인하세요.",
  alternates: { canonical: "https://simplyciety.com/diagnosis" },
};

export default function DiagnosisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
