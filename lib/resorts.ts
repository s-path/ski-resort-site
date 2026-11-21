// 初版はサンプルデータで画面を確認するためのもの。
// 積雪・営業状況などの数値は実際の情報ではない。
// データソースが決まったら（Linear APP-8）、ここを実データの取得に置き換える。

export type Prefecture = "群馬" | "栃木" | "長野" | "山梨";

export type ResortStatus = "open" | "partial" | "preparing";

export type Resort = {
  id: string;
  name: string;
  prefecture: Prefecture;
  area: string;
  status: ResortStatus;
  /** 山麓の積雪（cm） */
  snowBase: number;
  /** 山頂の積雪（cm） */
  snowTop: number;
  /** 24時間の新雪（cm） */
  newSnow24h: number;
  liftsOpen: number;
  liftsTotal: number;
  coursesOpen: number;
  coursesTotal: number;
  /** 営業開始（予定）日 */
  openingDate: string;
  /** データ更新日時 */
  updatedAt: string;
};

export const PREFECTURES: Prefecture[] = ["群馬", "栃木", "長野", "山梨"];

export const STATUS_LABEL: Record<ResortStatus, string> = {
  open: "全面営業",
  partial: "一部営業",
  preparing: "営業準備中",
};

export const IS_SAMPLE_DATA = true;

const UPDATED = "2026-11-22T06:00:00+09:00";

