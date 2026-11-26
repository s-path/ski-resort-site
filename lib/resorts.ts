import { todayInTokyo } from "./site";
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
  | "myoko"
  | "karuizawa"
  | "yatsu"
  | "sugadaira"
  | "saku"
  | "hakuba"
  | "shiga"
  | "madarao"
  | "togakushi"
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
  /** 日付が出ていないときの目安（例：「12月中旬」） */
  openingLabel?: string;
  /** カードに出す4つの数字（積雪を含む） */
  stats: Stat[];
  tags: string[];
  /** 公式サイト。確認できたものだけ */
  url?: string;
  /** 公式サイト以外の便利なリンク（ゲレンデマップ・リフト運行状況など） */
  links?: { label: string; url: string }[];
  /** 共通リフト券などでつながるスキー場のまとまり（例：「志賀高原」） */
  group?: string;
  detail?: ResortDetail;
};

export const NO_VALUE = "—";
const SNOW: Stat = { label: "積雪", value: `${NO_VALUE} cm` };

const SHIGA_NAV = "https://skg.jcld.jp/app/shigakogen_navigator/#/ski/";
const SHIGA_LIFT = "https://shigakogen-ski.or.jp/lift/";

/** 志賀高原の各スキー場。全山共通リフト券で18スキー場を滑れる */
function shiga(o: {
  id: string;
  name: string;
  zone: string;
  nav?: number;
  lift?: string;
  url?: string;
  status: ResortStatus;
  openingDate?: string;
  openingLabel?: string;
  top?: string;
  tags?: string[];
}): Resort {
  const links = [
    ...(o.nav
      ? [{ label: "志賀高原NAVIGATOR", url: `${SHIGA_NAV}${o.nav}` }]
      : []),
    ...(o.lift
      ? [{ label: "リフト運行状況", url: `${SHIGA_LIFT}${o.lift}/` }]
      : []),
  ];
  return {
    id: o.id,
    name: o.name,
    prefecture: "長野",
    areaKey: "shiga",
    areaLabel: `志賀高原・${o.zone}`,
    status: o.status,
    openingDate: o.openingDate,
    openingLabel: o.openingLabel,
    stats: [
      SNOW,
      { label: "エリア", value: o.zone },
      { label: "共通リフト券", value: "18スキー場" },
      { label: "最高地点", value: o.top ?? NO_VALUE },
    ],
    tags: [...(o.tags ?? []), "志賀高原全山共通券"],
    url: o.url,
    links: links.length > 0 ? links : undefined,
    group: "志賀高原",
  };
}

const CENTRAL_LATER = {
  status: "planned",
  openingLabel: "12月上旬以降",
} as const;
const SHIGA_URL = "https://shigakogen.co.jp/winter/snow-slope/";

