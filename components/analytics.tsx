"use client";

import { useEffect } from "react";
import Script from "next/script";

export function UmamiAnalytics() {
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  if (!umamiWebsiteId) {
    return null;
  }

  return (
    <Script
      async
      defer
      data-website-id={umamiWebsiteId}
      src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || "/umami.js"}
      strategy="afterInteractive"
    />
  );
}
