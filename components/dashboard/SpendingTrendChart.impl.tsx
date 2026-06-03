"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { spendingTrend, currency } from "@/lib/mock-data";

interface CrosshairTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CrosshairTooltip({ active, payload, label }: CrosshairTooltipProps) {
  if (!active || !payload?.length) return null;
  const v = payload[0].value;
  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 font-mono text-[11px] tabular-nums shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
      <p className="text-[10px] uppercase tracking-[0.12em] text-[#9CA3AF]">{label} 2026</p>
      <p className="mt-0.5 text-[13px] font-semibold text-[#0F172A]">{currency(v)}</p>
    </div>
  );
}

export default function SpendingTrendChartImpl() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={spendingTrend} margin={{ top: 10, right: 8, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="pmTrendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity={0.16} />
              <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
            </linearGradient>
          </defs>
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
            tickFormatter={(v) => `$${v}`}
            width={48}
          />
          <Tooltip
            cursor={{ stroke: "#CBD5E1", strokeWidth: 1, strokeDasharray: "3 3" }}
            content={<CrosshairTooltip />}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#2563EB"
            strokeWidth={1.75}
            fill="url(#pmTrendFill)"
            dot={false}
            activeDot={{ r: 3, fill: "#FFFFFF", stroke: "#2563EB", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
