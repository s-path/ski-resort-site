import type { Metadata } from "next";
import Link from "next/link";
import { FavoritesView } from "@/components/FavoritesView";
import { resorts } from "@/lib/resorts";

export const metadata: Metadata = {
  title: "お気に入りのスキー場",
  description: "お気に入りに追加したスキー場の一覧です。",
  alternates: { canonical: "/favorites" },
  // 見る人ごとに中身が変わるページなので検索結果には出さない
  robots: { index: false, follow: true },
};

export default function FavoritesPage() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 pb-16 pt-6 sm:gap-7 sm:px-6 sm:pb-[88px] sm:pt-10">
      <div className="flex flex-col gap-2">
        <p className="text-[13px] text-sub">
          <Link href="/" className="tlink text-sub">
            トップ
          </Link>
          <span className="mx-1.5">/</span>
          お気に入り
        </p>
        <h1 className="text-2xl font-bold text-navy-950 sm:text-[32px]">
          お気に入りのスキー場
        </h1>
        <p className="text-sm leading-[1.8] text-sub">
          ☆を押したスキー場がここに並びます。お気に入りはこの端末のブラウザに保存されるので、ほかの端末やブラウザとは共有されません。
        </p>
      </div>
      <FavoritesView resorts={resorts} />
    </div>
  );
}
