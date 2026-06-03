"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, Bell, Command, Plus, LogOut, User, Settings } from "lucide-react";

interface TopbarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function Topbar({ title, subtitle, actions }: TopbarProps) {
  const [q, setQ] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!accountOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!accountRef.current?.contains(e.target as Node)) setAccountOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAccountOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [accountOpen]);

  return (
    <header className="sticky top-0 z-30 h-14 border-b border-[#ECEEF2] bg-white/85 backdrop-blur-xl">
      <div className="flex h-14 items-center gap-4 px-6 pl-16 lg:pl-6">
        {/* Title block */}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[16px] font-semibold tracking-tight text-[#0F172A]">
            {title}
          </h1>
          {subtitle && (
            <p className="truncate text-[13px] text-[#6B7280]">{subtitle}</p>
          )}
        </div>

        {/* Search */}
        <div className="relative hidden md:block w-72">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search subscriptions, charges…"
            className="h-9 w-full rounded-lg border border-[#ECEEF2] bg-[#F6F7F9] pl-9 pr-16 text-[13px] text-[#0F172A] placeholder:text-[#9CA3AF] outline-none transition-colors duration-150 focus:border-[#D1D5DB] focus:bg-white"
          />
          <span className="pointer-events-none absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 rounded-md border border-[#ECEEF2] bg-white px-1.5 py-0.5 text-[10px] text-[#6B7280]">
            <Command size={10} />K
          </span>
        </div>

        {actions ?? (
          <button className="hidden md:inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#0F172A] px-3.5 text-[12.5px] font-semibold text-white transition-colors duration-150 hover:bg-[#1F2937]">
            <Plus size={14} strokeWidth={2.25} />
            Add subscription
          </button>
        )}

        <button
          aria-label="Notifications"
          className="relative grid h-9 w-9 place-items-center rounded-lg border border-[#ECEEF2] bg-white text-[#6B7280] transition-colors duration-150 hover:bg-[#F2F4F7] hover:text-[#0F172A]"
        >
          <Bell size={15} strokeWidth={1.75} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#DC2626] ring-2 ring-white" />
        </button>

        {/* Avatar + account menu */}
        <div ref={accountRef} className="relative">
          <button
            type="button"
            aria-label="Account"
            aria-haspopup="menu"
            aria-expanded={accountOpen}
            onClick={() => setAccountOpen((v) => !v)}
            className="grid h-8 w-8 place-items-center rounded-full bg-[#0F172A] text-[11px] font-semibold text-white transition-transform duration-150 hover:scale-105"
          >
            AL
          </button>

          {accountOpen && (
            <div
              role="menu"
              className="absolute right-0 top-[calc(100%+8px)] z-40 w-56 overflow-hidden rounded-xl border border-[#ECEEF2] bg-white shadow-[0_12px_32px_-12px_rgba(15,23,42,0.18)]"
            >
              <div className="flex items-center gap-3 border-b border-[#ECEEF2] px-3 py-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0F172A] text-[11px] font-semibold text-white">
                  AL
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-[#0F172A]">Alex Lin</p>
                  <p className="truncate text-[11px] text-[#6B7280]">alex@planetmetrics.app</p>
                </div>
              </div>

              <div className="py-1">
                <Link
                  href="/dashboard/settings"
                  role="menuitem"
                  onClick={() => setAccountOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-[#0F172A] transition-colors duration-150 hover:bg-[#F6F7F9]"
                >
                  <User size={14} strokeWidth={1.75} className="text-[#6B7280]" />
                  Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  role="menuitem"
                  onClick={() => setAccountOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-[#0F172A] transition-colors duration-150 hover:bg-[#F6F7F9]"
                >
                  <Settings size={14} strokeWidth={1.75} className="text-[#6B7280]" />
                  Settings
                </Link>
              </div>

              <div className="border-t border-[#ECEEF2] py-1">
                <Link
                  href="/login"
                  role="menuitem"
                  onClick={() => setAccountOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-[#DC2626] transition-colors duration-150 hover:bg-[#FEF2F2]"
                >
                  <LogOut size={14} strokeWidth={1.75} />
                  Log out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
