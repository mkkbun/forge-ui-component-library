/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, forwardRef } from "react";

interface RadioGroupContextProps {
  name?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextProps | undefined>(undefined);

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: string;
  orientation?: "horizontal" | "vertical";
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ children, name, value, onChange, disabled = false, label, orientation = "vertical", className = "", ...props }, ref) => {
    return (
      <RadioGroupContext.Provider value={{ name, value, onChange, disabled }}>
        <div ref={ref} role="radiogroup" aria-label={label} className={`flex flex-col gap-2 ${className}`} {...props}>
          {label && <span className="text-xs font-semibold text-foreground select-none mb-1 text-left">{label}</span>}
          <div className={`flex ${orientation === "horizontal" ? "flex-row gap-4 flex-wrap" : "flex-col gap-2"}`}>
            {children}
          </div>
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className = "", label, id, value, disabled, ...props }, ref) => {
    const context = useContext(RadioGroupContext);
    const radioId = id || `forge-radio-${Math.random().toString(36).substr(2, 9)}`;

    const groupName = context?.name || props.name;
    const groupValue = context?.value;
    const isChecked = groupValue !== undefined ? groupValue === value : props.checked;
    const groupDisabled = context?.disabled || disabled;
    const groupOnChange = context?.onChange || props.onChange;

    return (
      <label
        htmlFor={radioId}
        className={`
          inline-flex items-center gap-2.5 cursor-pointer text-sm font-medium text-foreground select-none
          ${groupDisabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <div className="relative flex items-center h-5">
          <input
            ref={ref}
            id={radioId}
            type="radio"
            name={groupName}
            value={value}
            checked={isChecked}
            disabled={groupDisabled}
            onChange={groupOnChange}
            className={`
              peer h-5 w-5 rounded-full border bg-background text-primary-foreground
              transition-all duration-200 outline-none cursor-pointer appearance-none
              border-border-forge checked:bg-primary checked:border-primary
              focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary
              disabled:pointer-events-none disabled:bg-muted-forge
            `}
            {...props}
          />
          {/* Inner selected circle */}
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none" />
        </div>
        {label && <span>{label}</span>}
      </label>
    );
  }
);

Radio.displayName = "Radio";
