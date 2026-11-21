import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "SNOWLINE | 関東周辺のスキー場 積雪・営業状況",
  description:
    "関東周辺（群馬・栃木・長野・山梨）のスキー場の積雪と営業状況をまとめて確認できるサイト。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className="h-full">
      <body className="flex min-h-full flex-col bg-white text-slate-900">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy-950/70 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold tracking-[0.2em] text-white"
            >
              <span className="inline-block h-2.5 w-2.5 rotate-45 bg-white" />
              SNOWLINE
            </Link>
            <nav className="flex items-center gap-6 text-sm text-white/80">
              <Link href="/#resorts" className="transition hover:text-white">
                スキー場一覧
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-slate-500">
            <p className="font-semibold tracking-[0.2em] text-navy-900">
              SNOWLINE
            </p>
            <p className="mt-3">
              掲載している積雪・営業状況は画面確認用のサンプルデータです。実際の情報は各スキー場の公式サイトで確認してください。
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
