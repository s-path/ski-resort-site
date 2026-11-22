"use client";

import { useEffect, useRef, useState } from "react";
import type { Resort } from "@/lib/resorts";
import { formatShortDate, openingSortKey } from "@/lib/resorts";
import { ExternalIcon, PrefChip } from "./Badges";

const TABS: { key: string; label: string; prefs: string[] | null }[] = [
  { key: "all", label: "すべて", prefs: null },
  { key: "gunma", label: "群馬", prefs: ["群馬"] },
  { key: "tochigi", label: "栃木", prefs: ["栃木"] },
  { key: "niigata", label: "新潟", prefs: ["新潟"] },
  { key: "nagano", label: "長野", prefs: ["長野"] },
  { key: "yamanashi", label: "山梨", prefs: ["山梨"] },
  { key: "other", label: "埼玉・静岡", prefs: ["埼玉", "静岡"] },
];

/** 自動で切り替える間隔（ミリ秒） */
const INTERVAL = 10_000;
/** 自動切り替えで回すタブ（「すべて」は長いので外す） */
const ROTATION = TABS.filter((t) => t.prefs).map((t) => t.key);

/**
 * オープン状況の表。県ごとにタブで切り替える。
 * 群馬から始めて10秒ごとに次の県へ。タブを押すと自動切り替えは止まる。
 */
