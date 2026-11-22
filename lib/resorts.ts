// スキー場のマスタデータ。
// 標高・コース数・アクセス時間・営業開始日などは、公開情報で確認できた値だけを入れている。
// 積雪や当日の営業状況はまだ取得していないので、表示は「—」になる。
// データソースが決まったら（Linear APP-8）、積雪・営業状況を実データの取得に置き換える。

export type Prefecture =
  | "群馬"
  | "栃木"
  | "新潟"
  | "長野"
  | "山梨"
  | "静岡"
  | "埼玉";

export type AreaKey =
  | "minakami"
  | "kusatsu"
  | "nasu"
  | "yuzawa"
  | "karuizawa"
  | "yatsu"
  | "hakuba"
  | "kiyosato"
  | "fuji"
  | "sayama";

/** open: 営業中 / planned: オープン予定日が出ている / unknown: まだ確認できていない */
export type ResortStatus = "open" | "planned" | "unknown";

export type Stat = { label: string; value: string };

export type ResortDetail = {
  description?: string;
  specs?: Stat[];
  levels?: { beginner: number; intermediate: number; advanced: number };
  lifts?: { label: string; count: number }[];
  facilities?: { label: string; available: boolean }[];
  access?: Stat[];
};

export type Resort = {
  id: string;
  name: string;
  prefecture: Prefecture;
  areaKey: AreaKey;
  /** カードに表示する細かいエリア名 */
  areaLabel: string;
  status: ResortStatus;
  /** 今シーズンの営業開始（予定）日 */
  openingDate?: string;
  /** カードに出す4つの数字（積雪を含む） */
  stats: Stat[];
  tags: string[];
  /** 公式サイト。確認できたものだけ */
  url?: string;
  detail?: ResortDetail;
};

export const NO_VALUE = "—";
const SNOW: Stat = { label: "積雪", value: `${NO_VALUE} cm` };

