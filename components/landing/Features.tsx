"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BellRing,
  CalendarClock,
  CircleDollarSign,
  Layers,
  LineChart,
  ShieldCheck,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type Feature = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tag: string;
  title: string;
  body: string;
};

const features: Feature[] = [
  {
    icon: LineChart,
    tag: "01 / Insights",
    title: "Spend trends, decoded.",
    body: "Twelve months of subscription spend rendered as a single, readable signal. Spot creep before it compounds.",
  },
  {
    icon: BellRing,
    tag: "02 / Alerts",
    title: "Renewal alerts that fire on time.",
    body: "Get a heads-up days before any charge hits your card. Email, push, or both — your call.",
  },
  {
    icon: Layers,
    tag: "03 / Categories",
    title: "Auto-categorized in one tap.",
    body: "Infra, AI, design, productivity — every service sorts itself so the picture stays clean.",
  },
  {
    icon: CalendarClock,
    tag: "04 / Calendar",
    title: "Every renewal, one calendar.",
    body: "A single view of every upcoming charge — color-coded by urgency, sortable by amount.",
  },
  {
    icon: CircleDollarSign,
    tag: "05 / Forecasts",
    title: "Forecast next month, today.",
    body: "Project the next 30 days of spend before the bills land. Plan ahead, not after the fact.",
  },
  {
    icon: ShieldCheck,
    tag: "06 / Privacy",
    title: "Yours alone. Always.",
    body: "Local-first storage, no third-party trackers, zero data sales. Your stack stays your stack.",
  },
];

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export default function Features() {
  const reduce = useReducedMotion();

  return (
    <section
      id="features"
      className="relative overflow-hidden border-t border-white/10 bg-black py-28 text-white"
    >
      {/* ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(37,99,235,0.10),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Eyebrow */}
        <motion.div
          {...fade}
          className="inline-flex items-stretch border-2 border-white bg-black font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-[4px_4px_0_0_rgba(255,255,255,0.9)]"
        >
          <span className="flex items-center gap-2 bg-white px-3 py-2 text-black">
            <span className="h-1.5 w-1.5 bg-black" />
            FEATURES / 003
          </span>
          <span className="flex items-center px-4 py-2">Built for the daily operator</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          {...fade}
          transition={{ ...fade.transition, delay: 0.08 }}
          className="mt-8 max-w-3xl text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.04]"
        >
          Six tools.{" "}
          <span className="bg-gradient-to-b from-white/80 to-white/30 bg-clip-text text-transparent">
            One quiet dashboard.
          </span>
        </motion.h2>

        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.16 }}
          className="mt-5 max-w-xl text-base md:text-lg text-white/60 leading-relaxed"
        >
          Every feature exists to answer one question: where is the money going,
          and what changes next month?
        </motion.p>

        {/* Grid */}
        <div className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.article
              key={f.tag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1] as const,
                delay: reduce ? 0 : 0.05 * i,
              }}
              whileHover={reduce ? undefined : { y: -4 }}
              className="group relative flex flex-col gap-5 bg-black p-7 transition-colors duration-300 hover:bg-[#0a0a0a]"
            >
              {/* Icon tile */}
              <span className="inline-flex h-11 w-11 items-center justify-center border-2 border-white bg-black text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                <f.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>

              {/* Tag */}
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                {f.tag}
              </p>

              {/* Title */}
              <h3 className="text-xl font-semibold tracking-tight">
                {f.title}
              </h3>

              {/* Body */}
              <p className="text-[14px] leading-relaxed text-white/65">
                {f.body}
              </p>

              {/* Hover sweep line */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
