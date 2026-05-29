/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { forwardRef } from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className = "", variant = "rectangular", ...props }, ref) => {
    const variants: Record<"text" | "circular" | "rectangular", string> = {
      text: "h-4 w-full rounded-[var(--forge-radius-sm)]",
      circular: "h-12 w-12 rounded-full shrink-0",
      rectangular: "h-24 w-full rounded-[var(--forge-radius-md)]",
    };

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={`animate-pulse bg-muted-forge border border-border-forge/20 ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";
