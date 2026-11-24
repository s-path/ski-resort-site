import type { Metadata } from "next";
import Link from "next/link";
import { ExternalIcon, PrefChip } from "@/components/Badges";
import { GuidePage } from "@/components/GuidePage";
import { Icon, IconTile } from "@/components/Icons";
import { nightsByClosing } from "@/lib/night";
import { getResort, type Resort } from "@/lib/resorts";

const title =
  "ナイター営業のスキー場【2026-27】関東から行ける・深夜まで滑れる順";
const description =
  "関東から行けるスキー場のナイター営業を、遅くまで滑れる順にまとめました。神立の翌2時まで、奥利根の23時までなど、営業日・時間・ナイター券の料金を一覧で比べられます。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/night" },
  openGraph: { url: "/night", title, description },
};

const SEASON_NOTE = {
  current: null,
  previous: "昨季の情報",
  unverified: "今季分か未確認",
} as const;

export default function NightPage() {
  const rows = nightsByClosing().flatMap((n) => {
    const r = getResort(n.id);
    return r ? [{ n, r }] : [];
  });
  const late = rows.filter(({ n }) => n.closesAt >= 22).length;
  return (
    <GuidePage
      path="/night"
      title={title}
      lead={`ナイター営業があるスキー場${rows.length}か所を、閉まる時間が遅い順に並べました。22時以降まで滑れるのは${late}か所。仕事帰りや、昼に出発して夕方から滑るのにも便利です。営業日が週末だけのスキー場も多いので、日付を確かめてから出かけてください。`}
      items={rows.map(({ r }) => r)}
    >
      <ol className="flex flex-col gap-3">
        {rows.map(({ n, r }) => (
          <NightCard key={r.id} resort={r} info={n} />
        ))}
      </ol>

      <section className="flex flex-col gap-3 rounded-xl bg-mist p-5 sm:p-6">
        <h2 className="flex items-center gap-2.5 text-lg font-bold text-navy-950">
          <IconTile name="sparkle" />
          ナイターを楽しむコツ
        </h2>
        <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm leading-[1.8] text-[#3A4456]">
          <li>
            夜は昼より5度ほど冷えます。ネックウォーマーやインナーを1枚多めに。
          </li>
          <li>
            ゴーグルは暗い場所でも見やすい、明るい色（イエローやクリア）のレンズがおすすめです。
          </li>
          <li>
            ナイター券は夕方から売り出すスキー場が多く、1日券より安く滑れます。
          </li>
          <li>
            帰りの道は凍りやすいので、スタッドレスタイヤと時間に余裕をもって。
          </li>
        </ul>
      </section>
    </GuidePage>
  );
}

function NightCard({
  resort: r,
  info: n,
}: {
  resort: Resort;
  info: ReturnType<typeof nightsByClosing>[number];
}) {
  const seasonNote = SEASON_NOTE[n.season];
  return (
    <li className="flex flex-col gap-3 rounded-xl border border-line p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="flex flex-wrap items-center gap-2">
          <PrefChip prefecture={r.prefecture} />
          <Link
            href={`/resorts/${r.id}`}
            className="tlink text-base font-bold text-navy-950"
          >
            {r.name}
          </Link>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-950 px-3 py-1 text-sm font-bold tabular-nums text-white">
          <Icon name="moon" size={14} />
          {n.hours}
        </span>
      </div>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-xs text-sub">営業日</dt>
          <dd>{n.days}</dd>
        </div>
        <div>
          <dt className="text-xs text-sub">期間</dt>
          <dd className="tabular-nums">{n.period}</dd>
        </div>
        <div>
          <dt className="text-xs text-sub">ナイター券</dt>
          <dd className="tabular-nums">
            {n.price
              ? `大人 ${n.price.adult}${n.price.child ? ` / こども ${n.price.child}` : ""}`
              : "確認中"}
          </dd>
        </div>
      </dl>
      {(n.area || n.note) && (
        <p className="text-[13px] leading-[1.7] text-[#3A4456]">
          {[n.area && `コース：${n.area}`, n.note].filter(Boolean).join("。")}
        </p>
      )}
      <p className="flex flex-wrap items-center gap-x-3 text-xs text-sub">
        {seasonNote && (
          <span className="rounded bg-[#FFF4E5] px-1.5 py-0.5 font-semibold text-[#9A5B00]">
            {seasonNote}
          </span>
        )}
        <span>
          出典：
          <a
            href={n.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tlink inline-flex items-center gap-1 text-sub"
          >
            {n.source.label}
            <ExternalIcon />
            <span className="sr-only">（新しいタブで開く）</span>
          </a>
        </span>
      </p>
    </li>
  );
}