const SHIGA_RESORTS: Resort[] = [
  shiga({
    id: "shiga-yokoteyama",
    name: "横手山スキー場",
    zone: "横手山・渋峠",
    nav: 17,
    lift: "yokoteyama-shibutoge",
    url: "https://yokoteyama2307.com/course/",
    status: "open",
    openingDate: "2026-11-21",
    top: "2,307 m",
    tags: ["春スキー"],
  }),
  shiga({
    id: "shiga-shibutoge",
    name: "渋峠スキー場",
    zone: "横手山・渋峠",
    nav: 18,
    lift: "yokoteyama-shibutoge",
    url: "https://yokoteyama2307.com/course/",
    status: "unknown",
    tags: ["スノーパーク", "春スキー"],
  }),
  shiga({
    id: "shiga-kumanoyu",
    name: "熊の湯スキー場",
    zone: "熊の湯",
    nav: 16,
    lift: "kumanoyu",
    url: "https://www.kumanoyu.co.jp/lift/",
    status: "open",
    openingDate: "2026-11-21",
  }),
  shiga({
    id: "shiga-yakebitaiyama",
    name: "焼額山スキー場",
    zone: "焼額山",
    nav: 14,
    lift: "yakebitaiyama",
    url: "https://www.princehotels.co.jp/ski/shiga/winter/",
    status: "planned",
    openingDate: "2026-12-04",
    tags: ["ゴンドラ", "ナイター"],
  }),
  shiga({
    id: "shiga-okushiga",
    name: "奥志賀高原スキー場",
    zone: "奥志賀高原",
    nav: 15,
    lift: "okushigakogen",
    url: "https://okushigakogenresort.com/winter/ski/",
    status: "planned",
    openingDate: "2026-12-12",
  }),
  shiga({
    id: "shiga-ichinose-family",
    name: "一の瀬ファミリースキー場",
    zone: "一の瀬",
    nav: 11,
    lift: "ichinosefamily",
    url: `${SHIGA_URL}ichinose-family-ski/`,
    status: "planned",
    openingDate: "2026-12-05",
    top: "1,940 m",
  }),
  shiga({
    id: "shiga-takamagahara",
    name: "高天ヶ原マンモススキー場",
    zone: "中央",
    nav: 9,
    lift: "takamagahara",
    url: `${SHIGA_URL}takamahara-ski/`,
    status: "planned",
    openingDate: "2026-12-05",
  }),
  shiga({
    id: "shiga-sunvalley",
    name: "サンバレースキー場",
    zone: "中央",
    nav: 1,
    lift: "sunvalley",
    url: `${SHIGA_URL}sunvalley-ski/`,
    ...CENTRAL_LATER,
  }),
  shiga({
    id: "shiga-maruike",
    name: "丸池スキー場",
    zone: "中央",
    nav: 2,
    lift: "maruike",
    url: `${SHIGA_URL}maruike-ski/`,
    ...CENTRAL_LATER,
  }),
  shiga({
    id: "shiga-hasuike",
    name: "蓮池スキー場",
    zone: "中央",
    nav: 3,
    lift: "hasuike",
    url: `${SHIGA_URL}hasuike-ski/`,
    ...CENTRAL_LATER,
  }),
  shiga({
    id: "shiga-giant",
    name: "ジャイアントスキー場",
    zone: "中央",
    nav: 4,
    lift: "giant",
    url: `${SHIGA_URL}giant-ski/`,
    ...CENTRAL_LATER,
  }),
  shiga({
    id: "shiga-hoppo-bunadaira",
    name: "発哺ブナ平スキー場",
    zone: "中央",
    nav: 5,
    lift: "hoppobunadaira",
    url: `${SHIGA_URL}happo-bunadaira-ski/`,
    ...CENTRAL_LATER,
  }),
  shiga({
    id: "shiga-higashitateyama",
    name: "東館山スキー場",
    zone: "中央",
    nav: 7,
    lift: "higashitateyama",
    url: `${SHIGA_URL}higashitateyama-ski/`,
    ...CENTRAL_LATER,
    tags: ["ゴンドラ"],
  }),
  shiga({
    id: "shiga-nishitateyama",
    name: "西館山スキー場",
    zone: "中央",
    nav: 6,
    lift: "nishitateyma",
    url: `${SHIGA_URL}nishitateyama-ski/`,
    ...CENTRAL_LATER,
  }),
  shiga({
    id: "shiga-terakoya",
    name: "寺小屋スキー場",
    zone: "中央",
    nav: 8,
    lift: "terakoya",
    url: `${SHIGA_URL}terakoya-ski/`,
    ...CENTRAL_LATER,
  }),
  shiga({
    id: "shiga-tanne",
    name: "タンネの森オコジョスキー場",
    zone: "一の瀬",
    nav: 10,
    lift: "tannenomoriokojo",
    url: `${SHIGA_URL}tanne-ski/`,
    ...CENTRAL_LATER,
  }),
  shiga({
    id: "shiga-ichinose-diamond",
    name: "一の瀬ダイヤモンドスキー場",
    zone: "一の瀬",
    nav: 12,
    lift: "ichinosediamond",
    url: `${SHIGA_URL}ichinose-diamond-ski/`,
    ...CENTRAL_LATER,
  }),
  shiga({
    id: "shiga-ichinose-yamanokami",
    name: "一の瀬山の神スキー場",
    zone: "一の瀬",
    ...CENTRAL_LATER,
  }),
];

/** 一覧に追加したスキー場（2026-11 追加分）。データが少ないものは分かる項目だけ入れる */
function more(o: {
  id: string;
  name: string;
  prefecture: Prefecture;
  areaKey: AreaKey;
  areaLabel: string;
  status: ResortStatus;
  openingDate?: string;
  openingLabel?: string;
  stats?: Stat[];
  tags?: string[];
  url?: string;
}): Resort {
  const stats = o.stats ?? [];
  return {
    ...o,
    stats: [
      SNOW,
      ...stats,
      ...Array.from({ length: Math.max(0, 3 - stats.length) }, (_, i) => ({
        label: ["コース数", "リフト数", "最長滑走"][i] ?? "—",
        value: NO_VALUE,
      })),
    ].slice(0, 4),
    tags: o.tags ?? [],
  };
}

