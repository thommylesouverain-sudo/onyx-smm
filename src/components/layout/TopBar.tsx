"use client";

import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function TopBar() {
  const { data: session } = useSession();
  const [balance, setBalance] = useState(0.0);

  useEffect(() => {
    // In a real app, fetch balance from API
    setBalance(2450.5);
  }, []);

  return (
    <div className="h-16 bg-onyx-charcoal/80 backdrop-blur-xl border-b border-glass-light flex items-center justify-between px-8 sticky top-0 z-40" style={{ borderWidth: "0.5px" }}>
      <div className="flex items-center gap-4">
        {/* Breadcrumb or Title could go here */}
        <h1 className="font-heading text-xl font-semibold text-ghost-white tracking-wide">
          Hoş Geldiniz, {session?.user?.name || "Kullanıcı"}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-glass-ultra px-4 py-2 rounded-xl border border-glass-light" style={{ borderWidth: "0.5px" }}>
          <span className="text-sm text-ash-platinum font-medium">Bakiye:</span>
          <span className="text-accent-gold font-mono font-bold tracking-tight">
            ${balance.toFixed(2)}
          </span>
        </div>

        <button className="relative p-2 rounded-full hover:bg-glass-ultra transition-colors group">
          <Bell className="w-5 h-5 text-ash-platinum group-hover:text-ghost-white transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-ice rounded-full animate-pulse shadow-[0_0_8px_rgba(76,201,240,0.8)]" />
        </button>

        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-gold to-stone-gray border border-accent-gold p-0.5" style={{ borderWidth: "1.5px" }}>
          <img
            src={session?.user?.image || "https://ui-avatars.com/api/?name=" + (session?.user?.name || "U") + "&background=1a1a1a&color=C8C8C8"}
            alt="User avatar"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
