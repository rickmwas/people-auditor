import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WhatsAppShare } from "@/components/whatsapp-share";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { allCounties, featuredCountiesData } from "@/lib/data/counties";
import { Metadata } from "next";
import { User, Building2, AlertCircle, CheckCircle2, XCircle, TrendingUp, TrendingDown } from "lucide-react";

interface CountyPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allCounties.map((county) => ({
    slug: county.slug,
  }));
}

export async function generateMetadata({ params }: CountyPageProps): Promise<Metadata> {
  const county = allCounties.find((c) => c.slug === params.slug);
  if (!county) {
    return {
      title: "County Not Found | People's Auditor",
    };
  }

  return {
    title: `${county.name} County Scorecard | People's Auditor`,
    description: `Financial scorecard for ${county.name} County. Budget, debt, pending bills, and corruption index.`,
  };
}

function getAuditorRatingColor(rating: string) {
  switch (rating) {
    case "Good":
      return "bg-kenya-green text-white";
    case "Fair":
      return "bg-kenya-gold text-kenya-black";
    case "Adverse":
      return "bg-kenya-red text-white";
    default:
      return "bg-muted";
  }
}

export default function CountyPage({ params }: CountyPageProps) {
  const county = allCounties.find((c) => c.slug === params.slug);
  if (!county) {
    notFound();
  }

  const countyData = featuredCountiesData[params.slug] || {
    slug: params.slug,
    name: county.name,
    budget_2024: 0,
    budget_2023: 0,
    actual_spend_2024: 0,
    pending_bills: 0,
    absorption_rate: 0,
    debt: 0,
    corruption_index: 0,
    population: 0,
    governor_name: null,
    governor_photo: null,
    mansion_photo: null,
    auditor_rating: null,
    ghost_projects: [],
  };

  const corruptionLevel =
    countyData.corruption_index >= 70
      ? "Critical"
      : countyData.corruption_index >= 50
      ? "High"
      : countyData.corruption_index >= 30
      ? "Moderate"
      : "Low";

  const budgetVariance = countyData.budget_2024 > 0 && countyData.actual_spend_2024 > 0
    ? ((countyData.actual_spend_2024 / countyData.budget_2024) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">{county.name} County</h1>
          <p className="text-muted-foreground">{county.region} Region • Code: {county.code}</p>
        </div>
        <WhatsAppShare
          url={`/counties/${params.slug}`}
          title={`Look at this theft in ${county.name} County`}
          description={`View the complete financial scorecard for ${county.name} County on People's Auditor.`}
        />
      </div>

      {/* Governor and Mansion Photos */}
      {(countyData.governor_photo || countyData.mansion_photo) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {countyData.governor_photo && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Governor
                </CardTitle>
                <CardDescription>{countyData.governor_name || "County Governor"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <Image
                    src={countyData.governor_photo}
                    alt={`${county.name} County Governor`}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {countyData.mansion_photo && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  County Mansion
                </CardTitle>
                <CardDescription>Official residence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <Image
                    src={countyData.mansion_photo}
                    alt={`${county.name} County Mansion`}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Budget 2024</CardTitle>
            <CardDescription>Financial Year</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {countyData.budget_2024 > 0
                ? formatCurrency(countyData.budget_2024)
                : "Data unavailable"}
            </p>
            {countyData.budget_2023 > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                Previous: {formatCurrency(countyData.budget_2023)}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Actual Spend</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {countyData.actual_spend_2024 > 0
                ? formatCurrency(countyData.actual_spend_2024)
                : "Data unavailable"}
            </p>
            {budgetVariance > 0 && (
              <div className="flex items-center gap-1 mt-1">
                {budgetVariance >= 90 ? (
                  <TrendingUp className="h-4 w-4 text-kenya-green" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-kenya-red" />
                )}
                <p className={`text-sm ${budgetVariance >= 90 ? "text-kenya-green" : "text-kenya-red"}`}>
                  {budgetVariance.toFixed(1)}% of budget
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending Bills</CardTitle>
            <CardDescription>Unpaid obligations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-kenya-red">
              {countyData.pending_bills > 0
                ? formatCurrency(countyData.pending_bills)
                : "Data unavailable"}
            </p>
            {countyData.budget_2024 > 0 && countyData.pending_bills > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {((countyData.pending_bills / countyData.budget_2024) * 100).toFixed(1)}% of budget
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Absorption Rate</CardTitle>
            <CardDescription>Budget utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-kenya-green">
              {countyData.absorption_rate > 0 ? `${countyData.absorption_rate}%` : "N/A"}
            </p>
            <div className="mt-2 w-full bg-muted rounded-full h-2">
              <div
                className="h-2 rounded-full bg-kenya-green"
                style={{ width: `${countyData.absorption_rate}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget vs Actual Comparison */}
      {countyData.budget_2024 > 0 && countyData.actual_spend_2024 > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Budget vs Actual Spending</CardTitle>
            <CardDescription>Financial Year 2024/2025 performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Budget Allocation</span>
                <span className="font-semibold">{formatCurrency(countyData.budget_2024)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Actual Spend</span>
                <span className="font-semibold">{formatCurrency(countyData.actual_spend_2024)}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-4">
                <div
                  className="h-4 rounded-full bg-kenya-green transition-all"
                  style={{ width: `${budgetVariance}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">0%</span>
                <span className="font-semibold">{budgetVariance.toFixed(1)}%</span>
                <span className="text-muted-foreground">100%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Auditor-General Rating */}
      {countyData.auditor_rating && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Auditor-General Rating
            </CardTitle>
            <CardDescription>Official audit assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Badge className={`${getAuditorRatingColor(countyData.auditor_rating)} text-lg px-4 py-2`}>
                {countyData.auditor_rating === "Good" && <CheckCircle2 className="h-4 w-4 mr-2" />}
                {countyData.auditor_rating === "Adverse" && <XCircle className="h-4 w-4 mr-2" />}
                {countyData.auditor_rating}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {countyData.auditor_rating === "Good"
                  ? "Clean audit opinion - finances in order"
                  : countyData.auditor_rating === "Fair"
                  ? "Some concerns identified - needs improvement"
                  : "Significant issues found - requires urgent attention"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ghost Projects */}
      {countyData.ghost_projects && countyData.ghost_projects.length > 0 && (
        <Card className="border-kenya-red/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-kenya-red">
              <AlertCircle className="h-5 w-5" />
              Ghost Projects
            </CardTitle>
            <CardDescription>Projects paid for but missing or incomplete</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {countyData.ghost_projects.map((project: any, index: number) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-kenya-red/30 bg-kenya-red/10"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">{project.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Status: <span className="font-semibold text-kenya-red">{project.status}</span>
                      </p>
                    </div>
                    <p className="text-xl font-bold text-kenya-red">
                      {formatCurrency(project.amount)}
                    </p>
                  </div>
                </div>
              ))}
              <p className="text-sm text-muted-foreground italic">
                Total ghost project value:{" "}
                {formatCurrency(
                  countyData.ghost_projects.reduce(
                    (sum: number, p: any) => sum + p.amount,
                    0
                  )
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Corruption Index */}
      <Card>
        <CardHeader>
          <CardTitle>Corruption Index</CardTitle>
          <CardDescription>
            Risk level: <span className="font-semibold text-kenya-red">{corruptionLevel}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Index Score</span>
              <span className="text-2xl font-bold">{countyData.corruption_index || "N/A"}/100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-4">
              <div
                className={`h-4 rounded-full ${
                  countyData.corruption_index >= 70
                    ? "bg-kenya-red"
                    : countyData.corruption_index >= 50
                    ? "bg-orange-500"
                    : countyData.corruption_index >= 30
                    ? "bg-kenya-gold"
                    : "bg-kenya-green"
                }`}
                style={{ width: `${countyData.corruption_index || 0}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {countyData.corruption_index >= 70
                ? "Immediate intervention required"
                : countyData.corruption_index >= 50
                ? "High risk of corruption"
                : countyData.corruption_index >= 30
                ? "Moderate risk level"
                : "Lower risk level"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

