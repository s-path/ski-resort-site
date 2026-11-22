// リフト券の料金・お得な買い方・購入ページ。
// 2026-11-22 に公式サイト・プレスリリース・チケット販売サイトで確認した値。
// 今季の料金が見つからなかったスキー場は、昨季の料金や公式掲載の料金を載せ、そのことを seasonNote に書く。

export type TicketRow = {
  /** 例：「平日」「土日祝」「特定日」 */
  label: string;
  adult: string;
  child?: string;
};

export type Deal = {
  title: string;
  detail: string;
  /** 販売・利用の締め切り（この日を過ぎたら表示しない） */
  until?: string;
  url?: string;
};

export type TicketInfo = {
  /** current: 2026-27の料金を確認済み / previous: 昨季の料金 / unverified: 公式掲載だが今季分か未確認 */
  season: "current" | "previous" | "unverified";
  /** 大人1日券の最安・最高（カードの表示用） */
  adultMin: number;
  adultMax: number;
  /** 大人・こどもの区分（例：「大人＝中学生以上、こども＝小学生」） */
  ageNote?: string;
  rows: TicketRow[];
  /** 料金表の下に出す注記 */
  notes?: string[];
  deals: Deal[];
  buy?: { label: string; url: string };
  source: { label: string; url: string };
};

export const TICKETS_CHECKED_AT = "2026-11-22";