export const resorts: Resort[] = [
  {
    id: "karuizawa-prince",
    name: "軽井沢プリンスホテルスキー場",
    prefecture: "長野",
    areaKey: "karuizawa",
    areaLabel: "軽井沢",
    status: "open",
    openingDate: "2026-10-31",
    stats: [
      SNOW,
      { label: "営業開始", value: "10/31" },
      { label: "コース数", value: NO_VALUE },
      { label: "最長滑走", value: NO_VALUE },
    ],
    tags: ["新幹線で行ける"],
    url: "https://www.princehotels.co.jp/ski/karuizawa/",
  },
  {
    id: "yeti",
    name: "スノーパーク イエティ",
    prefecture: "静岡",
    areaKey: "fuji",
    areaLabel: "富士山麓",
    status: "open",
    openingDate: "2026-10-23",
    stats: [
      SNOW,
      { label: "営業開始", value: "10/23" },
      { label: "コース数", value: "4" },
      { label: "御殿場ICから", value: "約30分" },
    ],
    tags: ["初心者ゲレンデ"],
    url: "https://www.yeti-resort.com/",
  },
  {
    id: "sayama",
    name: "狭山スキー場",
    prefecture: "埼玉",
    areaKey: "sayama",
    areaLabel: "屋内",
    status: "open",
    openingDate: "2026-10-30",
    stats: [
      { label: "積雪", value: "屋内" },
      { label: "営業開始", value: "10/30" },
      { label: "コース数", value: NO_VALUE },
      { label: "最長滑走", value: NO_VALUE },
    ],
    tags: ["屋内"],
  },
  {
    id: "hunter",
    name: "ハンターマウンテン塩原",
    prefecture: "栃木",
    areaKey: "nasu",
    areaLabel: "那須塩原",
    status: "planned",
    openingDate: "2026-11-28",
    stats: [
      SNOW,
      { label: "山頂標高", value: "1,643 m" },
      { label: "コース数", value: "12" },
      { label: "ダウンヒル", value: "3,000 m" },
    ],
    tags: ["ゴンドラ", "キッズパーク", "スノーパーク"],
    url: "https://www.hunter.co.jp/",
  },
  {
    id: "tambara",
    name: "たんばらスキーパーク",
    prefecture: "群馬",
    areaKey: "minakami",
    areaLabel: "水上・尾瀬",
    status: "planned",
    openingDate: "2026-11-28",
    stats: [
      SNOW,
      { label: "標高", value: "1,250–1,550 m" },
      { label: "営業期間", value: "〜5/5" },
      { label: "沼田ICから", value: "約30分" },
    ],
    tags: ["春スキー", "春の早朝営業", "キッズパーク"],
    url: "https://www.tambara.co.jp/",
  },
  {
    id: "oze-iwakura",
    name: "ホワイトワールド尾瀬岩鞍",
    prefecture: "群馬",
    areaKey: "minakami",
    areaLabel: "尾瀬",
    status: "unknown",
    stats: [
      SNOW,
      { label: "コース数", value: NO_VALUE },
      { label: "最長滑走", value: NO_VALUE },
      { label: "沼田ICから", value: "約60分" },
    ],
    tags: ["ナイター（指定日）", "春スキー"],
    url: "https://www.oze-iwakura.co.jp/",
  },
  {
    id: "katashina",
    name: "かたしな高原スキー場",
    prefecture: "群馬",
    areaKey: "minakami",
    areaLabel: "尾瀬",
    status: "unknown",
    stats: [
      SNOW,
      { label: "コース数", value: "11" },
      { label: "沼田ICから", value: "約29 km" },
      { label: "練馬ICから", value: "約110分" },
    ],
    tags: ["スキーヤー専用", "ファミリー向け"],
  },
  {
    id: "okutone",
    name: "奥利根スノーパーク",
    prefecture: "群馬",
    areaKey: "minakami",
    areaLabel: "水上",
    status: "unknown",
    stats: [
      SNOW,
      { label: "コース数", value: NO_VALUE },
      { label: "最長滑走", value: NO_VALUE },
      { label: "水上ICから", value: "約15分" },
    ],
    tags: ["ナイター", "駅から無料シャトル"],
    url: "https://okutone.jp/",
  },
  {
    id: "whitevalley",
    name: "ホワイトバレーみなかみスキー場",
    prefecture: "群馬",
    areaKey: "minakami",
    areaLabel: "水上",
    status: "unknown",
    stats: [
      SNOW,
      { label: "コース数", value: NO_VALUE },
      { label: "最長滑走", value: NO_VALUE },
      { label: "水上ICから", value: "約7 km" },
    ],
    tags: ["非圧雪パウダー", "キッズ向け緩斜面"],
    url: "https://www.whitevalley.jp/",
  },
  {
    id: "kusatsu",
    name: "草津温泉スキー場",
    prefecture: "群馬",
    areaKey: "kusatsu",
    areaLabel: "草津",
    status: "unknown",
    stats: [
      SNOW,
      { label: "ロングラン", value: "4 km" },
      { label: "コース数", value: "5" },
      { label: "渋川伊香保ICから", value: "約80分" },
    ],
    tags: ["ゴンドラ", "温泉", "キッズパーク"],
    url: "https://www.932-onsen.com/winter/",
  },
  {
    id: "manza",
    name: "万座温泉スキー場",
    prefecture: "群馬",
    areaKey: "kusatsu",
    areaLabel: "万座",
    status: "planned",
    openingDate: "2026-12-19",
    stats: [
      SNOW,
      { label: "標高", value: "1,800 m" },
      { label: "コース数", value: "14" },
      { label: "碓氷軽井沢ICから", value: "約90分" },
    ],
    tags: ["温泉", "パウダースノー"],
    url: "https://www.princehotels.co.jp/ski/manza/winter/",
  },
  {
    id: "kazawa",
    name: "鹿沢スノーエリア",
    prefecture: "群馬",
    areaKey: "kusatsu",
    areaLabel: "嬬恋",
    status: "unknown",
    stats: [
      SNOW,
      { label: "コース数", value: "10" },
      { label: "標高差", value: "500 m" },
      { label: "上田菅平ICから", value: "約26 km" },
    ],
    tags: ["人工降雪機", "早期オープン"],
    url: "http://www.kazawa.com/snow/",
  },
  {
    id: "karuizawa-snowpark",
    name: "軽井沢スノーパーク",
    prefecture: "群馬",
    areaKey: "kusatsu",
    areaLabel: "北軽井沢",
    status: "unknown",
    stats: [
      SNOW,
      { label: "標高", value: "1,300 m" },
      { label: "コース数", value: "6" },
      { label: "碓氷軽井沢ICから", value: "約45分" },
    ],
    tags: ["キッズパーク", "雪遊びエリア"],
  },
  {
    id: "yuzawa-kogen",
    name: "湯沢高原スキー場",
    prefecture: "新潟",
    areaKey: "yuzawa",
    areaLabel: "越後湯沢",
    status: "unknown",
    stats: [
      SNOW,
      { label: "標高", value: "370–1,170 m" },
      { label: "コース数", value: "8" },
      { label: "最長滑走", value: "5,000 m" },
    ],
    tags: ["ロープウェイ", "キッズパーク", "新幹線で行ける"],
    url: "https://www.yuzawakogen.com/",
    detail: {
      description:
        "大型ロープウェイで山頂エリアへ。山頂から麓まで続くロングコースが特徴です。",
      specs: [
        { label: "標高", value: "370–1,170 m" },
        { label: "標高差", value: "800 m" },
        { label: "コース数", value: "8" },
        { label: "最長滑走距離", value: "5,000 m" },
        { label: "最大斜度", value: "28°" },
        { label: "非圧雪", value: "10%" },
      ],
      levels: { beginner: 50, intermediate: 20, advanced: 30 },
      lifts: [
        { label: "ロープウェイ（166人乗り）", count: 1 },
        { label: "3人乗りリフト", count: 1 },
        { label: "2人乗りリフト", count: 3 },
        { label: "エスカレーター", count: 2 },
      ],
      facilities: [
        { label: "キッズパーク", available: true },
        { label: "スノーボード", available: true },
        { label: "スノーパーク", available: false },
        { label: "ナイター", available: false },
      ],
      access: [
        { label: "車", value: `練馬ICから ${NO_VALUE}` },
        { label: "電車", value: "東京駅から上越新幹線で越後湯沢駅へ" },
      ],
    },
  },
  {
    id: "edelweiss",
    name: "エーデルワイススキーリゾート",
    prefecture: "栃木",
    areaKey: "nasu",
    areaLabel: "日光",
    status: "unknown",
    stats: [
      SNOW,
      { label: "コース数", value: "10" },
      { label: "最長滑走", value: NO_VALUE },
      { label: "今市ICから", value: "約60分" },
    ],
    tags: ["キッズパーク", "駅から無料バス（土日祝）"],
    url: "https://edelsnow.com/",
  },
  {
    id: "happo",
    name: "白馬八方尾根スキー場",
    prefecture: "長野",
    areaKey: "hakuba",
    areaLabel: "白馬",
    status: "unknown",
    stats: [
      SNOW,
      { label: "コース数", value: "16" },
      { label: "最長滑走", value: "8,000 m" },
      { label: "リフト", value: "19本" },
    ],
    tags: ["ゴンドラ", "スノーパーク", "キッズパーク"],
    url: "https://www.happo-one.jp/",
  },
  {
    id: "sunmeadows",
    name: "サンメドウズ清里スキー場",
    prefecture: "山梨",
    areaKey: "kiyosato",
    areaLabel: "清里",
    status: "unknown",
    stats: [
      SNOW,
      { label: "山頂標高", value: "1,900 m" },
      { label: "コース数", value: "8" },
      { label: "長坂ICから", value: "約20分" },
    ],
    tags: ["キッズパーク", "スノーパーク"],
    url: "http://www.sunmeadows.co.jp/",
  },
  {
    id: "fujiten",
    name: "ふじてんスノーリゾート",
    prefecture: "山梨",
    areaKey: "fuji",
    areaLabel: "富士山麓",
    status: "unknown",
    stats: [
      SNOW,
      { label: "標高", value: "1,285–1,485 m" },
      { label: "コース数", value: "7" },
      { label: "河口湖ICから", value: "約20分" },
    ],
    tags: ["スノーパーク", "キッズパーク"],
  },
  {
    id: "kamui-misaka",
    name: "カムイみさかスキー場",
    prefecture: "山梨",
    areaKey: "fuji",
    areaLabel: "御坂",
    status: "unknown",
    stats: [
      SNOW,
      { label: "標高", value: "850–1,050 m" },
      { label: "コース数", value: "5" },
      { label: "一宮御坂ICから", value: "約15分" },
    ],
    tags: ["駐車場無料"],
  },
];

