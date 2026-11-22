import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "SNOWLINE 関東 | 関東から行けるスキー場の積雪・営業状況",
  description:
    "群馬・栃木・長野・山梨から越後湯沢まで。関東から行けるスキー場の営業状況、積雪、アクセス時間をひとつの画面で比べられます。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=Shippori+Mincho:wght@600;700&family=Allura&display=swap"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-white font-sans text-ink">
        <SiteHeader />
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
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-white">データ出典</span>
              <span>積雪：気象庁ホームページのデータを加工して作成</span>
              <span>予報：Open-Meteo（CC BY 4.0）</span>
              <span>地図：© OpenStreetMap contributors</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
