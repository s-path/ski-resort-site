import { type Hotel, nearbyHotels } from "@/lib/hotels";
import type { Resort } from "@/lib/resorts";
import { ExternalIcon } from "./Badges";
import { IconTile } from "./Icons";

const yen = (n: number) => n.toLocaleString("ja-JP");

/** 詳細ページの「近くの宿」。楽天トラベルのアフィリエイトリンク。取れなければ何も出さない */
export async function NearbyHotels({ resort }: { resort: Resort }) {
  const hotels = await nearbyHotels(resort);
  if (hotels.length === 0) return null;

  return (
    <section className="flex flex-col gap-4" aria-labelledby="hotels-heading">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2
          id="hotels-heading"
          className="flex items-center gap-2.5 text-xl font-bold text-navy-950"
        >
          <IconTile name="hotel" />
          {resort.name}周辺の宿
        </h2>
        <span className="rounded border border-line px-1.5 py-0.5 text-[11px] font-semibold text-sub">
          PR
        </span>
      </div>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {hotels.map((h) => (
          <HotelCard key={h.id} hotel={h} />
        ))}
      </ul>
      <p className="text-xs text-sub">
        楽天トラベルの情報です。料金は1泊あたりの目安の最安値（税込）で、日程や人数によって変わります。リンク先で予約すると、当サイトに紹介料が入ることがあります。
      </p>
    </section>
  );
}

function HotelCard({ hotel: h }: { hotel: Hotel }) {
  return (
    <li>
      <a
        href={h.url}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="lift group flex h-full gap-3 rounded-xl border border-line p-3"
      >
        {h.thumbnail ? (
          // 楽天の画像サーバーの画像をそのまま表示する（最適化は不要な小さいサムネイル）
          // biome-ignore lint/performance/noImgElement: 外部の小さなサムネイルのため next/image を使わない
          <img
            src={h.thumbnail}
            alt=""
            width={96}
            height={96}
            loading="lazy"
            className="h-24 w-24 shrink-0 rounded-lg bg-mist object-cover"
          />
        ) : (
          <span
            className="h-24 w-24 shrink-0 rounded-lg bg-mist"
            aria-hidden="true"
          />
        )}
        <span className="flex min-w-0 flex-col gap-1">
          <span className="line-clamp-2 text-sm font-bold text-navy-950 group-hover:underline">
            {h.name}
          </span>
          {h.reviewAverage ? (
            <span className="text-xs text-sub">
              <span className="text-[#B8860B]" aria-hidden="true">
                ★
              </span>{" "}
              {h.reviewAverage.toFixed(2)}
              {h.reviewCount ? `（${yen(h.reviewCount)}件）` : ""}
            </span>
          ) : null}
          {h.minCharge ? (
            <span className="text-sm font-semibold tabular-nums">
              {yen(h.minCharge)}円〜
              <span className="text-xs font-normal text-sub"> /泊</span>
            </span>
          ) : null}
          {h.access && (
            <span className="line-clamp-1 text-xs text-sub">{h.access}</span>
          )}
          <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-navy-700">
            楽天トラベルで見る
            <ExternalIcon />
            <span className="sr-only">（新しいタブで開く）</span>
          </span>
        </span>
      </a>
    </li>
  );
}
