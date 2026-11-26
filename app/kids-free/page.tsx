import type { Metadata } from "next";
import { GuidePage, ResortList } from "@/components/GuidePage";
import { IconTile } from "@/components/Icons";
import { kidsFreeResorts } from "@/lib/guides";

const title = "小学生のリフト券が無料のスキー場【2026-27】関東から行ける";
const description =
  "関東から行けるスキー場のうち、小学生のリフト券がいつでも無料のスキー場と、平日やスキーこどもの日だけ無料になるスキー場をまとめました。家族スキーの行き先選びに。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/kids-free" },
  openGraph: { url: "/kids-free", title, description },
};

// オープン予定日を過ぎたら「営業中」に切り替わるよう、6時間ごとに作り直す
export const revalidate = 21600;

export default function KidsFreePage() {
  const { always, partial } = kidsFreeResorts();
  const notes = new Map(partial.map((p) => [p.resort.id, p.note]));
  return (
    <GuidePage
      path="/kids-free"
      title={title}
      lead={`小学生のリフト券がいつでも無料なのは${always.length}か所、平日や「スキーこどもの日」など条件つきで無料になるのは${partial.length}か所です。未就学児はほとんどのスキー場で無料ですが、保護者1人につき人数の上限があることがあります。`}
      items={[...always, ...partial.map((p) => p.resort)]}
    >
      <section className="flex flex-col gap-4">
        <h2 className="flex items-center gap-2.5 text-xl font-bold text-navy-950">
          <IconTile name="gift" />
          いつでも無料
        </h2>
        <ResortList items={always} />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="flex items-center gap-2.5 text-xl font-bold text-navy-950">
          <IconTile name="calendar" />
          条件つきで無料
        </h2>
        <ResortList
          items={partial.map((p) => p.resort)}
          note={(r) => notes.get(r.id)}
        />
      </section>
    </GuidePage>
  );
}
