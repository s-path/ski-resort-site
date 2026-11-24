import Link from "next/link";
import { prefColor } from "@/lib/prefectures";
import { NO_VALUE, type Resort } from "@/lib/resorts";
import { adultPriceLabel, getTickets } from "@/lib/tickets";
import { ExternalIcon, PrefChip, StatusBadge } from "./Badges";
import { FavoriteStar } from "./FavoriteButton";

/** スキー場一覧のカード。右上に県の色ラベル、下に詳細と公式サイトへのリンク */
export function ResortCard({
  resort: r,
  compact,
}: {
  resort: Resort;
  /** 2列表示のときは数字を2×2で並べる */
  compact: boolean;
}) {
  const c = prefColor(r.prefecture);
  const t = getTickets(r.id);
  return (
    <div className="lift relative flex min-w-0 flex-1 flex-col gap-4 overflow-hidden rounded-xl border border-line bg-white px-5 pb-5 pt-10 sm:px-6 sm:pb-6">
      <span
        className="absolute right-0 top-0 inline-flex h-7 items-center px-4 text-xs font-bold tracking-[0.08em] text-white"
        style={{ background: c.fg, borderRadius: "0 11px 0 10px" }}
      >
        {r.prefecture}
      </span>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <PrefChip prefecture={r.prefecture} />
            <span className="text-xs text-sub">{r.areaLabel}</span>
          </div>
          <h3 className="text-xl font-bold text-navy-950">
            <Link href={`/resorts/${r.id}`} className="tlink">
              {r.name}
            </Link>
          </h3>
        </div>
        <span className="-mr-2 -mt-1.5 flex items-center gap-1">
          <StatusBadge resort={r} />
          <FavoriteStar id={r.id} name={r.name} />
        </span>
      </div>

      <dl
        className={`grid border-t border-line pt-4 ${
          compact ? "grid-cols-2 gap-x-4 gap-y-3" : "grid-cols-4 gap-4"
        }`}
      >
        {r.stats
          .filter((s) => !s.value.startsWith(NO_VALUE))
          .map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <dt className="text-xs text-sub">{s.label}</dt>
              <dd
                className={`font-bold tabular-nums ${compact ? "text-base" : "text-lg"}`}
              >
                {s.value}
              </dd>
            </div>
          ))}
      </dl>

      <p className="flex flex-wrap items-baseline gap-x-2 text-sm">
        <span className="text-xs text-sub">大人1日券</span>
        {t ? (
          <>
            <span className="font-bold tabular-nums text-navy-950">
              {adultPriceLabel(t)}
            </span>
            {t.season === "previous" && (
              <span className="text-xs text-sub">（昨季）</span>
            )}
          </>
        ) : (
          <span className="text-xs text-muted">確認中</span>
        )}
      </p>

      {r.tags.length > 0 && (
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
      )}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3.5">
        <Link
          href={`/resorts/${r.id}`}
          className="tlink py-2 text-[13px] font-semibold text-navy-700"
        >
          詳細を見る →
        </Link>
        {r.url ? (
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${r.name} 公式サイト（新しいタブで開く）`}
            className="btn inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-field bg-white px-3.5 text-[13px] font-semibold text-ink"
          >
            公式サイト
            <ExternalIcon />
          </a>
        ) : (
          <span className="text-xs text-muted">公式サイト確認中</span>
        )}
      </div>
    </div>
  );
}
