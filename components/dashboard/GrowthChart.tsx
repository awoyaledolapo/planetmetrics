"use client";

import dynamic from "next/dynamic";

const GrowthChart = dynamic(() => import("./GrowthChart.impl"), {
  ssr: false,
  loading: () => <div className="h-60 w-full" aria-hidden />,
});

export default GrowthChart;