export const resorts: Resort[] = [
  {
    id: "marunuma",
    name: "丸沼高原スキー場",
    prefecture: "群馬",
    area: "片品村",
    status: "partial",
    snowBase: 30,
    snowTop: 55,
    newSnow24h: 5,
    liftsOpen: 2,
    liftsTotal: 8,
    coursesOpen: 3,
    coursesTotal: 14,
    openingDate: "2026-11-14",
    updatedAt: UPDATED,
  },
  {
    id: "kawaba",
    name: "川場スキー場",
    prefecture: "群馬",
    area: "川場村",
    status: "preparing",
    snowBase: 0,
    snowTop: 20,
    newSnow24h: 2,
    liftsOpen: 0,
    liftsTotal: 6,
    coursesOpen: 0,
    coursesTotal: 11,
    openingDate: "2026-12-05",
    updatedAt: UPDATED,
  },
  {
    id: "oze-iwakura",
    name: "ホワイトワールド尾瀬岩鞍",
    prefecture: "群馬",
    area: "片品村",
    status: "preparing",
    snowBase: 0,
    snowTop: 15,
    newSnow24h: 0,
    liftsOpen: 0,
    liftsTotal: 9,
    coursesOpen: 0,
    coursesTotal: 16,
    openingDate: "2026-12-12",
    updatedAt: UPDATED,
  },
  {
    id: "tanigawadake",
    name: "谷川岳天神平スキー場",
    prefecture: "群馬",
    area: "みなかみ町",
    status: "partial",
    snowBase: 40,
    snowTop: 80,
    newSnow24h: 10,
    liftsOpen: 1,
    liftsTotal: 4,
    coursesOpen: 2,
    coursesTotal: 6,
    openingDate: "2026-11-21",
    updatedAt: UPDATED,
  },
  {
    id: "kusatsu",
    name: "草津温泉スキー場",
    prefecture: "群馬",
    area: "草津町",
    status: "preparing",
    snowBase: 5,
    snowTop: 30,
    newSnow24h: 3,
    liftsOpen: 0,
    liftsTotal: 7,
    coursesOpen: 0,
    coursesTotal: 15,
    openingDate: "2026-11-28",
    updatedAt: UPDATED,
  },
  {
    id: "hunter",
    name: "ハンターマウンテン塩原",
    prefecture: "栃木",
    area: "那須塩原市",
    status: "partial",
    snowBase: 25,
    snowTop: 45,
    newSnow24h: 0,
    liftsOpen: 2,
    liftsTotal: 6,
    coursesOpen: 2,
    coursesTotal: 12,
    openingDate: "2026-11-20",
    updatedAt: UPDATED,
  },
  {
    id: "mtjeans",
    name: "マウントジーンズ那須",
    prefecture: "栃木",
    area: "那須町",
    status: "preparing",
    snowBase: 0,
    snowTop: 10,
    newSnow24h: 0,
    liftsOpen: 0,
    liftsTotal: 4,
    coursesOpen: 0,
    coursesTotal: 9,
    openingDate: "2026-12-13",
    updatedAt: UPDATED,
  },
  {
    id: "edelweiss",
    name: "エーデルワイススキーリゾート",
    prefecture: "栃木",
    area: "日光市",
    status: "preparing",
    snowBase: 0,
    snowTop: 5,
    newSnow24h: 0,
    liftsOpen: 0,
    liftsTotal: 5,
    coursesOpen: 0,
    coursesTotal: 10,
    openingDate: "2026-12-19",
    updatedAt: UPDATED,
  },
  {
    id: "happo",
    name: "白馬八方尾根スキー場",
    prefecture: "長野",
    area: "白馬村",
    status: "partial",
    snowBase: 20,
    snowTop: 110,
    newSnow24h: 15,
    liftsOpen: 4,
    liftsTotal: 19,
    coursesOpen: 5,
    coursesTotal: 16,
    openingDate: "2026-11-21",
    updatedAt: UPDATED,
  },
  {
    id: "shiga",
    name: "志賀高原",
    prefecture: "長野",
    area: "山ノ内町",
    status: "partial",
    snowBase: 45,
    snowTop: 90,
    newSnow24h: 12,
    liftsOpen: 6,
    liftsTotal: 52,
    coursesOpen: 8,
    coursesTotal: 80,
    openingDate: "2026-11-15",
    updatedAt: UPDATED,
  },
  {
    id: "nozawa",
    name: "野沢温泉スキー場",
    prefecture: "長野",
    area: "野沢温泉村",
    status: "preparing",
    snowBase: 10,
    snowTop: 60,
    newSnow24h: 8,
    liftsOpen: 0,
    liftsTotal: 21,
    coursesOpen: 0,
    coursesTotal: 44,
    openingDate: "2026-11-29",
    updatedAt: UPDATED,
  },
  {
    id: "karuizawa",
    name: "軽井沢プリンスホテルスキー場",
    prefecture: "長野",
    area: "軽井沢町",
    status: "open",
    snowBase: 50,
    snowTop: 60,
    newSnow24h: 0,
    liftsOpen: 9,
    liftsTotal: 9,
    coursesOpen: 10,
    coursesTotal: 10,
    openingDate: "2026-11-01",
    updatedAt: UPDATED,
  },
  {
    id: "fujiten",
    name: "ふじてんスノーリゾート",
    prefecture: "山梨",
    area: "鳴沢村",
    status: "partial",
    snowBase: 40,
    snowTop: 50,
    newSnow24h: 0,
    liftsOpen: 2,
    liftsTotal: 5,
    coursesOpen: 2,
    coursesTotal: 7,
    openingDate: "2026-11-20",
    updatedAt: UPDATED,
  },
  {
    id: "kamui",
    name: "カムイみさかスキー場",
    prefecture: "山梨",
    area: "笛吹市",
    status: "preparing",
    snowBase: 0,
    snowTop: 0,
    newSnow24h: 0,
    liftsOpen: 0,
    liftsTotal: 3,
    coursesOpen: 0,
    coursesTotal: 6,
    openingDate: "2026-12-12",
    updatedAt: UPDATED,
  },
];

export function getResort(id: string): Resort | undefined {
  return resorts.find((r) => r.id === id);
}

// サーバー（Vercel）はUTCで動くので、表示は日本時間に固定する
const dateFmt = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo",
  month: "long",
  day: "numeric",
});

const dateTimeFmt = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(iso: string): string {
  return dateFmt.format(new Date(iso));
}

export function formatUpdatedAt(iso: string): string {
  return dateTimeFmt.format(new Date(iso));
}
