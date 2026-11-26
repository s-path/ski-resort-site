import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalIcon, PrefChip, StatusBadge } from "@/components/Badges";
import { FavoriteButton } from "@/components/FavoriteButton";
import { IconTile } from "@/components/Icons";
import { NearbyHotels } from "@/components/NearbyHotels";
import { ResortMap } from "@/components/ResortMap";
import { SnowNearResort } from "@/components/SnowReport";
import { TicketSection } from "@/components/TicketSection";
import { getSnowReport } from "@/lib/amedas";
import { getResort, NO_VALUE, type Resort, resorts } from "@/lib/resorts";
import {
  jsonLdString,
  openingSentence,
  resortDescription,
  resortJsonLd,
  resortTitle,
} from "@/lib/seo";
import { DATA_UPDATED_AT, formatJaDate, todayInTokyo } from "@/lib/site";
import { adultPriceLabel, getTickets } from "@/lib/tickets";

type Props = { params: Promise<{ id: string }> };

// お得情報の締め切りを過ぎたら消えるよう、1日1回作り直す
// 積雪（アメダス）を1時間ごとに取り直す
export const revalidate = 3600;

export function generateStaticParams() {
  return resorts.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const r = getResort(id);
  if (!r) return {};
  const title = resortTitle(r);
  const description = resortDescription(r, getTickets(r.id), todayInTokyo());
  const path = `/resorts/${r.id}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "article", url: path, title, description },
    twitter: { title, description },
  };
}

// 積雪・天気の実データを取り込んだら true にして「今日のコンディション」と予報を出す
const LIVE_DATA = false;
// 予報グラフはデータ取得前のレイアウト確認用（高さは仮）
const FORECAST_BARS = [24, 40, 64, 52, 30, 18, 36];
const DAYS = ["今日", "明日", "3日", "4日", "5日", "6日", "7日"];

/** 値が「—」だけの項目は出さない */
const hasValue = (v: string) => !v.startsWith(NO_VALUE);

const card = "rounded-xl border border-line";

export default async function ResortPage({ params }: Props) {
  const { id } = await params;
  const r = getResort(id);
  if (!r) notFound();
  const d = r.detail;
  const specs = (d?.specs ?? r.stats.filter((s) => s.label !== "積雪")).filter(
    (s) => hasValue(s.value),
  );
  const t = getTickets(r.id);
  const snow = await getSnowReport();

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: 自前のデータをエスケープして埋め込む構造化データ
        dangerouslySetInnerHTML={{ __html: jsonLdString(resortJsonLd(r, t)) }}
      />
      <section className="border-b border-line bg-mist">
        <div className="reveal mx-auto flex max-w-[1200px] flex-col gap-5 px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8">
          <nav aria-label="パンくずリスト" className="text-[13px] text-sub">
            <Link href="/" className="tlink text-sub">
              トップ
            </Link>{" "}
            /{" "}
            <Link href="/resorts" className="tlink text-sub">
              スキー場を探す
            </Link>{" "}
            / <span aria-current="page">{r.name}</span>
          </nav>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <PrefChip prefecture={r.prefecture} />
                <span className="text-[13px] text-sub">{r.areaLabel}</span>
                <StatusBadge resort={r} />
              </div>
              <h1 className="text-[28px] font-bold leading-tight text-navy-950 sm:text-[40px]">
                {r.name}
              </h1>
              <p className="max-w-[640px] text-[15px] leading-[1.8] text-sub">
                {d?.description ?? resortDescription(r, t, todayInTokyo())}
              </p>
              <p className="text-xs text-sub">
                <time dateTime={DATA_UPDATED_AT}>
                  {formatJaDate(DATA_UPDATED_AT)}
                </time>
                更新
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <FavoriteButton id={r.id} />
              {r.url && (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn inline-flex h-11 items-center gap-2 rounded-lg bg-navy-700 px-[18px] text-sm font-semibold text-white"
                >
                  公式サイトで確認
                  <ExternalIcon />
                  <span className="sr-only">（新しいタブで開く）</span>
                </a>
              )}
              {r.links?.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip inline-flex h-11 items-center gap-2 rounded-lg border border-line bg-white px-[18px] text-sm font-semibold text-navy-950"
                >
                  {l.label}
                  <ExternalIcon color="#556070" />
                  <span className="sr-only">（新しいタブで開く）</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-[1200px] flex-wrap items-start gap-8 px-4 pb-16 pt-8 sm:px-6 sm:pb-[88px] sm:pt-10">
        <div
          className="reveal flex min-w-0 flex-[999_1_560px] flex-col gap-8"
          style={{ animationDelay: "0.15s" }}
        >
          <section className="flex flex-col gap-4">
            <h2 className="flex items-center gap-2.5 text-xl font-bold text-navy-950">
              <IconTile name="calendar" />
              2026-27シーズンの営業
            </h2>
            <dl
              className={`${card} grid grid-cols-1 overflow-hidden sm:grid-cols-3`}
            >
              <div className="-mb-px border-b border-line p-5 sm:border-r sm:border-b-0">
                <dt className="text-xs text-sub">営業状況</dt>
                <dd className="mt-1.5 text-lg font-bold">
                  <StatusBadge resort={r} />
                </dd>
              </div>
              <div className="-mb-px border-b border-line p-5 sm:border-r sm:border-b-0">
                <dt className="text-xs text-sub">
                  {r.status === "open" ? "営業開始" : "オープン予定"}
                </dt>
                <dd className="mt-1.5 text-lg font-bold tabular-nums text-navy-950">
                  {r.openingDate
                    ? formatJaDate(r.openingDate).replace(/^\d+年/, "")
                    : (r.openingLabel ?? "確認中")}
                </dd>
              </div>
              <div className="p-5">
                <dt className="text-xs text-sub">大人1日券</dt>
                <dd className="mt-1.5 text-lg font-bold tabular-nums text-navy-950">
                  {t ? adultPriceLabel(t) : "確認中"}
                </dd>
              </div>
            </dl>
            <p className="text-sm leading-[1.8] text-[#3A4456]">
              {r.name}は{r.prefecture}・{r.areaLabel}のスキー場です。
              {openingSentence(r)}
              オープン日は積雪によって変わることがあるので、出かける前に公式サイトで最新の情報を確認してください。
            </p>
          </section>

          <SnowNearResort report={snow} areaKey={r.areaKey} />

          {LIVE_DATA && (
            <>
              <section className="flex flex-col gap-4">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="flex items-center gap-2.5 text-xl font-bold text-navy-950">
                    <IconTile name="sun" />
                    今日のコンディション
                  </h2>
                  <span className="text-xs text-sub">データ取得の準備中</span>
                </div>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {[
                    {
                      label: "積雪（近隣観測点）",
                      unit: "cm",
                      note: "アメダス",
                    },
                    { label: "24時間降雪", unit: "cm", note: "観測値" },
                    { label: "山頂の気温", unit: "°C", note: "予報モデル" },
                    {
                      label: "リフト稼働",
                      unit: d?.lifts
                        ? `/ ${d.lifts.reduce((s, l) => s + l.count, 0)}`
                        : "",
                      note: "公式サイトより",
                    },
                  ].map((c) => (
                    <div
                      key={c.label}
                      className={`lift ${card} flex flex-col gap-1.5 p-4 sm:p-5`}
                    >
                      <span className="text-xs text-sub">{c.label}</span>
                      <span className="text-2xl sm:text-[32px] font-bold tabular-nums text-navy-950">
                        {NO_VALUE}{" "}
                        <span className="text-sm font-medium text-sub">
                          {c.unit}
                        </span>
                      </span>
                      <span className="text-xs text-sub">{c.note}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="flex items-center gap-2.5 text-xl font-bold text-navy-950">
                  <IconTile name="snow" />
                  7日間の降雪予報
                </h2>
                <div className={`${card} flex flex-col gap-3 p-6`}>
                  <div
                    role="img"
                    aria-label="7日間の日別降雪量のグラフ（データ取得前）"
                    className="grid h-40 grid-cols-7 items-end gap-2 border-b border-line sm:gap-4"
                  >
                    {FORECAST_BARS.map((h, i) => (
                      <div
                        key={DAYS[i]}
                        className="grow rounded-t bg-[#D3DDEE]"
                        style={{
                          height: `${h}%`,
                          animationDelay: `${0.3 + i * 0.08}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center text-xs text-sub sm:gap-4">
                    {DAYS.map((day) => (
                      <span key={day}>{day}</span>
                    ))}
                  </div>
                  <p className="text-xs text-sub">
                    グラフはレイアウト確認用の仮表示です。実データは予報APIから表示します。
                  </p>
                </div>
              </section>
            </>
          )}

          {specs.length > 0 && (
            <section className="flex flex-col gap-4">
              <h2 className="flex items-center gap-2.5 text-xl font-bold text-navy-950">
                <IconTile name="mountain" />
                ゲレンデ情報
              </h2>
              <dl
                className={`${card} grid grid-cols-2 overflow-hidden sm:grid-cols-3`}
              >
                {specs.map((s) => (
                  <div
                    key={s.label}
                    className="-mb-px -mr-px border-b border-r border-line p-5"
                  >
                    <dt className="text-xs text-sub">{s.label}</dt>
                    <dd className="mt-1.5 text-lg font-bold tabular-nums">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
              {d?.levels && (
                <div className={`${card} flex flex-col gap-3 p-5`}>
                  <span className="text-[13px] font-semibold">
                    コースレベル
                  </span>
                  <div
                    role="img"
                    aria-label={`初級${d.levels.beginner}%、中級${d.levels.intermediate}%、上級${d.levels.advanced}%`}
                    className="growx flex h-3 overflow-hidden rounded-md"
                  >
                    <div
                      style={{
                        width: `${d.levels.beginner}%`,
                        background: "#9DB4DB",
                      }}
                    />
                    <div
                      style={{
                        width: `${d.levels.intermediate}%`,
                        background: "#3F68B0",
                      }}
                    />
                    <div
                      style={{
                        width: `${d.levels.advanced}%`,
                        background: "#0A1F44",
                      }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-5 text-[13px] text-[#3A4456]">
                    {[
                      ["初級", d.levels.beginner, "#9DB4DB"],
                      ["中級", d.levels.intermediate, "#3F68B0"],
                      ["上級", d.levels.advanced, "#0A1F44"],
                    ].map(([label, v, color]) => (
                      <span key={label} className="flex items-center gap-1.5">
                        <span
                          className="h-2.5 w-2.5 rounded-sm"
                          style={{ background: String(color) }}
                        />
                        {label} {v}%
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          <TicketSection tickets={getTickets(r.id)} officialUrl={r.url} />

          <ResortMap resort={r} />

          {r.group && <GroupSection resort={r} />}

          <NearbyHotels resort={r} />
        </div>

        <aside
          className="reveal flex w-full flex-col gap-4 lg:max-w-[340px] lg:flex-[1_1_280px]"
          style={{ animationDelay: "0.3s" }}
        >
          {d?.lifts && (
            <div className={`${card} flex flex-col gap-4 p-6`}>
              <span className="text-[15px] font-bold">リフト・索道</span>
              <ul className="flex flex-col gap-2.5 text-sm">
                {d.lifts.map((l) => (
                  <li key={l.label} className="flex justify-between">
                    <span>{l.label}</span>
                    <span className="font-semibold">{l.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {d?.facilities && (
            <div className={`${card} flex flex-col gap-4 p-6`}>
              <span className="text-[15px] font-bold">設備</span>
              <ul className="flex flex-col gap-2.5 text-sm">
                {d.facilities.map((f) => (
                  <li key={f.label} className="flex justify-between">
                    <span>{f.label}</span>
                    <span
                      className={`font-semibold ${f.available ? "text-navy-700" : "text-sub"}`}
                    >
                      {f.available ? "あり" : "なし"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {r.tags.length > 0 && !d?.facilities && (
            <div className={`${card} flex flex-col gap-4 p-6`}>
              <span className="text-[15px] font-bold">特徴</span>
              <div className="flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-mist px-2.5 py-1 text-xs text-[#3A4456]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
          {d?.access && (
            <div className={`${card} flex flex-col gap-3 p-6`}>
              <span className="text-[15px] font-bold">アクセス</span>
              {d.access.map((a) => (
                <div key={a.label} className="flex flex-col gap-1 text-sm">
                  <span className="text-xs text-sub">{a.label}</span>
                  <span>{a.value}</span>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </>
  );
}

/** 共通リフト券でつながるスキー場の一覧（志賀高原など） */
function GroupSection({ resort: r }: { resort: Resort }) {
  const siblings = resorts.filter((x) => x.group === r.group && x.id !== r.id);
  if (siblings.length === 0) return null;
  return (
    <section className="flex flex-col gap-4" aria-labelledby="group-heading">
      <h2
        id="group-heading"
        className="flex items-center gap-2.5 text-xl font-bold text-navy-950"
      >
        <IconTile name="layers" />
        {r.group}のほかのスキー場
      </h2>
      <p className="text-sm leading-[1.8] text-[#3A4456]">
        {r.group}の{siblings.length + 1}
        スキー場は、全山共通リフト券1枚で滑れます。
      </p>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {siblings.map((x) => (
          <li key={x.id}>
            <Link
              href={`/resorts/${x.id}`}
              className="lift flex h-full items-center justify-between gap-3 rounded-lg border border-line px-4 py-3"
            >
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-sm font-semibold text-navy-950">
                  {x.name}
                </span>
                <span className="text-xs text-sub">{x.areaLabel}</span>
              </span>
              <StatusBadge resort={x} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
