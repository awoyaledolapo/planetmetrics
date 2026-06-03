"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "#changelog", label: "Changelog" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // Only flip on while scrolling DOWN past the threshold.
      // Flip off once we're back near the top.
      if (y > lastY && y > 20) setScrolled(true);
      else if (y < 10) setScrolled(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-2  bg-black/20 backdrop-blur-sm shadow-[0_8px_14px_-16px_rgba(0,0,0,0.6)]"
          : "py-4  border-transparent bg-transparent backdrop-blur-0"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        {/* Logo — standalone, no pill container */}
        <Logo size="md" tone="dark" />

        {/* Desktop nav island */}
        <nav className="pointer-events-auto hidden md:flex">
          <ul className="flex items-center gap-1 rounded-full border border-white/20 bg-black/20 p-1 shadow-[0_8px_8px_-12px_rgba(0,0,0,0.8)] backdrop-blur-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block rounded-full px-4 py-1.5 text-[13px] font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-[13px] font-medium text-white/85 transition hover:text-white"
          >
            Sign in
          </Link>
          {/* Neo-brutalist CTA */}
          <Link
            href="/signup"
            className="group relative inline-flex items-center gap-2 border-2 border-white bg-white px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-black shadow-[3px_3px_0_0_rgba(255,255,255,0.95)] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.95)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0_0_rgba(255,255,255,0.95)]"
          >
            Request access
            <span className="inline-block h-1.5 w-1.5 bg-black" />
          </Link>
        </div>

        {/* Unique dot-grid hamburger */}
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/40 backdrop-blur-xl"
        >
          <div
            className={`grid grid-cols-3 grid-rows-3 gap-[3px] transition-transform duration-500 ease-out ${
              isOpen ? "rotate-45 scale-110" : "rotate-0"
            }`}
          >
            {Array.from({ length: 9 }).map((_, i) => {
              const isCenter = i === 4;
              return (
                <span
                  key={i}
                  className={`h-[3px] w-[3px] rounded-full bg-white transition-all duration-500 ${
                    isOpen
                      ? isCenter
                        ? "opacity-100 scale-150"
                        : "opacity-30"
                      : "opacity-90"
                  }`}
                />
              );
            })}
          </div>
        </button>
      </div>

      {/* Mobile sheet */}
      <div
        className={`md:hidden fixed inset-x-3 top-20 origin-top overflow-hidden rounded-3xl border border-white/10 bg-black/70 backdrop-blur-2xl transition-all duration-500 ${
          isOpen
            ? "max-h-[80vh] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col p-2">
          {navLinks.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] text-white/80 transition hover:bg-white/[0.05] hover:text-white"
              >
                <span>{l.label}</span>
                <span className="text-[11px] tabular-nums text-white/30">
                  0{i + 1}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mx-2 mb-2 flex flex-col gap-2 rounded-2xl border border-white/5 bg-white/[0.02] p-3">
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="rounded-xl px-4 py-3 text-center text-sm text-white/80 hover:text-white"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            onClick={() => setIsOpen(false)}
            className="rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-black"
          >
            Request access
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
