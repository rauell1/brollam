"use client";

import { useState } from "react";
import { useConsent } from "@/hooks/useConsent";
import { PreferenceModal } from "./PreferenceModal";
import Link from "next/link";

export function CookieBanner({ strictness = "GLOBAL" }: { strictness?: "GDPR" | "CCPA" | "GLOBAL" }) {
  const { isReady, hasConsented, acceptAll, rejectAll } = useConsent(strictness);
  const [showModal, setShowModal] = useState(false);

  if (!isReady || hasConsented) return null; // Disappear once consented

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border p-5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 animate-in slide-in-from-bottom-10">
        <div className="flex-1 max-w-4xl">
          <h3 className="text-lg font-semibold text-foreground">Your Privacy Matters</h3>
          <p className="text-sm text-muted-foreground mt-1">
            We use cookies to improve your experience, analyze site usage, and assist in our marketing efforts. 
            By clicking "Accept All", you agree to the storing of cookies on your device. 
            {strictness === "CCPA" && (
              <span className="block mt-2 font-medium">
                California Residents: <Link href="/privacy" className="underline text-accent hover:text-accent-strong">Do Not Sell or Share My Personal Information</Link>
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto justify-end">
          <button 
            onClick={() => setShowModal(true)} 
            className="px-5 py-2.5 text-sm font-medium border border-border rounded-md hover:bg-muted text-foreground whitespace-nowrap"
          >
            Manage Preferences
          </button>
          
          {strictness === "GDPR" && (
            <button 
              onClick={rejectAll} 
              className="px-5 py-2.5 text-sm font-medium border border-border rounded-md hover:bg-muted text-foreground whitespace-nowrap"
            >
              Reject All
            </button>
          )}
          
          <button 
            onClick={acceptAll} 
            className="px-5 py-2.5 text-sm font-medium bg-accent text-accent-foreground rounded-md hover:opacity-90 shadow-sm whitespace-nowrap"
          >
            Accept All
          </button>
        </div>
      </div>
      
      {showModal && <PreferenceModal onClose={() => setShowModal(false)} strictness={strictness} />}
    </>
  );
}
