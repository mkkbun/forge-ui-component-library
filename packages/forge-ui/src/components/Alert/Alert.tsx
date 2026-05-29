/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { forwardRef } from "react";

export type AlertType = "success" | "error" | "warning" | "info";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: AlertType;
  title?: string;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className = "", type = "info", title, children, ...props }, ref) => {
    const backgrounds: Record<AlertType, string> = {
      success: "bg-success/10 border-success/30 text-success",
      error: "bg-error/10 border-error/30 text-error",
      warning: "bg-warning/10 border-warning/30 text-warning",
      info: "bg-info/10 border-info/30 text-info",
    };

    const icons: Record<AlertType, React.ReactNode> = {
      success: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      error: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      warning: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      info: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={`flex gap-3 p-4 border rounded-[var(--forge-radius-lg)] text-sm align-start text-left font-sans ${backgrounds[type]} ${className}`}
        {...props}
      >
        <div className="shrink-0 mt-0.5">{icons[type]}</div>
        <div className="flex flex-col gap-1 w-full">
          {title && <span className="font-bold text-foreground leading-tight">{title}</span>}
          {children && <div className="text-foreground/80 leading-relaxed">{children}</div>}
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";
