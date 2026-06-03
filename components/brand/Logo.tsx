import Link from "next/link";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";
type Tone = "dark" | "light";

const sizeMap: Record<Size, { mark: string; text: string; gap: string }> = {
  sm: { mark: "h-6 w-6", text: "text-[13px]", gap: "gap-2" },
  md: { mark: "h-8 w-8", text: "text-[15px]", gap: "gap-2.5" },
  lg: { mark: "h-11 w-11", text: "text-lg", gap: "gap-3" },
};

interface LogoProps {
  size?: Size;
  href?: string | null;
  wordmark?: boolean;
  className?: string;
  tone?: Tone;
}

export function LogoMark({
  className,
  size = "md",
  tone = "light",
}: Pick<LogoProps, "className" | "size" | "tone">) {
  const s = sizeMap[size];
  const id = `comet-${tone}-${size}`;

  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        s.mark,
        className,
      )}
    >
      <svg viewBox="0 0 36 36" className="h-full w-full" fill="none" overflow="visible">
        <defs>
          <linearGradient id={`${id}-tail`} x1="27" y1="6" x2="2" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF9500" stopOpacity="0" />
            <stop offset="30%" stopColor="#FF6B00" stopOpacity="0.55" />
            <stop offset="65%" stopColor="#FF3D00" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#CC1A00" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id={`${id}-core`} x1="27" y1="6" x2="7" y2="26" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="35%" stopColor="#FFE566" stopOpacity="0.55" />
            <stop offset="75%" stopColor="#FF8C00" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FF4500" stopOpacity="1" />
          </linearGradient>

          <radialGradient id={`${id}-nucleus`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FFF5B0" />
            <stop offset="55%" stopColor="#FF9500" />
            <stop offset="100%" stopColor="#FF4500" />
          </radialGradient>

          <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF8C00" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
          </radialGradient>

          <radialGradient id={`${id}-atmos`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
          </radialGradient>

          <filter id={`${id}-bloom`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={`${id}-softglow`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="0.9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Wide outer atmosphere */}
        <path
          d="M28 5 C29.5 14 24.5 16.5 20.5 20.5 C16.5 24.5 12.5 27 7.5 30.5 C5.2 32 3 33 1.5 32.5 C4.2 29.5 7 27 9.5 24 C6.8 25.5 4.5 27 2.5 27.5 C6 24 10 20.5 14.5 17 C18.5 13.8 21.5 11 24.5 8 C26 6.5 27 5.2 28 5 Z"
          fill={`url(#${id}-tail)`}
          opacity="0.32"
          filter={`url(#${id}-softglow)`}
        />

        {/* Main fire tail */}
        <path
          d="M27 6.5 C28 13.5 24 16 20 19.5 C16 23 12.5 25.5 8 29 C6 30.5 4 31.5 2.5 31 C4.8 28.5 7 26.5 9 24 C7 25 5.5 26 4 26.5 C7 23.5 10.5 20.5 14 17.5 C17.5 14.5 20.5 12 22.5 9.5 C24.2 7.8 25.5 6.5 27 6.5 Z"
          fill={`url(#${id}-tail)`}
          filter={`url(#${id}-softglow)`}
        />

        {/* Hot inner core trail */}
        <path
          d="M26 7.5 C26.8 13 23.5 15 20.5 17.8 C17.5 20.6 14.8 22.5 11.8 24.8 C10 26.2 8.5 27.4 7 28 C8.5 26.2 10.2 24.2 12 22.4 C10.5 23.2 9.2 24 8 24.2 C10.5 21.8 13.2 19.5 16 17.2 C19 14.8 21.8 12.5 26 7.5 Z"
          fill={`url(#${id}-core)`}
        />

        {/* Fire wisps */}
        <path d="M5.8 21 C7.6 20.5 9.5 19.4 11 17.8 C10 20 8.2 21.5 6 22 Z" fill="#FF6B00" opacity="0.9" />
        <path d="M3.4 24.8 C5.2 24.2 7 23.2 8.2 21.8 C7.4 23.8 5.6 24.9 3.6 25.2 Z" fill="#FF4500" opacity="0.85" />
        <path d="M7.8 17.8 C9.4 17 11.2 15.8 12.6 14.2 C11.4 16.4 9.6 17.8 7.8 18.2 Z" fill="#FF8C00" opacity="0.7" />
        <path d="M2.5 28 C4.2 27.4 5.8 26.5 7 25 C6.2 27 4.4 28 2.6 28.2 Z" fill="#CC2200" opacity="0.75" />

        {/* Spark particles */}
        <circle cx="11.5" cy="21" r="0.6" fill="#FFD700" opacity="0.9" />
        <circle cx="8" cy="25" r="0.5" fill="#FF9500" opacity="0.8" />
        <circle cx="14.5" cy="17.5" r="0.45" fill="#FFE566" opacity="0.85" />
        <circle cx="6" cy="27.5" r="0.4" fill="#FF6B00" opacity="0.7" />
        <circle cx="18" cy="14.5" r="0.4" fill="#FFDD00" opacity="0.75" />
        <circle cx="10" cy="23" r="0.35" fill="#FFA500" opacity="0.65" />
        <circle cx="21" cy="11.5" r="0.3" fill="#FFE566" opacity="0.6" />

        {/* Nucleus outer glow halo */}
        <circle cx="26" cy="8" r="9" fill={`url(#${id}-glow)`} />

        {/* Nucleus atmosphere */}
        <circle cx="26" cy="8" r="7" fill={`url(#${id}-atmos)`} />

        {/* Nucleus rock body — bigger */}
        <circle
          cx="26"
          cy="8"
          r="5.8"
          fill={`url(#${id}-nucleus)`}
          filter={`url(#${id}-bloom)`}
        />

        {/* Hot white core spot */}
        <circle cx="24.4" cy="6.6" r="2" fill="#FFFFFF" opacity="0.95" />

        {/* Corona flares */}
        <circle cx="29" cy="5.8" r="0.7" fill="#FFE566" opacity="0.7" />
        <circle cx="28" cy="4" r="0.5" fill="#FFFFFF" opacity="0.55" />
        <circle cx="30.5" cy="7.5" r="0.4" fill="#FFD700" opacity="0.5" />
      </svg>
    </span>
  );
}

export function Logo({
  size = "md",
  href = "/",
  wordmark = true,
  className,
  tone = "light",
}: LogoProps) {
  const s = sizeMap[size];

  const inner = (
    <span className={cn("inline-flex items-center", s.gap, className)}>
      <LogoMark size={size} tone={tone} />
      {wordmark && (
        <span
          className={cn(
            "font-semibold tracking-tight",
            s.text,
            tone === "light" ? "text-[#0F172A]" : "text-white",
          )}
        >
          Planet
          <span className={tone === "light" ? "text-[#6B7280]" : "text-white/60"}>
            Metrics
          </span>
        </span>
      )}
    </span>
  );

  if (!href) return inner;
  return (
    <Link href={href} className="inline-flex items-center" aria-label="Planet Metrics">
      {inner}
    </Link>
  );
}

export default Logo;