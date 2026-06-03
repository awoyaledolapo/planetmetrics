export type SubscriptionStatus = "active" | "trial" | "paused" | "canceled";
export type BillingCycle = "monthly" | "yearly" | "quarterly";
export type SubscriptionCategory =
  | "Software"
  | "Entertainment"
  | "Productivity"
  | "Infrastructure"
  | "AI"
  | "Finance"
  | "Design";

export interface Subscription {
  id: string;
  service: string;
  short: string;
  category: SubscriptionCategory;
  billingCycle: BillingCycle;
  renewalDate: string; // ISO
  amount: number; // in USD per cycle
  status: SubscriptionStatus;
  accent: string; // hex
}

export const subscriptions: Subscription[] = [
  { id: "s_01", service: "Netflix", short: "NF", category: "Entertainment", billingCycle: "monthly", renewalDate: "2026-06-12", amount: 17.99, status: "active", accent: "#E50914" },
  { id: "s_02", service: "Spotify", short: "SP", category: "Entertainment", billingCycle: "monthly", renewalDate: "2026-06-18", amount: 10.99, status: "active", accent: "#1DB954" },
  { id: "s_03", service: "AWS", short: "AW", category: "Infrastructure", billingCycle: "monthly", renewalDate: "2026-06-05", amount: 342.4, status: "active", accent: "#FF9900" },
  { id: "s_04", service: "GitHub", short: "GH", category: "Software", billingCycle: "yearly", renewalDate: "2027-02-21", amount: 84, status: "active", accent: "#e5e7eb" },
  { id: "s_05", service: "Figma", short: "FG", category: "Design", billingCycle: "monthly", renewalDate: "2026-06-22", amount: 15, status: "active", accent: "#A259FF" },
  { id: "s_06", service: "Linear", short: "LN", category: "Productivity", billingCycle: "monthly", renewalDate: "2026-06-09", amount: 8, status: "active", accent: "#5E6AD2" },
  { id: "s_07", service: "Notion", short: "NT", category: "Productivity", billingCycle: "yearly", renewalDate: "2026-11-03", amount: 96, status: "active", accent: "#e5e7eb" },
  { id: "s_08", service: "Vercel", short: "VC", category: "Infrastructure", billingCycle: "monthly", renewalDate: "2026-06-14", amount: 20, status: "active", accent: "#ffffff" },
  { id: "s_09", service: "ChatGPT Plus", short: "GP", category: "AI", billingCycle: "monthly", renewalDate: "2026-06-07", amount: 20, status: "active", accent: "#10A37F" },
  { id: "s_10", service: "Anthropic Claude", short: "AC", category: "AI", billingCycle: "monthly", renewalDate: "2026-06-19", amount: 20, status: "trial", accent: "#D97757" },
  { id: "s_11", service: "Stripe Atlas", short: "ST", category: "Finance", billingCycle: "yearly", renewalDate: "2027-01-05", amount: 500, status: "paused", accent: "#635BFF" },
  { id: "s_12", service: "1Password", short: "1P", category: "Software", billingCycle: "yearly", renewalDate: "2026-09-28", amount: 60, status: "active", accent: "#3B66BC" },
  { id: "s_13", service: "Cloudflare Pro", short: "CF", category: "Infrastructure", billingCycle: "monthly", renewalDate: "2026-06-25", amount: 25, status: "active", accent: "#F38020" },
  { id: "s_14", service: "Loom", short: "LM", category: "Productivity", billingCycle: "monthly", renewalDate: "2026-07-01", amount: 12.5, status: "canceled", accent: "#625DF5" },
  { id: "s_15", service: "Raycast Pro", short: "RC", category: "Software", billingCycle: "monthly", renewalDate: "2026-06-30", amount: 8, status: "active", accent: "#FF6363" },
];

// Normalize to monthly equivalent
export const toMonthly = (s: Subscription) => {
  if (s.billingCycle === "yearly") return s.amount / 12;
  if (s.billingCycle === "quarterly") return s.amount / 3;
  return s.amount;
};

export const totalMonthly = (list = subscriptions) =>
  list.filter((s) => s.status === "active").reduce((sum, s) => sum + toMonthly(s), 0);

export const totalYearly = (list = subscriptions) => totalMonthly(list) * 12;

export const activeCount = (list = subscriptions) =>
  list.filter((s) => s.status === "active").length;

export const upcomingRenewals = (list = subscriptions, days = 30) => {
  const now = new Date("2026-06-03");
  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() + days);
  return list.filter((s) => {
    const d = new Date(s.renewalDate);
    return s.status !== "canceled" && d >= now && d <= cutoff;
  });
};

// 12-month spend trend
export const spendingTrend = [
  { month: "Jul", amount: 612 },
  { month: "Aug", amount: 634 },
  { month: "Sep", amount: 651 },
  { month: "Oct", amount: 670 },
  { month: "Nov", amount: 688 },
  { month: "Dec", amount: 712 },
  { month: "Jan", amount: 705 },
  { month: "Feb", amount: 728 },
  { month: "Mar", amount: 745 },
  { month: "Apr", amount: 760 },
  { month: "May", amount: 772 },
  { month: "Jun", amount: 791 },
];

// Category breakdown (monthly equiv)
export const categoryBreakdown = (list = subscriptions) => {
  const map = new Map<string, number>();
  list
    .filter((s) => s.status === "active")
    .forEach((s) => {
      map.set(s.category, (map.get(s.category) ?? 0) + toMonthly(s));
    });
  return Array.from(map.entries())
    .map(([category, amount]) => ({ category, amount: Math.round(amount * 100) / 100 }))
    .sort((a, b) => b.amount - a.amount);
};

// Growth over time (count of subs)
export const subscriptionGrowth = [
  { month: "Jul", count: 8 },
  { month: "Aug", count: 9 },
  { month: "Sep", count: 9 },
  { month: "Oct", count: 10 },
  { month: "Nov", count: 11 },
  { month: "Dec", count: 11 },
  { month: "Jan", count: 12 },
  { month: "Feb", count: 12 },
  { month: "Mar", count: 13 },
  { month: "Apr", count: 14 },
  { month: "May", count: 14 },
  { month: "Jun", count: 15 },
];

export const currency = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n % 1 === 0 ? 0 : 2,
  }).format(n);

export const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export const daysUntil = (iso: string) => {
  const now = new Date("2026-06-03");
  const target = new Date(iso);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};
