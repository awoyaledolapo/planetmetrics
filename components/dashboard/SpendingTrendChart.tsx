"use client";

import dynamic from "next/dynamic";

const SpendingTrendChart = dynamic(() => import("./SpendingTrendChart.impl"), {
  ssr: false,
  loading: () => <div className="h-72 w-full" aria-hidden />,
});

export default SpendingTrendChart;
