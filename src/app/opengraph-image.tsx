import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.shortName} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card generated at build time (LinkedIn, X, WhatsApp previews). */
export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "radial-gradient(circle at 80% 10%, #1e3a8a 0%, #0e0e0f 55%)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: "linear-gradient(135deg,#2563eb,#8a2be2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 700,
          }}
        >
          AN
        </div>
        <div style={{ fontSize: 28, color: "#a1a7a7" }}>{site.location}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>{site.shortName}</div>
        <div style={{ fontSize: 40, color: "#87ceeb", marginTop: 8 }}>{site.role}</div>
        <div style={{ fontSize: 28, color: "#a1a7a7", marginTop: 24 }}>
          React · Next.js · TypeScript · Node.js · PostgreSQL · AWS
        </div>
      </div>
    </div>,
    size,
  );
}
