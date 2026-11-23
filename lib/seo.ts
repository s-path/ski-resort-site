import { formatShortDate, type Resort } from "./resorts";
import { absoluteUrl, DATA_UPDATED_AT, SITE_NAME, todayInTokyo } from "./site";
import { activeDeals, adultPriceLabel, type TicketInfo } from "./tickets";

/** 詳細ページの title（「| SNOWLINE 関東」はレイアウトのテンプレートで付く） */
export function resortTitle(r: Resort) {
  return `${r.name} 2026-27 オープン日・リフト券料金・早割`;
}

/** 今季の営業状況を1文で */
export function openingSentence(r: Resort) {
  if (r.status === "open" && r.openingDate)
    return `${formatShortDate(r.openingDate)}から営業中です。`;
  if (r.status === "planned" && r.openingDate)
    return `今季は${formatShortDate(r.openingDate)}にオープン予定です。`;
  if (r.status === "planned" && r.openingLabel)
    return `今季は${r.openingLabel}にオープン予定です。`;
  return "今季のオープン日は確認中です。";
}

/** 詳細ページの description。データから自動で組み立てる（120字前後） */
export function resortDescription(r: Resort, t?: TicketInfo, today?: string) {
  const parts = [
    `${r.prefecture}・${r.areaLabel}の${r.name}。${openingSentence(r)}`,
  ];
  if (t) {
    const season = t.season === "previous" ? "（昨季）" : "";
    parts.push(`大人1日券は${adultPriceLabel(t)}${season}。`);
    const deal = today ? activeDeals(t, today)[0] : t.deals[0];
    if (deal) parts.push(`${deal.title}など、お得な買い方も紹介。`);
  }
  parts.push("アクセスやゲレンデ情報もまとめています。");
  return parts.join("");
}

const yen = (n: number) => String(n);

/** 詳細ページの構造化データ（SkiResort とパンくず） */
export function resortJsonLd(r: Resort, t?: TicketInfo) {
  const url = absoluteUrl(`/resorts/${r.id}`);
  const skiResort: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SkiResort",
    "@id": `${url}#resort`,
    name: r.name,
    url,
    description: resortDescription(r, t, todayInTokyo()),
    address: {
      "@type": "PostalAddress",
      addressRegion: `${r.prefecture}県`,
      addressCountry: "JP",
    },
    isAccessibleForFree: false,
    amenityFeature: r.tags.map((tag) => ({
      "@type": "LocationFeatureSpecification",
      name: tag,
      value: true,
    })),
  };
  if (r.url) skiResort.sameAs = [r.url];
  if (t) {
    skiResort.priceRange = `¥${t.adultMin.toLocaleString("ja-JP")}〜¥${t.adultMax.toLocaleString("ja-JP")}`;
    skiResort.makesOffer = {
      "@type": "Offer",
      name: "大人リフト1日券",
      priceCurrency: "JPY",
      price: yen(t.adultMin),
      ...(t.buy ? { url: t.buy.url } : {}),
    };
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "トップ",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "スキー場を探す",
        item: absoluteUrl("/resorts"),
      },
      { "@type": "ListItem", position: 3, name: r.name, item: url },
    ],
  };

  const page = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url,
    name: `${resortTitle(r)} | ${SITE_NAME}`,
    dateModified: DATA_UPDATED_AT,
    inLanguage: "ja",
    about: { "@id": `${url}#resort` },
  };

  return [skiResort, breadcrumb, page];
}

/** JSON-LD を script タグに入れる文字列。</script> で閉じられないようにエスケープ */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
