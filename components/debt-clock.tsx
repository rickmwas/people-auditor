"use client";

import { useEffect, useState, useMemo } from "react";
import { formatCurrency } from "@/lib/utils";

interface DebtClockProps {
  initialDebt: number;
}

export function DebtClock({ initialDebt }: DebtClockProps) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  // Calculate debt increase per minute (KSh 38 million per minute based on 2025 debt service)
  // Per second: 38,000,000 / 60 = 633,333.33
  const debtPerSecond = 633333;

  // Memoize debt calculation to prevent unnecessary re-renders
  const debt = useMemo(() => {
    return initialDebt + secondsElapsed * debtPerSecond;
  }, [initialDebt, secondsElapsed]);

  useEffect(() => {
    // Update every 5 seconds instead of every second for better performance
    // The visual difference is minimal but performance impact is significant
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 5);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold text-kenya-red">National Debt Clock</h2>
      <div className="text-4xl md:text-6xl font-bold text-kenya-gold font-mono">
        {formatCurrency(debt)}
      </div>
      <p className="text-sm text-muted-foreground">
        Growing by {formatCurrency(38000000)} every minute
      </p>
    </div>
  );
}

