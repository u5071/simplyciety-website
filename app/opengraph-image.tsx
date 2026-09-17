import { ImageResponse } from "next/og";

export const alt = "simplyciety — Data → AI → Simplify";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background: "radial-gradient(ellipse at top right, #2a2112 0%, #080808 55%)",
          color: "#F0EDE8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, letterSpacing: 8, color: "#B8965A" }}>
          <div style={{ width: 48, height: 2, background: "#B8965A" }} />
          SIMPLYCIETY
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 150, lineHeight: 0.95, letterSpacing: -4, fontWeight: 300 }}>
          <span>Simple</span>
          <span style={{ color: "#B8965A", fontStyle: "italic" }}>Society.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#8A8780" }}>
          <span>Data → AI → Simplify</span>
          <span>simplyciety.com</span>
        </div>
      </div>
    ),
    size
  );
}
