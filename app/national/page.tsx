import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { SankeyChart } from "@/components/sankey-chart";
import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://peoplesauditor.ke";

export const metadata: Metadata = {
  title: "National Budget Dashboard | People's Auditor",
  description: "Track Kenya's national budget allocations, debt servicing, and government spending. See where your taxes go.",
  openGraph: {
    title: "National Budget Dashboard | People's Auditor",
    description: "Track Kenya's KSh 3.5 Trillion budget. See how much goes to debt vs development.",
    url: `${siteUrl}/national`,
    siteName: "People's Auditor",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "National Budget Dashboard",
    description: "Track Kenya's KSh 3.5 Trillion budget",
    images: [`${siteUrl}/og-image.png`],
  },
};

export default function NationalBudgetPage() {
  // Budget allocations data for Sankey chart
  const budgetData = {
    total: 3500000000000, // KSh 3.5 Trillion
    allocations: [
      { category: "Education", amount: 630000000000, color: "#006600" },
      { category: "Health", amount: 140000000000, color: "#DE2910" },
      { category: "Infrastructure", amount: 490000000000, color: "#FFC72C" },
      { category: "Security", amount: 385000000000, color: "#000000" },
      { category: "Agriculture", amount: 140000000000, color: "#006600" },
      { category: "Energy", amount: 175000000000, color: "#FFC72C" },
      { category: "Debt Servicing", amount: 1400000000000, color: "#DE2910" },
      { category: "Other", amount: 441000000000, color: "#808080" },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">National Budget Dashboard</h1>
        <p className="text-muted-foreground">
          Financial Year 2024/2025 - Total Budget: {formatCurrency(budgetData.total)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Budget</CardTitle>
            <CardDescription>2024/2025 Financial Year</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(budgetData.total)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Debt Servicing</CardTitle>
            <CardDescription>Interest and principal payments</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-kenya-red">
              {formatCurrency(1400000000000)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {((1400000000000 / budgetData.total) * 100).toFixed(1)}% of total budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Development Budget</CardTitle>
            <CardDescription>Infrastructure & projects</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-kenya-green">
              {formatCurrency(700000000000)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">20% of total budget</p>
          </CardContent>
        </Card>
      </div>

      {/* Sankey Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Flow Visualization</CardTitle>
          <CardDescription>How the national budget is allocated across sectors</CardDescription>
        </CardHeader>
        <CardContent>
          <SankeyChart data={budgetData} />
        </CardContent>
      </Card>

      {/* Budget Breakdown */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Sector Allocations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budgetData.allocations.map((item) => (
            <Card key={item.category}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.category}</CardTitle>
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{formatCurrency(item.amount)}</p>
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${(item.amount / budgetData.total) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {((item.amount / budgetData.total) * 100).toFixed(2)}% of total budget
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

