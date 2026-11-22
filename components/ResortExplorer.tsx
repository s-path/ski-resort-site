"use client";

import { useMemo, useState } from "react";
import { prefColor } from "@/lib/prefectures";
import { AREA_GROUPS, type AreaKey, type Resort } from "@/lib/resorts";
import { ResortCard } from "./ResortCard";

export type FeatureKey =
  | "open"
  | "night"
  | "gondola"
  | "kids"
  | "spring"
  | "shinkansen";

const FEATURES: {
  key: FeatureKey;
  label: string;
  test: (r: Resort) => boolean;
}[] = [
  { key: "open", label: "営業中のみ", test: (r) => r.status === "open" },
  {
    key: "night",
    label: "ナイター",
    test: (r) => r.tags.some((t) => t.includes("ナイター")),
  },
  {
    key: "gondola",
    label: "ゴンドラ・ロープウェイ",
    test: (r) => r.tags.some((t) => t === "ゴンドラ" || t === "ロープウェイ"),
  },
  {
    key: "kids",
    label: "キッズパーク",
    test: (r) => r.tags.includes("キッズパーク"),
  },
  {
    key: "spring",
    label: "春スキー",
    test: (r) => r.tags.includes("春スキー"),
  },
  {
    key: "shinkansen",
    label: "新幹線で行ける",
    test: (r) => r.tags.includes("新幹線で行ける"),
  },
];

const ALL_KEYS = AREA_GROUPS.flatMap((g) => g.areas.map((a) => a.key));

type SortKey = "recommended" | "name" | "prefecture";
const PREF_ORDER = AREA_GROUPS.map((g) => g.label);

const checkbox = "h-[18px] w-[18px] accent-navy-700";

