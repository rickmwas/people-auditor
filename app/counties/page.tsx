import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Search } from "lucide-react";
import { KenyaMap } from "@/components/kenya-map";
import { allCounties } from "@/lib/data/counties";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Counties Dashboard | People's Auditor",
  description: "Explore financial data and scorecards for all 47 Kenyan counties.",
};

export default function CountiesPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">47 Counties Dashboard</h1>
        <p className="text-muted-foreground">
          Click on any county on the map to view detailed financial scorecard
        </p>
      </div>

      {/* Interactive Map */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive County Map</CardTitle>
          <CardDescription>Click on any county to view its financial scorecard</CardDescription>
        </CardHeader>
        <CardContent>
          <KenyaMap />
        </CardContent>
      </Card>

      {/* Counties List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">All Counties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allCounties.map((county) => (
            <Card key={county.slug} className="hover:border-kenya-red transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-kenya-red" />
                  {county.name}
                </CardTitle>
                <CardDescription>{county.region} Region</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/counties/${county.slug}`}>View Scorecard</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

