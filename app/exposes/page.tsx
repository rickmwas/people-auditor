import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, Calendar, DollarSign, MapPin } from "lucide-react";
import { sampleExposes } from "@/lib/data/placeholder";
import { formatCurrency } from "@/lib/utils";
import { Metadata } from "next";
import { ExposesSearch } from "@/components/exposes-search";

export const metadata: Metadata = {
  title: "Corruption Exposés | People's Auditor",
  description: "Investigative reports exposing corruption and financial crimes across Kenya.",
};

export default function ExposesPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Corruption Exposés</h1>
        <p className="text-muted-foreground">
          Investigative reports exposing financial crimes and corruption across Kenya
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <ExposesSearch />
        </CardContent>
      </Card>

      {/* Exposés List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleExposes.map((expose) => (
          <Card key={expose.slug} className="hover:border-kenya-red transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg line-clamp-2">{expose.title}</CardTitle>
                {expose.amount_involved > 0 && (
                  <div className="flex-shrink-0">
                    <DollarSign className="h-5 w-5 text-kenya-gold" />
                  </div>
                )}
              </div>
              <CardDescription className="line-clamp-2">{expose.summary}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {expose.county}
                </span>
                <span className="px-2 py-1 rounded-md bg-kenya-red/20 text-kenya-red text-xs">
                  {expose.category}
                </span>
              </div>
              {expose.amount_involved > 0 && (
                <div className="p-3 rounded-md bg-kenya-red/10 border border-kenya-red/30">
                  <p className="text-sm text-muted-foreground">Amount Involved</p>
                  <p className="text-xl font-bold text-kenya-red">
                    {formatCurrency(expose.amount_involved)}
                  </p>
                </div>
              )}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(expose.created_at).toLocaleDateString("en-KE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>By {expose.author}</span>
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/exposes/${expose.slug}`}>Read Full Report</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

