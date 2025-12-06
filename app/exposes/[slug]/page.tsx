import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { WhatsAppShare } from "@/components/whatsapp-share";
import { formatCurrency } from "@/lib/utils";
import { sampleExposes } from "@/lib/data/placeholder";
import { Calendar, MapPin, DollarSign, User } from "lucide-react";
import { Metadata } from "next";

interface ExposePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return sampleExposes.map((expose) => ({
    slug: expose.slug,
  }));
}

export async function generateMetadata({ params }: ExposePageProps): Promise<Metadata> {
  const expose = sampleExposes.find((e) => e.slug === params.slug);
  if (!expose) {
    return {
      title: "Exposé Not Found | People's Auditor",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://peoplesauditor.ke";
  const amount = expose.amount_involved > 0 ? formatCurrency(expose.amount_involved) : "";

  return {
    title: `${expose.title} | People's Auditor`,
    description: `${expose.summary}${amount ? ` Amount involved: ${amount}.` : ""}`,
    openGraph: {
      title: expose.title,
      description: expose.summary,
      url: `${siteUrl}/exposes/${params.slug}`,
      siteName: "People's Auditor",
      type: "article",
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: expose.title,
        },
      ],
      locale: "en_KE",
    },
    twitter: {
      card: "summary_large_image",
      title: expose.title,
      description: expose.summary,
      images: [`${siteUrl}/og-image.png`],
      creator: "@peoplesauditor",
    },
  };
}

export default function ExposePage({ params }: ExposePageProps) {
  const expose = sampleExposes.find((e) => e.slug === params.slug);
  if (!expose) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">{expose.title}</h1>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {expose.county}
              </span>
              <span className="px-2 py-1 rounded-md bg-kenya-red/20 text-kenya-red">
                {expose.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(expose.created_at).toLocaleDateString("en-KE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {expose.author}
              </span>
            </div>
          </div>
          <WhatsAppShare
            url={`/exposes/${expose.slug}`}
            title={expose.title}
            description={expose.summary}
          />
        </div>

        {expose.amount_involved > 0 && (
          <Card className="bg-kenya-red/10 border-kenya-red/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Amount Involved
                  </p>
                  <p className="text-3xl font-bold text-kenya-red mt-2">
                    {formatCurrency(expose.amount_involved)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-6">{expose.summary}</p>
            <div className="whitespace-pre-line text-foreground leading-relaxed">
              {expose.content}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <WhatsAppShare
          url={`/exposes/${expose.slug}`}
          title={expose.title}
          description={expose.summary}
        />
      </div>
    </div>
  );
}

