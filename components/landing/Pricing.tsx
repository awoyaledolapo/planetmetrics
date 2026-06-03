"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type Plan = {
  name: string;
  tagline: string;
  price: string;
  cadence: string;
  cta: { label: string; href: string };
  features: string[];
  /** Visually highlighted card. */
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    tagline: "Track up to 10 subscriptions.",
    price: "$0",
    cadence: "Free forever",
    cta: { label: "Get started", href: "/signup" },
    features: [
      "Up to 10 active subscriptions",
      "Monthly + yearly spend overview",
      "Upcoming renewals list",
      "Basic category breakdown",
    ],
  },
  {
    name: "Pro",
    tagline: "For operators tracking everything.",
    price: "$4.99",
    cadence: "per month",
    cta: { label: "Start Pro", href: "/signup?plan=pro" },
    featured: true,
    features: [
      "Unlimited subscriptions",
      "12-month spending trends",
      "Renewal alerts (email + push)",
      "Category & service deep-dives",
      "CSV export",
    ],
  },
  {
    name: "Team",
    tagline: "Shared workspace for small teams.",
    price: "$8.99",
    cadence: "per seat / month",
    cta: { label: "Start Team", href: "/signup?plan=team" },
    features: [
      "Everything in Pro",
      "Up to 10 teammates",
      "Shared workspace & owners",
      "Role-based permissions",
      "Priority support",
    ],
  },
];

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-t border-white/10 bg-black py-28 text-white"
    >
      {/* faint blue ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(37,99,235,0.12),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Eyebrow */}
        <motion.div
          {...fade}
          className="mx-auto inline-flex items-stretch border-2 border-white bg-black font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-[4px_4px_0_0_rgba(255,255,255,0.9)]"
        >
          <span className="flex items-center gap-2 bg-white px-3 py-2 text-black">
            <span className="h-1.5 w-1.5 bg-black" />
            PRICING / 002
          </span>
          <span className="flex items-center px-4 py-2">Three plans. No tricks.</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          {...fade}
          transition={{ ...fade.transition, delay: 0.08 }}
          className="mt-8 max-w-3xl text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.04]"
        >
          Pay for what you use.{" "}
          <span className="bg-gradient-to-b from-white/80 to-white/30 bg-clip-text text-transparent">
            Cancel any time.
          </span>
        </motion.h2>

        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.16 }}
          className="mt-5 max-w-xl text-base md:text-lg text-white/60 leading-relaxed"
        >
          Start free, upgrade when you outgrow it. Every plan ships with the
          same cinematic dashboard — only the limits change.
        </motion.p>

        {/* Plans */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              {...fade}
              transition={{ ...fade.transition, delay: 0.18 + i * 0.08 }}
              className={`relative flex flex-col ${
                p.featured
                  ? "border-2 border-white bg-white text-black shadow-[6px_6px_0_0_rgba(255,255,255,0.95)]"
                  : "border border-white/15 bg-white/[0.03] text-white backdrop-blur-sm"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-4 inline-flex items-center gap-1.5 border-2 border-white bg-black px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-[3px_3px_0_0_rgba(255,255,255,0.95)]">
                  <span className="h-1 w-1 bg-white" />
                  Most popular
                </span>
              )}

              <div className="p-7">
                {/* Plan name */}
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-70">
                  {p.name}
                </p>

                {/* Tagline */}
                <p
                  className={`mt-2 text-sm ${
                    p.featured ? "text-black/70" : "text-white/70"
                  }`}
                >
                  {p.tagline}
                </p>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-5xl font-semibold tracking-tight">
                    {p.price}
                  </span>
                  <span
                    className={`text-xs ${
                      p.featured ? "text-black/60" : "text-white/50"
                    }`}
                  >
                    {p.cadence}
                  </span>
                </div>

                {/* CTA */}
                <Link
                  href={p.cta.href}
                  className={
                    p.featured
                      ? "mt-7 inline-flex w-full items-center justify-center gap-2 border-2 border-black bg-black px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.08em] text-white shadow-[3px_3px_0_0_rgba(0,0,0,0.95)] transition-all hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.95)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_rgba(0,0,0,0.95)]"
                      : "mt-7 inline-flex w-full items-center justify-center gap-2 border-2 border-white bg-white px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.08em] text-black shadow-[3px_3px_0_0_rgba(255,255,255,0.95)] transition-all hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.95)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_rgba(255,255,255,0.95)]"
                  }
                >
                  {p.cta.label}
                  <span
                    className={`inline-block h-1.5 w-1.5 ${
                      p.featured ? "bg-white" : "bg-black"
                    }`}
                  />
                </Link>

                {/* Divider */}
                <div
                  className={`my-6 h-px ${
                    p.featured ? "bg-black/10" : "bg-white/10"
                  }`}
                />

                {/* Features */}
                <ul className="space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className={`mt-1 inline-block h-1.5 w-1.5 shrink-0 ${
                          p.featured ? "bg-black" : "bg-white"
                        }`}
                      />
                      <span
                        className={p.featured ? "text-black/80" : "text-white/80"}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.5 }}
          className="mt-12 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-white/40"
        >
          All prices in USD · Cancel anytime · No card required for Starter
        </motion.p>
      </div>
    </section>
  );
}
