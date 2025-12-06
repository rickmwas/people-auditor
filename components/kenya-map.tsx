"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { allCounties } from "@/lib/data/counties";

export function KenyaMap() {
  const router = useRouter();
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null);

  const handleCountyClick = (slug: string) => {
    router.push(`/counties/${slug}`);
  };

  // Simplified SVG representation - in production, use a proper Kenya SVG map
  return (
    <div className="w-full h-auto">
      <div className="relative bg-kenya-green/10 rounded-lg p-8 min-h-[500px] flex items-center justify-center">
        <div className="grid grid-cols-6 md:grid-cols-8 gap-2 w-full max-w-4xl">
          {allCounties.map((county) => (
            <button
              key={county.slug}
              onClick={() => handleCountyClick(county.slug)}
              onMouseEnter={() => setHoveredCounty(county.slug)}
              onMouseLeave={() => setHoveredCounty(null)}
              className="p-3 rounded-md border-2 border-kenya-green/30 hover:border-kenya-red hover:bg-kenya-red/20 transition-all text-xs md:text-sm font-medium text-center"
              style={{
                backgroundColor:
                  hoveredCounty === county.slug ? "rgba(222, 41, 16, 0.2)" : undefined,
              }}
            >
              {county.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-4">
        Click on any county above to view detailed financial scorecard
      </p>
    </div>
  );
}

