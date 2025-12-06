"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface WhatsAppShareProps {
  url: string;
  title: string;
  description?: string;
}

export function WhatsAppShare({ url, title, description }: WhatsAppShareProps) {
  const handleShare = () => {
    const fullUrl = typeof window !== "undefined" ? window.location.origin + url : url;
    const text = `${title}${description ? `\n\n${description}` : ""}\n\n${fullUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Button
      variant="kenya"
      size="sm"
      onClick={handleShare}
      className="gap-2"
    >
      <Share2 className="h-4 w-4" />
      Share on WhatsApp
    </Button>
  );
}

