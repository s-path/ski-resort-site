/** トップページ「エリアから探す」のタブ */
export const AREA_TABS: {
  key: string;
  label: string;
  areas: { name: string; resorts: string }[];
}[] = [
  {
    key: "gunma",
    label: "群馬",
    areas: [
      {
        name: "水上・尾瀬",
        resorts: "丸沼高原、川場、尾瀬岩鞍、たんばら、ノルンみなかみ など",
      },
      {
        name: "草津・万座・嬬恋",
        resorts:
          "草津温泉、万座温泉、鹿沢スノーエリア、軽井沢スノーパーク など",
      },
    ],
  },
  {
    key: "tochigi",
    label: "栃木",
    areas: [
      {
        name: "那須塩原・日光",
        resorts:
          "ハンターマウンテン塩原、エーデルワイス、日光湯元温泉、マウントジーンズ那須",
      },
    ],
  },
  {
    key: "niigata",
    label: "新潟",
    areas: [
      {
        name: "越後湯沢",
        resorts: "苗場、かぐら、神立、湯沢高原、湯沢中里 など",
      },
    ],
  },
  {
    key: "nagano",
    label: "長野",
    areas: [
      { name: "軽井沢", resorts: "軽井沢プリンスホテル" },
      {
        name: "八ヶ岳・諏訪",
        resorts: "富士見パノラマ、富士見高原、車山高原 など",
      },
      { name: "白馬", resorts: "白馬八方尾根、白馬五竜、栂池 など" },
      { name: "志賀・野沢", resorts: "志賀高原、野沢温泉 など" },
    ],
  },
  {
    key: "yamanashi",
    label: "山梨",
    areas: [
      { name: "清里・八ヶ岳南麓", resorts: "サンメドウズ清里" },
      {
        name: "富士山・河口湖",
        resorts: "ふじてん、カムイみさか、スノーパーク イエティ（静岡）",
      },
    ],
  },
];

/** トップページ「エリアの積雪と降雪予報」 */
export const SNOW_AREAS = [
  "水上・尾瀬",
  "草津・万座・嬬恋",
  "越後湯沢",
  "那須塩原・日光",
  "八ヶ岳・諏訪",
  "富士山・河口湖",
];