export function ResortExplorer({
  resorts,
  initialArea,
  initialQuery,
  initialFeatures,
}: {
  resorts: Resort[];
  initialArea?: AreaKey;
  initialQuery?: string;
  initialFeatures?: FeatureKey[];
}) {
  const [selected, setSelected] = useState<Set<AreaKey>>(
    () => new Set(initialArea ? [initialArea] : ALL_KEYS),
  );
  const [features, setFeatures] = useState<Set<FeatureKey>>(
    () => new Set(initialFeatures ?? []),
  );
  const [query, setQuery] = useState(initialQuery ?? "");
  const [minutes, setMinutes] = useState(150);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [panelOpen, setPanelOpen] = useState(false);

  const countBy = useMemo(() => {
    const m = new Map<AreaKey, number>();
    for (const r of resorts) m.set(r.areaKey, (m.get(r.areaKey) ?? 0) + 1);
    return m;
  }, [resorts]);

  const list = useMemo(() => {
    const q = query.trim();
    const filtered = resorts.filter(
      (r) =>
        selected.has(r.areaKey) &&
        FEATURES.every((f) => !features.has(f.key) || f.test(r)) &&
        (!q ||
          r.name.includes(q) ||
          r.areaLabel.includes(q) ||
          r.prefecture.includes(q)),
    );
    if (sort === "name")
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name, "ja"));
    if (sort === "prefecture")
      return [...filtered].sort(
        (a, b) =>
          PREF_ORDER.indexOf(a.prefecture) - PREF_ORDER.indexOf(b.prefecture),
      );
    return filtered;
  }, [resorts, selected, features, query, sort]);

  const toggleArea = (key: AreaKey) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const toggleGroup = (keys: AreaKey[]) =>
    setSelected((prev) => {
      const next = new Set(prev);
      const allOn = keys.every((k) => prev.has(k));
      for (const k of keys) {
        if (allOn) next.delete(k);
        else next.add(k);
      }
      return next;
    });

  const toggleFeature = (key: FeatureKey) =>
    setFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const two = list.length >= 5;
  const activeCount = (selected.size < ALL_KEYS.length ? 1 : 0) + features.size;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const filterKey = `${[...selected].join()}|${[...features].join()}|${query}|${sort}`;

  return (
    <div className="flex flex-wrap items-start gap-8">
      <aside
        aria-label="絞り込み"
        className="reveal flex w-full flex-col gap-6 rounded-xl border border-line p-5 md:max-w-[300px] md:flex-[1_1_260px] md:p-6"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-bold">絞り込み</span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setSelected(new Set(ALL_KEYS))}
              className="cursor-pointer py-2 text-[13px] text-navy-700"
            >
              すべて
            </button>
            <button
              type="button"
              onClick={() => {
                setSelected(new Set());
                setFeatures(new Set());
                setQuery("");
              }}
              className="cursor-pointer py-2 text-[13px] text-sub"
            >
              クリア
            </button>
          </div>
        </div>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-sub">
          キーワード
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="スキー場名・地名"
            className="h-10 rounded-lg border border-field px-3 text-sm font-normal text-ink"
          />
        </label>

        <button
          type="button"
          onClick={() => setPanelOpen((v) => !v)}
          aria-expanded={panelOpen}
          aria-controls="filter-details"
          className="btn flex h-11 cursor-pointer items-center justify-between rounded-lg border border-field px-4 text-sm font-semibold text-ink md:hidden"
        >
          <span>
            エリア・設備で絞り込む
            {activeCount > 0 && (
              <span className="ml-2 rounded-full bg-navy-700 px-2 py-0.5 text-xs text-white">
                {activeCount}
              </span>
            )}
          </span>
          <span aria-hidden="true">{panelOpen ? "▲" : "▼"}</span>
        </button>

        <div
          id="filter-details"
          className={`${panelOpen ? "flex" : "hidden"} flex-col gap-6 md:flex`}
        >
          <fieldset className="flex flex-col gap-3.5 border-t border-line pt-5">
            <legend className="mb-2.5 text-xs font-semibold text-sub">
              エリア
            </legend>
            {AREA_GROUPS.map((g) => {
              const keys = g.areas.map((a) => a.key);
              const n = keys.filter((k) => selected.has(k)).length;
              const state =
                n === 0
                  ? ""
                  : n === keys.length
                    ? "すべて"
                    : `${n}/${keys.length}`;
              const dot = prefColor(g.label).dot;
              return (
                <div key={g.label} className="flex flex-col gap-2">
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm font-bold text-navy-950">
                    <input
                      type="checkbox"
                      checked={n === keys.length}
                      onChange={() => toggleGroup(keys)}
                      aria-label={`${g.label}のエリアをすべて選択`}
                      className={checkbox}
                    />
                    <span
                      aria-hidden
                      className="h-2 w-2 rounded-full"
                      style={{ background: dot }}
                    />
                    {g.label}
                    <span className="ml-auto text-xs font-medium text-muted">
                      {state}
                    </span>
                  </label>
                  {g.areas.map((a) => (
                    <label
                      key={a.key}
                      className="flex cursor-pointer items-center gap-2.5 pl-7 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selected.has(a.key)}
                        onChange={() => toggleArea(a.key)}
                        className={checkbox}
                      />
                      {a.label}
                      <span className="ml-auto text-xs tabular-nums text-muted">
                        {countBy.get(a.key) ?? 0}
                      </span>
                    </label>
                  ))}
                </div>
              );
            })}
          </fieldset>

          <fieldset className="flex flex-col gap-2.5 border-t border-line pt-5">
            <legend className="mb-2.5 text-xs font-semibold text-sub">
              練馬ICからの時間
            </legend>
            <input
              type="range"
              min={60}
              max={240}
              step={30}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              aria-label="練馬ICからの最大時間"
              className="accent-navy-700"
            />
            <div className="flex justify-between text-xs text-sub">
              <span>1時間</span>
              <span className="font-semibold text-ink">
                {m ? `${h}時間${m}分` : `${h}時間`}以内
              </span>
              <span>4時間</span>
            </div>
            <p className="text-[11px] text-muted">
              所要時間のデータは準備中です
            </p>
          </fieldset>

          <fieldset className="flex flex-col gap-2.5 border-t border-line pt-5">
            <legend className="mb-2.5 text-xs font-semibold text-sub">
              設備・特徴
            </legend>
            {FEATURES.map((f) => (
              <label
                key={f.key}
                className="flex cursor-pointer items-center gap-2.5 text-sm"
              >
                <input
                  type="checkbox"
                  checked={features.has(f.key)}
                  onChange={() => toggleFeature(f.key)}
                  className={checkbox}
                />
                {f.label}
              </label>
            ))}
          </fieldset>
        </div>
      </aside>

      <section
        aria-label="検索結果"
        className="flex min-w-0 flex-[999_1_560px] flex-col gap-4"
      >
        <div
          className="reveal flex flex-wrap items-center justify-between gap-3"
          style={{ animationDelay: "0.15s" }}
        >
          <p className="text-sm text-sub" aria-live="polite">
            <span className="text-xl font-bold tabular-nums text-ink">
              {list.length}
            </span>{" "}
            件のスキー場
          </p>
          <label className="flex items-center gap-2 text-[13px] text-sub">
            並び替え
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-10 rounded-lg border border-field bg-white px-3 text-sm text-ink"
            >
              <option value="recommended">おすすめ順</option>
              <option value="prefecture">県ごと</option>
              <option value="name">名前順</option>
            </select>
          </label>
        </div>

        <div
          className={`grid gap-4 ${
            two
              ? "grid-cols-[repeat(auto-fill,minmax(340px,1fr))]"
              : "grid-cols-1"
          }`}
        >
          {list.map((r, i) => (
            <div
              key={`${r.id}-${filterKey}`}
              className="reveal flex"
              style={{ animationDelay: `${0.05 + i * 0.04}s` }}
            >
              <ResortCard resort={r} compact={two} />
            </div>
          ))}
        </div>

        {list.length === 0 && (
          <div className="reveal flex flex-col items-center gap-2 rounded-xl border border-dashed border-field px-6 py-12 text-center">
            <span className="text-[15px] font-bold">
              条件に合うスキー場がありません
            </span>
            <span className="text-[13px] text-sub">
              エリアや条件を変えてみてください。
            </span>
          </div>
        )}
      </section>
    </div>
  );
}
