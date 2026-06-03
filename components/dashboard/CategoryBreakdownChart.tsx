"use client";

import { categoryBreakdown, currency } from "@/lib/mock-data";
import { tintFor } from "@/lib/dashboard-theme";

export function CategoryBreakdownChart() {
  const data = categoryBreakdown();
  const total = data.reduce((s, d) => s + d.amount, 0);

  return (
    <div className="flex flex-col gap-4">
      {/* Segmented bar */}
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-[#F2F4F7]">
        {data.map((d) => {
          const t = tintFor(d.category);
          return (
            <div
              key={d.category}
              title={`${d.category}: ${currency(d.amount)}`}
              className="transition-opacity duration-150 hover:opacity-85"
              style={{
                width: `${(d.amount / total) * 100}%`,
                background: t.dot,
              }}
            />
          );
        })}
      </div>

      {/* Legend list */}
      <ul className="-mx-2">
        {data.map((d) => {
          const t = tintFor(d.category);
          const pct = ((d.amount / total) * 100).toFixed(1);
          return (
            <li
              key={d.category}
              className="group flex items-center justify-between rounded-md px-2 py-2 transition-colors duration-150 hover:bg-[#F6F7F9]"
            >
              <span className="flex items-center gap-2.5 text-[13px] text-[#0F172A]">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: t.dot }}
                />
                {d.category}
              </span>
              <span className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-[#6B7280] tabular-nums">
                  {pct}%
                </span>
                <span className="font-mono text-[13px] text-[#0F172A] tabular-nums">
                  {currency(d.amount)}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CategoryBreakdownChart;
