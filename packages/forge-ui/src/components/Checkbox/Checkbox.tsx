/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { forwardRef } from "react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  error?: string;
  helperText?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", label, error, helperText, id, disabled, ...props }, ref) => {
    const checkboxId = id || `forge-checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex flex-col gap-1 text-left">
        <label
          htmlFor={checkboxId}
          className={`
            inline-flex items-start gap-2.5 cursor-pointer text-sm font-medium text-foreground select-none
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <div className="relative flex items-center h-5">
            <input
              ref={ref}
              id={checkboxId}
              type="checkbox"
              disabled={disabled}
              className={`
                peer h-5 w-5 rounded-[var(--forge-radius-sm)] border bg-background text-primary-foreground
                transition-all duration-200 outline-none cursor-pointer appearance-none
                ${error ? "border-error focus:ring-error" : "border-border-forge"}
                checked:bg-primary checked:border-primary
                focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary
                disabled:pointer-events-none disabled:bg-muted-forge
              `}
              {...props}
            />
            {/* Visual indicator checkmark */}
            <svg
              className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-primary-foreground opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          {label && <span className="pt-0.5">{label}</span>}
        </label>
        {error ? (
          <p className="text-xs text-error font-medium pl-7.5 leading-none">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-muted-fg-forge pl-7.5 leading-none">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
