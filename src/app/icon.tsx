import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Generated favicon: "AN" monogram on the brand gradient. */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,#2563eb,#8a2be2)",
        borderRadius: 14,
        color: "white",
        fontSize: 30,
        fontWeight: 700,
        letterSpacing: -1,
      }}
    >
      AN
    </div>,
    size,
  );
}
