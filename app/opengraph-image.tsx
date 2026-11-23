import { OG_SIZE, renderOg } from "@/lib/og";

export const alt =
  "SNOWLINE 関東｜関東から行けるスキー場のオープン日・リフト券料金";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: "2026-27シーズン",
    title: "関東から行けるスキー場の、いまがわかる。",
    lines: ["オープン日・営業状況・リフト券・早割をまとめてチェック"],
  });
}
