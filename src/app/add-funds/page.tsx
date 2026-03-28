"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard, Button, Input, StatusBadge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Bitcoin, CreditCard, Building, ArrowRight, ShieldCheck, Zap } from "lucide-react";

const methods = [
  { id: "crypto", name: "Kripto Ödeme", icon: Bitcoin, desc: "Anında Onay • Komisyon Yok", recommended: true },
  { id: "card", name: "Kredi / Banka Kartı", icon: CreditCard, desc: "3D Güvenli Ödeme • %2.5 Komisyon" },
  { id: "bank", name: "Banka Havalesi", icon: Building, desc: "EFT / Havale • 1-3 İş Günü" },
];

const presets = [10, 25, 50, 100];

export default function AddFundsPage() {
  const [selectedMethod, setSelectedMethod] = useState<string>("crypto");
  const [amount, setAmount] = useState<string>("");

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-bold text-ghost-white tracking-wide">
          Bakiye Yükle
        </h1>
        <p className="text-ash-platinum text-sm">Hesabınıza güvenli bir şekilde bakiye yükleyin ve hizmetlerimizden anında yararlanın.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Payment Methods & Amount */}
        <div className="flex flex-col gap-6">
          <GlassCard variant="ultra" className="p-6 flex flex-col gap-6">
            <h2 className="font-heading text-xl font-semibold text-ghost-white">1. Ödeme Yöntemi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {methods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMethod(m.id)}
                  className={cn(
                    "flex flex-col gap-3 p-5 rounded-xl border backdrop-blur-[12px] transition-all duration-300 relative overflow-hidden group text-left",
                    selectedMethod === m.id
                      ? "bg-glass-strong border-accent-ice shadow-[0_0_20px_rgba(76,201,240,0.15)]"
                      : "bg-glass-light border-glass-light hover:bg-glass-medium hover:border-glass-medium"
                  )}
                  style={{ borderWidth: '1px' }}
                >
                  {m.recommended && (
                    <div className="absolute top-0 right-0 bg-accent-gold text-onyx-black text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
                      Tavsiye Edilen
                    </div>
                  )}
                  <m.icon className={cn("w-8 h-8", selectedMethod === m.id ? "text-accent-ice" : "text-ash-platinum group-hover:text-ghost-white")} />
                  <div>
                    <span className={cn("block font-medium tracking-wide", selectedMethod === m.id ? "text-ghost-white" : "text-ash-platinum group-hover:text-ghost-white")}>
                      {m.name}
                    </span>
                    <span className="text-xs text-ash-platinum/80 mt-1 block">{m.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard variant="ultra" className="p-6 flex flex-col gap-6">
            <h2 className="font-heading text-xl font-semibold text-ghost-white">2. Yüklenecek Tutar</h2>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-4 gap-3">
                {presets.map((p) => (
                  <Button
                    key={p}
                    variant={amount === p.toString() ? "primary" : "ghost"}
                    className={cn(
                      "py-3 rounded-xl border font-mono text-lg",
                      amount === p.toString() ? "border-accent-ice bg-accent-ice/10 text-accent-ice hover:bg-accent-ice/20" : "border-glass-light bg-glass-light/50"
                    )}
                    onClick={() => setAmount(p.toString())}
                  >
                    ${p}
                  </Button>
                ))}
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ash-platinum font-mono text-xl">$</span>
                <Input
                  type="number"
                  placeholder="Diğer Tutar..."
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 text-xl font-mono h-14"
                />
              </div>
              <span className="text-xs text-ash-platinum ml-1">Minimum yükleme tutarı: $10.00</span>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Checkout Details (Animated) */}
        <AnimatePresence mode="popLayout">
          {selectedMethod && amount && parseFloat(amount) >= 10 && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
              className="sticky top-24"
            >
              <GlassCard variant="strong" className="p-8 flex flex-col gap-8 border-accent-gold/30 shadow-[0_0_40px_rgba(232,201,122,0.1)] relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-gold/20 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col gap-2 relative z-10">
                  <h3 className="font-heading text-2xl font-semibold text-ghost-white flex items-center gap-3">
                    <Zap className="w-6 h-6 text-accent-gold" /> Ödeme Özeti
                  </h3>
                  <p className="text-sm text-ash-platinum flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#4ade80]" /> 256-bit SSL ile Güvenli Ödeme
                  </p>
                </div>

                <div className="flex flex-col gap-4 text-sm relative z-10">
                  <div className="flex justify-between items-center pb-4 border-b border-glass-light/50">
                    <span className="text-ash-platinum">Yöntem</span>
                    <span className="text-ghost-white font-medium flex items-center gap-2">
                      {methods.find(m => m.id === selectedMethod)?.icon({ className: "w-4 h-4" })}
                      {methods.find(m => m.id === selectedMethod)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-glass-light/50">
                    <span className="text-ash-platinum">Yüklenecek Tutar</span>
                    <span className="text-ghost-white font-mono">${parseFloat(amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-glass-light/50">
                    <span className="text-ash-platinum">Komisyon</span>
                    <span className="text-ghost-white font-mono">
                      {selectedMethod === "crypto" ? "$0.00 (Ücretsiz)" : `$${(parseFloat(amount) * 0.025).toFixed(2)} (%2.5)`}
                    </span>
                  </div>

                  <div className="flex justify-between items-end pt-4">
                    <span className="text-ghost-white font-medium text-lg">Ödenecek Tutar</span>
                    <span className="text-accent-gold font-mono text-4xl font-bold tracking-tight">
                      ${selectedMethod === "crypto" ? parseFloat(amount).toFixed(2) : (parseFloat(amount) * 1.025).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button className="h-14 text-lg font-semibold group relative overflow-hidden bg-accent-gold text-onyx-black hover:bg-white hover:text-onyx-black border-transparent shadow-[0_0_20px_rgba(232,201,122,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] mt-4">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Ödemeye Geç <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Transaction History */}
      <div className="mt-8 flex flex-col gap-4">
        <h2 className="font-heading text-xl font-semibold text-ghost-white px-1">Ödeme Geçmişi</h2>
        <div className="bg-onyx-charcoal border border-glass-light rounded-xl overflow-hidden shadow-2xl" style={{ borderWidth: '0.5px' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-glass-ultra text-ash-platinum border-b border-glass-light" style={{ borderBottomWidth: '0.5px' }}>
                <tr>
                  <th className="px-6 py-4 font-medium">Tarih</th>
                  <th className="px-6 py-4 font-medium">Yöntem</th>
                  <th className="px-6 py-4 font-medium">Tutar</th>
                  <th className="px-6 py-4 font-medium">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-light/50">
                <tr className="hover:bg-glass-ultra transition-colors group">
                  <td className="px-6 py-4 text-ash-platinum text-xs">28 Mar 2026, 14:30</td>
                  <td className="px-6 py-4 text-ghost-white">Kripto Ödeme (USDT TRC20)</td>
                  <td className="px-6 py-4 text-ghost-white font-mono font-medium">$100.00</td>
                  <td className="px-6 py-4"><StatusBadge status="Completed" /></td>
                </tr>
                <tr className="hover:bg-glass-ultra transition-colors group">
                  <td className="px-6 py-4 text-ash-platinum text-xs">15 Mar 2026, 09:15</td>
                  <td className="px-6 py-4 text-ghost-white">Kredi Kartı (**** 4242)</td>
                  <td className="px-6 py-4 text-ghost-white font-mono font-medium">$50.00</td>
                  <td className="px-6 py-4"><StatusBadge status="Completed" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}