"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useFavorites } from "@/lib/favorites";
import type { Resort } from "@/lib/resorts";
import { ResortCard } from "./ResortCard";

export function FavoritesView({ resorts }: { resorts: Resort[] }) {
  const { ids } = useFavorites();
  // 保存した内容はブラウザでしか読めないので、読み込むまでは何も出さない（空の案内がちらつかないように）
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return <div className="min-h-[200px]" aria-busy="true" />;

  // 追加した順（新しいものが先）に並べる。今は登録のないIDは飛ばす
  const items = ids.flatMap((id) => {
    const r = resorts.find((x) => x.id === id);
    return r ? [r] : [];
  });

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-line px-6 py-14 text-center">
        <p className="text-base font-semibold text-navy-950">
          まだお気に入りはありません
        </p>
        <p className="text-sm text-sub">
          スキー場の一覧やトップのオープン状況で☆を押すと、ここに追加されます。
        </p>
        <Link
          href="/resorts"
          className="btn inline-flex h-11 items-center rounded-lg bg-navy-700 px-[18px] text-sm font-semibold text-white"
        >
          スキー場を探す
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="text-sm text-sub">
        <span className="font-bold text-navy-950">{items.length}</span>
        件のスキー場
      </p>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((r) => (
          <li key={r.id} className="flex">
            <ResortCard resort={r} compact />
          </li>
        ))}
      </ul>
    </>
  );
}
