import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://peoplesauditor.ke";
const defaultImage = `${siteUrl}/og-image.png`;

export function generatePageMetadata({
  title,
  description,
  image,
  path = "",
  type = "website",
}: {
  title: string;
  description: string;
  image?: string;
  path?: string;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = title.includes("People's Auditor") ? title : `${title} | People's Auditor`;
  const url = `${siteUrl}${path}`;
  const ogImage = image || defaultImage;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "People's Auditor",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_KE",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: "@peoplesauditor",
    },
    alternates: {
      canonical: url,
    },
  };
}



