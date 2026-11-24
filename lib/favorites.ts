"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

// お気に入りはこの端末のブラウザ（localStorage）に保存する。会員機能ができたらサーバーに移す
const KEY = "snowline:favorites";
const EVENT = "snowline:favorites";
const MAX = 200;

function read(): string {
  try {
    return window.localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function parse(raw: string): string[] {
  try {
    const v: unknown = JSON.parse(raw);
    return Array.isArray(v)
      ? v.filter((x): x is string => typeof x === "string").slice(0, MAX)
      : [];
  } catch {
    return [];
  }
}

function write(ids: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(ids.slice(0, MAX)));
  } catch {
    // 保存できない環境（プライベートブラウズなど）では何もしない
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  // ほかのタブでの変更（storage）と、このタブでの変更（独自イベント）の両方を受け取る
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(EVENT, cb);
  };
}

/** サーバーと最初の描画では空（ハイドレーションのずれを防ぐ） */
const serverSnapshot = () => "[]";

export function useFavorites() {
  const raw = useSyncExternalStore(subscribe, read, serverSnapshot);
  const ids = useMemo(() => parse(raw), [raw]);
  const set = useMemo(() => new Set(ids), [ids]);
  const toggle = useCallback((id: string) => {
    const now = parse(read());
    write(now.includes(id) ? now.filter((x) => x !== id) : [id, ...now]);
  }, []);
  const has = useCallback((id: string) => set.has(id), [set]);
  return { ids, has, toggle };
}
