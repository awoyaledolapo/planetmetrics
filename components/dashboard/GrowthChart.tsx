"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  type TooltipProps,
} from "recharts";
import { subscriptionGrowth } from "@/lib/mock-data";

function Tip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 font-mono text-[11px] tabular-nums shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
      <p className="text-[10px] uppercase tracking-[0.12em] text-[#9CA3AF]">{label}</p>
      <p className="mt-0.5 text-[13px] font-semibold text-[#0F172A]">
        {payload[0].value} subs
      </p>
    </div>
  );
}

export function GrowthChart() {
  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={subscriptionGrowth} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="#F1F2F4" vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#6B7280", fontSize: 11, fontFamily: "var(--font-geist-mono)" }}
            dy={6}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 11, fontFamily: "var(--font-geist-mono)" }}
            width={36}
          />
          <Tooltip cursor={{ fill: "rgba(15,23,42,0.04)" }} content={<Tip />} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={26}>
            {subscriptionGrowth.map((_, i) => (
              <Cell
                key={i}
                fill={
                  i === subscriptionGrowth.length - 1
                    ? "#0F172A"
                    : "#E5E7EB"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GrowthChart;
