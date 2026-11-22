import type { Metadata } from "next";
import Link from "next/link";
import { type FeatureKey, ResortExplorer } from "@/components/ResortExplorer";
import { AREA_GROUPS, type AreaKey, resorts } from "@/lib/resorts";

export const metadata: Metadata = {
  title: "スキー場を探す | SNOWLINE 関東",
};

const AREA_KEYS = new Set<string>(
  AREA_GROUPS.flatMap((g) => g.areas.map((a) => a.key)),
);
const FEATURE_KEYS = new Set<string>([
  "open",
  "night",
  "gondola",
  "kids",
  "spring",
  "shinkansen",
]);

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export default async function ResortsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const area = first(sp.area);
  const q = first(sp.q);
  const f = first(sp.f);
  // トップページの「東京駅から新幹線＋バス」は、新幹線で行けるスキー場に絞る
  const time = first(sp.time);
  const features: FeatureKey[] = [];
  if (f && FEATURE_KEYS.has(f)) features.push(f as FeatureKey);
  if (time === "shinkansen" && !features.includes("shinkansen"))
    features.push("shinkansen");

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-7 px-6 pb-[88px] pt-10">
      <div className="reveal flex flex-col gap-2">
        <p className="text-[13px] text-sub">
          <Link href="/" className="tlink text-sub">
            トップ
          </Link>{" "}
          / スキー場を探す
        </p>
        <h1 className="text-[32px] font-bold text-navy-950">スキー場を探す</h1>
      </div>
      <ResortExplorer
        resorts={resorts}
        initialArea={
          area && AREA_KEYS.has(area) ? (area as AreaKey) : undefined
        }
        initialQuery={q}
        initialFeatures={features}
      />
    </div>
  );
}
