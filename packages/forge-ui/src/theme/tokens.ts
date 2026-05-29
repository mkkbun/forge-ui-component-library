/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ColorToken {
  light: string;
  dark: string;
}

export interface DesignTokens {
  colors: {
    brand: {
      primary: ColorToken;
      primaryHover: ColorToken;
      primaryActive: ColorToken;
      primaryForeground: ColorToken;
    };
    accent: {
      default: ColorToken;
      hover: ColorToken;
      foreground: ColorToken;
    };
    neutral: {
      background: ColorToken;
      foreground: ColorToken;
      card: ColorToken;
      cardForeground: ColorToken;
      border: ColorToken;
      muted: ColorToken;
      mutedForeground: ColorToken;
    };
    semantic: {
      success: ColorToken;
      successHover: ColorToken;
      successForeground: ColorToken;
      error: ColorToken;
      errorHover: ColorToken;
      errorForeground: ColorToken;
      warning: ColorToken;
      warningHover: ColorToken;
      warningForeground: ColorToken;
      info: ColorToken;
      infoHover: ColorToken;
      infoForeground: ColorToken;
    };
  };
  radius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  fontFamily: {
    sans: string;
    mono: string;
  };
}

export const defaultTokens: DesignTokens = {
  colors: {
    brand: {
      primary: {
        light: "15 23 42", // slate-900
        dark: "248 250 252", // slate-50
      },
      primaryHover: {
        light: "51 65 85", // slate-700
        dark: "226 232 240", // slate-200
      },
      primaryActive: {
        light: "30 41 59", // slate-800
        dark: "203 213 225", // slate-300
      },
      primaryForeground: {
        light: "255 255 255", // white
        dark: "15 23 42", // slate-900
      },
    },
    accent: {
      default: {
        light: "99 102 241", // indigo-500
        dark: "129 140 248", // indigo-400
      },
      hover: {
        light: "79 70 229", // indigo-600
        dark: "99 102 241", // indigo-500
      },
      foreground: {
        light: "255 255 255",
        dark: "15 23 42",
      },
    },
    neutral: {
      background: {
        light: "255 255 255", // white
        dark: "9 9 11", // zinc-950
      },
      foreground: {
        light: "9 9 11", // zinc-950
        dark: "250 250 250", // zinc-50
      },
      card: {
        light: "250 250 250", // zinc-50
        dark: "18 18 20", // zinc-900
      },
      cardForeground: {
        light: "9 9 11",
        dark: "250 250 250",
      },
      border: {
        light: "228 228 231", // zinc-200
        dark: "39 39 42", // zinc-800
      },
      muted: {
        light: "244 244 245", // zinc-100
        dark: "24 24 27", // zinc-900
      },
      mutedForeground: {
        light: "113 113 122", // zinc-500
        dark: "161 161 170", // zinc-400
      },
    },
    semantic: {
      success: {
        light: "22 163 74", // green-600
        dark: "34 197 94", // green-500
      },
      successHover: {
        light: "21 128 61", // green-700
        dark: "22 163 74",
      },
      successForeground: {
        light: "255 255 255",
        dark: "9 9 11",
      },
      error: {
        light: "220 38 38", // red-600
        dark: "239 68 68", // red-500
      },
      errorHover: {
        light: "185 28 28", // red-700
        dark: "220 38 38",
      },
      errorForeground: {
        light: "255 255 255",
        dark: "9 9 11",
      },
      warning: {
        light: "217 119 6", // amber-600
        dark: "245 158 11", // amber-500
      },
      warningHover: {
        light: "180 83 9", // amber-700
        dark: "217 119 6",
      },
      warningForeground: {
        light: "255 255 255",
        dark: "9 9 11",
      },
      info: {
        light: "37 99 235", // blue-600
        dark: "59 130 246", // blue-500
      },
      infoHover: {
        light: "29 78 216", // blue-700
        dark: "37 99 235",
      },
      infoForeground: {
        light: "255 255 255",
        dark: "9 9 11",
      },
    },
  },
  radius: {
    none: "0px",
    sm: "4px",
    md: "6px",
    lg: "10px",
    full: "9999px",
  },
  fontFamily: {
    sans: "Inter, sans-serif",
    mono: "JetBrains Mono, monospace",
  },
};
