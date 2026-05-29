/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label for the input
   */
  label?: string;
  /**
   * Helper text or description
   */
  helperText?: string;
  /**
   * Error message to display, also sets invalid state
   */
  error?: string;
  /**
   * Node to render before the input text
   */
  leftAddon?: React.ReactNode;
  /**
   * Node to render after the input text
   */
  rightAddon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, helperText, error, leftAddon, rightAddon, id, disabled, ...props }, ref) => {
    const inputId = id || `forge-input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full flex flex-col gap-1.5 align-start text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-foreground select-none"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {leftAddon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-muted-fg-forge">
              {leftAddon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={`
              w-full h-10 px-3 py-2 text-sm bg-background border rounded-[var(--forge-radius-md)] text-foreground
              transition-all duration-200 outline-none placeholder:text-muted-fg-forge
              disabled:opacity-50 disabled:bg-muted-forge disabled:pointer-events-none
              focus:ring-2 focus:ring-primary focus:border-primary-hover
              ${error ? "border-error focus:ring-error focus:border-error" : "border-border-forge"}
              ${leftAddon ? "pl-9" : ""}
              ${rightAddon ? "pr-9" : ""}
              ${className}
            `}
            {...props}
          />
          {rightAddon && (
            <div className="absolute right-3 flex items-center pointer-events-none text-muted-fg-forge">
              {rightAddon}
            </div>
          )}
        </div>
        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-error font-medium leading-none">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className="text-xs text-muted-fg-forge leading-none">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
