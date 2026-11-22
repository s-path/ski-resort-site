import type { Prefecture } from "./resorts";

type Palette = { bg: string; fg: string; dot: string };

/** 県ごとの色。薄い背景＋濃い文字で、文字のコントラストを確保している */
export const PREF_COLORS: Record<Prefecture, Palette> = {
  群馬: { bg: "#E6EEFB", fg: "#0B3B8C", dot: "#3F68B0" },
  栃木: { bg: "#FDEBDD", fg: "#8A3B0C", dot: "#D9782F" },
  新潟: { bg: "#DFF3F1", fg: "#0B5E57", dot: "#2A9D90" },
  長野: { bg: "#EEE8FA", fg: "#4B2A8C", dot: "#7B5CC4" },
  山梨: { bg: "#F6F0D8", fg: "#6B5200", dot: "#B8961E" },
  静岡: { bg: "#FBE6EC", fg: "#8C1F43", dot: "#C94A72" },
  埼玉: { bg: "#EEF0F3", fg: "#3A4456", dot: "#8A93A3" },
};

export function prefColor(p: string): Palette {
  return PREF_COLORS[p as Prefecture] ?? PREF_COLORS.埼玉;
}
