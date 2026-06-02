"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-neo-accent text-black border-4 border-black shadow-neo-sm hover:shadow-neo-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  secondary:
    "bg-neo-secondary text-black border-4 border-black shadow-neo-sm hover:shadow-neo-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  outline:
    "bg-neo-bg text-black border-4 border-black shadow-neo-sm hover:bg-neo-secondary hover:shadow-neo-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  danger:
    "bg-black text-white border-4 border-black shadow-neo-sm hover:shadow-neo-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-xs",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className = "",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={[
          "inline-flex items-center justify-center",
          "font-black uppercase tracking-widest",
          "transition-all duration-100 ease-linear",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:active:shadow-neo-sm",
          variants[variant],
          sizes[size],
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
