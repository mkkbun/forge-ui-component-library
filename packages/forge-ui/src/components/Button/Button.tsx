/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { forwardRef } from "react";

export type ButtonVariant =
  | "primary"
  | "accent"
  | "secondary"
  | "outline"
  | "ghost"
  | "link"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual variant of the button.
   * @default "primary"
   */
  variant?: ButtonVariant;
  /**
   * The size variant of the button.
   * @default "md"
   */
  size?: ButtonSize;
  /**
   * If true, shows a spinner inside the button and disables interaction.
   * @default false
   */
  isLoading?: boolean;
  /**
   * Render the button as a custom component (e.g., 'a' tag for hyperlinks).
   * @default "button"
   */
  as?: React.ElementType;
  /**
   * Element to render before the children.
   */
  leftIcon?: React.ReactNode;
  /**
   * Element to render after the children.
   */
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled = false,
      as: Component = "button",
      leftIcon,
      rightIcon,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    // Basic structural styles
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 outline-none select-none rounded-[var(--forge-radius-md)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-hover active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    // 7 visual variants
    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active focus-visible:ring-primary",
      accent:
        "bg-accent text-accent-foreground hover:bg-accent-hover active:scale-[0.97] focus-visible:ring-accent",
      secondary:
        "bg-muted-forge text-foreground hover:bg-border-forge hover:text-foreground focus-visible:ring-border-forge border border-transparent",
      outline:
        "border border-border-forge bg-transparent text-foreground hover:bg-muted-forge focus-visible:ring-border-forge",
      ghost:
        "bg-transparent text-foreground hover:bg-muted-forge focus-visible:ring-border-forge",
      link:
        "bg-transparent text-accent hover:underline p-0 active:scale-100 disabled:opacity-50",
      danger:
        "bg-error text-error-foreground hover:bg-error-hover active:scale-[0.97] focus-visible:ring-error",
    };

    // Sizing variants
    const sizes: Record<ButtonSize, string> = {
      sm: "h-9 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
    };

    // Link size special-case (no dimensions so it behaves as pure inline text)
    const paddingStyles = variant === "link" ? "h-auto p-0" : sizes[size];

    const isDisabled = disabled || isLoading;

    return (
      <Component
        ref={ref}
        type={Component === "button" ? type : undefined}
        className={`${baseStyles} ${variants[variant]} ${paddingStyles} ${className}`}
        disabled={Component === "button" ? isDisabled : undefined}
        aria-disabled={isDisabled ? "true" : undefined}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span className="truncate">{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </Component>
    );
  }
);

Button.displayName = "Button";