/** 群馬・栃木（2026-11 追加） */
const MORE_GUNMA_TOCHIGI: Resort[] = [
  more({
    id: "minakami-kogen",
    name: "水上高原スキーリゾート",
    prefecture: "群馬",
    areaKey: "minakami",
    areaLabel: "水上",
    status: "planned",
    openingDate: "2026-12-18",
    stats: [{ label: "コース数", value: "12" }],
    tags: ["キッズパーク"],
  }),
  more({
    id: "fujiwara",
    name: "水上高原・奥利根温泉 藤原スキー場",
    prefecture: "群馬",
    areaKey: "minakami",
    areaLabel: "水上",
    status: "planned",
    openingDate: "2026-12-19",
    tags: ["キッズパーク", "温泉"],
  }),
  more({
    id: "norn",
    name: "ノルンみなかみスキー場",
    prefecture: "群馬",
    areaKey: "minakami",
    areaLabel: "水上",
    status: "planned",
    openingDate: "2026-12-18",
    tags: ["ナイター", "駅から無料バス", "キッズパーク"],
    url: "https://www.norn.co.jp/",
  }),
  more({
    id: "houdaigi",
    name: "群馬みなかみほうだいぎスキー場",
    prefecture: "群馬",
    areaKey: "minakami",
    areaLabel: "水上",
    status: "planned",
    openingDate: "2026-12-12",
    stats: [
      { label: "コース数", value: "16" },
      { label: "リフト数", value: "7" },
    ],
    tags: ["キッズパーク"],
  }),
  more({
    id: "mt-t",
    name: "Mt.T by 星野リゾート",
    prefecture: "群馬",
    areaKey: "minakami",
    areaLabel: "谷川岳",
    status: "unknown",
    tags: ["ロープウェイ", "非圧雪パウダー"],
    url: "https://tanigawadake-joch.com/mt-t/",
  }),
  more({
    id: "oguna-hotaka",
    name: "オグナほたかスキー場",
    prefecture: "群馬",
    areaKey: "minakami",
    areaLabel: "尾瀬",
    status: "planned",
    openingDate: "2026-12-25",
    stats: [
      { label: "コース数", value: "13" },
      { label: "リフト数", value: "6" },
      { label: "標高", value: "1,200〜1,828 m" },
    ],
    tags: ["キッズパーク", "スノーパーク", "非圧雪パウダー"],
  }),
  more({
    id: "oze-tokura",
    name: "スノーパーク尾瀬戸倉",
    prefecture: "群馬",
    areaKey: "minakami",
    areaLabel: "尾瀬",
    status: "planned",
    openingDate: "2026-12-21",
    stats: [
      { label: "コース数", value: "9" },
      { label: "リフト数", value: "6" },
      { label: "標高", value: "1,080〜1,410 m" },
    ],
    tags: ["スノーパーク"],
    url: "https://ozetokura.co.jp/",
  }),
  more({
    id: "palcall",
    name: "パルコール嬬恋リゾート",
    prefecture: "群馬",
    areaKey: "kusatsu",
    areaLabel: "嬬恋",
    status: "planned",
    openingDate: "2026-12-06",
    tags: ["ゴンドラ"],
  }),
  more({
    id: "nikko-yumoto",
    name: "日光湯元温泉スキー場",
    prefecture: "栃木",
    areaKey: "nasu",
    areaLabel: "日光",
    status: "planned",
    openingLabel: "12月下旬（例年）",
    stats: [
      { label: "コース数", value: "4" },
      { label: "リフト数", value: "3" },
      { label: "標高", value: "1,500〜1,800 m" },
    ],
    tags: ["温泉", "キッズパーク", "初心者ゲレンデ"],
  }),
];

/** 新潟・湯沢と魚沼（2026-11 追加） */
const MORE_YUZAWA: Resort[] = [
  more({
    id: "iwappara",
    name: "岩原スキー場",
    prefecture: "新潟",
    areaKey: "yuzawa",
    areaLabel: "湯沢",
    status: "planned",
    openingDate: "2026-12-19",
    tags: ["キッズパーク", "ナイター", "駅から無料バス"],
  }),
  more({
    id: "yuzawa-nakazato",
    name: "湯沢中里スノーリゾート",
    prefecture: "新潟",
    areaKey: "yuzawa",
    areaLabel: "湯沢",
    status: "planned",
    openingDate: "2026-12-19",
    tags: ["キッズパーク", "新幹線で行ける"],
  }),
  more({
    id: "yuzawa-park",
    name: "湯沢パークスキー場",
    prefecture: "新潟",
    areaKey: "yuzawa",
    areaLabel: "湯沢",
    status: "planned",
    openingDate: "2026-12-19",
    stats: [{ label: "コース数", value: "11" }],
    tags: ["駅から無料バス"],
  }),
  more({
    id: "naspa",
    name: "NASPAスキーガーデン",
    prefecture: "新潟",
    areaKey: "yuzawa",
    areaLabel: "湯沢",
    status: "planned",
    openingDate: "2026-12-24",
    tags: ["初心者ゲレンデ", "ナイター"],
  }),
  more({
    id: "joetsu-kokusai",
    name: "上越国際スキー場",
    prefecture: "新潟",
    areaKey: "yuzawa",
    areaLabel: "南魚沼",
    status: "planned",
    openingDate: "2026-12-12",
    tags: ["キッズパーク", "ナイター", "駅直結"],
  }),
  more({
    id: "chateau-shiozawa",
    name: "シャトー塩沢スキー場",
    prefecture: "新潟",
    areaKey: "yuzawa",
    areaLabel: "南魚沼",
    status: "unknown",
  }),
  more({
    id: "muika",
    name: "ムイカスノーリゾート",
    prefecture: "新潟",
    areaKey: "yuzawa",
    areaLabel: "南魚沼",
    status: "planned",
    openingDate: "2026-12-24",
    tags: ["キッズ向け緩斜面"],
  }),
  more({
    id: "muikamachi-hakkaisan",
    name: "六日町八海山スキー場",
    prefecture: "新潟",
    areaKey: "yuzawa",
    areaLabel: "南魚沼",
    status: "planned",
    openingDate: "2026-12-19",
    stats: [{ label: "コース数", value: "11" }],
    tags: ["ロープウェイ"],
    url: "https://www.princehotels.co.jp/ski/hakkaisan/winter/",
  }),
  more({
    id: "hakkaisan-sanroku",
    name: "八海山麓スキー場",
    prefecture: "新潟",
    areaKey: "yuzawa",
    areaLabel: "南魚沼",
    status: "planned",
    openingLabel: "1月上旬（例年）",
    tags: ["ソリ専用ゲレンデ"],
  }),
  more({
    id: "okutadami",
    name: "奥只見丸山スキー場",
    prefecture: "新潟",
    areaKey: "yuzawa",
    areaLabel: "奥只見",
    status: "planned",
    openingDate: "2026-11-28",
    tags: ["春スキー"],
  }),
];

