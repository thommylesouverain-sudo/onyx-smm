"use client";

import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "Pending" | "Active" | "Completed" | "Cancelled" | "Failed";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    Pending: {
      color: "text-accent-gold",
      bg: "bg-accent-gold/10",
      border: "border-accent-gold/20",
      text: "Bekliyor",
    },
    Active: {
      color: "text-accent-ice",
      bg: "bg-accent-ice/10",
      border: "border-accent-ice/20",
      text: "Aktif",
      pulse: true,
    },
    Completed: {
      color: "text-[#4ade80]",
      bg: "bg-[#4ade80]/10",
      border: "border-[#4ade80]/20",
      text: "Tamamlandı",
    },
    Cancelled: {
      color: "text-[#f87171]",
      bg: "bg-[#f87171]/10",
      border: "border-[#f87171]/20",
      text: "İptal",
    },
    Failed: {
      color: "text-[#f87171]",
      bg: "bg-[#f87171]/10",
      border: "border-[#f87171]/20",
      text: "Başarısız",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-md",
        config.bg,
        config.color,
        config.border,
        className
      )}
      style={{ borderWidth: "0.5px" }}
    >
      {config.pulse && (
        <motion.span
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className={cn("w-1.5 h-1.5 rounded-full", `bg-accent-ice`)}
        />
      )}
      {config.text}
    </div>
  );
}
