import Topbar from "@/components/dashboard/Topbar";
import SubscriptionsTable from "@/components/dashboard/SubscriptionsTable";

export const metadata = { title: "Subscriptions · Planet Metrics" };

export default function SubscriptionsPage() {
  return (
    <>
      <Topbar
        title="Subscriptions"
        subtitle="All recurring charges across your workspace"
      />
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-6">
        <SubscriptionsTable />
      </main>
    </>
  );
}
