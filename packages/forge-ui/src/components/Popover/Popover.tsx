/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;

export interface PopoverContentProps extends PopoverPrimitive.PopoverContentProps {
  children: React.ReactNode;
}

export function PopoverContent({
  children,
  className = "",
  side = "bottom",
  align = "center",
  sideOffset = 4,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={`
          z-50 w-72 rounded-[var(--forge-radius-md)] bg-card-forge border border-border-forge text-foreground p-4
          shadow-xl outline-none font-sans text-sm animate-in fade-in slide-in-from-top-1 duration-200
          ${className}
        `}
        {...props}
      >
        {children}
        <PopoverPrimitive.Arrow className="fill-border-forge" />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}
