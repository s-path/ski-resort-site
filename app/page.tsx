import { CountUp } from "@/components/CountUp";
import { ResortExplorer } from "@/components/ResortExplorer";
import { Reveal } from "@/components/Reveal";
import { Snowfall } from "@/components/Snowfall";
import { formatUpdatedAt, IS_SAMPLE_DATA, resorts } from "@/lib/resorts";

export default function Home() {
  const openCount = resorts.filter((r) => r.status !== "preparing").length;
  const maxSnow = Math.max(...resorts.map((r) => r.snowTop));
  const totalNewSnow = resorts.reduce((sum, r) => sum + r.newSnow24h, 0);
  const updatedAt = resorts[0]?.updatedAt;

  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 pt-16 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(31,85,196,0.45),transparent_60%)]" />
        <Snowfall />

        <svg
          aria-hidden
          className="absolute bottom-0 left-0 w-full text-white"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="0.06"
            d="M0 160 L0 90 L180 40 L320 100 L520 20 L700 95 L880 35 L1060 105 L1240 50 L1440 110 L1440 160 Z"
          />
          <path
            fill="currentColor"
            d="M0 160 L0 130 L240 95 L420 135 L640 85 L860 140 L1080 100 L1280 135 L1440 115 L1440 160 Z"
          />
        </svg>

        <div className="relative mx-auto max-w-6xl px-6 pb-40 pt-24 md:pt-32">
          {IS_SAMPLE_DATA && (
            <p className="inline-block animate-fade-up rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/70">
              β版：表示中の数値はサンプルデータです
            </p>
          )}
          <h1
            className="mt-6 animate-fade-up text-4xl font-semibold leading-tight tracking-tight md:text-6xl"
            style={{ animationDelay: "100ms" }}
          >
            今日、どこが滑れる？
            <br />
            <span className="bg-gradient-to-r from-white to-navy-100/60 bg-clip-text text-transparent">
              関東周辺の雪山を、ひと目で。
            </span>
          </h1>
          <p
            className="mt-6 max-w-xl animate-fade-up text-white/70"
            style={{ animationDelay: "200ms" }}
          >
            群馬・栃木・長野・山梨のスキー場の積雪と営業状況をまとめて確認できます。
          </p>

          <dl
            className="mt-14 grid max-w-2xl animate-fade-up grid-cols-3 gap-6 border-t border-white/10 pt-8"
            style={{ animationDelay: "300ms" }}
          >
            <Stat
              label="営業中"
              value={openCount}
              unit={`/ ${resorts.length}`}
            />
            <Stat label="最大積雪" value={maxSnow} unit="cm" />
            <Stat label="24h新雪 合計" value={totalNewSnow} unit="cm" />
          </dl>
        </div>
      </section>

      <section id="resorts" className="scroll-mt-20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-medium tracking-[0.2em] text-navy-600">
                  RESORTS
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-navy-950">
                  スキー場一覧
                </h2>
              </div>
              {updatedAt && (
                <p className="text-sm text-slate-500">
                  更新：{formatUpdatedAt(updatedAt)}
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={100} className="mt-10">
            <ResortExplorer resorts={resorts} />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Stat({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit: string;
}) {
  return (
    <div>
      <dt className="text-xs text-white/50">{label}</dt>
      <dd className="mt-2 text-3xl font-semibold tabular-nums md:text-4xl">
        <CountUp value={value} />
        <span className="ml-1 text-sm font-normal text-white/50">{unit}</span>
      </dd>
    </div>
  );
}
