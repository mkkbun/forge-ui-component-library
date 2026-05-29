/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { forwardRef } from "react";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`text-xs font-semibold text-foreground select-none flex items-center gap-0.5 ${className}`}
        {...props}
      >
        {children}
        {required && <span className="text-error font-bold" aria-hidden="true">*</span>}
      </label>
    );
  }
);

Label.displayName = "Label";
