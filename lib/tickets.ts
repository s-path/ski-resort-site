import { resorts } from "./resorts";
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

/** 志賀高原の全山共通リフト券（18スキー場共通） */
const SHIGA_TICKET: TicketInfo = {
  season: "current",
  adultMin: 7500,
  adultMax: 9500,
  ageNote: "全18スキー場共通。こども＝小学生、中高生6,500円",
  rows: [
    { label: "共通1日券（窓口）", adult: "9,500円", child: "4,000円" },
    { label: "共通1日券（オンライン）", adult: "8,500円", child: "3,500円" },
    { label: "初すべり・春スキー", adult: "7,500円", child: "3,000円" },
  ],
  deals: [
    {
      title: "オンライン購入",
      detail: "窓口より1日1,000円安い",
      url: "https://shigakogen-ski.or.jp/winter/ticket/online.html",
    },
  ],
  buy: {
    label: "公式オンライン",
    url: "https://shigakogen-ski.or.jp/winter/ticket/online.html",
  },
  source: {
    label: "公式サイト",
    url: "https://shigakogen-ski.or.jp/ticket/",
  },
};

function shigaTickets(): Record<string, TicketInfo> {
  return Object.fromEntries(
    resorts
      .filter((r) => r.group === "志賀高原")
      .map((r) => [r.id, SHIGA_TICKET]),
  );
}

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
  kagura: {
    season: "current",
    adultMin: 8500,
    adultMax: 8500,
    ageNote: "大人＝中学生以上、小学生以下は無料",
    rows: [
      { label: "かぐら1日券", adult: "8,500円", child: "無料" },
      {
        label: "Mt.Naeba共通1日券（苗場・ドラゴンドラ込み）",
        adult: "11,800円",
        child: "無料",
      },
    ],
    notes: ["初滑り期間（〜12/18）は正規1日券に場内利用券1,000円分付き"],
    deals: [],
    source: {
      label: "にいがた観光ナビ",
      url: "https://niigata-kankou.or.jp/ski/10682",
    },
  },
  naeba: {
    season: "unverified",
    adultMin: 9800,
    adultMax: 11800,
    ageNote: "大人＝中学生以上、小学生以下は無料",
    rows: [
      { label: "苗場1日券", adult: "9,800円", child: "無料" },
      {
        label: "Mt.Naeba共通1日券（かぐら・ドラゴンドラ込み）",
        adult: "11,800円",
        child: "無料",
      },
    ],
    notes: ["苗場1日券は早割セット券の定価から算出した値です"],
    deals: [],
    source: {
      label: "スノーナビ",
      url: "https://lift-ticket.jp/shopdetail/000000000217",
    },
  },
  kandatsu: {
    season: "current",
    adultMin: 5800,
    adultMax: 6800,
    ageNote: "こども＝小学生、未就学児は無料",
    rows: [
      { label: "平日・日祝・正月", adult: "5,800円", child: "3,500円" },
      { label: "土曜・特定日", adult: "6,800円", child: "4,000円" },
      {
        label: "40周年料金（1/12〜15・3/23〜26）",
        adult: "4,400円",
        child: "3,000円",
      },
    ],
    notes: ["金・土・祝前日は翌2時までナイター（12/18〜3/27）"],
    deals: [
      {
        title: "早割1日券",
        detail: "大人4,500円・全日OK（公式サイトのみ）",
        until: "2026-12-10",
        url: "https://www.kandatsu.com/earlybird-ticket/",
      },
      {
        title: "スキーこどもの日",
        detail: "12/20・1/17・2/21・3/21は小学生のリフト券が無料",
      },
    ],
    buy: {
      label: "公式Web購入",
      url: "https://www.kandatsu.com/earlybird-ticket/",
    },
    source: {
      label: "スノーナビ",
      url: "https://www.snownavi.com/topics/news_26111903",
    },
  },
  ishiuchi: {
    season: "current",
    adultMin: 8500,
    adultMax: 9400,
    ageNote: "小・中学生は別料金、シニア＝60歳以上",
    rows: [
      {
        label: "フレックス1日券（8.5時間）",
        adult: "8,500円",
        child: "4,200円",
      },
      {
        label: "オールデイ1日券（8:30〜20:00）",
        adult: "9,400円",
        child: "4,700円",
      },
    ],
    deals: [
      {
        title: "早割リフト1日券",
        detail: "大人・シニア5,800円・全日OK（ICカードで直接リフトへ）",
        until: "2026-11-30",
        url: "https://www.lift-ticket.jp/view/item/000000000222",
      },
    ],
    source: {
      label: "にいがた観光ナビ",
      url: "https://niigata-kankou.or.jp/spot/detail_10693.html",
    },
  },
  gala: {
    season: "current",
    adultMin: 8000,
    adultMax: 8000,
    ageNote: "未就学児は大人1人につき2人まで無料",
    rows: [
      {
        label: "ゴンドラ＆リフト1日券",
        adult: "8,000円（Web 7,500円）",
        child: "4,000円",
      },
      { label: "4時間券", adult: "7,500円（Web 7,000円）", child: "3,500円" },
    ],
    notes: ["12/12〜18は観光営業のみで滑走不可", "今季は南エリアが休止"],
    deals: [
      {
        title: "早割リフト1日券",
        detail: "4,800円・12/19〜3/31の全日OK",
        until: "2026-11-30",
        url: "https://www.lift-ticket.jp/view/item/000000000307",
      },
    ],
    source: {
      label: "タビリス",
      url: "https://tabiris.com/archives/gala-ticket2027/",
    },
  },
  maiko: {
    season: "current",
    adultMin: 7300,
    adultMax: 7300,
    ageNote: "中高生6,300円、未就学児は保護者1人につき2人まで無料",
    rows: [
      { label: "1dayパス", adult: "7,300円", child: "3,600円" },
      { label: "5時間券", adult: "6,800円", child: "3,400円" },
    ],
    deals: [
      {
        title: "早割1dayパス（セブンチケット）",
        detail: "大人4,600円・小学生2,800円",
        until: "2026-12-18",
      },
    ],
    source: {
      label: "にいがた観光ナビ",
      url: "https://niigata-kankou.or.jp/ski/10694",
    },
  },
  goryu: {
    season: "current",
    adultMin: 10000,
    adultMax: 10000,
    ageNote: "ICカード保証金500円込み（返却で返金）",
    rows: [
      { label: "1日券（窓口）", adult: "10,000円" },
      { label: "1日券（オンライン新規）", adult: "9,500円" },
      {
        label: "1日券（手持ちICにオンラインチャージ）",
        adult: "8,200円",
        child: "3,600円",
      },
    ],
    deals: [
      {
        title: "早割リフト1日券",
        detail: "大人7,000円・小学生3,300円（別途保証金500円）",
        until: "2026-12-15",
      },
    ],
    buy: {
      label: "公式オンライン",
      url: "https://www.hakuba47.co.jp/winter/ticket/lift_ticket/entry-487.html",
    },
    source: {
      label: "公式サイト",
      url: "https://www.hakuba47.co.jp/winter/ticket/lift_ticket/entry-487.html",
    },
  },
  tsugaike: {
    season: "current",
    adultMin: 9800,
    adultMax: 9800,
    rows: [{ label: "1日券", adult: "9,800円" }],
    notes: ["初滑り（〜12/11）と春（3/23〜）は割引1日券あり"],
    deals: [],
    source: {
      label: "DMK SNOWBOARD",
      url: "https://dmksnowboard.com/hakuba-lift-ticket-2026-2027/",
    },
  },
  ...shigaTickets(),
  norn: {
    season: "current",
    adultMin: 6300,
    adultMax: 6300,
    rows: [{ label: "1日券", adult: "6,300円", child: "4,000円" }],
    notes: ["食事券1,500円付きのパックあり（大人7,800円）"],
    deals: [],
    source: {
      label: "タイムズクラブ（2026/10更新）",
      url: "https://www.timesclub.jp/benefit/shop/sports/detail.jsp?shop=S000002498",
    },
  },
  "minakami-kogen": {
    season: "previous",
    adultMin: 5500,
    adultMax: 5500,
    ageNote: "未就学児は無料",
    rows: [{ label: "1日券", adult: "5,500円", child: "3,600円" }],
    notes: ["オープン直後と最終週は1日券2,500円（昨季）"],
    deals: [],
    source: {
      label: "ウォーカープラス",
      url: "https://www.walkerplus.com/spot/ar0310s34661/price.html",
    },
  },
  houdaigi: {
    season: "previous",
    adultMin: 6900,
    adultMax: 6900,
    rows: [{ label: "1日券", adult: "6,900円", child: "4,200円" }],
    deals: [],
    source: {
      label: "ローチケ",
      url: "https://l-tike.com/leisure/mevent/?mid=771379",
    },
  },
  iwappara: {
    season: "current",
    adultMin: 5500,
    adultMax: 5500,
    rows: [{ label: "1日入場券", adult: "5,500円" }],
    notes: ["前シーズンから据え置き"],
    deals: [],
    source: {
      label: "旅行総合研究所タビリス",
      url: "https://tabiris.com/?p=66745",
    },
  },
  "joetsu-kokusai": {
    season: "current",
    adultMin: 5500,
    adultMax: 5500,
    rows: [{ label: "1日入場券", adult: "5,500円" }],
    notes: ["前シーズンから据え置き。オープン週（12/12〜18）は1日券2,000円"],
    deals: [],
    source: {
      label: "旅行総合研究所タビリス",
      url: "https://tabiris.com/?p=66745",
    },
  },
  naspa: {
    season: "current",
    adultMin: 7000,
    adultMax: 7000,
    rows: [{ label: "1日券", adult: "7,000円" }],
    notes: ["前シーズンから据え置き"],
    deals: [],
    source: {
      label: "旅行総合研究所タビリス",
      url: "https://tabiris.com/?p=66745",
    },
  },
  iwatake: {
    season: "previous",
    adultMin: 7000,
    adultMax: 7000,
    rows: [{ label: "岩岳1日券", adult: "7,000円", child: "4,300円" }],
    notes: ["シニア（60歳以上）6,600円", "ICカード保証金1,000円（返却で返金）"],
    deals: [],
    source: {
      label: "ウォーカープラス",
      url: "https://www.walkerplus.com/spot/ar0420s34761/price.html",
    },
  },
  madarao: {
    season: "current",
    adultMin: 9000,
    adultMax: 9000,
    ageNote: "こども＝6〜12歳、5歳以下は1,000円",
    rows: [
      {
        label: "マウンテンパス1日券（タングラム共通）",
        adult: "9,000円",
        child: "6,000円",
      },
    ],
    notes: ["シニア（55歳以上）8,500円"],
    deals: [],
    source: {
      label: "ハピスノ（2026-27）",
      url: "https://hapisnow.jp/prefectures/nagano/?theme-first=",
    },
  },
  tangram: {
    season: "current",
    adultMin: 9000,
    adultMax: 9000,
    rows: [
      {
        label: "マウンテンパス1日券（斑尾共通）",
        adult: "9,000円",
        child: "6,000円",
      },
    ],
    deals: [],
    source: {
      label: "ハピスノ（2026-27）",
      url: "https://hapisnow.jp/prefectures/nagano/?theme-first=",
    },
  },
  romance: {
    season: "current",
    adultMin: 6200,
    adultMax: 6200,
    ageNote: "未就学児は無料",
    rows: [{ label: "1日券（土日祝）", adult: "6,200円", child: "3,000円" }],
    notes: ["シニア（60歳以上）5,700円"],
    deals: [],
    source: {
      label: "ハピスノ（2026-27）",
      url: "https://hapisnow.jp/prefectures/nagano/?theme-first=",
    },
  },
  yunomaru: {
    season: "current",
    adultMin: 5600,
    adultMax: 5600,
    rows: [{ label: "1日券", adult: "5,600円", child: "3,000円" }],
    notes: ["小学生以下リフト無料の「スキー子供の日」あり"],
    deals: [],
    source: {
      label: "日本旅行",
      url: "https://www.nta.co.jp/kokunai/special/eventinfo/10653641.htm",
    },
  },
  suginohara: {
    season: "previous",
    adultMin: 8000,
    adultMax: 8000,
    ageNote: "小学生まではリフト券無料",
    rows: [
      {
        label: "リフト・ゴンドラ1日券",
        adult: "8,000円",
        child: "無料（小学生まで）",
      },
    ],
    notes: ["シニア（55歳以上）・中高生は7,400円"],
    deals: [],
    source: {
      label: "公式サイト",
      url: "https://www.princehotels.co.jp/ski/myoko/winter/lift/",
    },
  },
  "akakura-kanko": {
    season: "previous",
    adultMin: 7000,
    adultMax: 7000,
    rows: [{ label: "1日券", adult: "7,000円", child: "5,200円" }],
    notes: ["中学生・シニアは6,000円"],
    deals: [],
    source: {
      label: "にいがた観光ナビ",
      url: "https://niigata-kankou.or.jp/experience/10677",
    },
  },
  "nikko-yumoto": {
    season: "previous",
    adultMin: 4000,
    adultMax: 4000,
    rows: [{ label: "1日券", adult: "4,000円", child: "2,900円" }],
    deals: [],
    source: {
      label: "ウェザーニュース",
      url: "https://weathernews.jp/ski/spot/34102/",
    },
  },
  ryuo: {
    season: "current",
    adultMin: 6000,
    adultMax: 6200,
    ageNote: "大人＝中学生以上、こども＝4歳〜小学生、4歳未満は無料",
    rows: [
      { label: "1日券（平日）", adult: "6,000円", child: "3,000円" },
      { label: "1日券（土日祝）", adult: "6,200円", child: "3,200円" },
    ],
    notes: ["初滑り・春スキー期間は別料金", "ICカード保証金500円"],
    deals: [
      {
        title: "早割1日券",
        detail: "大人4,500円（3枚綴り12,900円）",
        until: "2026-12-18",
        url: "https://surfsnow.jp/guide/htm/r0112tk.htm/",
      },
    ],
    source: {
      label: "プレスリリース",
      url: "https://prtimes.jp/main/html/rd/p/000000233.000031800.html",
    },
  },
  nozawa: {
    season: "current",
    adultMin: 5600,
    adultMax: 7800,
    ageNote: "こども＝中学生以下、未就学児は大人1人につき1人無料",
    rows: [
      { label: "初滑り（〜12/18）", adult: "5,600円", child: "3,400円" },
      { label: "通常（12/19〜3/28）", adult: "7,800円", child: "4,700円" },
      { label: "春山（3/29〜）", adult: "6,100円", child: "3,600円" },
    ],
    notes: ["ICカード保証金500円"],
    deals: [
      {
        title: "春休みファミリーパック",
        detail: "大人1枚＋小中学生1枚で10,000円（3/1〜28）",
        url: "https://nozawaski.com/winter/lift_price/specialseason/",
      },
    ],
    source: {
      label: "公式サイト",
      url: "https://nozawaski.com/winter/lift_price/",
    },
  },
  "fujimi-panorama": {
    season: "current",
    adultMin: 6000,
    adultMax: 6000,
    ageNote: "中高生4,000円（今季新設）、シニア5,700円",
    rows: [
      { label: "ゴンドラ・リフト1日券", adult: "6,000円", child: "2,000円" },
    ],
    deals: [],
    source: {
      label: "公式サイト",
      url: "https://www.fujimipanorama.com/snow/2026-2027%E3%82%B7%E3%83%BC%E3%82%BA%E3%83%B3%E3%80%81%E3%83%AA%E3%83%95%E3%83%88%E5%88%B8%E4%BE%A1%E6%A0%BC%E3%81%AE%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B/",
    },
  },
  kurumayama: {
    season: "current",
    adultMin: 5500,
    adultMax: 5500,
    ageNote: "大人＝中学生以上、シニア（60歳以上）4,500円",
    rows: [
      { label: "1日券", adult: "5,500円", child: "3,500円" },
      { label: "半日券", adult: "4,500円", child: "2,500円" },
    ],
    notes: ["19〜22歳は「雪マジ」で1日券無料"],
    deals: [
      {
        title: "公式Web早割",
        detail: "1日券 大人4,600円・小学生2,900円",
        until: "2026-12-11",
        url: "https://winter.kurumayama-skypark.com/ticket",
      },
    ],
    buy: {
      label: "公式Web購入",
      url: "https://winter.kurumayama-skypark.com/ticket",
    },
    source: {
      label: "公式サイト",
      url: "https://winter.kurumayama-skypark.com/ticket",
    },
  },
  "chateraise-nobeyama": {
    season: "current",
    adultMin: 5300,
    adultMax: 5300,
    ageNote: "大人＝高校生〜59歳、こども＝小中学生、シニア（60歳以上）4,300円",
    rows: [{ label: "1日券", adult: "5,300円", child: "3,800円" }],
    deals: [
      {
        title: "早割リフト1日券（野辺山・小海共通）",
        detail: "3,500円・どちらのスキー場でも使える（webket）",
        until: "2026-12-14",
        url: "https://webket.jp/pc/ticket/index?fc=80110&ac=9000",
      },
    ],
    buy: {
      label: "webket",
      url: "https://webket.jp/pc/ticket/index?fc=80110&ac=9000",
    },
    source: {
      label: "公式サイト",
      url: "https://nobeyama.chateraiseski.jp/news/2851.html",
    },
  },
  "chateraise-koumi": {
    season: "current",
    adultMin: 3300,
    adultMax: 5300,
    ageNote: "大人＝高校生〜59歳、こども＝小中学生、シニア（60歳以上）4,300円",
    rows: [
      { label: "初滑り（〜12/25）", adult: "3,300円", child: "2,300円" },
      { label: "1日券", adult: "5,300円（Web 5,200円）", child: "3,800円" },
    ],
    notes: [
      "平日は住んでいる都県ごとの曜日に500円引き（東京・千葉は水曜、神奈川・埼玉は火曜）",
    ],
    deals: [
      {
        title: "早割リフト1日券（野辺山・小海共通）",
        detail: "3,500円・どちらのスキー場でも使える（webket）",
        until: "2026-12-14",
        url: "https://webket.jp/pc/ticket/index?fc=80110&ac=9000",
      },
    ],
    buy: {
      label: "webket",
      url: "https://webket.jp/pc/ticket/index?fc=80110&ac=9000",
    },
    source: {
      label: "公式サイト",
      url: "https://koumi.chateraiseski.jp/fee/lift/",
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
