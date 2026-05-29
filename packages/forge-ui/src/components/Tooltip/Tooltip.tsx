/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export interface TooltipContentProps extends TooltipPrimitive.TooltipContentProps {
  children: React.ReactNode;
}

export function TooltipContent({
  children,
  className = "",
  side = "top",
  align = "center",
  sideOffset = 4,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Content
      side={side}
      align={align}
      sideOffset={sideOffset}
      className={`
        z-50 overflow-hidden rounded-[var(--forge-radius-sm)] bg-primary text-primary-foreground px-3 py-1.5
        text-xs font-medium animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-50
        data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
        data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 duration-150 shadow-md font-sans
        ${className}
      `}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="fill-primary" />
    </TooltipPrimitive.Content>
  );
}
