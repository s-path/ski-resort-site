import type { Metadata } from "next";
import Link from "next/link";
import { AreaTabs } from "@/components/AreaTabs";
import { OpenStatus } from "@/components/OpenStatus";
import { RotatingPlace } from "@/components/RotatingPlace";
import { Snowfall } from "@/components/Snowfall";
import { SNOW_AREAS } from "@/lib/areas";
import { AREA_GROUPS, resorts } from "@/lib/resorts";
import { jsonLdString } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "ja",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/resorts?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const QUICK = [
  { key: "open", label: "営業中" },
  { key: "night", label: "ナイターあり" },
  { key: "spring", label: "春スキー" },
  { key: "shinkansen", label: "新幹線で行ける" },
  { key: "kids", label: "キッズパーク" },
];

const field =
  "h-11 rounded-lg border border-field bg-white px-3 text-[15px] text-ink";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: 自前の定数をエスケープして埋め込む構造化データ
        dangerouslySetInnerHTML={{ __html: jsonLdString(WEBSITE_JSON_LD) }}
      />
      <section className="hero-bg relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(246,247,249,0.94) 0%, rgba(246,247,249,0.82) 44%, rgba(246,247,249,0.1) 62%, rgba(246,247,249,0) 100%)",
          }}
        />
        <Snowfall />

        <div className="reveal relative mx-auto flex max-w-[1200px] flex-col gap-6 px-4 pb-12 pt-10 sm:gap-8 sm:px-6 sm:pb-[72px] sm:pt-[88px]">
          <div className="relative flex flex-wrap items-center gap-x-14 gap-y-2 sm:gap-y-6">
            <div className="flex max-w-[760px] flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] font-semibold tracking-[0.08em] text-navy-700">
                  2026–27 SEASON
                  <span className="mx-2 text-muted">/</span>
                  <RotatingPlace />
                </p>
                <span aria-hidden="true" className="-my-3 shrink-0 sm:hidden">
                  <span
                    className="write -rotate-6 whitespace-nowrap font-script text-[38px] leading-none text-navy-700"
                    style={{
                      padding: "0.1em 0.2em 0.15em 0.1em",
                      animationDuration: "3s",
                    }}
                  >
                    snowline
                  </span>
                </span>
              </div>
              <h1
                className="font-mincho font-bold leading-[1.4] tracking-[0.04em] text-navy-900"
                style={{ fontSize: "clamp(24px, 4vw, 52px)" }}
              >
                <span className="block whitespace-nowrap">
                  関東から行けるスキー場の、
                </span>
                <span className="block whitespace-nowrap">いまがわかる。</span>
              </h1>
              <p className="text-[15px] leading-[1.8] text-sub sm:text-[17px]">
                群馬・栃木・長野・山梨から越後湯沢まで。営業状況、積雪、アクセス時間をひとつの画面で比べられます。
              </p>
            </div>
            <span
              aria-hidden="true"
              className="snowmark hidden font-script leading-none text-white sm:flex sm:flex-col"
              style={{
                fontSize: "clamp(56px, 14vw, 210px)",
                textShadow:
                  "0 2px 18px rgba(10,31,68,0.35), 0 1px 2px rgba(10,31,68,0.25)",
                padding: "0.1em 0.25em",
              }}
            >
              <span
                className="write block whitespace-nowrap"
                style={{ padding: "0.08em 0.2em 0.12em 0.1em" }}
              >
                snow
              </span>
              <span
                className="snowmark-line write block whitespace-nowrap"
                style={{
                  padding: "0.08em 0.2em 0.16em 0.1em",
                  animationDelay: "3.6s",
                }}
              >
                line
              </span>
            </span>
          </div>

          {/* 検索フォームは初期は閉じておき、ボタンで開く（JSなしでも動く details を使う） */}
          <details className="search-toggle group">
            <summary className="btn inline-flex h-11 w-fit cursor-pointer list-none items-center gap-2 rounded-lg border border-field bg-white px-[18px] text-sm font-semibold text-navy-950 shadow-[0_1px_2px_rgba(10,31,68,0.04)] [&::-webkit-details-marker]:hidden">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <span className="group-open:hidden">条件でスキー場を検索</span>
              <span className="hidden group-open:inline">検索を閉じる</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                aria-hidden="true"
                className="transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
              >
                <path
                  d="M2 4l4 4 4-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </summary>
            <form
              action="/resorts"
              method="get"
              className="search-panel mt-3 grid grid-cols-1 items-end gap-4 rounded-xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(10,31,68,0.04)] sm:grid-cols-2 lg:grid-cols-4"
            >
              <label className="flex flex-col gap-1.5 text-xs font-semibold text-sub">
                キーワード
                <input
                  type="text"
                  name="q"
                  placeholder="スキー場名・地名"
                  className={field}
                />
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-semibold text-sub">
                エリア
                <select name="area" className={field} defaultValue="">
                  <option value="">すべてのエリア</option>
                  {AREA_GROUPS.map((g) => (
                    <optgroup key={g.label} label={g.label}>
                      {g.areas.map((a) => (
                        <option key={a.key} value={a.key}>
                          {a.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-semibold text-sub">
                出発地からの時間
                <select name="time" className={field} defaultValue="">
                  <option value="">練馬ICから・指定なし</option>
                  <option value="120">練馬ICから2時間以内</option>
                  <option value="shinkansen">東京駅から新幹線＋バス</option>
                </select>
              </label>
              <button
                type="submit"
                className="btn h-11 cursor-pointer rounded-lg bg-navy-700 text-[15px] font-semibold text-white"
              >
                検索する
              </button>
            </form>
          </details>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[13px] text-sub">よく使う条件</span>
            {QUICK.map((q) => (
              <Link
                key={q.key}
                href={`/resorts?f=${q.key}`}
                className="chip rounded-full border border-field bg-white px-3.5 py-2 text-[13px] text-ink"
              >
                {q.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="open"
        className="reveal mx-auto flex max-w-[1200px] scroll-mt-4 flex-col gap-6 px-4 sm:px-6 pb-6 pt-12 sm:pt-[72px]"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold tracking-[0.08em] text-navy-700">
              OPEN STATUS
            </p>
            <h2 className="text-2xl font-bold text-navy-950 sm:text-[28px]">
              オープン状況
            </h2>
          </div>
          <p className="text-[13px] text-sub">
            オープン日は公式発表をもとに掲載。「確認中」は今季の発表を確認できていないスキー場です
          </p>
        </div>
        <OpenStatus resorts={resorts} />
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link
            href="/opening"
            className="tlink text-sm font-semibold text-navy-700"
          >
            オープン日一覧を見る →
          </Link>
          <Link
            href="/early-bird"
            className="tlink text-sm font-semibold text-navy-700"
          >
            早割リフト券まとめ →
          </Link>
          <Link
            href="/kids-free"
            className="tlink text-sm font-semibold text-navy-700"
          >
            小学生リフト無料のスキー場 →
          </Link>
        </div>
      </section>

      <section
        id="area"
        className="reveal mx-auto flex max-w-[1200px] scroll-mt-4 flex-col gap-6 px-4 sm:px-6 pb-6 pt-14"
        style={{ animationDelay: "0.3s" }}
      >
        <AreaTabs />
      </section>

      <section
        id="snow"
        className="reveal mx-auto flex max-w-[1200px] scroll-mt-4 flex-col gap-6 px-4 sm:px-6 pb-[88px] pt-14"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold tracking-[0.08em] text-navy-700">
              SNOW
            </p>
            <h2 className="text-2xl font-bold text-navy-950 sm:text-[28px]">
              エリアの積雪と降雪予報
            </h2>
          </div>
          <p className="text-[13px] text-sub">
            積雪は近隣のアメダス観測点の値を表示します（準備中）
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {SNOW_AREAS.map((name) => (
            <div
              key={name}
              className="lift flex flex-col gap-4 rounded-xl border border-line p-6"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-[15px] font-bold">{name}</span>
                <span className="text-xs text-sub">観測点 準備中</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[40px] font-bold tabular-nums text-navy-950">
                  —
                </span>
                <span className="text-sm text-sub">cm</span>
              </div>
              <div className="flex justify-between border-t border-line pt-3 text-[13px] text-sub">
                <span>24時間降雪 — cm</span>
                <span>今後3日 — cm</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
