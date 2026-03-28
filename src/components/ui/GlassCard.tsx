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
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "relative backdrop-blur-[12px] border rounded-xl transition-all duration-200 group overflow-hidden",
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
      {/* Dynamic Hover Glow Effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.08), transparent 40%)`,
        }}
      />

      {/* Content wrapper to ensure z-index above glow */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
