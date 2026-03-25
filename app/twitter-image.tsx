import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "56px 72px",
          background:
            "linear-gradient(135deg, #f6efe8 0%, #efe3d7 35%, #ddcbb8 100%)",
          color: "#1f1a17",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 82,
            fontWeight: 800,
            letterSpacing: 2,
            marginBottom: 18,
          }}
        >
          РОК-М
        </div>
        <div style={{ fontSize: 38, lineHeight: 1.25, maxWidth: 980 }}>
          Ресурсно-орієнтовані когнітивні методики
        </div>
        <div style={{ fontSize: 26, marginTop: 28, opacity: 0.8 }}>
          Богдана Андрейко
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
