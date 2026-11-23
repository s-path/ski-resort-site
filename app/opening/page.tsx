import type { Metadata } from "next";
import { GuidePage, ResortList } from "@/components/GuidePage";
import { byOpening } from "@/lib/guides";
import { resorts } from "@/lib/resorts";

const title = "関東から行けるスキー場のオープン日一覧【2026-27】";
const description =
  "群馬・栃木・新潟・長野・山梨など、関東から行けるスキー場35か所の2026-27シーズンのオープン日を早い順にまとめました。営業中のスキー場と大人1日券の料金も一覧で比べられます。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/opening" },
  openGraph: { url: "/opening", title, description },
};

export default function OpeningPage() {
  const items = byOpening(resorts);
  const open = items.filter((r) => r.status === "open").length;
  return (
    <GuidePage
      path="/opening"
      title={title}
      lead={`関東から行けるスキー場${items.length}か所の今季のオープン日を、早い順に並べました。いま営業中なのは${open}か所です。オープン日は積雪によって前後することがあります。`}
      items={items}
    >
      <ResortList items={items} />
    </GuidePage>
  );
}