/** 新潟・妙高（2026-11 追加） */
const MORE_MYOKO: Resort[] = [
  more({
    id: "arai",
    name: "アライマウンテンリゾート",
    prefecture: "新潟",
    areaKey: "myoko",
    areaLabel: "妙高",
    status: "planned",
    openingDate: "2026-12-19",
    tags: ["非圧雪パウダー", "ゴンドラ", "春スキー"],
  }),
  more({
    id: "akakura-onsen",
    name: "赤倉温泉スキー場",
    prefecture: "新潟",
    areaKey: "myoko",
    areaLabel: "妙高",
    status: "planned",
    openingDate: "2026-12-12",
    tags: ["温泉"],
  }),
  more({
    id: "akakura-kanko",
    name: "赤倉観光リゾートスキー場",
    prefecture: "新潟",
    areaKey: "myoko",
    areaLabel: "妙高",
    status: "planned",
    openingDate: "2026-12-19",
    tags: ["春スキー"],
  }),
  more({
    id: "ikenotaira",
    name: "池の平温泉アルペンブリックスキー場",
    prefecture: "新潟",
    areaKey: "myoko",
    areaLabel: "妙高",
    status: "planned",
    openingDate: "2026-12-12",
    tags: ["キッズパーク", "温泉"],
  }),
  more({
    id: "suginohara",
    name: "妙高杉ノ原スキー場",
    prefecture: "新潟",
    areaKey: "myoko",
    areaLabel: "妙高",
    status: "planned",
    openingDate: "2026-12-19",
    stats: [{ label: "最長滑走", value: "8.5 km" }],
    tags: ["ゴンドラ", "小学生リフト無料"],
    url: "https://www.princehotels.co.jp/ski/myoko/winter/",
  }),
  more({
    id: "charmant-hiuchi",
    name: "シャルマン火打スキー場",
    prefecture: "新潟",
    areaKey: "myoko",
    areaLabel: "糸魚川",
    status: "planned",
    openingDate: "2026-12-18",
    tags: ["非圧雪パウダー", "春スキー"],
  }),
  more({
    id: "myoko-runrun",
    name: "休暇村妙高ルンルンスキー場",
    prefecture: "新潟",
    areaKey: "myoko",
    areaLabel: "妙高",
    status: "planned",
    openingLabel: "12月下旬（例年）",
    tags: ["初心者ゲレンデ"],
  }),
];

