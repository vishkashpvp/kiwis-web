import { ImageResponse } from "next/og";

import { env } from "@/lib/env";

export const runtime = "edge";

const APP_NAME = env.client.NEXT_PUBLIC_APP_NAME;

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(180deg, #000000, #0a0a0a)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "56px",
            gap: "28px",
            fontFamily: "system-ui",
            textAlign: "center",
          }}>
          {/* badge */}
          <div
            style={{
              padding: "10px 22px",
              fontSize: "18px",
              fontWeight: 600,
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.14)",
              backdropFilter: "blur(6px)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.22)",
            }}>
            Private by design
          </div>

          {/* content */}
          <div
            style={{
              maxWidth: "720px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}>
            <h1
              style={{
                fontSize: "52px",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.5px",
              }}>
              AI-powered insights from your email
            </h1>

            <p
              style={{
                fontSize: "24px",
                lineHeight: 1.45,
                opacity: 0.8,
                fontWeight: 400,
              }}>
              See upcoming payments, fully private. {APP_NAME} surfaces what matters — without ever
              compromising your data.
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (err) {
    console.error(err);
    return new Response("OG generation failed", { status: 500 });
  }
}
