import { ImageResponse } from "next/og";
import { LAUNCH_LABEL } from "../../lib/launch";

export const alt = "dataSimplr — The data platform for teams without a data team";
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
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 24, letterSpacing: 6, color: "#B8965A" }}>
          <div style={{ display: "flex", border: "2px solid #B8965A", padding: "8px 18px" }}>PUBLIC BETA · {LAUNCH_LABEL.en.toUpperCase()}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#8A8780" }}>
            BY
            <svg width="31" height="30" viewBox="0 0 104 100" fill="none">
              <path d="M100 38V2H2v96h98V62" stroke="#8A8780" strokeWidth="5" />
              <path d="M13 28l32 22M13 50h32M13 72l32-22" stroke="#8A8780" strokeWidth="5" />
              <rect x="44.5" y="44.5" width="11" height="11" fill="#8A8780" />
              <path d="M55 50h49" stroke="#8A8780" strokeWidth="5" />
            </svg>
            SIMPLYCIETY
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 150, letterSpacing: -5, fontWeight: 300, lineHeight: 1 }}>
            <span>data</span>
            <span style={{ color: "#B8965A", fontStyle: "italic" }}>Simplr</span>
          </div>
          <div style={{ display: "flex", fontSize: 44, marginTop: 24, color: "#D4D0CA" }}>
            AI-ready data. No data team required.
          </div>
        </div>
        <div style={{ display: "flex", gap: 28, fontSize: 26, color: "#8A8780", letterSpacing: 4 }}>
          <span>RDB</span><span>·</span><span>NoSQL</span><span>·</span><span>GRAPH</span><span>·</span><span>ONTOLOGY</span><span>·</span><span>AGENTS</span>
        </div>
      </div>
    ),
    size
  );
}
