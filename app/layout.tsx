import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { GUIDE_LINKS } from "@/components/GuidePage";
import { SiteHeader } from "@/components/SiteHeader";
import { hotelsEnabled } from "@/lib/hotels";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
// フォントは自前で配信（Google Fonts への外部リクエストをなくして表示を速くする）
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/noto-sans-jp/400.css";
import "@fontsource/noto-sans-jp/500.css";
import "@fontsource/noto-sans-jp/700.css";
import "@fontsource/shippori-mincho/600.css";
import "@fontsource/shippori-mincho/700.css";
import "@fontsource/allura/400.css";
import "./globals.css";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | 関東から行けるスキー場のオープン日・リフト券料金`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: SITE_NAME,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  // Search Console の所有確認。Vercel の環境変数に入れると出る
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0a1f44",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="flex min-h-screen flex-col bg-white font-sans text-ink">
        <SiteHeader guides={GUIDE_LINKS} />
        <main className="flex-1">{children}</main>
        <footer className="bg-navy-950 text-[#C9D2E3]">
          <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-8 px-6 py-12 text-[13px] leading-[1.9]">
            <div className="flex flex-col gap-2">
              <span className="text-base font-bold text-white">
                SNOWLINE 関東
              </span>
              <span>
                営業状況・料金は必ず各スキー場の公式サイトでご確認ください。
              </span>
              {hotelsEnabled() && (
                <span>
                  当サイトはアフィリエイト広告（楽天アフィリエイトなど）を利用しています。
                </span>
              )}
            </div>
            <nav aria-label="特集" className="flex flex-col gap-0.5">
              <span className="mb-1 flex items-center gap-1.5 font-semibold text-white">
                <Icon name="sparkle" size={15} />
                特集
              </span>
              {GUIDE_LINKS.map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="tlink inline-flex w-fit items-center gap-1.5"
                >
                  <Icon name={g.icon} size={14} className="opacity-70" />
                  {g.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-0.5">
              <span className="mb-1 flex items-center gap-1.5 font-semibold text-white">
                <Icon name="data" size={15} />
                データ出典
              </span>
              <span>積雪：気象庁ホームページのデータを加工して作成</span>
              <span>予報：Open-Meteo（CC BY 4.0）</span>
              <span>地図：© OpenStreetMap contributors</span>
            </div>
          </div>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
