import { DebtClock } from "@/components/debt-clock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, TrendingUp, AlertTriangle, MapPin, FileText } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { nationalMetrics } from "@/lib/data/placeholder";
import dynamic from "next/dynamic";

// Lazy load heavy components for better initial page load
const TaxBurdenCalculator = dynamic(() => import("@/components/tax-burden-calculator").then(mod => ({ default: mod.TaxBurdenCalculator })), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center"><p className="text-muted-foreground">Loading calculator...</p></div>,
  ssr: false,
});

const NewsletterSignup = dynamic(() => import("@/components/newsletter-signup").then(mod => ({ default: mod.NewsletterSignup })), {
  loading: () => <div className="min-h-[200px] flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>,
});

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-4xl md:text-6xl font-bold">
          Kenya's Public Finance
          <span className="text-kenya-red block">Watchdog</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Tracking every shilling. Exposing every scandal. Holding the powerful accountable.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="gap-2">
            <Link href="/exposes">
              View Exposés <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="kenya" size="lg" className="gap-2">
            <Link href="/submit">
              Submit Evidence <FileText className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Debt Clock */}
      <section className="py-8">
        <Card className="bg-gradient-to-br from-kenya-black via-kenya-red/20 to-kenya-black border-kenya-red/50">
          <CardContent className="py-12">
            <DebtClock initialDebt={nationalMetrics.debt} />
          </CardContent>
        </Card>
      </section>

      {/* Key Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-kenya-gold" />
              National Budget 2024
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(nationalMetrics.budget2024)}</p>
            <p className="text-sm text-muted-foreground mt-2">Government spending plan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-kenya-green" />
              Population
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatNumber(nationalMetrics.population)}</p>
            <p className="text-sm text-muted-foreground mt-2">Kenyans affected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-kenya-red" />
              County Debt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(250000000000)}</p>
            <p className="text-sm text-muted-foreground mt-2">Combined county debt</p>
          </CardContent>
        </Card>
      </section>

      {/* Tax Burden Calculator */}
      <section className="max-w-3xl mx-auto">
        <TaxBurdenCalculator />
      </section>

      {/* Quick Links */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Explore the Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:border-kenya-red transition-colors cursor-pointer">
            <Link href="/national">
              <CardHeader>
                <CardTitle>National Budget</CardTitle>
                <CardDescription>Track government spending and allocations</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full justify-end gap-2">
                  Explore <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:border-kenya-green transition-colors cursor-pointer">
            <Link href="/counties">
              <CardHeader>
                <CardTitle>47 Counties</CardTitle>
                <CardDescription>County-by-county financial scorecards</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full justify-end gap-2">
                  Explore <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:border-kenya-gold transition-colors cursor-pointer">
            <Link href="/exposes">
              <CardHeader>
                <CardTitle>Corruption Exposés</CardTitle>
                <CardDescription>Investigative reports on financial crimes</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full justify-end gap-2">
                  Explore <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Link>
          </Card>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="max-w-2xl mx-auto">
        <NewsletterSignup />
      </section>
    </div>
  );
}

