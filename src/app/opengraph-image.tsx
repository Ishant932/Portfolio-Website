import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ishant Goyal — Full Stack Developer · Software Developer · AI Specialist";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0a1e 0%, #1e1035 45%, #2a1245 100%)",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px" }}>
          <div
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "28px",
              background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            IG
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "58px", fontWeight: 800, color: "#ffffff", letterSpacing: "-1px" }}>
              Ishant Goyal
            </div>
            <div style={{ fontSize: "26px", color: "#a78bfa", fontWeight: 600 }}>Jaipur, Rajasthan, India</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "14px",
            marginTop: "8px",
            marginBottom: "30px",
          }}
        >
          {["Full Stack Developer", "Software Developer", "AI Specialist"].map((r, i) => (
            <div
              key={r}
              style={{
                padding: "14px 28px",
                borderRadius: "999px",
                border: "2px solid rgba(167,139,250,0.5)",
                background: "rgba(139,92,246,0.15)",
                color: i === 1 ? "#fbbf24" : i === 2 ? "#34d399" : "#c4b5fd",
                fontSize: "26px",
                fontWeight: 700,
              }}
            >
              {r}
            </div>
          ))}
        </div>
        <div style={{ fontSize: "24px", color: "#9ca3af", textAlign: "center", maxWidth: "880px" }}>
          Building scalable full-stack ecosystems &amp; AI-powered digital experiences — trusted by
          platforms serving 75,000+ users.
        </div>
        <div style={{ fontSize: "22px", color: "#6b7280", marginTop: "34px" }}>
          ishant.in &nbsp;·&nbsp; github.com/Ishant932 &nbsp;·&nbsp; in/ishant-goyal
        </div>
      </div>
    ),
    { ...size }
  );
}
