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
      <div className="mx-auto flex h-12 max-w-[1200px] items-center justify-between gap-x-3 px-4 sm:px-6 md:h-[68px] md:gap-x-6">
        <Link
          href="/"
          className="order-last flex shrink-0 items-center gap-2 text-navy-950 md:order-first md:gap-2.5"
        >
          <svg
            viewBox="0 0 28 28"
            aria-hidden="true"
            className="h-6 w-6 md:h-7 md:w-7"
          >
            <rect width="28" height="28" rx="7" fill="#0A1F44" />
            <path d="M6 20 L12 10 L16 16 L18 13 L22 20 Z" fill="#FFFFFF" />
          </svg>
          <span className="text-[15px] font-bold tracking-[0.02em] md:text-[17px]">
            SNOWLINE
            <span className="ml-1.5 hidden text-[13px] font-medium text-sub sm:inline">
              関東
            </span>
          </span>
        </Link>
        <nav
          aria-label="メイン"
          className="no-scrollbar flex min-w-0 flex-1 gap-4 overflow-x-auto whitespace-nowrap py-2 text-[13px] font-medium md:flex-none md:gap-7 md:overflow-visible md:text-sm"
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
