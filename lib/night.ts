// ナイター営業の情報（2026-11-24 に確認）。
// 今季の発表が見つからなかったものは、昨季の情報や情報サイトの値を載せ、season で区別する。

export type NightInfo = {
  id: string;
  /** 営業する日（例：「金・土・休前日」） */
  days: string;
  /** 営業期間（例：「12/18〜3/27」） */
  period: string;
  /** 営業時間（例：「18:00〜翌2:00」） */
  hours: string;
  /** 閉まる時刻（並べ替え用、24時を超える場合は 26 のように書く） */
  closesAt: number;
  /** ナイター券（大人・こども） */
  price?: { adult: string; child?: string };
  /** ナイターで滑れるコース・ゲレンデ */
  area?: string;
  note?: string;
  /** current: 今季の情報を確認 / previous: 昨季の情報 / unverified: 今季分か未確認 */
  season: "current" | "previous" | "unverified";
  source: { label: string; url: string };
};

export const NIGHT: NightInfo[] = [
  {
    id: "kandatsu",
    days: "金・土・休前日（12/29〜1/2は5夜連続）",
    period: "12/18〜3/27",
    hours: "18:00〜翌2:00",
    closesAt: 26,
    price: { adult: "4,900円", child: "3,500円" },
    area: "5コース",
    note: "ナイター4時間券（大人3,900円）あり。週末は大浴場・仮眠施設も深夜まで",
    season: "current",
    source: { label: "公式サイト", url: "https://www.kandatsu.com/price/" },
  },
  {
    id: "okutone",
    days: "毎日（日曜・祝日を除く）",
    period: "12月下旬〜3月中旬",
    hours: "16:00〜21:00（土曜は〜23:00）",
    closesAt: 23,
    price: { adult: "3,500円", child: "無料（小学生以下）" },
    note: "土・日・祝は朝6時から営業。駐車場は24時間無料",
    season: "unverified",
    source: {
      label: "ファミスキ",
      url: "https://www.famiski.jp/gelande_guide/okutone/",
    },
  },
  {
    id: "norn",
    days: "金・土・日",
    period: "1/8〜3/21",
    hours: "〜22:00",
    closesAt: 22,
    note: "土日は朝7時から営業。祝日は16:30まで",
    season: "current",
    source: {
      label: "タイムズクラブ",
      url: "https://www.timesclub.jp/benefit/shop/sports/detail.jsp?shop=S000002498",
    },
  },
  {
    id: "yeti",
    days: "金・土・日・祝",
    period: "シーズン中",
    hours: "〜22:00",
    closesAt: 22,
    price: { adult: "3,200円", child: "2,700円" },
    note: "ナイター営業日は1日券も22時まで使える",
    season: "current",
    source: { label: "公式サイト", url: "https://www.yeti-resort.com/" },
  },
  {
    id: "fujiten",
    days: "土・日・祝と年末年始",
    period: "12/26〜3/7",
    hours: "16:00〜21:30（リフトは21:00まで）",
    closesAt: 21.5,
    price: { adult: "3,000円" },
    area: "スラローム・ダイナミック",
    season: "current",
    source: {
      label: "SURF&SNOW",
      url: "https://surfsnow.jp/",
    },
  },
  {
    id: "joetsu-kokusai",
    days: "毎日",
    period: "12/19〜3/22",
    hours: "〜21:00",
    closesAt: 21,
    note: "JR上越国際スキー場前駅の目の前。ナイター後も東京行きの最終新幹線に間に合う",
    season: "unverified",
    source: {
      label: "watabi",
      url: "https://watabi.org/articles/joetsu-kokusai-ski-guide",
    },
  },
  {
    id: "goryu",
    days: "毎日",
    period: "12/19〜3/28",
    hours: "18:00〜21:30",
    closesAt: 21.5,
    price: { adult: "6,500円", child: "3,000円（6〜22歳）" },
    area: "とおみゲレンデ・いいもりゲレンデの一部（約1,000m）",
    note: "ナイター前に毎日圧雪。料金は昨季の値",
    season: "current",
    source: {
      label: "ハピスノ",
      url: "https://hapisnow.jp/snowresort/able-hakubagoryu/",
    },
  },
  {
    id: "naeba",
    days: "毎日",
    period: "12/18〜3/21",
    hours: "17:00〜20:30",
    closesAt: 20.5,
    area: "第4・第5ゲレンデ（苗場プリンスホテル前）",
    note: "小学生以下はリフト無料。ナイター券の今季料金は未発表",
    season: "current",
    source: {
      label: "公式サイト",
      url: "https://www.princehotels.co.jp/ski/naeba/",
    },
  },
  {
    id: "ishiuchi",
    days: "12/26〜2/27は毎日、3月は金・土・祝",
    period: "12/26〜3月",
    hours: "16:00〜20:00",
    closesAt: 20,
    price: { adult: "3,800円", child: "2,000円" },
    area: "リフト・ゴンドラ3基",
    note: "国内でもトップクラスの広さのナイター",
    season: "current",
    source: {
      label: "公式サイト",
      url: "https://ishiuchi.or.jp/",
    },
  },
  {
    id: "maiko",
    days: "年末年始と1〜3月の土・日",
    period: "12/29〜3月中旬",
    hours: "15:30〜20:00（日曜は〜19:00）",
    closesAt: 20,
    price: { adult: "2,300円", child: "1,200円" },
    area: "舞子エリア",
    season: "previous",
    source: {
      label: "公式サイト",
      url: "https://www.maiko-resort.com/",
    },
  },
  {
    id: "oze-iwakura",
    days: "特定日（12/31・1/2と1〜2月の金・土の一部）",
    period: "12/31〜2/27",
    hours: "16:30〜20:00",
    closesAt: 20,
    price: { adult: "2,500円", child: "1,600円" },
    area: "ロマンス・エキスパート・ファミリー",
    season: "current",
    source: {
      label: "公式サイト",
      url: "https://www.oze-iwakura.co.jp/",
    },
  },
  {
    id: "nozawa",
    days: "年末年始と1〜3月の土曜など（特定日）",
    period: "12月下旬〜3月下旬",
    hours: "16:30〜20:00",
    closesAt: 20,
    price: { adult: "2,700円", child: "1,600円" },
    area: "長坂ゲレンデ（長坂フォーリフト）",
    season: "unverified",
    source: {
      label: "公式サイト",
      url: "https://nozawaski.com/winter/lift_price/lift_time/",
    },
  },
  {
    id: "ryuo",
    days: "火〜土（日・月は休み）",
    period: "シーズン中",
    hours: "17:00〜20:00",
    closesAt: 20,
    note: "ナイター券の今季料金は未発表（昨季は大人2,400円）",
    season: "current",
    source: {
      label: "プレスリリース",
      url: "https://prtimes.jp/main/html/rd/p/000000233.000031800.html",
    },
  },
  {
    id: "shiga-yakebitaiyama",
    days: "特定日",
    period: "シーズン中",
    hours: "18:00〜20:00",
    closesAt: 20,
    area: "プリンスホテル側のゲレンデ",
    note: "営業日はスキー場のカレンダーで確認を",
    season: "unverified",
    source: {
      label: "公式サイト",
      url: "https://www.princehotels.co.jp/ski/shiga/winter/",
    },
  },
  {
    id: "chateraise-nobeyama",
    days: "1〜3月の土曜と12/29・12/30・1/10",
    period: "12/29〜3/6",
    hours: "〜18:30",
    closesAt: 18.5,
    price: { adult: "2,500円", child: "1,500円" },
    note: "ナイター営業日は1日券も18:30まで使える",
    season: "current",
    source: {
      label: "ウェザーニュース",
      url: "https://weathernews.jp/ski/spot/34840/",
    },
  },
];

export function nightOf(id: string) {
  return NIGHT.find((n) => n.id === id);
}

/** 閉まるのが遅い順 */
export function nightsByClosing() {
  return [...NIGHT].sort((a, b) => b.closesAt - a.closesAt);
}
