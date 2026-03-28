"use client";

import { cn } from "@/lib/utils";
import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl px-4 py-3 text-ghost-white font-medium transition-all duration-200 border w-full",
          {
            "bg-glass-light border-glass-light hover:-translate-y-0.5 hover:bg-glass-medium hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]":
              variant === "primary",
            "bg-transparent border-glass-medium hover:bg-glass-ultra":
              variant === "secondary",
            "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40":
              variant === "danger",
            "bg-transparent border-transparent hover:bg-glass-ultra text-ash-platinum hover:text-ghost-white":
              variant === "ghost",
          },
          className
        )}
        style={{ borderWidth: "0.5px" }}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
