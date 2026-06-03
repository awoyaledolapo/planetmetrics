import Topbar from "@/components/dashboard/Topbar";
import { subscriptions, currency, formatDate, daysUntil } from "@/lib/mock-data";
import { urgencyColor } from "@/lib/dashboard-theme";
import ServiceLogo from "@/components/dashboard/ServiceLogo";

export const metadata = { title: "Calendar · Planet Metrics" };

const MONTHS = ["Jun 2026", "Jul 2026", "Aug 2026"];

export default function CalendarPage() {
  const groups = MONTHS.map((label, i) => {
    const offset = i;
    const items = subscriptions
      .filter((s) => {
        const d = new Date(s.renewalDate);
        const base = new Date("2026-06-01");
        base.setMonth(base.getMonth() + offset);
        return d.getMonth() === base.getMonth() && d.getFullYear() === base.getFullYear();
      })
      .sort((a, b) => a.renewalDate.localeCompare(b.renewalDate));
    return { label, items };
  });

  return (
    <>
      <Topbar title="Calendar" subtitle="Renewals scheduled across upcoming months" />
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-6 space-y-6">
        {groups.map((g) => (
          <section
            key={g.label}
            className="rounded-[10px] border border-[#ECEEF2] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[13.5px] font-semibold text-[#0F172A]">{g.label}</h3>
              <span className="font-mono text-[11.5px] tabular-nums text-[#6B7280]">
                {g.items.length} renewals
              </span>
            </div>
            {g.items.length === 0 ? (
              <p className="text-[12px] text-[#6B7280]">No scheduled renewals.</p>
            ) : (
              <ul className="divide-y divide-[#F1F2F4]">
                {g.items.map((s) => {
                  const days = daysUntil(s.renewalDate);
                  return (
                    <li key={s.id} className="flex items-center justify-between py-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg border border-[#ECEEF2] bg-[#F6F7F9]">
                          <span className="text-[9px] uppercase tracking-[0.10em] text-[#9CA3AF]">
                            {new Date(s.renewalDate).toLocaleString("en-US", { month: "short" })}
                          </span>
                          <span className="font-mono text-[13px] font-semibold tabular-nums text-[#0F172A]">
                            {new Date(s.renewalDate).getDate()}
                          </span>
                        </div>
                        <ServiceLogo service={s.service} short={s.short} size={32} />
                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-medium text-[#0F172A]">
                            {s.service}
                          </p>
                          <p className="font-mono text-[11px] text-[#6B7280]">
                            {formatDate(s.renewalDate)}{" \u00B7 "}
                            <span style={{ color: urgencyColor(days) }}>
                              {days >= 0 ? `in ${days}d` : `${Math.abs(days)}d ago`}
                            </span>
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-[13px] font-semibold tabular-nums text-[#0F172A]">
                        {currency(s.amount)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        ))}
      </main>
    </>
  );
}
