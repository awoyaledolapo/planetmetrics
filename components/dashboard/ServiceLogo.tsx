import { cn } from "@/lib/utils";

/**
 * Maps service display names to their theSVG icon slug.
 * Real brand SVGs are served from jsDelivr (theSVG mirror).
 * Docs: https://thesvg.org
 */
const SLUG: Record<string, string> = {
  Netflix:            "netflix",
  Spotify:            "spotify",
  AWS:                "aws",
  GitHub:             "github",
  Figma:              "figma",
  Linear:             "linear",
  Notion:             "notion",
  Vercel:             "vercel",
  "ChatGPT Plus":     "openai",
  "Anthropic Claude": "anthropic",
  "Stripe Atlas":     "stripe",
  "1Password":        "1password",
  "Cloudflare Pro":   "cloudflare",
  Loom:               "loom",
  "Raycast Pro":      "raycast",
};

const CDN = "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons";

interface ServiceLogoProps {
  service: string;
  /** Fallback initials when no slug is registered. */
  short?: string;
  /** Pixel size of the square tile. */
  size?: number;
  /** Corner radius of the tile. */
  radius?: number;
  className?: string;
}

export function ServiceLogo({
  service,
  short,
  size = 32,
  radius = 8,
  className,
}: ServiceLogoProps) {
  const slug = SLUG[service];

  const initials =
    short ??
    service
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden border bg-white",
        className,
      )}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        borderColor: "#ECEEF2",
      }}
      aria-label={service}
    >
      {slug ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${CDN}/${slug}/default.svg`}
          alt=""
          width={Math.round(size * 0.6)}
          height={Math.round(size * 0.6)}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span
          className="font-semibold text-[#6B7280]"
          style={{ fontSize: Math.round(size * 0.36) }}
        >
          {initials}
        </span>
      )}
    </span>
  );
}

export default ServiceLogo;
