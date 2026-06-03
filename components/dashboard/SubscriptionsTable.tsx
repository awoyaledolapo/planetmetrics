"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Search,
  Inbox,
  X,
} from "lucide-react";
import {
  subscriptions,
  currency,
  formatDate,
  daysUntil,
  type Subscription,
} from "@/lib/mock-data";
import { tintFor, urgencyColor } from "@/lib/dashboard-theme";
import ServiceLogo from "@/components/dashboard/ServiceLogo";
import { cn } from "@/lib/utils";

type SortKey = "service" | "category" | "billingCycle" | "renewalDate" | "amount" | "status";

interface SubscriptionsTableProps {
  data?: Subscription[];
  pageSize?: number;
  showToolbar?: boolean;
}

const STATUS_FILTERS: Subscription["status"][] = ["active", "trial", "paused", "canceled"];
const BILLING_FILTERS: Subscription["billingCycle"][] = ["monthly", "yearly", "quarterly"];

export function SubscriptionsTable({
  data = subscriptions,
  pageSize,
  showToolbar = true,
}: SubscriptionsTableProps) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("renewalDate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState<Subscription["status"] | null>(null);
  const [billingFilter, setBillingFilter] = useState<Subscription["billingCycle"] | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(data.map((d) => d.category))).sort(),
    [data],
  );

  const rows = useMemo(() => {
    let list = data.filter((s) => {
      const matchesQ =
        s.service.toLowerCase().includes(query.toLowerCase()) ||
        s.category.toLowerCase().includes(query.toLowerCase());
      const matchesS = !statusFilter || s.status === statusFilter;
      const matchesB = !billingFilter || s.billingCycle === billingFilter;
      const matchesC = !categoryFilter || s.category === categoryFilter;
      return matchesQ && matchesS && matchesB && matchesC;
    });
    list = [...list].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number")
        return sortDir === "asc" ? av - bv : bv - av;
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    if (pageSize) list = list.slice(0, pageSize);
    return list;
  }, [data, query, sortKey, sortDir, pageSize, statusFilter, billingFilter, categoryFilter]);

  const setSort = (k: SortKey) => {
    if (k === sortKey) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(k);
      setSortDir("asc");
    }
  };

  const clearFilters = () => {
    setStatusFilter(null);
    setBillingFilter(null);
    setCategoryFilter(null);
  };

  return (
    <div className="overflow-hidden rounded-[10px] border border-[#ECEEF2] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      {/* Toolbar */}
      {showToolbar && (
        <div className="flex flex-col gap-3 border-b border-[#ECEEF2] px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative w-full max-w-sm">
              <Search
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search service or category…"
                className="h-9 w-full rounded-lg border border-[#ECEEF2] bg-[#F6F7F9] pl-9 pr-3 text-[13px] text-[#0F172A] placeholder:text-[#9CA3AF] outline-none transition-colors duration-150 focus:border-[#D1D5DB] focus:bg-white"
              />
            </div>

            {/* Filter selectors */}
            <div className="flex flex-wrap items-center gap-2">
              <FilterMenu
                label="Status"
                value={statusFilter}
                options={STATUS_FILTERS}
                onChange={setStatusFilter}
                capitalize
              />
              <FilterMenu
                label="Billing"
                value={billingFilter}
                options={BILLING_FILTERS}
                onChange={setBillingFilter}
                capitalize
              />
              <FilterMenu
                label="Category"
                value={categoryFilter}
                options={categories}
                onChange={setCategoryFilter}
              />
              <span className="font-mono text-[11px] tabular-nums text-[#6B7280]">
                {rows.length}/{data.length}
              </span>
            </div>
          </div>

          {/* Active chips */}
          {(statusFilter || billingFilter || categoryFilter) && (
            <div className="flex flex-wrap items-center gap-2">
              {statusFilter && (
                <Chip onClear={() => setStatusFilter(null)}>
                  Status: <span className="capitalize text-[#0F172A]">{statusFilter}</span>
                </Chip>
              )}
              {billingFilter && (
                <Chip onClear={() => setBillingFilter(null)}>
                  Billing: <span className="capitalize text-[#0F172A]">{billingFilter}</span>
                </Chip>
              )}
              {categoryFilter && (
                <Chip onClear={() => setCategoryFilter(null)}>
                  Category: <span className="text-[#0F172A]">{categoryFilter}</span>
                </Chip>
              )}
              <button
                onClick={clearFilters}
                className="text-[11px] text-[#6B7280] underline-offset-2 transition-colors duration-150 hover:text-[#0F172A] hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#ECEEF2] bg-[#FAFBFC]">
              <Th onClick={() => setSort("service")} active={sortKey === "service"} dir={sortDir}>
                Service
              </Th>
              <Th onClick={() => setSort("category")} active={sortKey === "category"} dir={sortDir}>
                Category
              </Th>
              <Th onClick={() => setSort("billingCycle")} active={sortKey === "billingCycle"} dir={sortDir}>
                Billing
              </Th>
              <Th onClick={() => setSort("renewalDate")} active={sortKey === "renewalDate"} dir={sortDir}>
                Renews
              </Th>
              <Th onClick={() => setSort("amount")} active={sortKey === "amount"} dir={sortDir} align="right">
                Amount
              </Th>
              <Th onClick={() => setSort("status")} active={sortKey === "status"} dir={sortDir}>
                Status
              </Th>
              <th className="px-5 py-3" aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-20">
                  <EmptyState />
                </td>
              </tr>
            ) : (
              rows.map((s, i) => {
                const days = daysUntil(s.renewalDate);
                const tint = tintFor(s.category);
                const dueColor = urgencyColor(days);

                return (
                  <tr
                    key={s.id}
                    className="group transition-colors duration-150 hover:bg-[#FAFBFC]"
                    style={{
                      borderBottom:
                        i === rows.length - 1 ? "none" : "1px solid #F1F2F4",
                      animation: "pmRowIn 280ms ease both",
                      animationDelay: `${i * 35}ms`,
                    }}
                  >
                    {/* Service */}
                    <td className="px-5" style={{ height: 56 }}>
                      <div className="flex items-center gap-3">
                        <ServiceLogo service={s.service} short={s.short} size={32} />
                        <div className="min-w-0">
                          <p className="truncate text-[14px] font-semibold text-[#0F172A]">
                            {s.service}
                          </p>
                          <p className="font-mono text-[11.5px] text-[#9CA3AF]">#{s.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category badge */}
                    <td className="px-5">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-medium"
                        style={{
                          background: tint.bg,
                          color: tint.text,
                          borderColor: tint.ring,
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: tint.dot }}
                        />
                        {s.category}
                      </span>
                    </td>

                    {/* Billing */}
                    <td className="px-5 text-[13px] capitalize text-[#6B7280]">
                      {s.billingCycle}
                    </td>

                    {/* Renews */}
                    <td className="px-5">
                      <div className="flex flex-col">
                        <span className="text-[13px] text-[#0F172A]">
                          {formatDate(s.renewalDate)}
                        </span>
                        <span
                          className="font-mono text-[11px] tabular-nums"
                          style={{ color: s.status === "canceled" ? "#9CA3AF" : dueColor }}
                        >
                          {days < 0
                            ? `${Math.abs(days)}d ago`
                            : days === 0
                              ? "Today"
                              : `in ${days}d`}
                        </span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-5 text-right">
                      <span className="font-mono text-[14px] font-semibold tabular-nums text-[#0F172A]">
                        {currency(s.amount)}
                      </span>
                      <span className="ml-1 text-[11px] text-[#6B7280]">
                        /{s.billingCycle === "yearly" ? "yr" : s.billingCycle === "quarterly" ? "qtr" : "mo"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5">
                      <StatusBadge status={s.status} />
                    </td>

                    {/* Actions */}
                    <td className="px-5 text-right">
                      <button
                        aria-label="Actions"
                        className="invisible rounded-md p-1.5 text-[#6B7280] transition-colors duration-150 group-hover:visible hover:bg-[#F2F4F7] hover:text-[#0F172A]"
                      >
                        <MoreHorizontal size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        @keyframes pmRowIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function Th({
  children,
  onClick,
  active,
  dir,
  align,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  dir?: "asc" | "desc";
  align?: "right";
}) {
  return (
    <th
      className={cn("px-5 py-3", align === "right" ? "text-right" : "text-left")}
    >
      <button
        onClick={onClick}
        className={cn(
          "group/th inline-flex items-center gap-1 font-medium transition-colors duration-150",
          active ? "text-[#0F172A]" : "text-[#6B7280] hover:text-[#0F172A]",
        )}
        style={{
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {children}
        {active ? (
          dir === "asc" ? (
            <ArrowUp size={11} />
          ) : (
            <ArrowDown size={11} />
          )
        ) : (
          <ArrowUpDown
            size={11}
            className="opacity-0 transition-opacity duration-150 group-hover/th:opacity-60"
          />
        )}
      </button>
    </th>
  );
}

function StatusBadge({ status }: { status: Subscription["status"] }) {
  const map = {
    active:   { bg: "#ECFDF5", fg: "#047857", ring: "#D1FAE5", label: "Active" },
    trial:    { bg: "#EFF4FF", fg: "#1E40AF", ring: "#DBE5FF", label: "Trial" },
    paused:   { bg: "#FEF3C7", fg: "#92400E", ring: "#FDE68A", label: "Paused" },
    canceled: { bg: "#F3F4F6", fg: "#6B7280", ring: "#E5E7EB", label: "Canceled" },
  }[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-medium"
      style={{ background: map.bg, color: map.fg, borderColor: map.ring }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: map.fg }} />
      {map.label}
    </span>
  );
}

function FilterMenu<T extends string>({
  label,
  value,
  options,
  onChange,
  capitalize,
}: {
  label: string;
  value: T | null;
  options: T[];
  onChange: (v: T | null) => void;
  capitalize?: boolean;
}) {
  const isActive = !!value;
  return (
    <div className="relative">
      <select
        value={value ?? ""}
        onChange={(e) => onChange((e.target.value || null) as T | null)}
        className={cn(
          "h-8 cursor-pointer appearance-none rounded-lg border pl-3 pr-7 text-[12px] outline-none transition-colors duration-150",
          capitalize && "capitalize",
          isActive
            ? "border-[#0F172A] bg-[#0F172A] text-white"
            : "border-[#ECEEF2] bg-white text-[#6B7280] hover:bg-[#F6F7F9]",
        )}
      >
        <option value="">{label}: All</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-white text-[#0F172A]">
            {label}: {o}
          </option>
        ))}
      </select>
      <svg
        width="10"
        height="10"
        viewBox="0 0 16 16"
        className={cn(
          "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2",
          isActive ? "text-white" : "text-[#9CA3AF]",
        )}
      >
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}

function Chip({
  children,
  onClear,
}: {
  children: React.ReactNode;
  onClear: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-[#ECEEF2] bg-[#F6F7F9] px-2 py-1 text-[11px] text-[#6B7280]">
      {children}
      <button
        onClick={onClear}
        aria-label="Remove filter"
        className="grid h-3.5 w-3.5 place-items-center rounded text-[#9CA3AF] transition-colors duration-150 hover:bg-[#E5E7EB] hover:text-[#0F172A]"
      >
        <X size={9} />
      </button>
    </span>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-full border border-[#ECEEF2] bg-[#F6F7F9]">
        <Inbox size={18} className="text-[#9CA3AF]" />
      </div>
      <div>
        <p className="text-[14px] font-medium text-[#0F172A]">No subscriptions match</p>
        <p className="mt-1 text-[12px] text-[#6B7280]">
          Try a different search term or remove the active filters.
        </p>
      </div>
    </div>
  );
}

export default SubscriptionsTable;
