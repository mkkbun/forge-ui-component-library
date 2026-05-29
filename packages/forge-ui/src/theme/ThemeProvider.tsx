/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { defaultTokens, DesignTokens } from "./tokens";

export type ThemeMode = "light" | "dark";

export interface ThemeContextProps {
  theme: ThemeMode;
  tokens: DesignTokens;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  updateTokens: (updater: (prev: DesignTokens) => DesignTokens) => void;
  resetTokens: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({
  children,
  initialTheme = "light",
}: {
  children: React.ReactNode;
  initialTheme?: ThemeMode;
}) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("forge-theme");
      if (stored === "light" || stored === "dark") return stored;
      
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      return media.matches ? "dark" : "light";
    }
    return initialTheme;
  });

  const [tokens, setTokens] = useState<DesignTokens>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("forge-tokens");
      if (stored) {
        try {
          return { ...defaultTokens, ...JSON.parse(stored) };
        } catch {
          return defaultTokens;
        }
      }
    }
    return defaultTokens;
  });

  useEffect(() => {
    localStorage.setItem("forge-theme", theme);
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    applyThemeVariables(theme, tokens);
  }, [theme, tokens]);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const updateTokens = (updater: (prev: DesignTokens) => DesignTokens) => {
    setTokens((prev) => {
      const next = updater(prev);
      localStorage.setItem("forge-tokens", JSON.stringify(next));
      return next;
    });
  };

  const resetTokens = () => {
    setTokens(defaultTokens);
    localStorage.removeItem("forge-tokens");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        tokens,
        setTheme,
        toggleTheme,
        updateTokens,
        resetTokens,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

function applyThemeVariables(mode: ThemeMode, tokens: DesignTokens) {
  const root = document.documentElement;

  // Set colors
  const { colors, radius } = tokens;

  // Set RGB value for custom variables
  const setVar = (name: string, value: string) => {
    root.style.setProperty(name, value);
  };

  // Traversal helper
  setVar("--forge-color-primary", colors.brand.primary[mode]);
  setVar("--forge-color-primary-hover", colors.brand.primaryHover[mode]);
  setVar("--forge-color-primary-active", colors.brand.primaryActive[mode]);
  setVar("--forge-color-primary-foreground", colors.brand.primaryForeground[mode]);

  setVar("--forge-color-accent", colors.accent.default[mode]);
  setVar("--forge-color-accent-hover", colors.accent.hover[mode]);
  setVar("--forge-color-accent-foreground", colors.accent.foreground[mode]);

  setVar("--forge-color-background", colors.neutral.background[mode]);
  setVar("--forge-color-foreground", colors.neutral.foreground[mode]);
  setVar("--forge-color-card", colors.neutral.card[mode]);
  setVar("--forge-color-card-foreground", colors.neutral.cardForeground[mode]);
  setVar("--forge-color-border", colors.neutral.border[mode]);
  setVar("--forge-color-muted", colors.neutral.muted[mode]);
  setVar("--forge-color-muted-foreground", colors.neutral.mutedForeground[mode]);

  setVar("--forge-color-success", colors.semantic.success[mode]);
  setVar("--forge-color-success-hover", colors.semantic.successHover[mode]);
  setVar("--forge-color-success-foreground", colors.semantic.successForeground[mode]);

  setVar("--forge-color-error", colors.semantic.error[mode]);
  setVar("--forge-color-error-hover", colors.semantic.errorHover[mode]);
  setVar("--forge-color-error-foreground", colors.semantic.errorForeground[mode]);

  setVar("--forge-color-warning", colors.semantic.warning[mode]);
  setVar("--forge-color-warning-hover", colors.semantic.warningHover[mode]);
  setVar("--forge-color-warning-foreground", colors.semantic.warningForeground[mode]);

  setVar("--forge-color-info", colors.semantic.info[mode]);
  setVar("--forge-color-info-hover", colors.semantic.infoHover[mode]);
  setVar("--forge-color-info-foreground", colors.semantic.infoForeground[mode]);

  // Set radius
  setVar("--forge-radius-none", radius.none);
  setVar("--forge-radius-sm", radius.sm);
  setVar("--forge-radius-md", radius.md);
  setVar("--forge-radius-lg", radius.lg);
  setVar("--forge-radius-full", radius.full);

  // Set Fonts
  root.style.setProperty("--forge-font-sans", tokens.fontFamily.sans);
  root.style.setProperty("--forge-font-mono", tokens.fontFamily.mono);
}
