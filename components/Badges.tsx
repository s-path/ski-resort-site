import { prefColor } from "@/lib/prefectures";
import type { Resort } from "@/lib/resorts";
import { statusLabel } from "@/lib/resorts";

/** 県の色つきチップ */
export function PrefChip({ prefecture }: { prefecture: string }) {
  const c = prefColor(prefecture);
  return (
    <span
      className="inline-flex h-[22px] items-center rounded-full px-2.5 text-xs font-bold tracking-[0.02em]"
      style={{ background: c.bg, color: c.fg }}
    >
      {prefecture}
    </span>
  );
}

/** 営業状況のバッジ。営業中だけ点滅させる */
export function StatusBadge({ resort }: { resort: Resort }) {
  const open = resort.status === "open";
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
        open ? "bg-navy-100 text-navy-700" : "bg-[#EEF0F3] text-sub"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${open ? "pulse bg-navy-700" : "bg-muted"}`}
      />
      {statusLabel(resort)}
    </span>
  );
}

export function ExternalIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}
