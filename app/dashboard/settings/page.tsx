import Topbar from "@/components/dashboard/Topbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Settings · Planet Metrics" };

export default function SettingsPage() {
  return (
    <>
      <Topbar title="Settings" subtitle="Workspace, billing, and notification preferences" />
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-6 space-y-5">
        <Section title="Profile" description="Used across your workspace and exported reports.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full name" defaultValue="Ada Lovelace" />
            <Field label="Email" defaultValue="ada@acme.com" type="email" />
            <Field label="Role" defaultValue="Finance Lead" />
            <Field label="Timezone" defaultValue="UTC+01:00 — Lagos" />
          </div>
        </Section>

        <Section title="Workspace" description="Information about your billing entity.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Workspace name" defaultValue="Acme, Inc." />
            <Field label="Default currency" defaultValue="USD" />
          </div>
        </Section>

        <Section title="Notifications" description="Decide how and when we ping you.">
          <ToggleRow title="Renewal reminders" desc="Email me 3 days before any renewal." defaultOn />
          <ToggleRow title="Spend anomalies" desc="Alert if a category spikes more than 20%." defaultOn />
          <ToggleRow title="Weekly digest" desc="A summary every Monday morning." />
        </Section>

        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" className="text-[#6B7280] hover:text-[#0F172A]">
            Discard
          </Button>
          <Button className="bg-[#0F172A] text-white hover:bg-[#1F2937]">
            Save changes
          </Button>
        </div>
      </main>
    </>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-[#ECEEF2] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="mb-5">
        <h3 className="text-[14px] font-semibold text-[#0F172A]">{title}</h3>
        <p className="text-[12px] text-[#6B7280]">{description}</p>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Field({
  label,
  defaultValue,
  type,
}: {
  label: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-[#6B7280]">{label}</Label>
      <Input defaultValue={defaultValue} type={type} className="h-9" />
    </div>
  );
}

function ToggleRow({
  title,
  desc,
  defaultOn,
}: {
  title: string;
  desc: string;
  defaultOn?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-lg border border-[#ECEEF2] bg-[#FAFBFC] px-4 py-3 transition hover:bg-[#F2F4F7]">
      <span>
        <span className="block text-[13px] text-[#0F172A]">{title}</span>
        <span className="block text-[11px] text-[#6B7280]">{desc}</span>
      </span>
      <span className="relative inline-block h-5 w-9">
        <input type="checkbox" defaultChecked={defaultOn} className="peer sr-only" />
        <span className="absolute inset-0 rounded-full bg-[#E5E7EB] transition peer-checked:bg-[#0F172A]" />
        <span className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition peer-checked:translate-x-4" />
      </span>
    </label>
  );
}