/** 長野・白馬と北信（2026-11 追加） */
const MORE_HAKUBA_HOKUSHIN: Resort[] = [
  more({
    id: "cortina",
    name: "白馬コルチナスキー場",
    prefecture: "長野",
    areaKey: "hakuba",
    areaLabel: "小谷",
    status: "planned",
    openingDate: "2026-12-12",
    tags: ["非圧雪パウダー", "ナイター", "キッズパーク"],
  }),
  more({
    id: "sanosaka",
    name: "White Resort 白馬さのさか",
    prefecture: "長野",
    areaKey: "hakuba",
    areaLabel: "白馬",
    status: "planned",
    openingDate: "2026-12-18",
    tags: ["ナイター"],
    url: "https://sanosaka.jp/",
  }),
  more({
    id: "iwatake",
    name: "白馬岩岳スノーフィールド",
    prefecture: "長野",
    areaKey: "hakuba",
    areaLabel: "白馬",
    status: "planned",
    openingDate: "2026-12-18",
    stats: [{ label: "コース数", value: "26" }],
    tags: ["ゴンドラ", "スノーパーク"],
  }),
  more({
    id: "norikura-hakuba",
    name: "白馬乗鞍温泉スキー場",
    prefecture: "長野",
    areaKey: "hakuba",
    areaLabel: "小谷",
    status: "planned",
    openingLabel: "12月中旬（例年）",
    tags: ["温泉"],
  }),
  more({
    id: "kashimayari",
    name: "HAKUBA VALLEY 鹿島槍スキー場",
    prefecture: "長野",
    areaKey: "hakuba",
    areaLabel: "大町",
    status: "planned",
    openingLabel: "12月中旬（例年）",
    tags: ["キッズパーク"],
  }),
  more({
    id: "jigatake",
    name: "爺ガ岳スキー場",
    prefecture: "長野",
    areaKey: "hakuba",
    areaLabel: "大町",
    status: "planned",
    openingLabel: "12月中旬（例年）",
  }),
  more({
    id: "madarao",
    name: "斑尾高原スキー場",
    prefecture: "長野",
    areaKey: "madarao",
    areaLabel: "斑尾",
    status: "planned",
    openingDate: "2026-12-12",
    stats: [{ label: "コース数", value: "32" }],
    tags: ["非圧雪パウダー", "ナイター", "キッズパーク"],
    url: "https://www.madarao.jp/",
  }),
  more({
    id: "tangram",
    name: "タングラムスキーサーカス",
    prefecture: "長野",
    areaKey: "madarao",
    areaLabel: "斑尾",
    status: "planned",
    openingDate: "2026-12-19",
    tags: ["キッズパーク"],
  }),
  more({
    id: "romance",
    name: "スノーリゾートロマンスの神様",
    prefecture: "長野",
    areaKey: "madarao",
    areaLabel: "木島平",
    status: "planned",
    openingDate: "2026-12-12",
  }),
  more({
    id: "togari",
    name: "戸狩温泉スキー場",
    prefecture: "長野",
    areaKey: "madarao",
    areaLabel: "飯山",
    status: "planned",
    openingLabel: "12月下旬（例年）",
    tags: ["ナイター", "温泉"],
  }),
  more({
    id: "x-jam",
    name: "X-JAM高井富士",
    prefecture: "長野",
    areaKey: "shiga",
    areaLabel: "北志賀",
    status: "planned",
    openingLabel: "12月下旬（例年）",
    tags: ["スノーパーク", "キッズパーク"],
  }),
  more({
    id: "yomase",
    name: "よませ温泉スキー場",
    prefecture: "長野",
    areaKey: "shiga",
    areaLabel: "北志賀",
    status: "unknown",
    tags: ["温泉"],
  }),
  more({
    id: "komaruyama",
    name: "北志賀小丸山スキー場",
    prefecture: "長野",
    areaKey: "shiga",
    areaLabel: "北志賀",
    status: "unknown",
  }),
  more({
    id: "kurohime",
    name: "黒姫高原スノーパーク",
    prefecture: "長野",
    areaKey: "togakushi",
    areaLabel: "黒姫",
    status: "unknown",
    stats: [
      { label: "コース数", value: "13" },
      { label: "リフト数", value: "6" },
      { label: "標高", value: "770〜1,200 m" },
    ],
    tags: ["ペット同伴OK"],
  }),
  more({
    id: "togakushi",
    name: "戸隠スキー場",
    prefecture: "長野",
    areaKey: "togakushi",
    areaLabel: "戸隠",
    status: "planned",
    openingLabel: "12月中旬（例年）",
    stats: [{ label: "コース数", value: "19" }],
    tags: ["キッズパーク", "非圧雪パウダー"],
    url: "https://www.togakusi.com/ski/",
  }),
  more({
    id: "iizuna",
    name: "いいづなリゾートスキー場",
    prefecture: "長野",
    areaKey: "togakushi",
    areaLabel: "飯綱",
    status: "planned",
    openingLabel: "12月下旬（例年）",
    stats: [{ label: "コース数", value: "12" }],
  }),
];

