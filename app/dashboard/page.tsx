import Topbar from "@/components/dashboard/Topbar";
import StatCard from "@/components/dashboard/StatCard";
import SpendingTrendChart from "@/components/dashboard/SpendingTrendChart";
import CategoryBreakdownChart from "@/components/dashboard/CategoryBreakdownChart";
import GrowthChart from "@/components/dashboard/GrowthChart";
import SubscriptionsTable from "@/components/dashboard/SubscriptionsTable";
import {
  currency,
  totalMonthly,
  totalYearly,
  activeCount,
  upcomingRenewals,
  subscriptions,
  formatDate,
  daysUntil,
} from "@/lib/mock-data";
import { urgencyColor } from "@/lib/dashboard-theme";
import ServiceLogo from "@/components/dashboard/ServiceLogo";
import { ArrowRight, CalendarClock } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Overview · Planet Metrics" };

export default function DashboardPage() {
  const monthly = totalMonthly();
  const yearly = totalYearly();
  const active = activeCount();
  const upcoming = upcomingRenewals(subscriptions, 14);

  return (
    <>
      <Topbar
        title="Overview"
        subtitle="A pulse on every subscription you're running"
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-6 space-y-6">
        {/* Stats */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Monthly spend"
            countUpValue={monthly}
            prefix="$"
            decimals={2}
            delta={2.4}
            hint="vs. previous 30 days"
            emphasis
          />
          <StatCard
            label="Yearly run-rate"
            countUpValue={yearly}
            prefix="$"
            decimals={0}
            delta={3.1}
            hint="Projected over 12 months"
          />
          <StatCard
            label="Active subscriptions"
            countUpValue={active}
            delta={-1.2}
            hint={`${subscriptions.length - active} inactive`}
          />
          <StatCard
            label="Upcoming renewals"
            countUpValue={upcoming.length}
            hint="In the next 14 days"
          />
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <Panel
            title="Spending trend"
            description="Monthly recurring spend over the last 12 months"
            className="lg:col-span-2"
            kpi={`${currency(monthly)} / mo`}
          >
            <SpendingTrendChart />
          </Panel>

          <Panel
            title="By category"
            description="Where your monthly spend goes"
          >
            <CategoryBreakdownChart />
          </Panel>
        </section>

        <section className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <Panel
            title="Subscription growth"
            description="Active count, month over month"
            className="lg:col-span-2"
          >
            <GrowthChart />
          </Panel>

          <Panel
            title="Next renewals"
            description="Don't get caught by surprise"
          >
            <ul className="-mx-2">
              {upcoming.slice(0, 5).map((s) => {
                const days = daysUntil(s.renewalDate);
                return (
                  <li
                    key={s.id}
                    className="flex items-center justify-between rounded-lg px-2 py-2.5 transition-colors duration-150 hover:bg-[#F6F7F9]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <ServiceLogo service={s.service} short={s.short} size={32} />
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-medium text-[#0F172A]">{s.service}</p>
                        <p className="font-mono text-[11px] text-[#6B7280]">
                          {formatDate(s.renewalDate)}{" \u00B7 "}
                          <span style={{ color: urgencyColor(days) }}>in {days}d</span>
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[13px] font-semibold tabular-nums text-[#0F172A]">
                      {currency(s.amount)}
                    </span>
                  </li>
                );
              })}
              {upcoming.length === 0 && (
                <li className="flex items-center gap-3 px-2 py-6 text-[12px] text-[#6B7280]">
                  <CalendarClock size={14} /> Nothing renewing soon.
                </li>
              )}
            </ul>
          </Panel>
        </section>

        {/* Recent subscriptions */}
        <section>
          <div className="mb-3 flex items-end justify-between">
            <div>
              <h2 className="text-[13.5px] font-semibold text-[#0F172A]">Subscriptions</h2>
              <p className="text-[12px] text-[#6B7280]">Most recently active across your workspace</p>
            </div>
            <Link
              href="/dashboard/subscriptions"
              className="inline-flex items-center gap-1 text-[12px] text-[#6B7280] transition-colors duration-150 hover:text-[#0F172A]"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <SubscriptionsTable pageSize={6} showToolbar={false} />
        </section>
      </main>
    </>
  );
}

function Panel({
  title,
  description,
  className,
  children,
  kpi,
}: {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
  kpi?: string;
}) {
  return (
    <div
      className={`rounded-[10px] border border-[#ECEEF2] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${className ?? ""}`}
    >
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-[13.5px] font-semibold text-[#0F172A]">{title}</h3>
          {description && (
            <p className="mt-0.5 text-[12px] text-[#6B7280]">{description}</p>
          )}
        </div>
        {kpi && (
          <span className="font-mono text-[11.5px] text-[#6B7280] tabular-nums">
            {kpi}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
