import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePage, ResortList } from "@/components/GuidePage";
import { PREF_PAGES, prefPage, resortsIn } from "@/lib/guides";

type Props = { params: Promise<{ pref: string }> };

export function generateStaticParams() {
  return PREF_PAGES.map((p) => ({ pref: p.slug }));
}

export const dynamicParams = false;

function texts(label: string, count: number) {
  return {
    title: `${label}のスキー場 オープン日・リフト券料金一覧【2026-27】`,
    description: `${label}県で関東から行けるスキー場${count}か所の2026-27シーズンのオープン日・営業状況・大人1日券の料金を一覧にしました。オープンが早い順に並べています。`,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pref } = await params;
  const p = prefPage(pref);
  if (!p) return {};
  const { title, description } = texts(p.label, resortsIn(p.prefecture).length);
  const path = `/area/${p.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { url: path, title, description },
  };
}

export default async function AreaPage({ params }: Props) {
  const { pref } = await params;
  const p = prefPage(pref);
  if (!p) notFound();
  const items = resortsIn(p.prefecture);
  const { title, description } = texts(p.label, items.length);
  return (
    <GuidePage
      path={`/area/${p.slug}`}
      title={title}
      lead={description}
      items={items}
    >
      <ResortList items={items} />
    </GuidePage>
  );
}
