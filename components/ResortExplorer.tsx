"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  formatDate,
  PREFECTURES,
  type Prefecture,
  type Resort,
} from "@/lib/resorts";
import { StatusBadge } from "./StatusBadge";

type SortKey = "snow" | "newSnow" | "name";

const SORT_LABEL: Record<SortKey, string> = {
  snow: "積雪が多い順",
  newSnow: "新雪が多い順",
  name: "名前順",
};

const MAX_SNOW = 150;

export function ResortExplorer({ resorts }: { resorts: Resort[] }) {
  const [pref, setPref] = useState<Prefecture | "all">("all");
  const [openOnly, setOpenOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("snow");

  const list = useMemo(() => {
    const filtered = resorts.filter(
      (r) =>
        (pref === "all" || r.prefecture === pref) &&
        (!openOnly || r.status !== "preparing"),
    );
    return [...filtered].sort((a, b) => {
      if (sort === "snow") return b.snowTop - a.snowTop;
      if (sort === "newSnow") return b.newSnow24h - a.newSnow24h;
      return a.name.localeCompare(b.name, "ja");
    });
  }, [resorts, pref, openOnly, sort]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["all", ...PREFECTURES] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPref(p)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                pref === p
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-navy-700 hover:text-navy-800"
              }`}
            >
              {p === "all" ? "すべて" : p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-slate-600">
            <input
              type="checkbox"
              checked={openOnly}
              onChange={(e) => setOpenOnly(e.target.checked)}
              className="h-4 w-4 accent-navy-800"
            />
            営業中のみ
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-slate-700"
            aria-label="並び替え"
          >
            {(Object.keys(SORT_LABEL) as SortKey[]).map((k) => (
              <option key={k} value={k}>
                {SORT_LABEL[k]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-500">{list.length}件</p>

      <ul className="mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r, i) => (
          <li
            key={`${r.id}-${pref}-${openOnly}-${sort}`}
            className="animate-fade-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <ResortCard resort={r} />
          </li>
        ))}
      </ul>

      {list.length === 0 && (
        <p className="mt-10 text-center text-slate-500">
          条件に合うスキー場がありません。
        </p>
      )}
    </div>
  );
}

function ResortCard({ resort: r }: { resort: Resort }) {
  const ratio = Math.min(r.snowTop / MAX_SNOW, 1);
  return (
    <Link
      href={`/resorts/${r.id}`}
      className="group block h-full rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-navy-700/40 hover:shadow-[0_20px_40px_-20px_rgba(10,37,82,0.35)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-slate-500">
            {r.prefecture}・{r.area}
          </p>
          <h3 className="mt-1 font-semibold text-navy-950 group-hover:text-navy-700">
            {r.name}
          </h3>
        </div>
        <StatusBadge status={r.status} />
      </div>

      <div className="mt-6 flex items-end gap-6">
        <div>
          <p className="text-xs text-slate-500">山頂積雪</p>
          <p className="mt-1 text-3xl font-semibold tabular-nums text-navy-900">
            {r.snowTop}
            <span className="ml-1 text-sm font-normal text-slate-500">cm</span>
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500">24h新雪</p>
          <p className="mt-1 text-lg font-semibold tabular-nums text-navy-700">
            +{r.newSnow24h}
            <span className="ml-0.5 text-xs font-normal text-slate-500">
              cm
            </span>
          </p>
        </div>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full origin-left animate-grow-x rounded-full bg-gradient-to-r from-navy-700 to-navy-600"
          style={{ width: `${ratio * 100}%` }}
        />
      </div>

      <div className="mt-5 flex justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
        <span>
          リフト {r.liftsOpen}/{r.liftsTotal}
        </span>
        <span>
          {r.status === "preparing"
            ? `${formatDate(r.openingDate)} オープン予定`
            : `${formatDate(r.openingDate)} から営業`}
        </span>
      </div>
    </Link>
  );
}
