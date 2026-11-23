import { OG_SIZE, renderOg } from "@/lib/og";
import { formatShortDate, getResort, resorts } from "@/lib/resorts";
import { adultPriceLabel, getTickets } from "@/lib/tickets";

export const alt = "スキー場の2026-27オープン日とリフト券料金";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return resorts.map((r) => ({ id: r.id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const r = getResort(id);
  if (!r) {
    return renderOg({
      eyebrow: "",
      title: "スキー場が見つかりません",
      lines: [],
    });
  }
  const t = getTickets(r.id);
  const opening =
    r.status === "open" && r.openingDate
      ? `${formatShortDate(r.openingDate)}から営業中`
      : r.openingDate
        ? `${formatShortDate(r.openingDate)} オープン予定`
        : r.openingLabel
          ? `${r.openingLabel} オープン予定`
          : "オープン日 確認中";
  return renderOg({
    eyebrow: `${r.prefecture}・${r.areaLabel}　2026-27シーズン`,
    title: r.name,
    lines: [opening, t ? `大人1日券 ${adultPriceLabel(t)}` : ""].filter(
      Boolean,
    ),
  });
}
