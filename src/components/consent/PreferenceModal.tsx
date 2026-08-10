"use client";

import { useState } from "react";
import { useConsent, ConsentCategories } from "@/hooks/useConsent";

interface PreferenceModalProps {
  onClose: () => void;
  strictness: "GDPR" | "CCPA" | "GLOBAL";
}

export function PreferenceModal({ onClose, strictness }: PreferenceModalProps) {
  const { consent, savePreferences } = useConsent(strictness);

  const [draft, setDraft] = useState<ConsentCategories>(
    consent || {
      necessary: true,
      analytics: strictness === "GDPR" ? false : true,
      marketing: strictness === "GDPR" ? false : true,
      preferences: strictness === "GDPR" ? false : true,
    }
  );

  const handleSave = () => {
    savePreferences(draft);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-card border border-border shadow-2xl rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Privacy Preferences</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6 flex-1">
          <p className="text-sm text-muted-foreground">
            We use cookies to help you navigate efficiently and perform certain functions. You will find detailed
            information about all cookies under each consent category below.
          </p>

          <div className="space-y-4">
            {/* Necessary */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-lg bg-muted/50 border border-border">
              <div>
                <h4 className="font-semibold text-foreground">Strictly Necessary</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Required for the website to function properly. Cannot be switched off.
                </p>
              </div>
              <div className="pt-1">
                <span className="text-xs font-semibold text-accent uppercase">Always Active</span>
              </div>
            </div>

            {/* Analytics */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-border">
              <div>
                <h4 className="font-semibold text-foreground">Analytics</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Helps us understand how visitors interact with the website by collecting and reporting information anonymously.
                </p>
              </div>
              <div className="pt-1">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={draft.analytics} 
                    onChange={(e) => setDraft({ ...draft, analytics: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>

            {/* Marketing */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-border">
              <div>
                <h4 className="font-semibold text-foreground">Marketing & Tracking</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Used to track visitors across websites to display relevant advertisements.
                </p>
              </div>
              <div className="pt-1">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={draft.marketing} 
                    onChange={(e) => setDraft({ ...draft, marketing: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>
            
            {/* Preferences */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-border">
              <div>
                <h4 className="font-semibold text-foreground">Preferences</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Enables the website to remember information that changes the way the website behaves or looks.
                </p>
              </div>
              <div className="pt-1">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={draft.preferences} 
                    onChange={(e) => setDraft({ ...draft, preferences: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border bg-muted/20 flex justify-end gap-3 rounded-b-xl">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium border border-border rounded-md hover:bg-muted text-foreground">
            Cancel
          </button>
          <button onClick={handleSave} className="px-5 py-2.5 text-sm font-medium bg-accent text-accent-foreground rounded-md hover:opacity-90 shadow-sm">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
