import type { Resort } from "@/lib/resorts";
import { Icon, IconTile } from "./Icons";

/** Googleマップで探すときの検索語。同名のスキー場と取り違えないよう、まとまり名と県を付ける */
export function mapQuery(r: Resort) {
  return (
    r.mapQuery ??
    [r.group, r.name, `${r.prefecture}県`].filter(Boolean).join(" ")
  );
}

/**
 * スキー場詳細の地図。Maps Embed API（無料）で埋め込む。
 * キー（NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY）が未設定なら地図は出さず、Googleマップへのリンクだけ出す
 */
export function ResortMap({ resort: r }: { resort: Resort }) {
  const q = mapQuery(r);
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;
  const open = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  const route = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
  return (
    <section className="flex flex-col gap-4" aria-labelledby="map-heading">
      <h2
        id="map-heading"
        className="flex items-center gap-2.5 text-xl font-bold text-navy-950"
      >
        <IconTile name="pin" />
        地図・アクセス
      </h2>
      {key && (
        <div className="overflow-hidden rounded-xl border border-line bg-mist">
          <iframe
            title={`${r.name}の地図`}
            src={`https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=${encodeURIComponent(q)}&language=ja&region=JP`}
            className="block aspect-[4/3] w-full sm:aspect-[16/9]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <a
          href={route}
          target="_blank"
          rel="noopener noreferrer"
          className="btn inline-flex h-11 items-center gap-2 rounded-lg bg-navy-700 px-[18px] text-sm font-semibold text-white"
        >
          <Icon name="pin" size={16} />
          Googleマップでルートを調べる
          <span className="sr-only">（新しいタブで開く）</span>
        </a>
        <a
          href={open}
          target="_blank"
          rel="noopener noreferrer"
          className="chip inline-flex h-11 items-center gap-2 rounded-lg border border-line bg-white px-[18px] text-sm font-semibold text-navy-950"
        >
          <Icon name="map" size={16} className="text-navy-700" />
          Googleマップで開く
          <span className="sr-only">（新しいタブで開く）</span>
        </a>
      </div>
    </section>
  );
}
