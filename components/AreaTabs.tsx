"use client";

import Link from "next/link";
import { useState } from "react";
import { AREA_TABS } from "@/lib/areas";
import { IconTile } from "./Icons";

/** トップページ「エリアから探す」。県のタブで切り替える */
export function AreaTabs() {
  const [tab, setTab] = useState(AREA_TABS[0].key);
  const active = AREA_TABS.find((t) => t.key === tab) ?? AREA_TABS[0];

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
          {AREA_TABS.map((t) => {
            const on = t.key === tab;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setTab(t.key)}
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
        {active.areas.map((a, n) => (
          <Link
            key={a.name}
            href="/resorts"
            className="lift reveal flex flex-col gap-2.5 rounded-xl border border-line bg-white p-6 text-ink"
            style={{
              animationDelay: `${n * 0.07}s`,
              animationDuration: "0.5s",
            }}
          >
            <span className="text-xs text-sub">{active.label}</span>
            <span className="text-xl font-bold text-navy-950">{a.name}</span>
            <span className="text-[13px] leading-[1.7] text-sub">
              {a.resorts}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