/** 長野・東信（2026-11 追加） */
const MORE_TOSHIN: Resort[] = [
  more({
    id: "sugadaira",
    name: "菅平高原スノーリゾート",
    prefecture: "長野",
    areaKey: "sugadaira",
    areaLabel: "菅平",
    status: "planned",
    openingLabel: "11月下旬",
    stats: [{ label: "コース数", value: "60" }],
    tags: ["ナイター", "キッズパーク", "駐車場無料"],
  }),
  more({
    id: "minenohara",
    name: "峰の原高原スキー場",
    prefecture: "長野",
    areaKey: "sugadaira",
    areaLabel: "菅平",
    status: "unknown",
  }),
  more({
    id: "yunomaru",
    name: "湯の丸スキー場",
    prefecture: "長野",
    areaKey: "sugadaira",
    areaLabel: "東御",
    status: "open",
    openingDate: "2026-11-21",
    tags: ["キッズパーク"],
  }),
  more({
    id: "takamine",
    name: "高峰マウンテンパーク",
    prefecture: "長野",
    areaKey: "saku",
    areaLabel: "小諸",
    status: "unknown",
    tags: ["キッズパーク"],
  }),
  more({
    id: "parada",
    name: "佐久スキーガーデン パラダ",
    prefecture: "長野",
    areaKey: "saku",
    areaLabel: "佐久",
    status: "planned",
    openingDate: "2026-12-19",
    tags: ["キッズパーク", "初心者ゲレンデ"],
  }),
  more({
    id: "yachiho",
    name: "八千穂高原スキー場",
    prefecture: "長野",
    areaKey: "saku",
    areaLabel: "佐久穂",
    status: "planned",
    openingDate: "2026-11-30",
  }),
  more({
    id: "shirakaba-2in1",
    name: "しらかば2in1スキー場",
    prefecture: "長野",
    areaKey: "yatsu",
    areaLabel: "白樺湖",
    status: "planned",
    openingLabel: "11月下旬",
    stats: [
      { label: "コース数", value: "9" },
      { label: "リフト数", value: "6" },
      { label: "標高", value: "1,565〜1,834 m" },
    ],
    tags: ["キッズパーク"],
    url: "https://8peaks-resort.com/shirakaba2in1/",
  }),
  more({
    id: "shirakaba-kokusai",
    name: "白樺高原国際スキー場",
    prefecture: "長野",
    areaKey: "yatsu",
    areaLabel: "白樺湖",
    status: "planned",
    openingDate: "2026-12-12",
  }),
  more({
    id: "royal-hill",
    name: "白樺湖ロイヤルヒルスキー場",
    prefecture: "長野",
    areaKey: "yatsu",
    areaLabel: "白樺湖",
    status: "planned",
    openingLabel: "12月中旬（例年）",
  }),
  more({
    id: "blanche",
    name: "ブランシュたかやまスキーリゾート",
    prefecture: "長野",
    areaKey: "yatsu",
    areaLabel: "長和",
    status: "unknown",
  }),
  more({
    id: "echo-valley",
    name: "エコーバレースキー場",
    prefecture: "長野",
    areaKey: "yatsu",
    areaLabel: "白樺湖",
    status: "unknown",
  }),
  more({
    id: "tateshina-tokyu",
    name: "蓼科東急スキー場",
    prefecture: "長野",
    areaKey: "yatsu",
    areaLabel: "蓼科",
    status: "planned",
    openingLabel: "12月中旬（例年）",
    tags: ["キッズパーク", "初心者ゲレンデ"],
  }),
];

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
    tags: ["初心者ゲレンデ", "ナイター"],
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
    status: "planned",
    openingDate: "2026-12-12",
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
    status: "planned",
    openingDate: "2026-12-24",
    stats: [
      SNOW,
      { label: "コース数", value: "11" },
      { label: "沼田ICから", value: "約29 km" },
      { label: "練馬ICから", value: "約110分" },
    ],
    tags: ["スキーヤー専用", "ファミリー向け"],
  },
  {
    id: "kawaba",
    name: "川場スキー場",
    prefecture: "群馬",
    areaKey: "minakami",
    areaLabel: "川場",
    status: "planned",
    openingDate: "2026-12-05",
    stats: [
      SNOW,
      { label: "コース数", value: "11" },
      { label: "最長滑走", value: "3.3 km" },
      { label: "沼田ICから", value: "約25分" },
    ],
    tags: ["非圧雪エリア", "人工降雪機", "キッズパーク"],
    url: "https://www.kawaba.co.jp/",
  },
  {
    id: "marunuma",
    name: "丸沼高原スキー場",
    prefecture: "群馬",
    areaKey: "minakami",
    areaLabel: "尾瀬",
    status: "planned",
    openingDate: "2026-12-04",
    stats: [
      SNOW,
      { label: "コース数", value: "12" },
      { label: "最長滑走", value: "4 km" },
      { label: "標高", value: "1,400〜2,000 m" },
    ],
    tags: ["ロープウェイ", "春スキー"],
    url: "https://www.marunuma.jp/",
  },
  {
    id: "okutone",
    name: "奥利根スノーパーク",
    prefecture: "群馬",
    areaKey: "minakami",
    areaLabel: "水上",
    status: "planned",
    openingDate: "2026-12-12",
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
    status: "planned",
    openingDate: "2026-12-18",
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
    status: "open",
    openingDate: "2026-11-21",
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
    status: "planned",
    openingDate: "2026-12-12",
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
    status: "planned",
    openingDate: "2026-12-18",
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
    status: "planned",
    openingDate: "2026-12-01",
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
    status: "planned",
    openingDate: "2026-12-12",
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
    status: "planned",
    openingLabel: "12月中旬",
    stats: [
      SNOW,
      { label: "標高", value: "1,285–1,485 m" },
      { label: "コース数", value: "7" },
      { label: "河口湖ICから", value: "約20分" },
    ],
    tags: ["スノーパーク", "キッズパーク", "ナイター"],
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
  {
    id: "kagura",
    name: "かぐらスキー場",
    prefecture: "新潟",
    areaKey: "yuzawa",
    areaLabel: "苗場・三俣",
    status: "planned",
    openingDate: "2026-11-28",
    stats: [
      SNOW,
      { label: "コース数", value: "23" },
      { label: "最長滑走", value: "6,000 m" },
      { label: "リフト", value: "12基" },
    ],
    tags: ["ゴンドラ", "春スキー", "パウダー"],
    url: "https://www.princehotels.co.jp/ski/kagura/",
  },
  {
    id: "naeba",
    name: "苗場スキー場",
    prefecture: "新潟",
    areaKey: "yuzawa",
    areaLabel: "苗場",
    status: "planned",
    openingDate: "2026-12-18",
    stats: [
      SNOW,
      { label: "コース数", value: "24" },
      { label: "リフト", value: "12基" },
      { label: "ドラゴンドラ", value: "12/26〜" },
    ],
    tags: ["ゴンドラ", "ナイター", "キッズパーク"],
    url: "https://www.princehotels.co.jp/ski/naeba/",
  },
  {
    id: "kandatsu",
    name: "神立スノーリゾート",
    prefecture: "新潟",
    areaKey: "yuzawa",
    areaLabel: "越後湯沢",
    status: "planned",
    openingDate: "2026-12-11",
    stats: [
      SNOW,
      { label: "コース数", value: "16" },
      { label: "最長滑走", value: "3,500 m" },
      { label: "湯沢ICから", value: "約3分" },
    ],
    tags: ["ナイター", "スノーパーク"],
    url: "https://www.kandatsu.com/",
  },
  {
    id: "ishiuchi",
    name: "石打丸山スキー場",
    prefecture: "新潟",
    areaKey: "yuzawa",
    areaLabel: "石打",
    status: "planned",
    openingDate: "2026-12-18",
    stats: [
      SNOW,
      { label: "コース数", value: "23" },
      { label: "リフト", value: "13基" },
      { label: "塩沢石打ICから", value: "約5分" },
    ],
    tags: ["ゴンドラ", "ナイター", "キッズパーク"],
    url: "https://ishiuchi.or.jp/",
  },
  {
    id: "gala",
    name: "GALA湯沢スキー場",
    prefecture: "新潟",
    areaKey: "yuzawa",
    areaLabel: "越後湯沢",
    status: "planned",
    openingDate: "2026-12-19",
    stats: [
      SNOW,
      { label: "コース数", value: "12" },
      { label: "ガーラ湯沢駅から", value: "直結" },
      { label: "営業", value: "〜5/5" },
    ],
    tags: ["ゴンドラ", "春スキー", "新幹線で行ける"],
    url: "https://gala.co.jp/winter/",
  },
  {
    id: "maiko",
    name: "舞子スノーリゾート",
    prefecture: "新潟",
    areaKey: "yuzawa",
    areaLabel: "舞子",
    status: "planned",
    openingDate: "2026-12-19",
    stats: [
      SNOW,
      { label: "コース数", value: "26" },
      { label: "最長滑走", value: "6,000 m" },
      { label: "塩沢石打ICから", value: "約1分" },
    ],
    tags: ["ゴンドラ", "ナイター", "キッズパーク"],
    url: "https://www.maiko-resort.com/",
  },
  {
    id: "goryu",
    name: "エイブル白馬五竜＆Hakuba47",
    prefecture: "長野",
    areaKey: "hakuba",
    areaLabel: "白馬",
    status: "open",
    openingDate: "2026-11-21",
    stats: [
      SNOW,
      { label: "営業", value: "〜5/5" },
      { label: "滑走エリア", value: "とおみ（一部）" },
      { label: "人工造雪機", value: "2基" },
    ],
    tags: ["ゴンドラ", "ナイター", "春スキー"],
    url: "https://www.hakubagoryu.com/",
  },
  {
    id: "tsugaike",
    name: "つがいけマウンテンリゾート",
    prefecture: "長野",
    areaKey: "hakuba",
    areaLabel: "栂池",
    status: "planned",
    openingDate: "2026-12-01",
    stats: [
      SNOW,
      { label: "営業", value: "12/1〜5/5" },
      { label: "大人1日券", value: "9,800円" },
    ],
    tags: ["ゴンドラ", "ロープウェイ", "春スキー", "キッズパーク"],
    url: "https://www.tsugaike.gr.jp/",
  },
  ...SHIGA_RESORTS,
  {
    id: "ryuo",
    name: "竜王スキーパーク",
    prefecture: "長野",
    areaKey: "shiga",
    areaLabel: "北志賀",
    status: "planned",
    openingDate: "2026-12-05",
    stats: [
      SNOW,
      { label: "ロープウェイ", value: "166人乗り" },
      { label: "リフト", value: "7基" },
      { label: "最高地点", value: "1,770 m" },
    ],
    tags: ["ロープウェイ", "ナイター", "スノーパーク", "キッズパーク"],
    url: "https://ryuoo.com/",
  },
  {
    id: "nozawa",
    name: "野沢温泉スキー場",
    prefecture: "長野",
    areaKey: "shiga",
    areaLabel: "野沢温泉",
    status: "planned",
    openingDate: "2026-11-28",
    stats: [
      SNOW,
      { label: "最長滑走", value: "10 km" },
      { label: "リフト", value: "17基" },
      { label: "標高差", value: "1,079 m" },
    ],
    tags: ["ゴンドラ", "ナイター", "春スキー", "キッズパーク"],
    url: "https://nozawaski.com/",
  },
  {
    id: "fujimi-panorama",
    name: "富士見パノラマリゾート",
    prefecture: "長野",
    areaKey: "yatsu",
    areaLabel: "富士見",
    status: "planned",
    openingDate: "2026-12-12",
    stats: [
      SNOW,
      { label: "コース数", value: "7" },
      { label: "最長滑走", value: "3,000 m" },
      { label: "標高差", value: "730 m" },
    ],
    tags: ["ゴンドラ"],
    url: "https://www.fujimipanorama.com/snow/",
  },
  {
    id: "kurumayama",
    name: "車山高原SKYPARKスキー場",
    prefecture: "長野",
    areaKey: "yatsu",
    areaLabel: "車山",
    status: "planned",
    openingDate: "2026-12-12",
    stats: [
      SNOW,
      { label: "標高", value: "1,560–1,925 m" },
      { label: "リフト", value: "5基" },
      { label: "晴天率", value: "約80%" },
    ],
    tags: ["キッズパーク"],
    url: "https://winter.kurumayama-skypark.com/",
  },
  {
    id: "chateraise-nobeyama",
    name: "シャトレーゼスキーバレー野辺山",
    prefecture: "長野",
    areaKey: "yatsu",
    areaLabel: "野辺山",
    status: "planned",
    openingDate: "2026-12-19",
    stats: [
      SNOW,
      { label: "コース数", value: "5" },
      { label: "リフト", value: "3基" },
      { label: "長坂ICから", value: "約25分" },
    ],
    tags: ["ナイター", "キッズパーク"],
    url: "https://nobeyama.chateraiseski.jp/",
  },
  {
    id: "chateraise-koumi",
    name: "シャトレーゼスキーバレー小海",
    prefecture: "長野",
    areaKey: "yatsu",
    areaLabel: "小海",
    status: "planned",
    openingDate: "2026-12-15",
    stats: [
      SNOW,
      { label: "最長滑走", value: "2,500 m" },
      { label: "営業", value: "12/15〜3/25" },
      { label: "長坂ICから", value: "約50分" },
    ],
    tags: ["キッズパーク"],
    url: "https://koumi.chateraiseski.jp/",
  },
  ...MORE_GUNMA_TOCHIGI,
  ...MORE_YUZAWA,
  ...MORE_MYOKO,
  ...MORE_HAKUBA_HOKUSHIN,
  ...MORE_TOSHIN,
];

