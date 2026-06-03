"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  LineChart,
  Calendar,
  Bell,
  Settings,
  LifeBuoy,
  ChevronsUpDown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/subscriptions", label: "Subscriptions", icon: CreditCard, badge: "15" },
  { href: "/dashboard/analytics", label: "Analytics", icon: LineChart },
  { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell, badge: "3" },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[244px] flex-col border-r border-[#ECEEF2] bg-[#FAFBFC]">
      {/* Logo */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-2">
          <Logo size="md" tone="light" />
        </div>
      </div>

      {/* Workspace */}
      

      {/* Nav */}
      <nav className="mt-5 flex-1 overflow-y-auto px-3">
        <p className="px-2 pb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#9CA3AF]">
          Workspace
        </p>
        <ul className="space-y-0.5">
          {nav.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex h-9 items-center justify-between rounded-lg px-3 text-[13px] transition-colors duration-150",
                    active
                      ? "border border-[#ECEEF2] bg-white text-[#0F172A] shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
                      : "border border-transparent text-[#6B7280] hover:bg-[#F2F4F7] hover:text-[#0F172A]",
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon
                      size={15}
                      strokeWidth={1.75}
                      className={cn(
                        "shrink-0 transition-colors",
                        active ? "text-[#0F172A]" : "text-[#9CA3AF] group-hover:text-[#0F172A]",
                      )}
                    />
                    {item.label}
                  </span>
                  {item.badge && (
                    <span
                      className={cn(
                        "rounded-md px-1.5 py-px text-[10px] font-medium tabular-nums",
                        active
                          ? "bg-[#F2F4F7] text-[#0F172A]"
                          : "bg-[#F2F4F7] text-[#6B7280]",
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-[#ECEEF2] p-3">
        <Link
          href="#"
          className="flex h-9 items-center gap-2.5 rounded-lg px-3 text-[13px] text-[#6B7280] transition-colors duration-150 hover:bg-[#F2F4F7] hover:text-[#0F172A]"
        >
          <LifeBuoy size={15} strokeWidth={1.75} />
          Help & docs
        </Link>

        {/* Trial */}
        <div className="mt-2 rounded-[10px] border border-[#ECEEF2] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between">
            <p className="text-[11.5px] font-medium text-[#0F172A]">Pro trial</p>
            <span className="rounded-md border border-[#E5E7EB] bg-[#F3F4F6] px-1.5 py-px text-[10px] font-medium text-[#374151]">
              9d left
            </span>
          </div>
          <div className="mt-2.5 h-[3px] overflow-hidden rounded-full bg-[#F2F4F7]">
            <div
              className="h-full rounded-full bg-[#0F172A] transition-all duration-500"
              style={{ width: "35%" }}
            />
          </div>
          <button className="mt-3 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-[#0F172A] text-[12px] font-semibold text-white transition-colors duration-150 hover:bg-[#1F2937]">
            <Sparkles size={12} />
            Upgrade plan
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
