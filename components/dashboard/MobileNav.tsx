"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on ESC + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
        className="fixed left-3 top-3 z-40 grid h-9 w-9 place-items-center rounded-lg border border-[#ECEEF2] bg-white text-[#0F172A] shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-colors duration-150 hover:bg-[#F2F4F7] lg:hidden"
      >
        <Menu size={16} strokeWidth={1.75} />
      </button>

      {/* Backdrop */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] transition-opacity duration-200 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={`fixed inset-y-0 left-0 z-50 w-[244px] transform transition-transform duration-200 ease-out lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative h-full">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute right-2 top-3 z-10 grid h-8 w-8 place-items-center rounded-lg text-[#6B7280] transition-colors duration-150 hover:bg-[#F2F4F7] hover:text-[#0F172A]"
          >
            <X size={16} strokeWidth={1.75} />
          </button>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
