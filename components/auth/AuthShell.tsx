import { Logo } from "@/components/brand/Logo";

interface AuthShellProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Auth shell — dark hero backdrop with a white card on top.
 * Reuses the landing hero image plus a dark overlay so the card pops.
 */
export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Hero photo */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/image/c-dustin-K-Iog-Bqf8E-unsplash.jpg')`,
        }}
      />
      {/* Dark overlay so foreground stays readable */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/30"
      />
      {/* Vignette + subtle blue tint to match landing */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(8, 76, 223, 0.18),transparent_65%)]"
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-8">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          <Logo size="md" tone="dark" />
          <a
            href="/"
            className="text-xs text-white/70 transition hover:text-white"
          >
            ← Back
          </a>
        </header>

        {/* Card — keeps the light theme so inputs/buttons stay white */}
        <main className="flex flex-1 items-center justify-center py-10">
          <div className="theme-light w-full rounded-2xl border border-[#ECEEF2] bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_30px_80px_-20px_rgba(0,0,0,0.6)]">
            {eyebrow && (
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">
                {eyebrow}
              </p>
            )}
            <h1 className="text-2xl font-semibold tracking-tight text-[#0F172A]">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-sm text-[#6B7280]">
                {description}
              </p>
            )}

            <div className="mt-7">{children}</div>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex items-center justify-between text-xs text-white/60">
          <span>© 2026 Planet Metrics</span>
          {footer ?? (
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}

export default AuthShell;