export const tickets: Record<string, TicketInfo> = {
  "karuizawa-prince": {
    season: "current",
    adultMin: 8000,
    adultMax: 13000,
    ageNote: "こども＝小学生まで",
    rows: [
      { label: "初滑り（〜12/18）", adult: "8,000円", child: "無料" },
      { label: "シーズン", adult: "10,000円", child: "無料" },
      {
        label: "トップシーズン（1月の週末など）",
        adult: "12,000円",
        child: "無料",
      },
      {
        label: "ハイトップ（年末年始・3連休など）",
        adult: "13,000円",
        child: "無料",
      },
      { label: "春スキー（3/23〜）", adult: "8,000円", child: "無料" },
    ],
    deals: [
      {
        title: "Web事前購入",
        detail: "どの期間も窓口より500円安い（こどもは手数料100円）",
        url: "https://www.princehotels.co.jp/ski/karuizawa/winter/lift/advance_tickets/",
      },
    ],
    buy: {
      label: "公式Web購入",
      url: "https://www.princehotels.co.jp/ski/karuizawa/winter/lift/advance_tickets/",
    },
    source: {
      label: "公式サイト",
      url: "https://www.princehotels.co.jp/ski/karuizawa/winter/lift/",
    },
  },
  yeti: {
    season: "current",
    adultMin: 4300,
    adultMax: 5300,
    ageNote: "こども＝3歳〜小学生（シニア60歳以上も同額）",
    rows: [
      { label: "平日", adult: "4,300円", child: "3,300円" },
      { label: "土日祝", adult: "5,300円", child: "4,300円" },
      { label: "ナイター（金土日祝）", adult: "3,200円", child: "2,700円" },
    ],
    notes: ["1日券は22:00まで使えます（ナイター営業日）"],
    deals: [],
    source: {
      label: "スノーナビ（2026-27シーズン情報）",
      url: "https://www.snownavi.com/topics/news_26103100__trashed",
    },
  },
  sayama: {
    season: "current",
    adultMin: 4000,
    adultMax: 4800,
    ageNote: "大人＝中学生以上、こども＝3歳〜小学生",
    rows: [
      { label: "ワンデー", adult: "4,000円", child: "1,000円" },
      { label: "ワンデー（特定日）", adult: "4,800円" },
      { label: "アフタヌーン（14時〜）", adult: "3,000円", child: "1,000円" },
    ],
    deals: [
      {
        title: "学割ワンデー半額",
        detail: "中学生〜大学院生は2,000円（アソビューか当日窓口）",
        until: "2026-11-30",
      },
    ],
    notes: ["チケットはアソビューか西武線アプリで事前購入できます"],
    source: {
      label: "プレスリリース（リセマム）",
      url: "https://resemom.jp/release/prtimes/20261015/220392.html",
    },
  },
  hunter: {
    season: "current",
    adultMin: 6000,
    adultMax: 7500,
    ageNote: "大人＝中学生以上",
    rows: [
      { label: "平日", adult: "6,000円（Web 5,000円）", child: "無料" },
      { label: "休日", adult: "6,500円（Web 5,800円）" },
      { label: "特定日", adult: "7,500円（Web 6,800円）" },
    ],
    notes: ["小学生以下は平日無料、未就学児は全日無料"],
    deals: [
      {
        title: "早割リフト1日券",
        detail: "大人4,200円・全営業日OK",
        until: "2026-11-27",
        url: "https://smartclub.tokyu-rs.co.jp/ski/ticket/1/detail/199",
      },
      {
        title: "Web限定リフト券",
        detail: "窓口より700〜1,000円安い",
        url: "https://www.hunter.co.jp/winter/ticket/buy/",
      },
    ],
    buy: {
      label: "公式Web購入",
      url: "https://www.hunter.co.jp/winter/ticket/buy/",
    },
    source: {
      label: "公式サイト",
      url: "https://www.hunter.co.jp/winter/ticket/",
    },
  },
  tambara: {
    season: "current",
    adultMin: 5300,
    adultMax: 7000,
    ageNote: "大人＝中学生以上",
    rows: [
      { label: "通常（日により3区分）", adult: "5,500 / 6,300 / 7,000円" },
      { label: "春料金", adult: "5,300円" },
    ],
    notes: ["小学生以下は平日無料（年末年始などの特定日を除く）"],
    deals: [
      {
        title: "早割リフト1日券",
        detail: "大人4,300円・全営業日OK",
        until: "2026-11-27",
        url: "https://surfsnow.jp/guide/htm/r0170tk.htm",
      },
    ],
    source: {
      label: "公式サイト",
      url: "https://www.tambara.co.jp/winter/ticket/",
    },
  },
  "oze-iwakura": {
    season: "previous",
    adultMin: 5800,
    adultMax: 7000,
    ageNote: "こども＝小学生",
    rows: [
      { label: "平日", adult: "5,800円", child: "3,800円" },
      { label: "土日祝", adult: "6,500円", child: "4,500円" },
      { label: "特定日", adult: "7,000円", child: "5,000円" },
    ],
    notes: ["未就学児は無料（保証金500円）"],
    deals: [
      {
        title: "いわくらぶファミリー",
        detail: "家族で登録すると1日券・レンタルが割引",
        url: "https://www.oze-iwakura.co.jp/ski/plan/iwaclub/",
      },
    ],
    source: {
      label: "公式サイト",
      url: "https://www.oze-iwakura.co.jp/ski/price/",
    },
  },
  katashina: {
    season: "unverified",
    adultMin: 3500,
    adultMax: 5100,
    ageNote: "こども＝小学生",
    rows: [
      { label: "平日", adult: "3,500円", child: "2,800円" },
      { label: "土日祝", adult: "5,100円", child: "3,600円" },
    ],
    deals: [
      {
        title: "クラブ会員料金",
        detail: "会員になると1日券が割引。今季は平日シーズン券（33,000円〜）も",
        url: "https://katashinakogen.co.jp/20260907service/",
      },
    ],
    buy: {
      label: "公式の事前購入（土日祝）",
      url: "https://katashinakogen.co.jp/payment-lift-ticket/",
    },
    source: {
      label: "公式の事前購入フォーム",
      url: "https://katashinakogen.co.jp/payment-lift-ticket/",
    },
  },
  kawaba: {
    season: "current",
    adultMin: 7600,
    adultMax: 8400,
    rows: [
      { label: "平日", adult: "7,600円" },
      { label: "休日", adult: "7,900円" },
      { label: "特定日", adult: "8,400円" },
    ],
    notes: ["ICカード保証金500円が別途必要"],
    deals: [
      {
        title: "早割リフト1日券",
        detail: "大人5,800円・全日OK（公式オンライン、17時まで）",
        until: "2026-11-30",
        url: "https://kawaba.nippon-ski.com/ja/earlybird.html",
      },
    ],
    buy: {
      label: "公式オンラインストア",
      url: "https://kawaba.nippon-ski.com/ja/earlybird.html",
    },
    source: {
      label: "ソトビヨリ（公式料金の転載）",
      url: "https://sotobiyori.jp/ski/kawaba/",
    },
  },
  marunuma: {
    season: "current",
    adultMin: 5200,
    adultMax: 7000,
    ageNote: "大人＝高校生以上、こども＝小・中学生",
    rows: [
      { label: "初滑り（〜12/18）", adult: "5,200円", child: "2,500円" },
      { label: "平日", adult: "6,000円", child: "3,000円" },
      { label: "土日祝", adult: "6,700円", child: "3,000円" },
      { label: "特定日", adult: "7,000円", child: "3,000円" },
    ],
    deals: [
      {
        title: "早割大人1日券",
        detail: "5,000円・ICカードでそのままリフトへ",
        until: "2026-11-30",
        url: "https://www.snownavi.com/topics/news_26110701",
      },
      {
        title: "コンビニ前売り券",
        detail: "沼田IC〜丸沼の国道120号沿いのコンビニで400円引き",
        url: "https://www.marunuma.jp/winter/convenience-ticket/",
      },
    ],
    source: {
      label: "公式サイト",
      url: "https://www.marunuma.jp/winter/ticket/",
    },
  },
  okutone: {
    season: "current",
    adultMin: 6500,
    adultMax: 6500,
    ageNote: "小学生以下は全日無料",
    rows: [
      { label: "1日券（〜17時）", adult: "6,500円", child: "無料" },
      { label: "5時間券", adult: "6,000円", child: "無料" },
    ],
    notes: ["中学生・60歳以上はシニア料金（1日券5,200円）"],
    deals: [
      {
        title: "11月限定 早割1日券",
        detail: "大人5,500円・全日OK",
        until: "2026-11-30",
        url: "https://www.lift-ticket.jp/view/item/002003000001",
      },
    ],
    source: {
      label: "楽天チケットレジャー",
      url: "https://leisure.tstar.jp/event/rlotnsp/",
    },
  },
  whitevalley: {
    season: "previous",
    adultMin: 5500,
    adultMax: 5500,
    ageNote: "こども＝小学生",
    rows: [
      { label: "1日券", adult: "5,500円", child: "2,900円" },
      { label: "中高生・55歳以上", adult: "4,800円" },
    ],
    notes: ["毎週土曜の午後は小学生リフト無料（昨季）"],
    deals: [],
    source: {
      label: "SURF&SNOW",
      url: "https://surfsnow.jp/guide/htm/r0116gc2.htm",
    },
  },
  kusatsu: {
    season: "current",
    adultMin: 3500,
    adultMax: 6000,
    ageNote: "ジュニア＝4歳〜小学生",
    rows: [
      {
        label: "オープニング（12/18〜25）",
        adult: "3,500円",
        child: "1,500円",
      },
      { label: "シーズン", adult: "6,000円", child: "2,000円" },
      { label: "春スキー（3/23〜）", adult: "3,500円", child: "1,500円" },
    ],
    notes: ["中高生・60歳以上は5,200円"],
    deals: [],
    source: {
      label: "公式サイト",
      url: "https://www.932-onsen.com/winter/ryokin/",
    },
  },
  manza: {
    season: "current",
    adultMin: 6300,
    adultMax: 6300,
    ageNote: "大人＝中学生以上、小学生以下は無料",
    rows: [{ label: "1日券", adult: "6,300円", child: "無料" }],
    deals: [
      {
        title: "早割リフト1日券（Web）",
        detail: "11/30まで4,500円、12/18まで5,000円、それ以降5,500円",
        url: "https://webket.jp/pc/ticket/index?fc=00238&ac=9101",
      },
    ],
    buy: {
      label: "公式Web購入",
      url: "https://webket.jp/pc/ticket/index?fc=00238&ac=9101",
    },
    source: {
      label: "公式サイト",
      url: "https://www.princehotels.co.jp/ski/manza/informations/hayawari/",
    },
  },
  kazawa: {
    season: "unverified",
    adultMin: 4800,
    adultMax: 5100,
    ageNote: "ジュニア＝小学生",
    rows: [
      { label: "平日", adult: "4,800円", child: "3,000円" },
      { label: "土日祝", adult: "5,100円", child: "3,000円" },
    ],
    notes: ["シニア・SAJ/JAF/アプリ会員は300円引き"],
    deals: [],
    source: {
      label: "公式サイト",
      url: "http://www.kazawa.com/13922619850915",
    },
  },
  "karuizawa-snowpark": {
    season: "current",
    adultMin: 4000,
    adultMax: 5500,
    ageNote: "こども＝4歳〜小学生（シニア60歳以上も同額）",
    rows: [
      { label: "平日", adult: "4,000円", child: "3,000円" },
      { label: "土日祝", adult: "5,000円", child: "4,000円" },
      { label: "特定日", adult: "5,500円", child: "4,500円" },
    ],
    notes: ["大人1名＋こどものファミリーパックあり"],
    deals: [
      {
        title: "早割リフト1日券（スマリフ）",
        detail: "平日3,500円・土日祝4,500円",
        until: "2026-12-11",
        url: "https://surfsnow.jp/guide/htm/r0166tk.htm",
      },
    ],
    source: {
      label: "SURF&SNOW",
      url: "https://surfsnow.jp/guide/htm/r0166gc2.htm",
    },
  },
  "yuzawa-kogen": {
    season: "current",
    adultMin: 4200,
    adultMax: 7500,
    ageNote: "こども＝小学生",
    rows: [
      { label: "初滑り（12/18）", adult: "4,200円", child: "2,500円" },
      { label: "シーズン", adult: "7,500円", child: "3,500円" },
      { label: "春スキー（3/29〜）", adult: "4,200円", child: "2,500円" },
    ],
    deals: [
      {
        title: "オンライン料金（国内居住者）",
        detail: "平日5,000円・土日祝5,500円・特日6,000円",
      },
      {
        title: "スキーこどもの日",
        detail: "1/17・2/21・3/21は小学生以下のリフト券が無料",
      },
    ],
    source: {
      label: "ハピスノ",
      url: "https://hapisnow.jp/snowresort/yuzawa-kogen/",
    },
  },
  edelweiss: {
    season: "current",
    adultMin: 3500,
    adultMax: 6000,
    ageNote: "こども＝3歳〜小学生",
    rows: [
      { label: "平日", adult: "3,500円", child: "3,000円" },
      { label: "休日", adult: "6,000円", child: "4,300円" },
    ],
    deals: [
      {
        title: "前売り1日券",
        detail: "全日5,500円・平日限定3,000円",
        url: "https://www.winterplus.jp/ski/ski_detail.cfm?skiarea_code=edel",
      },
    ],
    source: {
      label: "WINTER PLUS",
      url: "https://www.winterplus.jp/ski/ski_detail.cfm?skiarea_code=edel",
    },
  },
  happo: {
    season: "current",
    adultMin: 6400,
    adultMax: 9800,
    ageNote: "大人＝18〜64歳、こども＝6〜17歳",
    rows: [
      { label: "シーズンイン（12/1〜18）", adult: "6,400円", child: "3,200円" },
      { label: "ハイシーズン（12/19〜3/22）", adult: "9,800円" },
      { label: "スプリング（3/23〜）", adult: "6,400円", child: "3,200円" },
    ],
    notes: ["手持ちのICチケットにチャージすると少し安くなります"],
    deals: [
      {
        title: "マイナンバーカード早割",
        detail: "1日券6,400円（オンライン限定・1人1回）",
        until: "2026-11-30",
        url: "https://www.happo-one.jp/ticket/",
      },
    ],
    buy: { label: "公式サイト", url: "https://www.happo-one.jp/ticket/" },
    source: { label: "公式サイト", url: "https://www.happo-one.jp/ticket/" },
  },
  sunmeadows: {
    season: "current",
    adultMin: 5000,
    adultMax: 6900,
    ageNote: "こども＝小学生",
    rows: [
      {
        label: "オープニング（12/12・13）",
        adult: "5,000円",
        child: "4,000円",
      },
      { label: "シーズン", adult: "6,900円", child: "5,500円" },
      { label: "春スキー（3/29〜）", adult: "5,000円", child: "4,000円" },
    ],
    deals: [
      {
        title: "Web前売り券",
        detail: "平日5,500円・土日祝6,000円",
        url: "https://www.sunmeadows.co.jp/winter/ticket/lift/",
      },
    ],
    buy: {
      label: "公式Web前売り",
      url: "https://www.sunmeadows.co.jp/winter/ticket/lift/",
    },
    source: {
      label: "公式サイト",
      url: "https://www.sunmeadows.co.jp/winter/ticket/lift/",
    },
  },
  fujiten: {
    season: "current",
    adultMin: 5800,
    adultMax: 7300,
    ageNote: "ジュニア＝4歳〜小学生",
    rows: [
      { label: "平日", adult: "5,800円", child: "4,000円" },
      { label: "土日祝・年末年始", adult: "6,800円", child: "5,500円" },
      { label: "特定日", adult: "7,300円", child: "6,000円" },
    ],
    notes: ["ICカード保証金500円", "ふじてんメンバーズは1日券500円引き"],
    deals: [
      {
        title: "オンラインリフト券",
        detail: "Webで買うと窓口より安く、窓口に並ばずに乗れる",
        url: "https://www.fujiten.net/charges/webstores/",
      },
    ],
    buy: {
      label: "公式Web購入",
      url: "https://www.fujiten.net/charges/webstores/",
    },
    source: { label: "公式サイト", url: "https://www.fujiten.net/charges/" },
  },
  "kamui-misaka": {
    season: "unverified",
    adultMin: 4500,
    adultMax: 4500,
    ageNote: "こども＝小学生以下",
    rows: [
      { label: "1日券", adult: "4,500円", child: "3,000円" },
      { label: "午前券・午後券", adult: "2,500円", child: "2,500円" },
    ],
    deals: [],
    source: {
      label: "SURF&SNOW",
      url: "https://surfsnow.jp/guide/htm/r0325gc2.htm",
    },
  },
};

export function getTickets(id: string): TicketInfo | undefined {
  return tickets[id];
}

export const SEASON_NOTE: Record<TicketInfo["season"], string | null> = {
  current: null,
  previous: "今季の料金は未発表のため、昨季の料金です",
  unverified: "公式に載っている料金です（今季分かは未確認）",
};

const yen = (n: number) => n.toLocaleString("ja-JP");

/** カード用の短い表示。例：「6,000〜7,500円」 */
export function adultPriceLabel(t: TicketInfo) {
  return t.adultMin === t.adultMax
    ? `${yen(t.adultMin)}円`
    : `${yen(t.adultMin)}〜${yen(t.adultMax)}円`;
}

/** 締め切りを過ぎていないお得情報だけを返す */
export function activeDeals(t: TicketInfo, today: string) {
  return t.deals.filter((d) => !d.until || d.until >= today);
}
