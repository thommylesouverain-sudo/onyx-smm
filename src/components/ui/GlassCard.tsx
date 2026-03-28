"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "ultra" | "light" | "medium" | "strong";
}

export function GlassCard({
  children,
  className,
  variant = "light",
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "backdrop-blur-[12px] border rounded-xl transition-all duration-200 border-w-[0.5px]",
        {
          "bg-glass-ultra border-glass-ultra hover:border-glass-light":
            variant === "ultra",
          "bg-glass-light border-glass-light hover:border-glass-medium hover:scale-[1.015]":
            variant === "light",
          "bg-glass-medium border-glass-medium hover:border-glass-strong hover:scale-[1.015]":
            variant === "medium",
          "bg-glass-strong border-glass-strong hover:border-silver-chrome hover:scale-[1.015]":
            variant === "strong",
        },
        className
      )}
      style={{ borderWidth: "0.5px" }}
      {...props}
    >
      {children}
    </div>
  );
}
