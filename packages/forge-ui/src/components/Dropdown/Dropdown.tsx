/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
  children?: React.ReactNode;
  className?: string;
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

export function DropdownMenuContent({
  children,
  className = "",
  sideOffset = 4,
  align = "center",
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        align={align}
        className={`
          z-50 min-w-[8rem] overflow-hidden rounded-[var(--forge-radius-md)] border border-border-forge
          bg-card-forge text-foreground p-1 shadow-md font-sans text-sm animate-in fade-in-80
          slide-in-from-top-1.5 duration-150
          ${className}
        `}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  destructive?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function DropdownMenuItem({
  children,
  className = "",
  destructive = false,
  onClick,
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      onClick={onClick}
      className={`
        relative flex cursor-default select-none items-center rounded-[var(--forge-radius-sm)] px-2.5 py-2 text-sm
        outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer
        ${destructive
          ? "text-error hover:bg-error/10 focus:bg-error/10 focus:text-error"
          : "text-foreground hover:bg-muted-forge focus:bg-muted-forge focus:text-foreground"
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  );
}

export interface DropdownMenuLabelProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
  children?: React.ReactNode;
  className?: string;
}

export function DropdownMenuLabel({
  children,
  className = "",
  ...props
}: DropdownMenuLabelProps) {
  return (
    <DropdownMenuPrimitive.Label
      className={`px-2.5 py-1.5 text-xs font-semibold text-muted-fg-forge select-none text-left ${className}`}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Label>
  );
}

export interface DropdownMenuSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> {
  className?: string;
}

export function DropdownMenuSeparator({
  className = "",
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <DropdownMenuPrimitive.Separator
      className={`my-1 h-px bg-border-forge ${className}`}
      {...props}
    />
  );
}
