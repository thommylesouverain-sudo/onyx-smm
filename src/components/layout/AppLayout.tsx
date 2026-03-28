"use client";

import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex bg-onyx-black min-h-screen font-body text-ghost-white">
      <Sidebar />
      <div className="flex flex-col flex-1 pl-16">
        <TopBar />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex-1 p-8 overflow-y-auto"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