// オープン予定日を過ぎたスキー場は「営業中」として扱う。
// 日付は表示のたびに判定する（ページは1時間〜6時間ごとに作り直すので、手で更新しなくても切り替わる）
for (const r of resorts) {
  const planned = r.status;
  Object.defineProperty(r, "status", {
    enumerable: true,
    get(): ResortStatus {
      return planned === "planned" &&
        r.openingDate !== undefined &&
        r.openingDate <= todayInTokyo()
        ? "open"
        : planned;
    },
  });
}

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
  {
    label: "新潟",
    areas: [
      { key: "yuzawa", label: "湯沢・魚沼" },
      { key: "myoko", label: "妙高" },
    ],
  },
  {
    label: "長野",
    areas: [
      { key: "karuizawa", label: "軽井沢" },
      { key: "sugadaira", label: "菅平・湯の丸" },
      { key: "saku", label: "佐久・小諸" },
      { key: "yatsu", label: "白樺湖・蓼科・八ヶ岳" },
      { key: "hakuba", label: "白馬" },
      { key: "shiga", label: "志賀・北志賀・野沢" },
      { key: "madarao", label: "斑尾・飯山" },
      { key: "togakushi", label: "戸隠・飯綱・黒姫" },
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

const LABEL_DAY: Record<string, string> = {
  上旬: "05",
  中旬: "15",
  下旬: "25",
};

/**
 * オープンが早い順に並べるためのキー。
 * 日付があればその日、「12月中旬」のような目安なら月の中ほどの日、どちらもなければ最後。
 */
export function openingSortKey(r: Resort): string {
  if (r.openingDate) return r.openingDate;
  const m = r.openingLabel?.match(/(\d{1,2})月(上旬|中旬|下旬)/);
  if (m) {
    const month = Number(m[1]);
    const year = month >= 7 ? 2026 : 2027;
    return `${year}-${String(month).padStart(2, "0")}-${LABEL_DAY[m[2]]}`;
  }
  return "9999-12-31";
}

export function statusLabel(r: Resort): string {
  if (r.status === "open") return "営業中";
  if (r.status === "planned" && r.openingDate)
    return `${formatShortDate(r.openingDate)} オープン予定`;
  if (r.status === "planned" && r.openingLabel)
    return `${r.openingLabel} オープン予定`;
  return "営業状況 確認中";
}
