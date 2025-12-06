import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://peoplesauditor.ke";
const defaultImage = `${baseUrl}/og-image.png`;

interface GenerateMetadataProps {
  title: string;
  description: string;
  image?: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
}

export function generateMetadata({
  title,
  description,
  image = defaultImage,
  path = "",
  type = "website",
  publishedTime,
}: GenerateMetadataProps): Metadata {
  const url = `${baseUrl}${path}`;
  const fullTitle = title.includes("People's Auditor") ? title : `${title} | People's Auditor`;

  return {
    title: fullTitle,
    description,
    keywords: ["Kenya", "public finance", "corruption", "transparency", "accountability", "county budgets", "national debt"],
    authors: [{ name: "People's Auditor" }],
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "People's Auditor",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_KE",
      type,
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@peoplesauditor",
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}