export function getResort(id: string): Resort | undefined {
  return resorts.find((r) => r.id === id);
}

/** 絞り込み欄で使う、県ごとのエリア */
export const AREA_GROUPS: {
  label: string;
  areas: { key: AreaKey; label: string }[];
}[] = [
  {
    label: "群馬",
    areas: [
      { key: "minakami", label: "水上・尾瀬" },
      { key: "kusatsu", label: "草津・万座・嬬恋" },
    ],
  },
  { label: "栃木", areas: [{ key: "nasu", label: "那須塩原・日光" }] },
  { label: "新潟", areas: [{ key: "yuzawa", label: "越後湯沢" }] },
  {
    label: "長野",
    areas: [
      { key: "karuizawa", label: "軽井沢" },
      { key: "yatsu", label: "八ヶ岳・諏訪" },
      { key: "hakuba", label: "白馬" },
    ],
  },
  {
    label: "山梨",
    areas: [
      { key: "kiyosato", label: "清里・八ヶ岳南麓" },
      { key: "fuji", label: "富士山・河口湖" },
    ],
  },
  { label: "埼玉", areas: [{ key: "sayama", label: "屋内" }] },
];

const shortDate = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo",
  month: "numeric",
  day: "numeric",
});

/** "2026-11-28" → "11/28" */
export function formatShortDate(iso: string): string {
  return shortDate.format(new Date(`${iso}T00:00:00+09:00`));
}

export function statusLabel(r: Resort): string {
  if (r.status === "open") return "営業中";
  if (r.status === "planned" && r.openingDate)
    return `${formatShortDate(r.openingDate)} オープン予定`;
  return "営業状況 確認中";
}
