/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";

export const Modal = DialogPrimitive.Root;
export const ModalTrigger = DialogPrimitive.Trigger;
export const ModalClose = DialogPrimitive.Close;

export interface ModalContentProps extends DialogPrimitive.DialogContentProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function ModalContent({
  children,
  title,
  description,
  className = "",
  ...props
}: ModalContentProps) {
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

      {/* Floating Modal Card */}
      <DialogPrimitive.Content asChild {...props}>
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`
              w-full max-w-lg bg-background border border-border-forge text-foreground p-6 rounded-[var(--forge-radius-lg)]
              shadow-2xl relative flex flex-col gap-4 font-sans max-h-[90vh] overflow-y-auto
              focus:outline-none
              ${className}
            `}
          >
            {/* Header */}
            <div className="flex flex-col gap-1 text-left relative pr-6">
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
            <div className="text-sm leading-relaxed">{children}</div>
          </motion.div>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
