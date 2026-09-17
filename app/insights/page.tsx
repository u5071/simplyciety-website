import type { Metadata } from "next";
import { getAllPosts } from "../../lib/posts";
import InsightsContent from "./InsightsContent";

export const metadata: Metadata = {
  title: "인사이트 — simplyciety | AI·데이터 전환 현장 이야기",
  description:
    "AI·데이터 전환의 현장을 직접 뛰며 얻은 인사이트. 이론이 아닌 실전 경험에서 꺼낸 이야기들.",
  openGraph: {
    title: "simplyciety Insights — From the Field",
    description: "Real insights from building data organizations and driving AI transformation.",
    url: "https://simplyciety.com/insights",
  },
};

export default function InsightsPage() {
  const posts = getAllPosts();
  return <InsightsContent posts={posts} />;
}
