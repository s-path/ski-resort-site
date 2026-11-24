"use client";

import Link from "next/link";
import { useState } from "react";
import { PREF_PAGES } from "@/lib/guides";
import { AREA_GROUPS, type AreaKey, type Resort } from "@/lib/resorts";
import { IconTile } from "./Icons";

type Item = Pick<Resort, "id" | "name" | "areaKey" | "group" | "prefecture">;

/** カードに並べるスキー場名。共通券のまとまり（志賀高原など）は1つにまとめる */
function namesIn(resorts: Item[], key: AreaKey) {
  const names: string[] = [];
  for (const r of resorts) {
    if (r.areaKey !== key) continue;
    const name = r.group ?? r.name.replace(/スキー場$|スキーリゾート$/, "");
    if (!names.includes(name)) names.push(name);
  }
  return names;
}

// 「埼玉（屋内）」は1か所だけなのでタブにしない
const TABS = AREA_GROUPS.filter((g) => g.label !== "埼玉");

/** トップページ「エリアから探す」。県のタブで切り替え、カードを押すとそのエリアで絞り込んだ一覧へ */
export function AreaTabs({ resorts }: { resorts: Item[] }) {
  const [tab, setTab] = useState(TABS[0].label);
  const active = TABS.find((t) => t.label === tab) ?? TABS[0];
  const prefPage = PREF_PAGES.find((p) => p.label === active.label);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-semibold tracking-[0.08em] text-navy-700">
            AREA
          </p>
          <h2 className="flex items-center gap-2.5 text-2xl font-bold text-navy-950 sm:text-[28px]">
            <IconTile name="map" />
            エリアから探す
          </h2>
        </div>
        <div
          role="tablist"
          aria-label="県"
          className="flex flex-wrap gap-1 rounded-full border border-line bg-mist p-1"
        >
          {TABS.map((t) => {
            const on = t.label === tab;
            return (
              <button
                key={t.label}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setTab(t.label)}
                className={`chip min-h-10 rounded-full border px-[18px] text-sm font-semibold ${
                  on
                    ? "border-navy-950 bg-navy-950 text-white"
                    : "border-transparent text-[#3A4456]"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
      <div
        key={tab}
        role="tabpanel"
        className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4"
      >
        {active.areas.map((a, n) => {
          const names = namesIn(resorts, a.key);
          const count = resorts.filter((r) => r.areaKey === a.key).length;
          const shown = names.slice(0, 5);
          return (
            <Link
              key={a.key}
              href={`/resorts?area=${a.key}`}
              className="lift reveal flex flex-col gap-2.5 rounded-xl border border-line bg-white p-6 text-ink"
              style={{
                animationDelay: `${n * 0.07}s`,
                animationDuration: "0.5s",
              }}
            >
              <span className="flex items-center justify-between text-xs text-sub">
                {active.label}
                <span className="tabular-nums">{count}か所</span>
              </span>
              <span className="text-xl font-bold text-navy-950">{a.label}</span>
              <span className="text-[13px] leading-[1.7] text-sub">
                {shown.join("、")}
                {names.length > shown.length &&
                  ` ほか${names.length - shown.length}`}
              </span>
              <span className="mt-auto text-[13px] font-semibold text-navy-700">
                このエリアのスキー場を見る →
              </span>
            </Link>
          );
        })}
      </div>
      {prefPage && (
        <Link
          href={`/area/${prefPage.slug}`}
          className="tlink w-fit text-sm font-semibold text-navy-700"
        >
          {prefPage.label}のスキー場をすべて見る →
        </Link>
      )}
    </>
  );
}
