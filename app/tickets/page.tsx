import type { Metadata } from "next";
import Link from "next/link";
import { PrefChip } from "@/components/Badges";
import { GuidePage } from "@/components/GuidePage";
import { childMin, earlyBirdDeals, resortsByAdultPrice } from "@/lib/guides";
import { resorts } from "@/lib/resorts";
import { todayInTokyo } from "@/lib/site";
import { activeDeals, adultPriceLabel } from "@/lib/tickets";

const title = "リフト券の料金比較【2026-27】関東から行けるスキー場を安い順に";
const description =
  "関東から行けるスキー場のリフト1日券の料金を安い順に比較。大人・こどもの料金、早割やWeb割の有無もまとめています。安く滑りたいときのリフト券の選び方も紹介。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tickets" },
  openGraph: { url: "/tickets", title, description },
};

// 早割の締め切りを過ぎたら表示が変わるよう、1日1回作り直す
export const revalidate = 86400;

const groupSize = (g: string) => resorts.filter((r) => r.group === g).length;

const SEASON_NOTE = {
  current: null,
  previous: "昨季",
  unverified: "未確認",
} as const;
const yen = (n: number) =>
  n === 0 ? "無料" : `${n.toLocaleString("ja-JP")}円〜`;

export default function TicketsPage() {
  const today = todayInTokyo();
  const rows = resortsByAdultPrice();
  const deals = earlyBirdDeals(today);
  const cheapest = rows[0];
  return (
    <GuidePage
      path="/tickets"
      title={title}
      lead={`リフト券の料金がわかるスキー場${rows.length}か所を、大人1日券が安い順に並べました。いちばん安いのは${cheapest ? `${cheapest.resort.name}（${adultPriceLabel(cheapest.tickets)}）` : "—"}です。料金は期間や曜日で変わるスキー場が多いので、幅で表示しています。いま買える早割は${deals.length}件あります。`}
      items={rows.map((x) => x.resort)}
    >
      <div className="flex flex-wrap gap-2">
        <Link
          href="/early-bird"
          className="btn inline-flex h-11 items-center rounded-lg bg-navy-700 px-[18px] text-sm font-semibold text-white"
        >
          早割リフト券まとめ（{deals.length}件）
        </Link>
        <Link
          href="/kids-free"
          className="chip inline-flex h-11 items-center rounded-lg border border-line px-[18px] text-sm font-semibold text-[#3A4456]"
        >
          小学生無料のスキー場
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-line">
        <table className="w-full text-sm">
          <caption className="sr-only">
            リフト1日券の料金（大人が安い順）
          </caption>
          <thead className="bg-mist text-left text-xs text-sub">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                スキー場
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                大人1日券
              </th>
              <th
                scope="col"
                className="hidden px-4 py-3 font-medium sm:table-cell"
              >
                こども
              </th>
              <th
                scope="col"
                className="hidden px-4 py-3 font-medium md:table-cell"
              >
                早割・Web割
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ resort: r, tickets: t }) => {
              const c = childMin(t);
              const d = activeDeals(t, today);
              const note = SEASON_NOTE[t.season];
              return (
                <tr key={r.id} className="border-t border-line align-top">
                  <th scope="row" className="px-4 py-3 text-left font-normal">
                    <span className="flex flex-col gap-1">
                      <Link
                        href={`/resorts/${r.id}`}
                        className="tlink w-fit font-bold text-navy-950"
                      >
                        {r.group
                          ? `${r.group}（${groupSize(r.group)}スキー場共通）`
                          : r.name}
                      </Link>
                      <span className="flex items-center gap-2 text-xs text-sub">
                        <PrefChip prefecture={r.prefecture} />
                        {r.areaLabel}
                      </span>
                    </span>
                  </th>
                  <td className="px-4 py-3 font-bold tabular-nums text-navy-950">
                    {adultPriceLabel(t)}
                    {note && (
                      <span className="ml-1 text-xs font-normal text-sub">
                        （{note}）
                      </span>
                    )}
                    <span className="mt-0.5 block text-xs font-normal text-sub sm:hidden">
                      こども {c === undefined ? "—" : yen(c)}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 tabular-nums sm:table-cell">
                    {c === undefined ? "—" : yen(c)}
                  </td>
                  <td className="hidden px-4 py-3 text-xs text-[#3A4456] md:table-cell">
                    {d.length > 0 ? d.map((x) => x.title).join("、") : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <section className="flex flex-col gap-3 rounded-xl bg-mist p-5 sm:p-6">
        <h2 className="text-lg font-bold text-navy-950">
          リフト券を安く買うコツ
        </h2>
        <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm leading-[1.8] text-[#3A4456]">
          <li>
            早割は秋〜12月に販売されることが多く、窓口より2〜4割安くなることもあります。
          </li>
          <li>
            Web購入やICカードへのチャージで、窓口より数百円安くなるスキー場が増えています。
          </li>
          <li>
            初滑り期間や春スキーの期間は、1日券が安く設定されていることがあります。
          </li>
          <li>
            平日限定の割引や、19〜22歳向けの無料・割引キャンペーンもチェックを。
          </li>
        </ul>
      </section>
    </GuidePage>
  );
}
