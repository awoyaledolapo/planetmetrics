/**
 * Dashboard theme helpers — light theme only.
 * The dashboard shell wraps content in `.theme-light` so shadcn UI
 * also flips to a light palette.
 */

/** Soft pastel surface + readable text per category. */
const categoryTint: Record<
  string,
  { bg: string; text: string; ring: string; dot: string }
> = {
  Infrastructure: { bg: "#EFF4FF", text: "#1E40AF", ring: "#DBE5FF", dot: "#2563EB" },
  AI:             { bg: "#F1F5F9", text: "#0F172A", ring: "#E2E8F0", dot: "#475569" },
  Entertainment:  { bg: "#FFF1F2", text: "#9F1239", ring: "#FFE4E6", dot: "#E11D48" },
  Productivity:   { bg: "#ECFDF5", text: "#065F46", ring: "#D1FAE5", dot: "#10B981" },
  Software:       { bg: "#F3F4F6", text: "#374151", ring: "#E5E7EB", dot: "#6B7280" },
  Finance:        { bg: "#EEF2FF", text: "#3730A3", ring: "#E0E7FF", dot: "#4F46E5" },
  Design:         { bg: "#FEF3C7", text: "#92400E", ring: "#FDE68A", dot: "#D97706" },
};

export const tintFor = (category: string) =>
  categoryTint[category] ?? categoryTint.Software;

/** Urgency color for renewal days remaining. */
export function urgencyColor(days: number): string {
  if (days <= 3) return "#DC2626";
  if (days <= 7) return "#D97706";
  if (days <= 14) return "#6B7280";
  return "#9CA3AF";
}
