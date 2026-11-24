import type { Metadata } from "next";
import Link from "next/link";
import { GuidePage, ResortList } from "@/components/GuidePage";
import { IconTile } from "@/components/Icons";
import { childMin, kidsFreeResorts, kidsParkResorts } from "@/lib/guides";
import { getTickets } from "@/lib/tickets";

const title = "子連れ・ファミリーにおすすめのスキー場【2026-27】関東から行ける";
const description =
  "関東から行けるスキー場から、小学生のリフト券が無料のスキー場、キッズパークや雪遊びエリアがあるスキー場をまとめました。こどもの1日券の料金や、家族で行くときのコツも紹介。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/kids" },
  openGraph: { url: "/kids", title, description },
};

const yen = (n: number) =>
  n === 0 ? "無料" : `${n.toLocaleString("ja-JP")}円`;

export default function KidsPage() {
  const { always, partial } = kidsFreeResorts();
  const parks = kidsParkResorts();
  const all = [
    ...new Map(
      [...always, ...partial.map((p) => p.resort), ...parks].map((r) => [
        r.id,
        r,
      ]),
    ).values(),
  ];
  const childNote = (id: string) => {
    const t = getTickets(id);
    const c = t ? childMin(t) : undefined;
    return c === undefined ? null : `こども1日券 ${yen(c)}〜`;
  };
  return (
    <GuidePage
      path="/kids"
      title={title}
      lead={`家族で行くなら、こどものリフト代と、滑る以外の遊び場があるかがポイントです。小学生のリフト券がいつでも無料のスキー場は${always.length}か所、キッズパークや雪遊びエリアがあるスキー場は${parks.length}か所あります。`}
      items={all}
    >
      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="flex items-center gap-2.5 text-xl font-bold text-navy-950">
            <IconTile name="gift" />
            小学生のリフト券がいつでも無料
          </h2>
          <Link
            href="/kids-free"
            className="tlink text-sm font-semibold text-navy-700"
          >
            条件つきで無料のスキー場も見る →
          </Link>
        </div>
        <ResortList items={always} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="flex items-center gap-2.5 text-xl font-bold text-navy-950">
          <IconTile name="kids" />
          キッズパーク・雪遊びエリアがあるスキー場
        </h2>
        <p className="text-sm leading-[1.8] text-[#3A4456]">
          そり遊びや雪あそびができるエリアがあるスキー場です。まだ滑れない小さなこどもも一緒に楽しめます。
        </p>
        <ResortList items={parks} note={(r) => childNote(r.id)} />
      </section>

      <section className="flex flex-col gap-3 rounded-xl bg-mist p-5 sm:p-6">
        <h2 className="flex items-center gap-2.5 text-lg font-bold text-navy-950">
          <IconTile name="sparkle" />
          家族で行くときのコツ
        </h2>
        <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm leading-[1.8] text-[#3A4456]">
          <li>
            未就学児はほとんどのスキー場でリフト無料ですが、保護者1人につき人数の上限があることがあります。
          </li>
          <li>
            こどもは体が冷えやすいので、昼前後の暖かい時間に滑って、早めに切り上げるのがおすすめです。
          </li>
          <li>
            ウェアや板はこどもの成長が早いので、最初はレンタルでも十分です。
          </li>
          <li>
            キッズスクールは週末に満員になりやすいので、事前予約できるスキー場では予約を。
          </li>
        </ul>
      </section>
    </GuidePage>
  );
}
