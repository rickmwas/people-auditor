import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Globe, Users, FileText, TrendingUp, Shield } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Civic Education Hub | People's Auditor",
  description: "Learn about public finance, transparency, and your rights as a Kenyan citizen. Available in English and Swahili.",
};

export default function LearnPage() {
  const topics = [
    {
      icon: TrendingUp,
      title: "Understanding Public Finance",
      description: "Learn how government budgets work, where your taxes go, and how to track spending.",
      lang: "English",
    },
    {
      icon: Shield,
      title: "Kuelewa Fedha za Umma",
      description: "Jifunze jinsi bajeti za serikali zinavyofanya kazi na jinsi ya kufuatilia matumizi.",
      lang: "Swahili",
    },
    {
      icon: FileText,
      title: "Budget Analysis for Citizens",
      description: "Step-by-step guide to reading and analyzing county and national budgets.",
      lang: "English",
    },
    {
      icon: Users,
      title: "Haki Zako kama Mwananchi",
      description: "Jifunze haki zako za kisheria na jinsi ya kuitumia serikali kwa uwajibikaji.",
      lang: "Swahili",
    },
    {
      icon: BookOpen,
      title: "Access to Information Act",
      description: "How to request government information and what you're entitled to know.",
      lang: "English",
    },
    {
      icon: Globe,
      title: "Uwajibikaji wa Serikali",
      description: "Jifunze jinsi ya kuwaangalia viongozi wako na kuhakikisha wanafanya kazi kwa manufaa yako.",
      lang: "Swahili",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Civic Education Hub</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn about public finance, transparency, and your rights as a Kenyan citizen. Available in English and Swahili.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => {
          const Icon = topic.icon;
          return (
            <Card key={index} className="hover:border-kenya-green transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Icon className="h-8 w-8 text-kenya-green mb-2" />
                  <span className="text-xs px-2 py-1 rounded-md bg-kenya-red/20 text-kenya-red">
                    {topic.lang}
                  </span>
                </div>
                <CardTitle>{topic.title}</CardTitle>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Guides */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Quick Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>How to Read a Budget</CardTitle>
              <CardDescription>5-minute guide to understanding government budgets</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Understand budget categories and allocations</li>
                <li>• Identify wasteful spending</li>
                <li>• Compare budget vs actual spending</li>
                <li>• Track development projects</li>
              </ul>
              <Button variant="kenya" className="mt-4 w-full">
                Read Guide
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reporting Corruption</CardTitle>
              <CardDescription>Know your rights and how to report safely</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Whistleblower protection laws</li>
                <li>• Where to report corruption</li>
                <li>• What evidence is needed</li>
                <li>• Staying safe while reporting</li>
              </ul>
              <Button variant="kenya" className="mt-4 w-full">
                Read Guide
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

