"use client";

import { useEffect, useState } from "react";
import { CookieBanner } from "./CookieBanner";
import { FloatingShield } from "./FloatingShield";
import { useConsent } from "@/hooks/useConsent";
import Script from "next/script";

interface ConsentProviderProps {
  strictness?: "GDPR" | "CCPA" | "GLOBAL";
  children: React.ReactNode;
}

export function ConsentProvider({ strictness = "GLOBAL", children }: ConsentProviderProps) {
  const { consent, isReady, hasConsented } = useConsent(strictness);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {children}
      
      {/* Auto-blocking Manager */}
      {/* External scripts are conditionally injected into the DOM based on consent */}
      
      {consent?.analytics && (
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      )}

      {consent?.marketing && (
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'XXXXXXXXXXXXXXX');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}

      {/* Render Banner and Floating Shield */}
      {mounted && (
        <>
          {!hasConsented && <CookieBanner strictness={strictness} />}
          {hasConsented && <FloatingShield />}
        </>
      )}
    </>
  );
}
