import Link from "next/link";
import type { ReactNode } from "react";
import { PREF_PAGES } from "@/lib/guides";
import { formatShortDate, type Resort } from "@/lib/resorts";
import { jsonLdString } from "@/lib/seo";
import { absoluteUrl, DATA_UPDATED_AT, formatJaDate } from "@/lib/site";
import { adultPriceLabel, getTickets } from "@/lib/tickets";
import { PrefChip, StatusBadge } from "./Badges";

/** 特集ページ（一覧ページ）の一覧。フッターや関連リンクで使う */
export const GUIDE_LINKS = [
  { href: "/opening", label: "オープン日一覧（2026-27）" },
  { href: "/early-bird", label: "早割リフト券まとめ" },
  { href: "/kids-free", label: "小学生のリフト券が無料のスキー場" },
  ...PREF_PAGES.map((p) => ({
    href: `/area/${p.slug}`,
    label: `${p.label}のスキー場`,
  })),
];

type Props = {
  path: string;
  title: string;
  lead: string;
  /** JSON-LD の ItemList に入れるスキー場 */
  items: Resort[];
  children: ReactNode;
};

/** 特集ページの共通レイアウト：パンくず・見出し・リード・更新日・関連リンク・構造化データ */
export function GuidePage({ path, title, lead, items, children }: Props) {
  const jsonLd = [
    {
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
          name: title,
          item: absoluteUrl(path),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: title,
      url: absoluteUrl(path),
      numberOfItems: items.length,
      itemListElement: items.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: r.name,
        url: absoluteUrl(`/resorts/${r.id}`),
      })),
    },
  ];

  return (
    <div className="mx-auto flex max-w-[960px] flex-col gap-8 px-4 pb-16 pt-6 sm:px-6 sm:pb-[88px] sm:pt-10">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: 自前のデータをエスケープして埋め込む構造化データ
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />
      <nav aria-label="パンくずリスト" className="text-[13px] text-sub">
        <Link href="/" className="tlink text-sub">
          トップ
        </Link>{" "}
        / <span aria-current="page">{title}</span>
      </nav>
      <header className="reveal flex flex-col gap-3">
        <h1 className="text-[26px] font-bold leading-tight text-navy-950 sm:text-[34px]">
          {title}
        </h1>
        <p className="text-[15px] leading-[1.8] text-[#3A4456]">{lead}</p>
        <p className="text-xs text-sub">
          <time dateTime={DATA_UPDATED_AT}>
            {formatJaDate(DATA_UPDATED_AT)}
          </time>
          更新。オープン日・料金は変わることがあるので、出かける前に各スキー場の公式サイトで確認してください。
        </p>
      </header>

      {children}

      <nav
        aria-label="ほかの特集"
        className="flex flex-col gap-3 border-t border-line pt-8"
      >
        <h2 className="text-base font-bold text-navy-950">ほかの特集</h2>
        <ul className="flex flex-wrap gap-2">
          {GUIDE_LINKS.filter((g) => g.href !== path).map((g) => (
            <li key={g.href}>
              <Link
                href={g.href}
                className="chip inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm font-semibold text-[#3A4456]"
              >
                {g.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/resorts"
              className="chip inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm font-semibold text-[#3A4456]"
            >
              条件で絞り込んで探す
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

/** オープン日の短い表記 */
export function openingText(r: Resort) {
  if (r.openingDate)
    return r.status === "open"
      ? `${formatShortDate(r.openingDate)}から営業中`
      : `${formatShortDate(r.openingDate)} オープン予定`;
  if (r.openingLabel) return `${r.openingLabel} オープン予定`;
  return "確認中";
}

/** スキー場の一覧（名前・県・オープン日・大人1日券、と任意の補足） */
export function ResortList({
  items,
  note,
}: {
  items: Resort[];
  note?: (r: Resort) => ReactNode;
}) {
  return (
    <ol className="divide-y divide-line overflow-hidden rounded-xl border border-line">
      {items.map((r) => {
        const t = getTickets(r.id);
        return (
          <li
            key={r.id}
            className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-5"
          >
            <div className="flex min-w-0 flex-col gap-1.5">
              <Link
                href={`/resorts/${r.id}`}
                className="tlink w-fit text-base font-bold text-navy-950"
              >
                {r.name}
              </Link>
              <span className="flex flex-wrap items-center gap-2 text-xs text-sub">
                <PrefChip prefecture={r.prefecture} />
                {r.areaLabel}
                <StatusBadge resort={r} />
              </span>
              {note && (
                <span className="text-[13px] text-[#3A4456]">{note(r)}</span>
              )}
            </div>
            <dl className="flex shrink-0 gap-6 text-sm sm:text-right">
              <div>
                <dt className="text-xs text-sub">オープン</dt>
                <dd className="font-semibold tabular-nums">{openingText(r)}</dd>
              </div>
              <div>
                <dt className="text-xs text-sub">大人1日券</dt>
                <dd className="font-semibold tabular-nums">
                  {t ? adultPriceLabel(t) : "確認中"}
                </dd>
              </div>
            </dl>
          </li>
        );
      })}
    </ol>
  );
}
