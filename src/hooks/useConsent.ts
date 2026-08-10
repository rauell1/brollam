"use client";

import { useState, useEffect } from "react";

export type ConsentCategories = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

const CONSENT_KEY = "brollam-consent-state";

export function useConsent(strictness: "GDPR" | "CCPA" | "GLOBAL" = "GLOBAL") {
  const [consent, setConsent] = useState<ConsentCategories | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setConsent(parsed);
      updateConsentMode(parsed);
    } else {
      // Apply defaults based on Geolocation
      const defaults = {
        necessary: true,
        analytics: strictness === "GDPR" ? false : true,
        marketing: strictness === "GDPR" ? false : true,
        preferences: strictness === "GDPR" ? false : true,
      };
      updateConsentMode(defaults, true);
    }
    setIsReady(true);
  }, [strictness]);

  const updateConsentMode = (categories: ConsentCategories, isDefault = false) => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(arguments);
    }

    const command = isDefault ? "default" : "update";
    gtag("consent", command, {
      ad_storage: categories.marketing ? "granted" : "denied",
      ad_user_data: categories.marketing ? "granted" : "denied",
      ad_personalization: categories.marketing ? "granted" : "denied",
      analytics_storage: categories.analytics ? "granted" : "denied",
      personalization_storage: categories.preferences ? "granted" : "denied",
    });
  };

  const savePreferences = (newConsent: ConsentCategories) => {
    const finalConsent = { ...newConsent, necessary: true };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(finalConsent));
    setConsent(finalConsent);
    updateConsentMode(finalConsent);
    window.dispatchEvent(new CustomEvent("consentUpdated", { detail: finalConsent }));
  };

  const acceptAll = () =>
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });

  const rejectAll = () =>
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });

  return {
    consent,
    isReady,
    hasConsented: consent !== null,
    savePreferences,
    acceptAll,
    rejectAll,
  };
}
