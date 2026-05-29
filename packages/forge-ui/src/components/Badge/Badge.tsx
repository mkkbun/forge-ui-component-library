/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { forwardRef } from "react";

export type BadgeVariant = "default" | "secondary" | "success" | "warning" | "error" | "info" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    const variants: Record<BadgeVariant, string> = {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-muted-forge text-foreground border border-transparent",
      success: "bg-success/15 text-success border border-transparent",
      warning: "bg-warning/15 text-warning border border-transparent",
      error: "bg-error/15 text-error border border-transparent",
      info: "bg-info/15 text-info border border-transparent",
      outline: "bg-transparent border border-border-forge text-foreground",
    };

    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold font-sans tracking-wide uppercase select-none
          ${variants[variant]}
          ${className}
        `}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
