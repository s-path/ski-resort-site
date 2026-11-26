// サイト全体の設定。独自ドメインにしたら NEXT_PUBLIC_SITE_URL を Vercel に設定する。
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ski-resort-site.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "SNOWLINE 関東";

export const SITE_DESCRIPTION =
  "関東から行けるスキー場の2026-27シーズンのオープン日・営業状況・リフト券料金・早割をまとめてチェック。群馬・栃木・新潟・長野・山梨の35スキー場を掲載。";

/** オープン日・料金のデータを最後に確認した日 */
export const DATA_UPDATED_AT = "2026-11-26";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** 「2026-11-23」→「2026年11月23日」 */
export function formatJaDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${y}年${m}月${d}日`;
}

/** 今日の日付（日本時間、YYYY-MM-DD） */
export function todayInTokyo() {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(
    new Date(),
  );
}