export function OpenStatus({ resorts }: { resorts: Resort[] }) {
  const [tab, setTab] = useState("gunma");
  const [auto, setAuto] = useState(true);
  // 表にマウスが乗っている間・画面外にある間は一時停止
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // 動きを減らす設定の人には自動切り替えをしない
  const reducedRef = useRef(false);
  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedRef.current) setAuto(false);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    // 止めていても、画面外に出たら自動切り替えを再開する
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (!e.isIntersecting && !reducedRef.current) setAuto(true);
      },
      {
        threshold: 0.2,
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // スマホでタブが横にはみ出すとき、選ばれたタブが見えるように横だけスクロール
  useEffect(() => {
    const list = listRef.current;
    const btn = list?.querySelector<HTMLElement>(`[data-tab="${tab}"]`);
    if (!list || !btn || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: btn.offsetLeft - (list.clientWidth - btn.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [tab]);

  const next = () => {
    const i = ROTATION.indexOf(tab);
    setTab(ROTATION[(i + 1) % ROTATION.length]);
  };
  const running = auto && visible && !hovered;
  // 営業中 → オープン予定（日付順） → 確認中 の順に並べる
  const ORDER = { open: 0, planned: 1, unknown: 2 } as const;
  const withDates = [...resorts].sort(
    (a, b) =>
      ORDER[a.status] - ORDER[b.status] ||
      openingSortKey(a).localeCompare(openingSortKey(b)),
  );

  const rowsFor = (prefs: string[] | null) =>
    withDates.filter((r) => !prefs || prefs.includes(r.prefecture));
  const active = TABS.find((t) => t.key === tab) ?? TABS[0];
  const rows = rowsFor(active.prefs);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: マウスが乗っている間だけ自動切り替えを一時停止する補助で、操作は「自動切り替えを停止」ボタンでもできる
    <div
      ref={rootRef}
      className="flex flex-col gap-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          ref={listRef}
          role="tablist"
          aria-label="オープン状況の県"
          className="no-scrollbar -mx-4 flex max-w-[calc(100%+2rem)] gap-1 self-start overflow-x-auto px-4 sm:mx-0 sm:max-w-full sm:flex-wrap sm:rounded-full sm:border sm:border-line sm:bg-mist sm:p-1"
        >
          {TABS.map((t) => {
            const on = t.key === tab;
            const count = rowsFor(t.prefs).length;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={on}
                data-tab={t.key}
                onClick={() => {
                  setTab(t.key);
                  setAuto(false);
                }}
                className={`chip relative inline-flex min-h-10 shrink-0 items-center gap-2 overflow-hidden rounded-full border px-4 text-sm font-semibold ${
                  on
                    ? "border-navy-950 bg-navy-950 text-white"
                    : "border-line bg-white text-[#3A4456] sm:border-transparent sm:bg-transparent"
                }`}
              >
                {t.label}
                <span
                  className={`inline-flex h-5 min-w-5 items-center justify-center rounded-[10px] px-1.5 text-[11px] font-bold ${
                    on ? "bg-white/20 text-white" : "bg-line text-sub"
                  }`}
                >
                  {count}
                </span>
                {on && auto && (
                  <span
                    key={tab}
                    aria-hidden="true"
                    className="meter absolute inset-x-0 bottom-0 h-[3px] origin-left bg-sky-300"
                    style={{
                      animationDuration: `${INTERVAL}ms`,
                      animationPlayState: running ? "running" : "paused",
                    }}
                    onAnimationEnd={next}
                  />
                )}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setAuto((v) => !v)}
          aria-pressed={auto}
          className="tlink inline-flex items-center gap-1.5 text-xs font-semibold text-sub"
        >
          <span aria-hidden="true">{auto ? "❚❚" : "▶"}</span>
          {auto ? "自動切り替えを停止" : "自動切り替えを再開"}
        </button>
      </div>

      <div
        key={tab}
        role="tabpanel"
        className="overflow-hidden rounded-xl border border-line"
      >
        <ul className="divide-y divide-line md:hidden">
          {rows.map((r, n) => (
            <li
              key={r.id}
              className="reveal flex items-center justify-between gap-3 px-4 py-3.5"
              style={{
                animationDelay: `${n * 0.04}s`,
                animationDuration: "0.45s",
              }}
            >
              <div className="flex min-w-0 flex-col gap-1">
                {r.url ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tlink inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink"
                  >
                    {r.name}
                    <ExternalIcon color="#556070" />
                    <span className="sr-only">（公式サイト・新しいタブ）</span>
                  </a>
                ) : (
                  <span className="text-[15px] font-semibold">{r.name}</span>
                )}
                <span className="inline-flex items-center gap-2 text-xs">
                  <PrefChip prefecture={r.prefecture} />
                  <span className="text-sub">{r.areaLabel}</span>
                </span>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <OpenBadge status={r.status} />
                <span className="text-xs tabular-nums text-sub">
                  {r.openingDate
                    ? formatShortDate(r.openingDate)
                    : (r.openingLabel ?? "—")}
                  {r.status === "planned" && " 予定"}
                  {r.status === "open" && " から"}
                </span>
              </div>
            </li>
          ))}
          {rows.length === 0 && (
            <li className="px-4 py-10 text-center text-sub">
              この県のスキー場はまだ登録されていません。
            </li>
          )}
        </ul>
        <table className="hidden w-full border-collapse text-sm md:table">
          <thead>
            <tr className="bg-mist text-left text-xs text-sub">
              <th scope="col" className="px-5 py-3.5 font-semibold">
                スキー場
              </th>
              <th scope="col" className="px-5 py-3.5 font-semibold">
                エリア
              </th>
              <th scope="col" className="px-5 py-3.5 font-semibold">
                状況
              </th>
              <th scope="col" className="px-5 py-3.5 font-semibold">
                営業開始
              </th>
              <th scope="col" className="px-5 py-3.5 text-right font-semibold">
                積雪
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, n) => (
              <tr
                key={r.id}
                className="reveal border-t border-line"
                style={{
                  animationDelay: `${n * 0.05}s`,
                  animationDuration: "0.45s",
                }}
              >
                <td className="px-5 py-4 font-semibold">
                  {r.url ? (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tlink inline-flex items-center gap-1.5 text-ink"
                    >
                      {r.name}
                      <ExternalIcon color="#556070" />
                      <span className="sr-only">
                        （公式サイト・新しいタブ）
                      </span>
                    </a>
                  ) : (
                    r.name
                  )}
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex flex-wrap items-center gap-2">
                    <PrefChip prefecture={r.prefecture} />
                    <span className="text-sub">{r.areaLabel}</span>
                  </span>
                </td>
                <td className="px-5 py-4">
                  <OpenBadge status={r.status} />
                </td>
                <td className="px-5 py-4 text-sub">
                  {r.openingDate
                    ? formatShortDate(r.openingDate)
                    : (r.openingLabel ?? "—")}
                  {r.status === "planned" && " 予定"}
                </td>
                <td className="px-5 py-4 text-right tabular-nums text-sub">
                  {r.stats[0]?.value}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr className="reveal border-t border-line">
                <td colSpan={5} className="px-5 py-10 text-center text-sub">
                  この県のスキー場はまだ登録されていません。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OpenBadge({ status }: { status: Resort["status"] }) {
  return status === "open" ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-100 px-2.5 py-1 text-xs font-semibold text-navy-700">
      <span className="pulse h-1.5 w-1.5 rounded-full bg-navy-700" />
      営業中
    </span>
  ) : status === "planned" ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF0F3] px-2.5 py-1 text-xs font-semibold text-sub">
      <span className="h-1.5 w-1.5 rounded-full bg-muted" />
      オープン予定
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-field px-2.5 py-1 text-xs font-semibold text-muted">
      確認中
    </span>
  );
}
