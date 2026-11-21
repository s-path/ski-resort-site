import { type ResortStatus, STATUS_LABEL } from "@/lib/resorts";

const STYLES: Record<ResortStatus, string> = {
  open: "bg-navy-700 text-white",
  partial: "bg-navy-100 text-navy-800",
  preparing: "bg-slate-100 text-slate-500",
};

const DOT: Record<ResortStatus, string> = {
  open: "bg-white animate-pulse",
  partial: "bg-navy-600 animate-pulse",
  preparing: "bg-slate-400",
};

export function StatusBadge({ status }: { status: ResortStatus }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${STYLES[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${DOT[status]}`} />
      {STATUS_LABEL[status]}
    </span>
  );
}
