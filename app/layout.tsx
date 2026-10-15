import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { THEME_INIT_SCRIPT, ThemeProvider } from "./contexts/ThemeContext";
import { Analytics } from "@vercel/analytics/next";
import { CONTACT_EMAIL, CONTACT_PHONE_INTL, LINKEDIN_URL, TAGLINE } from "../lib/contact";
import { LAUNCH_LABEL } from "../lib/launch";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://simplyciety.com"),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  title: {
    default: "simplyciety — AI와 데이터로 비즈니스를 단순하게",
    template: "%s | simplyciety",
  },
  description:
    "simplyciety(대표 양성열)는 AX 컨설팅, AI/데이터 플랫폼 구축, AX/DX 교육으로 기업의 복잡성을 AI로 걷어냅니다. 데이터팀 없는 팀을 위한 AI 데이터 플랫폼 dataSimplr를 만듭니다. Consult · Educate · Build · Create.",
  keywords: [
    "AX 컨설팅", "AI 전환 컨설팅", "AI 전환 전략", "DX 컨설팅", "AI 컨설팅",
    "데이터 플랫폼 구축", "데이터 파이프라인", "AWS 데이터 구축", "Snowflake 구축",
    "데이터 거버넌스", "데이터 엔지니어링", "AI 교육", "데이터 리터러시",
    "조직문화 빌딩", "AX 교육", "DX 교육", "simplyciety", "AI 조직 단순화",
    "dataSimplr", "양성열", "AI 에이전트", "데이터 플랫폼",
  ],
  authors: [{ name: "양성열", url: "https://simplyciety.com/ceo" }],
  creator: "simplyciety",
  publisher: "simplyciety",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://simplyciety.com",
    siteName: "simplyciety",
    title: "simplyciety — AI와 데이터로 비즈니스를 단순하게",
    description:
      "AX 컨설팅, 데이터·AI 플랫폼 구축, AX/DX 교육으로 조직의 복잡성을 걷어냅니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "simplyciety — AI와 데이터로 비즈니스를 단순하게",
    description: "AX 컨설팅·데이터 플랫폼 구축·AI 교육 전문 기업. Consult · Educate · Build · Create.",
  },
  alternates: {
    canonical: "https://simplyciety.com",
  },
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "simplyciety",
  url: "https://simplyciety.com",
  logo: "https://simplyciety.com/favicon.svg",
  slogan: TAGLINE.ko,
  description:
    "AI와 데이터로 비즈니스를 단순하게 만드는 회사. AX 컨설팅(Consult), AX/DX 교육(Educate), AI·데이터 플랫폼·에이전트 구축(Build), 자체 솔루션 dataSimplr(Create)를 제공합니다.",
  founder: {
    "@type": "Person",
    name: "양성열",
    alternateName: "Sungreul Yang",
    jobTitle: "Founder & CEO",
    url: "https://simplyciety.com/ceo",
    sameAs: LINKEDIN_URL,
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE_INTL,
    contactType: "customer service",
    areaServed: "KR",
    availableLanguage: "Korean",
  },
  sameAs: [LINKEDIN_URL],
  areaServed: "KR",
  knowsAbout: [
    "AI Transformation",
    "Data Engineering",
    "Data Platform",
    "Organizational Simplification",
    "AX Consulting",
    "Data Literacy Education",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "simplyciety 서비스",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AX 컨설팅", description: "AI 전환 전략 수립 및 조직 AI 준비도 진단" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AX/DX 교육·조직문화빌딩", description: "데이터 리터러시, 경영진 AX 브리핑, DX 조직문화 워크샵" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI/Data 플랫폼·에이전트 구축", description: "데이터 파이프라인, 사내 데이터 포털, 예측 모델, AI 에이전트·업무 자동화 구축" } },
      { "@type": "Offer", itemOffered: { "@type": "SoftwareApplication", name: "dataSimplr", description: `데이터팀 없는 팀을 위한 AI 데이터 플랫폼 (${LAUNCH_LABEL.ko} 출시)` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "데이터 상품화", description: "보유 데이터를 외부 파트너에 제공하는 데이터 상품·API 설계와 구축" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${geist.variable} h-full`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />
      </head>
      <body className="min-h-full">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
