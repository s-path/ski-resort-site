// 気象庁アメダスの積雪データ（気象庁ホームページのデータを加工して作成）
// 観測点は名前と都道府県番号で探す（観測点番号は変わることがあるため、毎回一覧から引く）

import type { AreaKey } from "./resorts";

const BASE = "https://www.jma.go.jp/bosai/amedas";
/** 1時間ごとに取り直す */
const REVALIDATE = 3600;
const TIMEOUT_MS = 8000;

/** アメダス観測所番号の上2桁（都府県番号） */
const PREF = {
  栃木: "41",
  群馬: "42",
  長野: "48",
  山梨: "49",
  新潟: "54",
} as const;

type Candidate = { name: string; pref: keyof typeof PREF };

/** エリアごとの観測点候補。上から順に、積雪を観測している観測点を使う */
const AREA_STATIONS: Partial<Record<AreaKey, Candidate[]>> = {
  minakami: [
    { name: "藤原", pref: "群馬" },
    { name: "みなかみ", pref: "群馬" },
  ],
  kusatsu: [{ name: "草津", pref: "群馬" }],
  nasu: [
    { name: "奥日光", pref: "栃木" },
    { name: "土呂部", pref: "栃木" },
    { name: "那須高原", pref: "栃木" },
  ],
  yuzawa: [
    { name: "湯沢", pref: "新潟" },
    { name: "塩沢", pref: "新潟" },
  ],
  myoko: [{ name: "関山", pref: "新潟" }],
  karuizawa: [{ name: "軽井沢", pref: "長野" }],
  sugadaira: [{ name: "菅平", pref: "長野" }],
  saku: [
    { name: "佐久", pref: "長野" },
    { name: "軽井沢", pref: "長野" },
  ],
  yatsu: [
    { name: "立科", pref: "長野" },
    { name: "原村", pref: "長野" },
    { name: "茅野", pref: "長野" },
  ],
  hakuba: [{ name: "白馬", pref: "長野" }],
  shiga: [
    { name: "野沢温泉", pref: "長野" },
    { name: "信州中野", pref: "長野" },
  ],
  madarao: [{ name: "飯山", pref: "長野" }],
  togakushi: [
    { name: "信濃町", pref: "長野" },
    { name: "長野", pref: "長野" },
  ],
  kiyosato: [
    { name: "野辺山", pref: "長野" },
    { name: "大泉", pref: "山梨" },
  ],
  fuji: [
    { name: "河口湖", pref: "山梨" },
    { name: "山中", pref: "山梨" },
  ],
};

export type Station = { id: string; name: string; alt: number | null };

export type SnowObs = {
  station: Station;
  /** 積雪の深さ（cm） */
  depth: number | null;
  /** 24時間の降雪量（cm） */
  fall24h: number | null;
};

export type SnowReport = {
  /** 観測時刻（ISO 8601、日本時間） */
  time: string | null;
  byArea: Partial<Record<AreaKey, SnowObs>>;
};

async function getJson(path: string): Promise<unknown> {
  const res = await fetch(`${BASE}${path}`, {
    next: { revalidate: REVALIDATE },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`amedas ${path}: ${res.status}`);
  return res.json();
}

async function getText(path: string): Promise<string> {
  const res = await fetch(`${BASE}${path}`, {
    next: { revalidate: REVALIDATE },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`amedas ${path}: ${res.status}`);
  return res.text();
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/** アメダスの値は [値, 品質フラグ] の形。数値でなければ null */
function value(v: unknown): number | null {
  if (!Array.isArray(v)) return null;
  const n = v[0];
  return typeof n === "number" && Number.isFinite(n) && n >= 0 && n < 2000
    ? n
    : null;
}

/** "2026-11-25T08:40:00+09:00" → 正時の "20261125080000" */
export function hourKey(latest: string): string | null {
  const m = latest
    .trim()
    .match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):\d{2}:\d{2}\+09:00$/);
  return m ? `${m[1]}${m[2]}${m[3]}${m[4]}0000` : null;
}

/** 観測点一覧と観測値から、エリアごとの積雪をまとめる（テストしやすいよう取得と分けている） */
export function buildReport(
  table: unknown,
  data: unknown,
  time: string | null,
): SnowReport {
  const byArea: SnowReport["byArea"] = {};
  if (!isRecord(table) || !isRecord(data)) return { time, byArea };

  for (const [area, candidates] of Object.entries(AREA_STATIONS) as [
    AreaKey,
    Candidate[],
  ][]) {
    for (const c of candidates) {
      const id = Object.keys(table).find((k) => {
        const t = table[k];
        return k.startsWith(PREF[c.pref]) && isRecord(t) && t.kjName === c.name;
      });
      if (!id) continue;
      const obs = data[id];
      if (!isRecord(obs) || !("snow" in obs)) continue; // 積雪を観測していない
      const t = table[id] as Record<string, unknown>;
      byArea[area] = {
        station: {
          id,
          name: c.name,
          alt: typeof t.alt === "number" ? t.alt : null,
        },
        depth: value(obs.snow),
        fall24h: value(obs.snow24h),
      };
      break;
    }
  }
  return { time, byArea };
}

/** 最新の積雪をエリアごとに取得する。取れなければ空のレポートを返す（ページは表示を続ける） */
export async function getSnowReport(): Promise<SnowReport> {
  try {
    const latest = await getText("/data/latest_time.txt");
    const key = hourKey(latest);
    if (!key) return { time: null, byArea: {} };
    const [table, data] = await Promise.all([
      getJson("/const/amedastable.json"),
      getJson(`/data/map/${key}.json`),
    ]);
    const time = `${key.slice(0, 4)}-${key.slice(4, 6)}-${key.slice(6, 8)}T${key.slice(8, 10)}:00:00+09:00`;
    return buildReport(table, data, time);
  } catch {
    return { time: null, byArea: {} };
  }
}

export const AMEDAS_SOURCE = {
  label: "気象庁ホームページ（アメダス）のデータを加工して作成",
  url: "https://www.jma.go.jp/bosai/amedas/",
};
