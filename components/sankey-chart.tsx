"use client";

import { Sankey } from "recharts";

interface SankeyChartProps {
  data: {
    total: number;
    allocations: Array<{
      category: string;
      amount: number;
      color: string;
    }>;
  };
}

export function SankeyChart({ data }: SankeyChartProps) {
  // Transform data for Sankey chart
  const sankeyData = {
    nodes: [
      { name: "Total Budget" },
      ...data.allocations.map((item) => ({ name: item.category })),
    ],
    links: data.allocations.map((item) => ({
      source: 0,
      target: data.allocations.indexOf(item) + 1,
      value: item.amount / 1e9, // Convert to billions for visualization
    })),
  };

  return (
    <div className="w-full h-96 flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-muted-foreground">
          Sankey chart visualization coming soon. View detailed breakdown below.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.allocations.map((item) => (
            <div
              key={item.category}
              className="p-4 rounded-lg border"
              style={{ borderColor: item.color }}
            >
              <div
                className="w-full h-2 rounded mb-2"
                style={{ backgroundColor: item.color }}
              />
              <p className="font-semibold text-sm">{item.category}</p>
              <p className="text-xs text-muted-foreground">
                {((item.amount / data.total) * 100).toFixed(1)}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

