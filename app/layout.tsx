import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://simplyciety.com"),
  title: {
    default: "simplyciety — AI로 조직을 단순화합니다",
    template: "%s | simplyciety",
  },
  description:
    "simplyciety는 AX 컨설팅, AI/데이터 플랫폼 구축, AX/DX 교육·조직문화빌딩으로 기업의 복잡성을 AI로 걷어내는 전문 기업입니다. Less noise. More signal.",
  keywords: [
    "AX 컨설팅", "AI 전환 컨설팅", "AI 전환 전략", "DX 컨설팅", "AI 컨설팅",
    "데이터 플랫폼 구축", "데이터 파이프라인", "AWS 데이터 구축", "Snowflake 구축",
    "데이터 거버넌스", "데이터 엔지니어링", "AI 교육", "데이터 리터러시",
    "조직문화 빌딩", "AX 교육", "DX 교육", "simplyciety", "AI 조직 단순화",
  ],
  authors: [{ name: "Mr. Simpler", url: "https://simplyciety.com/ceo" }],
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
    title: "simplyciety — AI로 조직을 단순화합니다",
    description:
      "AX 컨설팅, 데이터·AI 플랫폼 구축, AX/DX 교육으로 조직의 복잡성을 걷어냅니다.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "simplyciety" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "simplyciety — AI로 조직을 단순화합니다",
    description: "AX 컨설팅·데이터 플랫폼 구축·AI 교육 전문 기업. Less noise. More signal.",
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
  logo: "https://simplyciety.com/og-image.png",
  description:
    "AI 기반 조직 단순화 전문 기업. AX 컨설팅, 데이터·AI 플랫폼 구축, AX/DX 교육·조직문화빌딩 서비스를 제공합니다.",
  founder: {
    "@type": "Person",
    name: "Mr. Simpler",
    jobTitle: "Founder & CEO",
    sameAs:
      "https://www.linkedin.com/in/%EC%84%B1%EC%97%B4-%EC%96%91-bab2b4153/",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@simplyciety.com",
    contactType: "customer service",
    areaServed: "KR",
    availableLanguage: "Korean",
  },
  sameAs: [
    "https://www.linkedin.com/in/%EC%84%B1%EC%97%B4-%EC%96%91-bab2b4153/",
  ],
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
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI/Data 플랫폼 구축", description: "AWS·Snowflake 기반 데이터 파이프라인 및 AI 시스템 구축" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AX/DX 교육·조직문화빌딩", description: "데이터 리터러시, 경영진 AX 브리핑, DX 조직문화 워크샵" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${geist.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
