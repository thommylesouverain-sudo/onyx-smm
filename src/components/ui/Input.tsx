"use client";

import { cn } from "@/lib/utils";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "bg-onyx-obsidian border border-stone-gray rounded-xl px-4 py-3 text-ghost-white focus:outline-none focus:border-silver-chrome focus:ring-1 focus:ring-silver-chrome/20 transition-all font-body w-full",
          className
        )}
        style={{ borderWidth: "0.5px" }}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
