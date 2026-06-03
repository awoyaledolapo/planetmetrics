import Topbar from "@/components/dashboard/Topbar";
import { Bell, CreditCard, AlertTriangle, CheckCircle2 } from "lucide-react";

export const metadata = { title: "Notifications · Planet Metrics" };

const items = [
  {
    id: 1, icon: AlertTriangle, tone: "warning" as const,
    title: "AWS bill is 12% above last month",
    body: "Spend reached $342.40 — driven by S3 egress in us-east-1.",
    time: "2h ago",
  },
  {
    id: 2, icon: CreditCard, tone: "neutral" as const,
    title: "ChatGPT Plus renews in 4 days",
    body: "$20.00 will be charged to •••• 4242 on June 7, 2026.",
    time: "Today",
  },
  {
    id: 3, icon: CheckCircle2, tone: "success" as const,
    title: "Loom subscription canceled",
    body: "We won't track future renewals for this service.",
    time: "Yesterday",
  },
  {
    id: 4, icon: Bell, tone: "neutral" as const,
    title: "Weekly digest is ready",
    body: "Your spend, renewals, and category trends for the past 7 days.",
    time: "2d ago",
  },
];

const toneStyles: Record<"warning" | "success" | "neutral", string> = {
  warning: "bg-[#FEF3C7] text-[#92400E] ring-[#FDE68A]",
  success: "bg-[#ECFDF5] text-[#047857] ring-[#D1FAE5]",
  neutral: "bg-[#F3F4F6] text-[#374151] ring-[#E5E7EB]",
};

export default function NotificationsPage() {
  return (
    <>
      <Topbar
        title="Notifications"
        subtitle="Renewal reminders, billing changes, weekly digests"
      />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-6">
        <ul className="divide-y divide-[#F1F2F4] overflow-hidden rounded-xl border border-[#ECEEF2] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          {items.map((n) => {
            const Icon = n.icon;
            return (
              <li key={n.id} className="flex gap-4 px-5 py-4 transition hover:bg-[#FAFBFC]">
                <span
                  className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ring-1 ring-inset ${toneStyles[n.tone]}`}
                >
                  <Icon size={14} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-[13px] font-medium text-[#0F172A]">{n.title}</p>
                    <span className="shrink-0 text-[11px] text-[#6B7280]">{n.time}</span>
                  </div>
                  <p className="mt-0.5 text-[12px] text-[#6B7280]">{n.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
