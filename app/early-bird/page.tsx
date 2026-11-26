import type { Metadata } from "next";
import Link from "next/link";
import { ExternalIcon, PrefChip } from "@/components/Badges";
import { GuidePage } from "@/components/GuidePage";
import { earlyBirdDeals } from "@/lib/guides";
import { formatShortDate } from "@/lib/resorts";
import { todayInTokyo } from "@/lib/site";

const title = "早割リフト券まとめ【2026-27】締め切りが近い順";
const description =
  "関東から行けるスキー場の2026-27シーズンの早割リフト券・Web割を、締め切りが近い順にまとめました。価格と購入ページへのリンクつき。締め切りを過ぎたものは自動で消えます。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/early-bird" },
  openGraph: { url: "/early-bird", title, description },
};

// 締め切りを過ぎた早割が消えるよう、1日1回作り直す
export const revalidate = 21600;

export default function EarlyBirdPage() {
  const rows = earlyBirdDeals(todayInTokyo());
  const items = [...new Map(rows.map((x) => [x.resort.id, x.resort])).values()];
  return (
    <GuidePage
      path="/early-bird"
      title={title}
      lead={`いま買える早割・Web割のリフト券は${rows.length}件です。窓口より大幅に安くなるものが多いので、行く予定のスキー場があれば締め切り前にチェックしてください。`}
      items={items}
    >
      {rows.length === 0 ? (
        <p className="rounded-xl border border-line p-6 text-sub">
          いま販売中の早割はありません。
        </p>
      ) : (
        <ol className="divide-y divide-line overflow-hidden rounded-xl border border-line">
          {rows.map(({ resort: r, deal: d }) => (
            <li
              key={`${r.id}-${d.title}`}
              className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-5"
            >
              <div className="flex min-w-0 flex-col gap-1.5">
                <span className="flex flex-wrap items-center gap-2 text-xs text-sub">
                  <PrefChip prefecture={r.prefecture} />
                  <Link
                    href={`/resorts/${r.id}`}
                    className="tlink text-sm font-bold text-navy-950"
                  >
                    {r.name}
                  </Link>
                </span>
                <span className="font-semibold text-navy-950">{d.title}</span>
                <span className="text-[13px] text-[#3A4456]">{d.detail}</span>
              </div>
              <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
                {d.until && (
                  <span className="rounded-md bg-[#FFF4E5] px-2 py-0.5 text-xs font-semibold text-[#9A5B00]">
                    {formatShortDate(d.until)}まで
                  </span>
                )}
                {d.url && (
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tlink inline-flex items-center gap-1 text-[13px] font-semibold text-navy-700"
                  >
                    購入ページへ
                    <ExternalIcon />
                    <span className="sr-only">（新しいタブで開く）</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </GuidePage>
  );
}
