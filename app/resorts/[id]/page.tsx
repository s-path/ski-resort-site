import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalIcon, PrefChip, StatusBadge } from "@/components/Badges";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getResort, NO_VALUE, resorts } from "@/lib/resorts";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return resorts.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const r = getResort(id);
  if (!r) return {};
  return { title: `${r.name}の積雪・営業状況 | SNOWLINE 関東` };
}

// 予報グラフはデータ取得前のレイアウト確認用（高さは仮）
const FORECAST_BARS = [24, 40, 64, 52, 30, 18, 36];
const DAYS = ["今日", "明日", "3日目", "4日目", "5日目", "6日目", "7日目"];

const card = "rounded-xl border border-line";

export default async function ResortPage({ params }: Props) {
  const { id } = await params;
  const r = getResort(id);
  if (!r) notFound();
  const d = r.detail;
  const specs = d?.specs ?? r.stats.filter((s) => s.label !== "積雪");

  return (
    <>
      <section className="border-b border-line bg-mist">
        <div className="reveal mx-auto flex max-w-[1200px] flex-col gap-5 px-6 pb-10 pt-8">
          <p className="text-[13px] text-sub">
            <Link href="/" className="tlink text-sub">
              トップ
            </Link>{" "}
            /{" "}
            <Link href="/resorts" className="tlink text-sub">
              スキー場を探す
            </Link>{" "}
            / {r.name}
          </p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <PrefChip prefecture={r.prefecture} />
                <span className="text-[13px] text-sub">{r.areaLabel}</span>
                <StatusBadge resort={r} />
              </div>
              <h1 className="text-[40px] font-bold text-navy-950">{r.name}</h1>
              {d?.description && (
                <p className="max-w-[640px] text-[15px] leading-[1.8] text-sub">
                  {d.description}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <FavoriteButton />
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
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-[1200px] flex-wrap items-start gap-8 px-6 pb-[88px] pt-10">
        <div
          className="reveal flex min-w-0 flex-[999_1_560px] flex-col gap-8"
          style={{ animationDelay: "0.15s" }}
        >
          <section className="flex flex-col gap-4">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-xl font-bold text-navy-950">
                今日のコンディション
              </h2>
              <span className="text-xs text-sub">データ取得の準備中</span>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
              {[
                { label: "積雪（近隣観測点）", unit: "cm", note: "アメダス" },
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
                  className={`lift ${card} flex flex-col gap-1.5 p-5`}
                >
                  <span className="text-xs text-sub">{c.label}</span>
                  <span className="text-[32px] font-bold tabular-nums text-navy-950">
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
            <h2 className="text-xl font-bold text-navy-950">7日間の降雪予報</h2>
            <div className={`${card} flex flex-col gap-3 p-6`}>
              <div
                role="img"
                aria-label="7日間の日別降雪量のグラフ（データ取得前）"
                className="grid h-40 grid-cols-7 items-end gap-4 border-b border-line"
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
              <div className="grid grid-cols-7 gap-4 text-center text-xs text-sub">
                {DAYS.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
              <p className="text-xs text-sub">
                グラフはレイアウト確認用の仮表示です。実データは予報APIから表示します。
              </p>
            </div>
          </section>

          {specs.length > 0 && (
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-navy-950">ゲレンデ情報</h2>
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

          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-navy-950">リフト券料金</h2>
            <p className={`${card} p-5 text-sm text-sub`}>
              料金は準備中です。最新の料金は
              {r.url ? (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tlink mx-1 text-navy-700"
                >
                  公式サイト
                </a>
              ) : (
                "公式サイト"
              )}
              でご確認ください。
            </p>
          </section>
        </div>

        <aside
          className="reveal flex max-w-[340px] flex-[1_1_280px] flex-col gap-4"
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
