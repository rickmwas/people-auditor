"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, AlertTriangle, Heart, GraduationCap } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function TaxBurdenCalculator() {
  const [monthlySalary, setMonthlySalary] = useState<string>("");
  const [results, setResults] = useState<any>(null);

  // Kenya tax brackets (2024)
  const calculateTax = (annual: number): number => {
    let tax = 0;
    if (annual > 288000) {
      // 30% bracket
      tax += (annual - 288000) * 0.3;
      annual = 288000;
    }
    if (annual > 240000) {
      // 25% bracket
      tax += (annual - 240000) * 0.25;
      annual = 240000;
    }
    // 10% bracket
    tax += annual * 0.1;
    return tax;
  };

  const handleCalculate = () => {
    const salary = parseFloat(monthlySalary.replace(/,/g, ""));
    if (!salary || salary <= 0) return;

    const annualSalary = salary * 12;
    const annualTax = calculateTax(annualSalary);
    const monthlyTax = annualTax / 12;

    // National budget allocations (2024/2025)
    const totalBudget = 3500000000000; // KSh 3.5 Trillion
    const debtServicing = 1400000000000; // 40% of budget
    const health = 140000000000; // 4%
    const education = 630000000000; // 18%
    const security = 385000000000; // 11%

    // Calculate user's contribution based on tax proportion
    const totalTaxRevenue = 1500000000000; // Estimated total tax revenue
    const userTaxProportion = annualTax / totalTaxRevenue;

    const results = {
      monthlySalary: salary,
      annualSalary,
      annualTax,
      monthlyTax,
      allocations: {
        debtServicing: (debtServicing * userTaxProportion) / 12,
        health: (health * userTaxProportion) / 12,
        education: (education * userTaxProportion) / 12,
        security: (security * userTaxProportion) / 12,
      },
    };

    setResults(results);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-kenya-red" />
          Your Tax Burden Calculator
        </CardTitle>
        <CardDescription>
          See exactly where your tax money goes each month
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="salary">Monthly Gross Salary (KSh)</Label>
          <div className="flex gap-2">
            <Input
              id="salary"
              type="text"
              placeholder="e.g., 50000"
              value={monthlySalary}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                setMonthlySalary(value);
              }}
              className="text-lg"
            />
            <Button onClick={handleCalculate} className="gap-2">
              Calculate
            </Button>
          </div>
        </div>

        {results && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Tax</p>
                <p className="text-2xl font-bold text-kenya-red">
                  {formatCurrency(results.monthlyTax)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Annual Tax</p>
                <p className="text-2xl font-bold">{formatCurrency(results.annualTax)}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Where Your Monthly Tax Goes:</h3>

              {/* Debt Servicing */}
              <div className="p-4 rounded-lg border-2 border-kenya-red/50 bg-kenya-red/10">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-kenya-red" />
                    <span className="font-semibold">Debt Servicing</span>
                  </div>
                  <span className="text-xl font-bold text-kenya-red">
                    {formatCurrency(results.allocations.debtServicing)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {(results.allocations.debtServicing / results.monthlyTax * 100).toFixed(1)}% of your tax
                </p>
              </div>

              {/* Education */}
              <div className="p-4 rounded-lg border border-kenya-green/50 bg-kenya-green/10">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-kenya-green" />
                    <span className="font-semibold">Education</span>
                  </div>
                  <span className="text-xl font-bold text-kenya-green">
                    {formatCurrency(results.allocations.education)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {(results.allocations.education / results.monthlyTax * 100).toFixed(1)}% of your tax
                </p>
              </div>

              {/* Health */}
              <div className="p-4 rounded-lg border border-kenya-green/50 bg-kenya-green/10">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-kenya-green" />
                    <span className="font-semibold">Health</span>
                  </div>
                  <span className="text-xl font-bold text-kenya-green">
                    {formatCurrency(results.allocations.health)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {(results.allocations.health / results.monthlyTax * 100).toFixed(1)}% of your tax
                </p>
              </div>

              {/* Security */}
              <div className="p-4 rounded-lg border border-border bg-muted/50">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-semibold">Security & Defense</span>
                  <span className="text-xl font-bold">
                    {formatCurrency(results.allocations.security)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {(results.allocations.security / results.monthlyTax * 100).toFixed(1)}% of your tax
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-kenya-red/10 border border-kenya-red/30">
              <p className="text-sm font-semibold text-kenya-red mb-1">Key Insight</p>
              <p className="text-sm text-muted-foreground">
                Out of your monthly tax of {formatCurrency(results.monthlyTax)}, more than{" "}
                {formatCurrency(results.allocations.debtServicing)} goes to paying off debt instead of
                funding health and education.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

