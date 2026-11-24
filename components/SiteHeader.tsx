"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

const NAV = [
  { href: "/resorts", label: "スキー場を探す" },
  { href: "/#open", label: "オープン状況" },
  { href: "/#area", label: "エリア" },
  { href: "/#snow", label: "積雪・天気" },
];

type NavLink = { href: string; label: string };

export function SiteHeader({ guides = [] }: { guides?: NavLink[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // ページを移動したら閉じる
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname の変化をきっかけに閉じる
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // 開いているあいだは背面のスクロールを止め、Esc で閉じる。PC幅になったら閉じる
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const isCurrent = (href: string) =>
    href === "/resorts" ? pathname.startsWith("/resorts") : pathname === href;

  return (
    <header className="relative z-40 border-b border-line bg-white">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-x-6 px-4 sm:px-6 md:h-[68px]">
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
          className="hidden gap-7 py-2 text-sm font-medium md:flex"
        >
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`navlink ${isCurrent(n.href) ? "font-semibold text-navy-700" : "text-ink"}`}
              aria-current={isCurrent(n.href) ? "page" : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-navy-950 md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-transform duration-300 ${open ? "top-[7px] rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 rounded bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-transform duration-300 ${open ? "top-[7px] -rotate-45" : "top-[14px]"}`}
            />
          </span>
        </button>
      </div>

      <div
        id={menuId}
        className={`fixed inset-x-0 bottom-0 top-14 overflow-y-auto bg-white transition-[opacity,visibility] duration-200 md:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
        inert={!open}
      >
        <nav aria-label="メニュー" className="flex flex-col px-4 pb-10 pt-2">
          <ul className="flex flex-col divide-y divide-line border-b border-line">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  aria-current={isCurrent(n.href) ? "page" : undefined}
                  className={`flex h-14 items-center justify-between text-[15px] font-semibold ${isCurrent(n.href) ? "text-navy-700" : "text-navy-950"}`}
                >
                  {n.label}
                  <span aria-hidden="true" className="text-sub">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {guides.length > 0 && (
            <>
              <p className="mb-2 mt-6 text-xs font-semibold tracking-[0.08em] text-sub">
                特集
              </p>
              <ul className="flex flex-col">
                {guides.map((g) => (
                  <li key={g.href}>
                    <Link
                      href={g.href}
                      onClick={() => setOpen(false)}
                      aria-current={isCurrent(g.href) ? "page" : undefined}
                      className={`flex min-h-11 items-center text-sm ${isCurrent(g.href) ? "font-semibold text-navy-700" : "text-[#3A4456]"}`}
                    >
                      {g.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
