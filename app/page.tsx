import type { Metadata } from "next";
import Link from "next/link";
import { AreaTabs } from "@/components/AreaTabs";
import { Icon, type IconName, IconTile } from "@/components/Icons";
import { OpenStatus } from "@/components/OpenStatus";
import { RotatingPlace } from "@/components/RotatingPlace";
import { Snowfall } from "@/components/Snowfall";
import { SnowAreas } from "@/components/SnowReport";
import { getSnowReport } from "@/lib/amedas";
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

const QUICK: { key: string; label: string; icon: IconName }[] = [
  { key: "open", label: "営業中", icon: "open" },
  { key: "night", label: "ナイターあり", icon: "moon" },
  { key: "spring", label: "春スキー", icon: "sun" },
  { key: "shinkansen", label: "新幹線で行ける", icon: "train" },
  { key: "kids", label: "キッズパーク", icon: "kids" },
];

const field =
  "h-11 rounded-lg border border-field bg-white px-3 text-[15px] text-ink";

// 積雪（アメダス）を1時間ごとに取り直す
export const revalidate = 3600;

export default async function Home() {
  const snow = await getSnowReport();
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

          {/* 検索はスキー場一覧ページで行う（絞り込みパネルを開いた状態で表示） */}
          <Link
            href="/resorts?filter=open"
            className="btn inline-flex h-11 w-fit items-center gap-2 rounded-lg border border-field bg-white px-[18px] text-sm font-semibold text-navy-950 shadow-[0_1px_2px_rgba(10,31,68,0.04)]"
          >
            <Icon name="search" size={16} />
            条件でスキー場を検索
            <span aria-hidden="true" className="text-sub">
              →
            </span>
          </Link>

          <div className="flex flex-col gap-2">
            <span className="text-[13px] text-sub">よく使う条件</span>
            {/* 1行に並べ、はみ出す分は横スクロール（スクロールバーは出さない） */}
            <div className="no-scrollbar -mx-4 flex max-w-[100vw] gap-2 overflow-x-auto px-4 sm:-mx-6 sm:px-6">
              {QUICK.map((q) => (
                <Link
                  key={q.key}
                  href={`/resorts?f=${q.key}`}
                  className="chip inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-field bg-white px-3.5 py-2 text-[13px] text-ink"
                >
                  <Icon name={q.icon} size={14} className="text-navy-700" />
                  {q.label}
                </Link>
              ))}
            </div>
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
            <h2 className="flex items-center gap-2.5 text-2xl font-bold text-navy-950 sm:text-[28px]">
              <IconTile name="calendar" />
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
        <AreaTabs
          resorts={resorts.map(({ id, name, areaKey, group, prefecture }) => ({
            id,
            name,
            areaKey,
            group,
            prefecture,
          }))}
        />
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
            <h2 className="flex items-center gap-2.5 text-2xl font-bold text-navy-950 sm:text-[28px]">
              <IconTile name="snow" />
              エリアの積雪
            </h2>
          </div>
        </div>
        <SnowAreas report={snow} />
      </section>
    </>
  );
}
