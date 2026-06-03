"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { CountUp } from "./CountUp";

interface StatCardProps {
  label: string;
  /** Display value when no countUp is provided */
  value?: string;
  /** Animated numeric value */
  countUpValue?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delta?: number;
  hint?: string;
  /** Emphasize the card (larger number, bigger card). */
  emphasis?: boolean;
}

export function StatCard({
  label,
  value,
  countUpValue,
  prefix,
  suffix,
  decimals = 0,
  delta,
  hint,
  emphasis,
}: StatCardProps) {
  const positive = (delta ?? 0) >= 0;

  return (
    <div
      className="group relative flex flex-col justify-between rounded-[10px] border border-[#ECEEF2] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors duration-150"
      style={{
        padding: emphasis ? "28px 24px" : "24px",
        minHeight: emphasis ? 148 : 124,
      }}
    >
      <div className="flex items-start justify-between">
        <p
          className="font-medium text-[#9CA3AF]"
          style={{
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </p>
        {typeof delta === "number" && (
          <span
            className={`inline-flex items-center gap-0.5 rounded-md border px-1.5 py-0.5 text-[10.5px] font-medium tabular-nums ${
              positive
                ? "border-[#D1FAE5] bg-[#ECFDF5] text-[#047857]"
                : "border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]"
            }`}
          >
            {positive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            {Math.abs(delta).toFixed(1)}%
          </span>
        )}
      </div>

      <div className="mt-3 flex items-end justify-between gap-4">
        <p
          className="font-mono font-semibold tracking-tight text-[#0F172A] tabular-nums"
          style={{ fontSize: emphasis ? 36 : 28, lineHeight: 1 }}
        >
          {typeof countUpValue === "number" ? (
            <CountUp
              value={countUpValue}
              prefix={prefix}
              suffix={suffix}
              decimals={decimals}
            />
          ) : (
            value
          )}
        </p>
      </div>

      {hint && (
        <p className="mt-2.5 text-[12px] text-[#6B7280]">{hint}</p>
      )}
    </div>
  );
}

export default StatCard;
