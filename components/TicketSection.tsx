import { formatShortDate } from "@/lib/resorts";
import {
  activeDeals,
  SEASON_NOTE,
  TICKETS_CHECKED_AT,
  type TicketInfo,
} from "@/lib/tickets";
import { ExternalIcon } from "./Badges";

const card = "rounded-xl border border-line";

/** 今日の日付（日本時間、YYYY-MM-DD） */
function todayInTokyo() {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(
    new Date(),
  );
}

/** 詳細ページのリフト券料金。料金表・お得な買い方・購入ページ */
export function TicketSection({
  tickets: t,
  officialUrl,
}: {
  tickets?: TicketInfo;
  officialUrl?: string;
}) {
  if (!t) {
    return (
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-navy-950">リフト券料金</h2>
        <p className={`${card} p-5 text-sm text-sub`}>
          今季の料金を確認中です。最新の料金は
          {officialUrl ? (
            <a
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tlink mx-1 text-navy-700"
            >
              公式サイト
            </a>
          ) : (
            "公式サイト"
          )}
          でご確認ください。
        </p>
      </section>
    );
  }

  const deals = activeDeals(t, todayInTokyo());
  const seasonNote = SEASON_NOTE[t.season];
  const hasChild = t.rows.some((r) => r.child);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-xl font-bold text-navy-950">リフト券料金</h2>
        <span className="text-xs text-sub">
          {seasonNote ?? "2026-27シーズン"}
        </span>
      </div>

      <div className={`${card} overflow-hidden`}>
        <table className="w-full text-sm">
          <caption className="sr-only">1日券の料金</caption>
          <thead className="bg-mist text-left text-xs text-sub">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">
                1日券
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                大人
              </th>
              {hasChild && (
                <th scope="col" className="px-5 py-3 font-medium">
                  こども
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {t.rows.map((r) => (
              <tr key={r.label} className="border-t border-line">
                <th scope="row" className="px-5 py-3 text-left font-normal">
                  {r.label}
                </th>
                <td className="px-5 py-3 font-bold tabular-nums text-navy-950">
                  {r.adult}
                </td>
                {hasChild && (
                  <td className="px-5 py-3 tabular-nums">{r.child ?? "—"}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {(t.ageNote || t.notes) && (
          <ul className="flex flex-col gap-1 border-t border-line px-5 py-3 text-xs text-sub">
            {t.ageNote && <li>{t.ageNote}</li>}
            {t.notes?.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        )}
      </div>

      {deals.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-[15px] font-bold text-navy-950">お得な買い方</h3>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3">
            {deals.map((d) => (
              <li
                key={d.title}
                className={`lift ${card} flex flex-col gap-1.5 p-5`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-navy-950">{d.title}</span>
                  {d.until && (
                    <span className="rounded-md bg-[#FFF4E5] px-2 py-0.5 text-xs font-semibold text-[#9A5B00]">
                      {formatShortDate(d.until)}まで
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#3A4456]">{d.detail}</p>
                {d.url && (
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tlink mt-1 inline-flex w-fit items-center gap-1 text-[13px] font-semibold text-navy-700"
                  >
                    購入ページへ
                    <ExternalIcon />
                    <span className="sr-only">（新しいタブで開く）</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-sub">
          {TICKETS_CHECKED_AT.replaceAll("-", "/")} 時点・出典：
          <a
            href={t.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tlink ml-1 text-sub"
          >
            {t.source.label}
          </a>
          。料金は変わることがあるので、購入前に公式サイトでご確認ください。
        </p>
        {t.buy && (
          <a
            href={t.buy.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn inline-flex h-11 items-center gap-2 rounded-lg bg-navy-700 px-[18px] text-sm font-semibold text-white"
          >
            リフト券を買う（{t.buy.label}）
            <ExternalIcon />
            <span className="sr-only">（新しいタブで開く）</span>
          </a>
        )}
      </div>
    </section>
  );
}
