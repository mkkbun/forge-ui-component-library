/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { forwardRef } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  src?: string;
  alt?: string;
  fallbackText?: string;
  size?: "sm" | "md" | "lg";
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className = "", src, alt, fallbackText = "?", size = "md", ...props }, ref) => {
    const sizes = {
      sm: "h-8 w-8 text-xs",
      md: "h-10 w-10 text-sm",
      lg: "h-14 w-14 text-lg",
    };

    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={`
          relative flex shrink-0 overflow-hidden rounded-full border border-border-forge/30 select-none font-sans font-bold
          bg-muted-forge text-muted-fg-forge items-center justify-center align-middle
          ${sizes[size]}
          ${className}
        `}
        {...props}
      >
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          className="aspect-square h-full w-full object-cover transition-opacity duration-200"
        />
        <AvatarPrimitive.Fallback
          delayMs={300}
          className="flex h-full w-full items-center justify-center rounded-full bg-muted-forge text-foreground font-semibold"
        >
          {fallbackText.slice(0, 2).toUpperCase()}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    );
  }
);

Avatar.displayName = "Avatar";
