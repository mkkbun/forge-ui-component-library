/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { forwardRef } from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", label, helperText, error, id, disabled, ...props }, ref) => {
    const textareaId = id || `forge-textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full flex flex-col gap-1.5 align-start text-left">
        {label && (
          <label htmlFor={textareaId} className="text-xs font-semibold text-foreground select-none">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          className={`
            w-full min-h-[100px] px-3 py-2 text-sm bg-background border rounded-[var(--forge-radius-md)] text-foreground
            transition-all duration-200 outline-none placeholder:text-muted-fg-forge resize-y
            disabled:opacity-50 disabled:bg-muted-forge disabled:pointer-events-none
            focus:ring-2 focus:ring-primary focus:border-primary-hover
            ${error ? "border-error focus:ring-error focus:border-error" : "border-border-forge"}
            ${className}
          `}
          {...props}
        />
        {error ? (
          <p id={`${textareaId}-error`} className="text-xs text-error font-medium leading-none">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${textareaId}-helper`} className="text-xs text-muted-fg-forge leading-none">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
