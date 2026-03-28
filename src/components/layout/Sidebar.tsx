"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  PlusCircle,
  ListOrdered,
  Wallet,
  Settings,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";

const navItems = [
  { icon: LayoutDashboard, label: "Kontrol Paneli", href: "/dashboard" },
  { icon: PlusCircle, label: "Yeni Sipariş", href: "/new-order" },
  { icon: ListOrdered, label: "Siparişler", href: "/orders" },
  { icon: Wallet, label: "Bakiye Ekle", href: "/add-funds" },
  { icon: Settings, label: "Ayarlar", href: "/settings" },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <motion.div
      initial={false}
      animate={{ width: expanded ? 220 : 64 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="h-screen bg-onyx-core border-r border-glass-light flex flex-col justify-between py-6 fixed left-0 top-0 z-50 overflow-hidden"
      style={{ borderWidth: "0.5px" }}
    >
      <div className="flex flex-col gap-8 px-4 w-full">
        {/* Logo */}
        <div className="flex items-center gap-4 px-2">
          <div className="w-8 h-8 bg-glass-medium rounded flex items-center justify-center shrink-0">
            <span className="font-heading font-bold text-ghost-white tracking-widest text-lg">
              O
            </span>
          </div>
          <motion.span
            animate={{ opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="font-heading font-bold text-ghost-white tracking-[0.2em] whitespace-nowrap"
          >
            ONYX
          </motion.span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 w-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all duration-200 w-full whitespace-nowrap overflow-hidden group border",
                  isActive
                    ? "bg-glass-medium border-l-2 border-l-accent-ice border-y-transparent border-r-transparent text-ghost-white"
                    : "border-transparent text-ash-platinum hover:text-ghost-white hover:bg-glass-ultra"
                )}
                style={{
                  borderLeftWidth: isActive ? "2px" : "0px",
                }}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 shrink-0 transition-colors",
                    isActive ? "text-accent-ice" : "group-hover:text-ghost-white"
                  )}
                />
                <motion.span
                  animate={{ opacity: expanded ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-medium text-sm"
                >
                  {item.label}
                </motion.span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-4 w-full">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all duration-200 w-full whitespace-nowrap overflow-hidden group text-ash-platinum hover:text-[#f87171] hover:bg-[#f87171]/10 border border-transparent"
        >
          <LogOut className="w-5 h-5 shrink-0 transition-colors group-hover:text-[#f87171]" />
          <motion.span
            animate={{ opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="font-medium text-sm"
          >
            Çıkış Yap
          </motion.span>
        </button>
      </div>
    </motion.div>
  );
}
