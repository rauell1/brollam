"use client";

import { useState } from "react";
import { PreferenceModal } from "./PreferenceModal";
import { useConsent } from "@/hooks/useConsent";

export function FloatingShield() {
  const [showModal, setShowModal] = useState(false);
  const { isReady, hasConsented } = useConsent();

  // Only show the floating shield if they've already made a choice (banner is hidden)
  if (!isReady || !hasConsented) return null;

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-4 left-4 z-40 p-3 bg-card border border-border shadow-lg rounded-full text-muted-foreground hover:text-accent transition-colors group"
        aria-label="Manage Privacy Preferences"
        title="Privacy Preferences"
      >
        <svg 
          className="w-5 h-5 group-hover:scale-110 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" 
          />
        </svg>
      </button>

      {showModal && <PreferenceModal onClose={() => setShowModal(false)} strictness="GLOBAL" />}
    </>
  );
}
