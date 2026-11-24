import Link from "next/link";
import { AMEDAS_SOURCE, type SnowObs, type SnowReport } from "@/lib/amedas";
import { AREA_GROUPS, type AreaKey } from "@/lib/resorts";
import { Icon } from "./Icons";

/** "2026-11-25T08:00:00+09:00" → "11/25 8時" */
export function obsTimeLabel(time: string | null) {
  const m = time?.match(/^\d{4}-(\d{2})-(\d{2})T(\d{2})/);
  return m ? `${Number(m[1])}/${Number(m[2])} ${Number(m[3])}時` : null;
}

const cm = (n: number | null) => (n === null ? "—" : String(n));

function SourceNote({ time }: { time: string | null }) {
  const label = obsTimeLabel(time);
  return (
    <p className="text-xs leading-[1.7] text-sub">
      {label ? `${label}の観測値。` : ""}
      ゲレンデではなく近くのアメダス観測点（多くはふもと）の値なので、実際のゲレンデより少なめに出ます。出典：
      <a
        href={AMEDAS_SOURCE.url}
        target="_blank"
        rel="noopener noreferrer"
        className="tlink text-sub"
      >
        {AMEDAS_SOURCE.label}
      </a>
    </p>
  );
}

/** トップページ「エリアの積雪」 */
export function SnowAreas({ report }: { report: SnowReport }) {
  const areas = AREA_GROUPS.flatMap((g) =>
    g.areas.map((a) => ({ ...a, pref: g.label, obs: report.byArea[a.key] })),
  ).filter((a) => a.obs);
  if (areas.length === 0) {
    return (
      <div className="flex flex-col gap-2 rounded-xl border border-dashed border-line px-6 py-10 text-center">
        <p className="text-sm font-semibold text-navy-950">
          積雪データを取得できませんでした
        </p>
        <p className="text-xs text-sub">しばらくしてから再度お試しください。</p>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">
        {areas.map((a) => (
          <Link
            key={a.key}
            href={`/resorts?area=${a.key}`}
            className="lift flex flex-col gap-3 rounded-xl border border-line p-5"
          >
            <span className="flex items-baseline justify-between gap-2">
              <span className="text-[15px] font-bold text-navy-950">
                {a.label}
              </span>
              <span className="text-xs text-sub">{a.pref}</span>
            </span>
            <SnowNumbers obs={a.obs as SnowObs} />
          </Link>
        ))}
      </div>
      <SourceNote time={report.time} />
    </>
  );
}

function SnowNumbers({ obs }: { obs: SnowObs }) {
  return (
    <>
      <span className="flex items-baseline gap-1.5">
        <span className="text-[36px] font-bold leading-none tabular-nums text-navy-950">
          {cm(obs.depth)}
        </span>
        <span className="text-sm text-sub">cm</span>
      </span>
      <span className="flex items-center justify-between border-t border-line pt-3 text-[13px] text-sub">
        <span className="inline-flex items-center gap-1">
          <Icon name="snow" size={13} className="text-navy-700" />
          24時間 {obs.fall24h === null ? "—" : `+${obs.fall24h}`} cm
        </span>
        <span className="truncate">
          {obs.station.name}
          {obs.station.alt !== null && `（${obs.station.alt}m）`}
        </span>
      </span>
    </>
  );
}

/** スキー場詳細ページの「近くの積雪」 */
export function SnowNearResort({
  report,
  areaKey,
}: {
  report: SnowReport;
  areaKey: AreaKey;
}) {
  const obs = report.byArea[areaKey];
  if (!obs) return null;
  return (
    <section
      className="flex flex-col gap-3 rounded-xl border border-line p-5 sm:p-6"
      aria-labelledby="snow-near-heading"
    >
      <h2
        id="snow-near-heading"
        className="flex items-center gap-2 text-base font-bold text-navy-950"
      >
        <Icon name="snow" size={18} className="text-navy-700" />
        近くの積雪（アメダス {obs.station.name}）
      </h2>
      <div className="flex max-w-[360px] flex-col gap-3">
        <SnowNumbers obs={obs} />
      </div>
      <SourceNote time={report.time} />
    </section>
  );
}
