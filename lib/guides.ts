import {
  openingSortKey,
  type Prefecture,
  type Resort,
  resorts,
} from "./resorts";
import { activeDeals, type Deal, getTickets, type TicketInfo } from "./tickets";

/** 県別ページのURLと見出し */
export const PREF_PAGES: {
  slug: string;
  prefecture: Prefecture;
  label: string;
}[] = [
  { slug: "gunma", prefecture: "群馬", label: "群馬" },
  { slug: "tochigi", prefecture: "栃木", label: "栃木" },
  { slug: "niigata", prefecture: "新潟", label: "新潟" },
  { slug: "nagano", prefecture: "長野", label: "長野" },
  { slug: "yamanashi", prefecture: "山梨", label: "山梨" },
];

export function prefPage(slug: string) {
  return PREF_PAGES.find((p) => p.slug === slug);
}

/** オープンが早い順（営業中→予定→確認中） */
export function byOpening(list: Resort[]) {
  return [...list].sort((a, b) =>
    openingSortKey(a).localeCompare(openingSortKey(b)),
  );
}

export function resortsIn(prefecture: Prefecture) {
  return byOpening(resorts.filter((r) => r.prefecture === prefecture));
}

/** 締め切りのある早割を、締め切りが近い順に */
export function earlyBirdDeals(today: string) {
  const rows: { resort: Resort; deal: Deal }[] = [];
  for (const r of resorts) {
    const t = getTickets(r.id);
    if (!t) continue;
    for (const deal of activeDeals(t, today)) {
      if (deal.until) rows.push({ resort: r, deal });
    }
  }
  return rows.sort((a, b) =>
    (a.deal.until ?? "").localeCompare(b.deal.until ?? ""),
  );
}

/**
 * 小学生のリフト券が無料になるスキー場（2026-11-23 時点、各スキー場の発表より）。
 * always: いつでも無料 / 条件つきは note に書く
 */
const KIDS_FREE: { id: string; note?: string }[] = [
  { id: "karuizawa-prince" },
  { id: "manza" },
  { id: "okutone" },
  { id: "kagura" },
  { id: "naeba" },
  { id: "hunter", note: "平日のみ無料" },
  { id: "tambara", note: "平日のみ無料（年末年始などの特定日を除く）" },
  { id: "kandatsu", note: "スキーこどもの日（12/20・1/17・2/21・3/21）は無料" },
  { id: "yuzawa-kogen", note: "スキーこどもの日（1/17・2/21・3/21）は無料" },
  { id: "gala", note: "スキーこどもの日（毎月第3日曜）は無料" },
  { id: "maiko", note: "スキーこどもの日（12月〜3月の第3日曜）は無料" },
];

export function kidsFreeResorts() {
  const find = (id: string) => resorts.find((r) => r.id === id);
  const always = KIDS_FREE.filter((k) => !k.note)
    .map((k) => find(k.id))
    .filter((r): r is Resort => Boolean(r));
  const partial = KIDS_FREE.filter((k) => k.note).flatMap((k) => {
    const r = find(k.id);
    return r ? [{ resort: r, note: k.note as string }] : [];
  });
  return { always: byOpening(always), partial };
}

const KIDS_TAGS = ["キッズパーク", "雪遊びエリア", "キッズ向け緩斜面"];

/** キッズパークや雪遊びエリアがあるスキー場 */
export function kidsParkResorts() {
  return byOpening(
    resorts.filter((r) => r.tags.some((t) => KIDS_TAGS.includes(t))),
  );
}

/** 料金表の文字列から一番安い金額を取り出す（「無料」は0） */
export function minYen(values: (string | undefined)[]) {
  const nums = values.flatMap((v) => {
    if (!v) return [];
    if (v.includes("無料")) return [0];
    const m = v.match(/[\d,]+(?=円)/);
    return m ? [Number(m[0].replace(/,/g, ""))] : [];
  });
  return nums.length > 0 ? Math.min(...nums) : undefined;
}

/** こども1日券の最安値（料金表から） */
export function childMin(t: TicketInfo) {
  return minYen(t.rows.map((r) => r.child));
}

/** 大人1日券の料金表があるスキー場を、安い順に */
export function resortsByAdultPrice() {
  return resorts
    .flatMap((r) => {
      const t = getTickets(r.id);
      return t ? [{ resort: r, tickets: t }] : [];
    })
    .sort((a, b) => a.tickets.adultMin - b.tickets.adultMin);
}
