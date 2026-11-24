import {
  Baby,
  BadgePercent,
  BedDouble,
  CalendarDays,
  CircleCheck,
  Clock,
  Database,
  Gift,
  Layers,
  type LucideIcon,
  Map as MapIcon,
  MapPin,
  Moon,
  Mountain,
  Search,
  SlidersHorizontal,
  Snowflake,
  Sparkles,
  Star,
  Sun,
  Ticket,
  TrainFront,
} from "lucide-react";

// サイト全体で使うアイコン。サーバーからクライアントへは名前（文字列）で渡す
export const ICONS = {
  search: Search,
  calendar: CalendarDays,
  map: MapIcon,
  pin: MapPin,
  snow: Snowflake,
  star: Star,
  ticket: Ticket,
  deal: BadgePercent,
  moon: Moon,
  kids: Baby,
  gift: Gift,
  mountain: Mountain,
  sun: Sun,
  train: TrainFront,
  open: CircleCheck,
  clock: Clock,
  layers: Layers,
  hotel: BedDouble,
  filter: SlidersHorizontal,
  sparkle: Sparkles,
  data: Database,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  size = 16,
  className,
  strokeWidth = 2,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const C = ICONS[name];
  return (
    <C
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
      focusable="false"
    />
  );
}

/** 見出しの左に置く、淡い色の角丸タイル付きアイコン */
export function IconTile({
  name,
  size = "md",
}: {
  name: IconName;
  size?: "sm" | "md" | "lg";
}) {
  const box = { sm: "h-7 w-7", md: "h-9 w-9", lg: "h-11 w-11" }[size];
  const icon = { sm: 15, md: 18, lg: 22 }[size];
  return (
    <span
      className={`inline-flex ${box} shrink-0 items-center justify-center rounded-lg bg-[#EAF0FA] text-navy-700`}
      aria-hidden="true"
    >
      <Icon name={name} size={icon} />
    </span>
  );
}
