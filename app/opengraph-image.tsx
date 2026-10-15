import { ImageResponse } from "next/og";
import { DOMAINS, PILLARS } from "../lib/contact";

export const alt = "simplyciety — Consult · Educate · Build · Create";
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
        <div style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 28, letterSpacing: 10, color: "#F0EDE8" }}>
          <svg width="62" height="60" viewBox="0 0 104 100" fill="none">
            <path d="M100 38V2H2v96h98V62" stroke="#B8965A" strokeWidth="3" />
            <path d="M13 28l32 22M13 50h32M13 72l32-22" stroke="#B8965A" strokeWidth="3" />
            <rect x="44.5" y="44.5" width="11" height="11" fill="#B8965A" />
            <path d="M55 50h49" stroke="#B8965A" strokeWidth="3" />
          </svg>
          SIMPLYCIETY
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 150, lineHeight: 0.95, letterSpacing: -4, fontWeight: 300 }}>
          <span>Simple</span>
          <span style={{ color: "#B8965A", fontStyle: "italic" }}>Society.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 28, color: "#8A8780" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, letterSpacing: 3 }}>
            <span style={{ color: "#D4D0CA" }}>{PILLARS}</span>
            <span>{DOMAINS}</span>
          </div>
          <span>simplyciety.com</span>
        </div>
      </div>
    ),
    size
  );
}
