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
      <div className="mx-auto flex min-h-[68px] max-w-[1200px] flex-wrap items-center justify-between gap-x-6 px-4 sm:px-6">
        <Link
          href="/"
          className="flex min-h-[56px] items-center gap-2.5 text-navy-950"
        >
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
          className="no-scrollbar -mx-4 flex w-[calc(100%+2rem)] gap-6 overflow-x-auto whitespace-nowrap border-t border-line px-4 py-3 text-[13px] font-medium sm:-mx-6 sm:w-[calc(100%+3rem)] sm:px-6 md:mx-0 md:w-auto md:gap-7 md:overflow-visible md:border-0 md:px-0 md:py-2 md:text-sm"
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
