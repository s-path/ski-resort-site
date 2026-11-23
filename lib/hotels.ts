// 楽天トラベルのAPIで、スキー場の近くの宿を探す。
// 必要な環境変数（Vercel に設定）：
//   RAKUTEN_APP_ID        … 楽天ウェブサービスのアプリID
//   RAKUTEN_ACCESS_KEY    … アクセスキー（pk_ で始まる）
//   RAKUTEN_AFFILIATE_ID  … 楽天アフィリエイトID（付けるとリンクがアフィリエイトURLになる）
//   RAKUTEN_ORIGIN        … アプリに登録したサイトURL（省略時はサイトのURL）
// どれかが欠けていたり、APIが失敗したりしたときは空の配列を返し、ページには何も出さない。

import type { Prefecture, Resort } from "./resorts";
import { SITE_URL } from "./site";

const ENDPOINT =
  "https://openapi.rakuten.co.jp/engine/api/Travel/KeywordHotelSearch/20260731";

/** 楽天トラベルの地区コード（都道府県） */
const PREF_CODE: Record<Prefecture, string> = {
  群馬: "gunma",
  栃木: "tochigi",
  新潟: "niigata",
  長野: "nagano",
  山梨: "yamanashi",
  静岡: "shizuoka",
  埼玉: "saitama",
};

/** スキー場ごとの宿の探し方（宿の名前や紹介文に入っていそうな地名）。null は宿を出さない */
const HOTEL_KEYWORD: Record<string, string | null> = {
  "karuizawa-prince": "軽井沢",
  yeti: "裾野",
  sayama: null, // 屋内スキー場で日帰りが中心
  hunter: "塩原",
  tambara: "玉原",
  manza: "万座",
  "oze-iwakura": "岩鞍",
  katashina: "片品",
  okutone: "水上",
  whitevalley: "水上",
  kusatsu: "草津温泉",
  kazawa: "鹿沢",
  "karuizawa-snowpark": "北軽井沢",
  "yuzawa-kogen": "越後湯沢",
  edelweiss: "鬼怒川",
  happo: "八方",
  sunmeadows: "清里",
  fujiten: "河口湖",
  "kamui-misaka": "河口湖",
  kawaba: "川場",
  marunuma: "丸沼",
  kagura: "苗場",
  naeba: "苗場",
  kandatsu: "越後湯沢",
  ishiuchi: "石打",
  gala: "越後湯沢",
  maiko: "舞子",
  goryu: "五竜",
  tsugaike: "栂池",
  shiga: "志賀高原",
  nozawa: "野沢温泉",
  "fujimi-panorama": "富士見",
  kurumayama: "車山",
  "chateraise-nobeyama": "野辺山",
  "chateraise-koumi": "小海",
};

export type Hotel = {
  id: number;
  name: string;
  url: string;
  minCharge?: number;
  reviewAverage?: number;
  reviewCount?: number;
  thumbnail?: string;
  access?: string;
};

type BasicInfo = {
  hotelNo?: number;
  hotelName?: string;
  hotelInformationUrl?: string;
  hotelMinCharge?: number | null;
  reviewAverage?: number | null;
  reviewCount?: number | null;
  hotelThumbnailUrl?: string;
  access?: string;
};

/** API の応答（formatVersion=1）から宿の一覧を取り出す */
export function parseHotels(json: unknown): Hotel[] {
  const hotels = (
    json as { hotels?: { hotel?: { hotelBasicInfo?: BasicInfo }[] }[] }
  )?.hotels;
  if (!Array.isArray(hotels)) return [];
  return hotels.flatMap((h) => {
    const b = h.hotel?.find((x) => x.hotelBasicInfo)?.hotelBasicInfo;
    if (!b?.hotelNo || !b.hotelName || !b.hotelInformationUrl) return [];
    return [
      {
        id: b.hotelNo,
        name: b.hotelName,
        url: b.hotelInformationUrl,
        minCharge: b.hotelMinCharge ?? undefined,
        reviewAverage: b.reviewAverage ?? undefined,
        reviewCount: b.reviewCount ?? undefined,
        thumbnail: b.hotelThumbnailUrl?.replace(/^http:/, "https:"),
        access: b.access,
      },
    ];
  });
}

export function hotelKeyword(r: Resort) {
  return HOTEL_KEYWORD[r.id] ?? null;
}

export async function nearbyHotels(r: Resort, hits = 6): Promise<Hotel[]> {
  const appId = process.env.RAKUTEN_APP_ID;
  const accessKey = process.env.RAKUTEN_ACCESS_KEY;
  const keyword = hotelKeyword(r);
  if (!appId || !accessKey || !keyword) return [];

  // RAKUTEN_API_ENDPOINT はローカルでの動作確認用（通常は設定しない）
  const url = new URL(process.env.RAKUTEN_API_ENDPOINT ?? ENDPOINT);
  url.searchParams.set("applicationId", appId);
  url.searchParams.set("keyword", keyword);
  url.searchParams.set("middleClassCode", PREF_CODE[r.prefecture]);
  url.searchParams.set("hits", String(hits));
  url.searchParams.set("responseType", "small");
  url.searchParams.set("datumType", "1");
  const affiliateId = process.env.RAKUTEN_AFFILIATE_ID;
  if (affiliateId) url.searchParams.set("affiliateId", affiliateId);

  try {
    const res = await fetch(url, {
      headers: {
        accessKey,
        // 「Webアプリケーション」で登録したアプリは、登録したサイトURLを Origin で確認する
        Origin: process.env.RAKUTEN_ORIGIN ?? SITE_URL,
      },
      // 宿の情報は1日1回の更新で十分。APIの呼び出し回数も抑える
      next: { revalidate: 86400 },
    });
    if (!res.ok) {
      console.warn(`[rakuten] ${r.id}: HTTP ${res.status}`);
      return [];
    }
    return parseHotels(await res.json());
  } catch (e) {
    console.warn(`[rakuten] ${r.id}:`, e);
    return [];
  }
}
