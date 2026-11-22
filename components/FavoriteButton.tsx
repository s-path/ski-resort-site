"use client";

import { useState } from "react";

const STAR =
  "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z";

/** お気に入りの切り替え。保存は今後（会員機能）で対応する */
export function FavoriteButton() {
  const [fav, setFav] = useState(false);
  return (
    <button
      key={String(fav)}
      type="button"
      onClick={() => setFav((v) => !v)}
      aria-pressed={fav}
      className={`btn ${fav ? "swap border-navy-950 bg-navy-950 text-white" : "border-field bg-white text-ink"} inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg border px-[18px] text-sm font-semibold`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={fav ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={STAR} />
      </svg>
      {fav ? "お気に入り済み" : "お気に入りに追加"}
    </button>
  );
}
