"use client";

import dynamic from "next/dynamic";

const TaxBurdenCalculator = dynamic(
  () => import("@/components/tax-burden-calculator").then((mod) => ({ default: mod.TaxBurdenCalculator })),
  {
    loading: () => (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">Loading calculator...</p>
      </div>
    ),
    ssr: false,
  }
);

export function TaxBurdenCalculatorClient() {
  return <TaxBurdenCalculator />;
}
