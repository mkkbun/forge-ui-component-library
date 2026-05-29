/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "motion/react";

export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerClose = DialogPrimitive.Close;

export interface DrawerContentProps extends DialogPrimitive.DialogContentProps {
  title?: string;
  description?: string;
  side?: "left" | "right";
  children: React.ReactNode;
}

export function DrawerContent({
  children,
  title,
  description,
  side = "right",
  className = "",
  ...props
}: DrawerContentProps) {
  const isRight = side === "right";

  return (
    <DialogPrimitive.Portal>
      {/* Background Overlay */}
      <DialogPrimitive.Overlay asChild>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        />
      </DialogPrimitive.Overlay>

      {/* Slide-out Drawer Panel */}
      <DialogPrimitive.Content asChild {...props}>
        <motion.div
          initial={{ x: isRight ? "100%" : "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: isRight ? "100%" : "-100%" }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={`
            fixed top-0 bottom-0 z-40 w-full max-w-md bg-background border-l border-border-forge text-foreground p-6
            shadow-2xl flex flex-col gap-5 font-sans h-full focus:outline-none
            ${isRight ? "right-0" : "left-0 border-r border-l-0"}
            ${className}
          `}
        >
          {/* Header */}
          <div className="flex flex-col gap-1 text-left relative pr-6 border-b border-border-forge pb-4">
            {title && (
              <DialogPrimitive.Title className="text-lg font-bold text-foreground">
                {title}
              </DialogPrimitive.Title>
            )}
            {description && (
              <DialogPrimitive.Description className="text-sm text-muted-fg-forge leading-normal">
                {description}
              </DialogPrimitive.Description>
            )}
            {/* Close Button */}
            <DialogPrimitive.Close className="absolute top-0 right-0 p-1 rounded-full text-muted-fg-forge hover:text-foreground hover:bg-muted-forge transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </DialogPrimitive.Close>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto py-2 text-sm leading-relaxed">{children}</div>
        </motion.div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
