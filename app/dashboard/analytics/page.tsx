import Topbar from "@/components/dashboard/Topbar";
import StatCard from "@/components/dashboard/StatCard";
import SpendingTrendChart from "@/components/dashboard/SpendingTrendChart";
import GrowthChart from "@/components/dashboard/GrowthChart";
import CategoryBreakdownChart from "@/components/dashboard/CategoryBreakdownChart";
import { totalMonthly, totalYearly } from "@/lib/mock-data";

export const metadata = { title: "Analytics · Planet Metrics" };

export default function AnalyticsPage() {
  const monthly = totalMonthly();
  const yearly = totalYearly();

  return (
    <>
      <Topbar title="Analytics" subtitle="Trends, segments, and spend efficiency" />
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-6 space-y-6">
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard
            label="Monthly average"
            countUpValue={monthly}
            prefix="$"
            decimals={2}
            delta={2.4}
          />
          <StatCard
            label="Annual projection"
            countUpValue={yearly}
            prefix="$"
            decimals={0}
            delta={3.1}
          />
          <StatCard
            label="Avg. per service"
            countUpValue={monthly / 12}
            prefix="$"
            decimals={2}
            delta={-0.6}
          />
        </section>

        <Panel title="Spending trend" description="Last 12 months">
          <SpendingTrendChart />
        </Panel>

        <section className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Panel title="Subscription growth" description="Active count over time">
            <GrowthChart />
          </Panel>
          <Panel title="Category mix" description="Monthly composition">
            <CategoryBreakdownChart />
          </Panel>
        </section>
      </main>
    </>
  );
}

function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[10px] border border-[#ECEEF2] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="mb-5">
        <h3 className="text-[13.5px] font-semibold text-[#0F172A]">{title}</h3>
        {description && (
          <p className="mt-0.5 text-[12px] text-[#6B7280]">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
