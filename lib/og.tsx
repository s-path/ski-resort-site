import { ImageResponse } from "next/og";
import { SITE_NAME } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * 画像に使う文字だけを含む日本語フォントを Google Fonts から取る。
 * 取れなかったときは null（既定のフォントで描く）。
 */
async function loadFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&text=${encodeURIComponent(text)}`,
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((res) => res.text());
    const url = css.match(/src: url\((.+?)\) format/)?.[1];
    if (!url) return null;
    return await fetch(url).then((res) => res.arrayBuffer());
  } catch {
    return null;
  }
}

type OgProps = {
  eyebrow: string;
  title: string;
  lines: string[];
};

/** サイト共通のOGP画像（白地・濃紺・雪山のシルエット） */
export async function renderOg({ eyebrow, title, lines }: OgProps) {
  const text = [SITE_NAME, eyebrow, title, ...lines].join("");
  const font = await loadFont(text);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ffffff",
        padding: "64px 72px",
        ...(font ? { fontFamily: "NotoSansJP" } : {}),
        position: "relative",
      }}
    >
      <svg
        width="1200"
        height="260"
        viewBox="0 0 1200 260"
        style={{ position: "absolute", left: 0, bottom: 0 }}
        role="img"
      >
        <title>雪山</title>
        <path
          d="M0 260 L0 170 L180 70 L300 150 L470 20 L640 140 L760 90 L930 190 L1060 110 L1200 170 L1200 260 Z"
          fill="#e8eef8"
        />
        <path
          d="M0 260 L0 220 L240 130 L420 210 L600 120 L820 230 L1010 160 L1200 220 L1200 260 Z"
          fill="#0a1f44"
        />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", fontSize: 30, color: "#0b3b8c" }}>
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 14 ? 64 : 76,
            color: "#0a1f44",
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {lines.map((l) => (
            <div
              key={l}
              style={{ display: "flex", fontSize: 32, color: "#2a3f66" }}
            >
              {l}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: "#ffffff",
          position: "relative",
        }}
      >
        {SITE_NAME}
      </div>
    </div>,
    font
      ? {
          ...OG_SIZE,
          fonts: [
            { name: "NotoSansJP", data: font, weight: 700, style: "normal" },
          ],
        }
      : OG_SIZE,
  );
}
