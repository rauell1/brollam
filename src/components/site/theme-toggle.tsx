"use client";

import { useLayoutEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "brollam-theme";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // System preference remains available when storage is blocked.
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle({ className }: { className?: string }) {
  useLayoutEffect(() => {
    // React can reset root attributes during a development remount.
    applyTheme(getPreferredTheme());
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";

    applyTheme(nextTheme);

    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // The theme still applies for this page when storage is blocked.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border-strong text-foreground transition-colors hover:border-accent hover:text-accent",
        className,
      )}
    >
      <Sun className="block h-4.5 w-4.5 dark:hidden" aria-hidden="true" />
      <Moon className="hidden h-4.5 w-4.5 dark:block" aria-hidden="true" />
    </button>
  );
}
