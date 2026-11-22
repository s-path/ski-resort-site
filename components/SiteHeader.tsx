"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/resorts", label: "スキー場を探す" },
  { href: "/#open", label: "オープン状況" },
  { href: "/#area", label: "エリア" },
  { href: "/#snow", label: "積雪・天気" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex min-h-[68px] max-w-[1200px] flex-wrap items-center justify-between gap-6 px-6">
        <Link href="/" className="flex items-center gap-2.5 text-navy-950">
          <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
            <rect width="28" height="28" rx="7" fill="#0A1F44" />
            <path d="M6 20 L12 10 L16 16 L18 13 L22 20 Z" fill="#FFFFFF" />
          </svg>
          <span className="text-[17px] font-bold tracking-[0.02em]">
            SNOWLINE
            <span className="ml-1.5 text-[13px] font-medium text-sub">
              関東
            </span>
          </span>
        </Link>
        <nav
          aria-label="メイン"
          className="flex flex-wrap gap-7 py-2 text-sm font-medium"
        >
          {NAV.map((n) => {
            const current =
              n.href === "/resorts" && pathname.startsWith("/resorts");
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`navlink ${current ? "font-semibold text-navy-700" : "text-ink"}`}
                aria-current={current ? "page" : undefined}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
