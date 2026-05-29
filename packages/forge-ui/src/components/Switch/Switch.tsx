/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { forwardRef } from "react";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  description?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className = "", label, description, id, disabled, ...props }, ref) => {
    const switchId = id || `forge-switch-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex flex-col gap-1 text-left select-none">
        <label
          htmlFor={switchId}
          className={`
            inline-flex items-center gap-3 cursor-pointer
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <div className="relative">
            <input
              ref={ref}
              id={switchId}
              type="checkbox"
              role="switch"
              aria-checked={props.checked}
              disabled={disabled}
              className="peer sr-only"
              {...props}
            />
            {/* The Track */}
            <div
              className={`
                w-11 h-6 bg-muted-forge border border-border-forge rounded-full transition-colors duration-200
                peer-checked:bg-primary peer-checked:border-primary
                peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary
              `}
            />
            {/* The Thumb */}
            <div
              className={`
                absolute top-0.5 left-0.5 w-5 h-5 bg-background rounded-full border border-border-forge transition-transform duration-200
                peer-checked:translate-x-5 peer-checked:border-primary peer-checked:bg-primary-foreground
              `}
            />
          </div>
          {label && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground leading-none">{label}</span>
              {description && <span className="text-xs text-muted-fg-forge mt-0.5">{description}</span>}
            </div>
          )}
        </label>
      </div>
    );
  }
);

Switch.displayName = "Switch";
