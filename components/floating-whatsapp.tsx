"use client";

import { useEffect, useState } from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on mobile devices
    const checkMobile = () => {
      setIsVisible(window.innerWidth < 768);
    };
    
    // Use passive listener for better performance
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleShare = () => {
    const fullUrl = typeof window !== "undefined" ? window.location.href : "";
    let title = "People's Auditor - Kenya's Public Finance Watchdog";
    
    // Customize message based on page
    if (pathname.startsWith("/counties/")) {
      const countyName = pathname.split("/")[2]?.replace(/-/g, " ") || "County";
      title = `Look at this theft in ${countyName.charAt(0).toUpperCase() + countyName.slice(1)} County`;
    } else if (pathname.startsWith("/exposes/")) {
      title = "Check out this corruption exposé";
    }
    
    const text = `${title}\n\n${fullUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <Button
        onClick={handleShare}
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg bg-kenya-green hover:bg-kenya-green/90"
      >
        <Share2 className="h-6 w-6" />
      </Button>
    </div>
  );
}

