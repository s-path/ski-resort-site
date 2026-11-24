"use client";

import { useFavorites } from "@/lib/favorites";

const STAR =
  "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z";

function StarIcon({ filled, size = 16 }: { filled: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={STAR} />
    </svg>
  );
}

/** 詳細ページの「お気に入りに追加」ボタン */
export function FavoriteButton({ id }: { id: string }) {
  const { has, toggle } = useFavorites();
  const fav = has(id);
  return (
    <button
      key={String(fav)}
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={fav}
      className={`btn ${fav ? "swap border-navy-950 bg-navy-950 text-white" : "border-field bg-white text-ink"} inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg border px-[18px] text-sm font-semibold`}
    >
      <StarIcon filled={fav} />
      {fav ? "お気に入り済み" : "お気に入りに追加"}
    </button>
  );
}

/** 一覧やオープン状況で使う、星だけの小さなボタン */
export function FavoriteStar({
  id,
  name,
  className = "",
}: {
  id: string;
  name: string;
  className?: string;
}) {
  const { has, toggle } = useFavorites();
  const fav = has(id);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      aria-pressed={fav}
      aria-label={`${name}をお気に入り${fav ? "から外す" : "に追加"}`}
      title={fav ? "お気に入りから外す" : "お気に入りに追加"}
      className={`inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-mist ${fav ? "text-[#E0A100]" : "text-muted"} ${className}`}
    >
      <StarIcon filled={fav} size={20} />
    </button>
  );
}

/** ヘッダーに出すお気に入りの件数 */
export function FavoriteCount() {
  const { ids } = useFavorites();
  if (ids.length === 0) return null;
  return (
    <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-navy-700 px-1.5 text-[11px] font-bold leading-5 text-white tabular-nums">
      {ids.length}
      <span className="sr-only">件</span>
    </span>
  );
}
