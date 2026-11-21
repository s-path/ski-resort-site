import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { Snowfall } from "@/components/Snowfall";
import { StatusBadge } from "@/components/StatusBadge";
import {
  formatDate,
  formatUpdatedAt,
  getResort,
  IS_SAMPLE_DATA,
  resorts,
} from "@/lib/resorts";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return resorts.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const resort = getResort(id);
  if (!resort) return {};
  return {
    title: `${resort.name}の積雪・営業状況 | SNOWLINE`,
  };
}

export default async function ResortPage({ params }: Props) {
  const { id } = await params;
  const r = getResort(id);
  if (!r) notFound();

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 pt-16 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(31,85,196,0.4),transparent_60%)]" />
        <Snowfall />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-14">
          <Link
            href="/#resorts"
            className="text-sm text-white/60 transition hover:text-white"
          >
            ← スキー場一覧へ
          </Link>
          <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-3">
            <p className="text-sm text-white/60">
              {r.prefecture}・{r.area}
            </p>
            <StatusBadge status={r.status} />
          </div>
          <h1
            className="mt-3 animate-fade-up text-3xl font-semibold tracking-tight md:text-5xl"
            style={{ animationDelay: "100ms" }}
          >
            {r.name}
          </h1>
          <p
            className="mt-4 animate-fade-up text-sm text-white/50"
            style={{ animationDelay: "200ms" }}
          >
            更新：{formatUpdatedAt(r.updatedAt)}
            {IS_SAMPLE_DATA && "（サンプルデータ）"}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-5 md:grid-cols-3">
          <Reveal>
            <BigStat label="山頂積雪" value={r.snowTop} unit="cm" />
          </Reveal>
          <Reveal delay={100}>
            <BigStat label="山麓積雪" value={r.snowBase} unit="cm" />
          </Reveal>
          <Reveal delay={200}>
            <BigStat
              label="24時間の新雪"
              value={r.newSnow24h}
              unit="cm"
              prefix="+"
            />
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-5">
          <div className="grid gap-8 rounded-2xl border border-slate-200 p-8 md:grid-cols-2">
            <Progress
              label="リフト運行"
              open={r.liftsOpen}
              total={r.liftsTotal}
              unit="基"
            />
            <Progress
              label="滑走可能コース"
              open={r.coursesOpen}
              total={r.coursesTotal}
              unit="本"
            />
          </div>
        </Reveal>

        <Reveal delay={150} className="mt-5">
          <div className="flex flex-col justify-between gap-2 rounded-2xl bg-navy-50 p-8 md:flex-row md:items-center">
            <p className="text-sm text-slate-600">
              {r.status === "preparing"
                ? "オープン予定日"
                : "今シーズンの営業開始日"}
            </p>
            <p className="text-2xl font-semibold text-navy-900">
              {formatDate(r.openingDate)}
            </p>
          </div>
        </Reveal>

        <p className="mt-10 text-sm text-slate-500">
          最新の情報や営業時間・料金は、スキー場の公式サイトで確認してください。
        </p>
      </section>
    </>
  );
}

function BigStat({
  label,
  value,
  unit,
  prefix = "",
}: {
  label: string;
  value: number;
  unit: string;
  prefix?: string;
}) {
  return (
    <div className="h-full rounded-2xl border border-slate-200 p-8">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-3 text-5xl font-semibold tabular-nums text-navy-900">
        {prefix}
        <CountUp value={value} />
        <span className="ml-1 text-base font-normal text-slate-500">
          {unit}
        </span>
      </p>
    </div>
  );
}

function Progress({
  label,
  open,
  total,
  unit,
}: {
  label: string;
  open: number;
  total: number;
  unit: string;
}) {
  const ratio = total === 0 ? 0 : open / total;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <p className="tabular-nums text-navy-900">
          <span className="text-2xl font-semibold">{open}</span>
          <span className="text-sm text-slate-500">
            {" "}
            / {total}
            {unit}
          </span>
        </p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full origin-left animate-grow-x rounded-full bg-gradient-to-r from-navy-800 to-navy-600"
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
    </div>
  );
}
