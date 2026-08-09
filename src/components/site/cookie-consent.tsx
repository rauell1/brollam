"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const updateConsent = (granted: boolean) => {
    localStorage.setItem("cookie_consent", granted ? "granted" : "denied");
    setShow(false);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[999] max-w-sm rounded-md border border-border bg-card p-4 shadow-lg sm:bottom-6 sm:left-6 sm:max-w-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-foreground">We value your privacy</p>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            We use strictly necessary cookies to operate the site, and optional analytics cookies to
            understand how people use it. We never use advertising or cross-site tracking cookies.
            Read our{" "}
            <Link href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <button
          type="button"
          onClick={() => updateConsent(false)}
          className="shrink-0 text-muted-foreground hover:text-foreground"
          aria-label="Close and reject optional cookies"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-4 flex flex-col gap-2 min-[400px]:flex-row">
        <button
          onClick={() => updateConsent(true)}
          className="flex-1 rounded-sm bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground hover:bg-accent-strong transition-colors"
        >
          Accept Analytics
        </button>
        <button
          onClick={() => updateConsent(false)}
          className="flex-1 rounded-sm border border-border bg-transparent px-4 py-2 text-xs font-semibold text-foreground hover:bg-surface transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
