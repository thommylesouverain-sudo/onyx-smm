"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard, Button, Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Instagram,
  Youtube,
  Twitter,
  Music,
  Send,
  Smartphone,
  CheckCircle2,
  ChevronRight,
  ArrowLeft
} from "lucide-react";

const platforms = [
  { id: "ig", name: "Instagram", icon: Instagram, color: "hover:text-[#E1306C]" },
  { id: "tt", name: "TikTok", icon: Smartphone, color: "hover:text-[#ff0050]" },
  { id: "yt", name: "YouTube", icon: Youtube, color: "hover:text-[#FF0000]" },
  { id: "tw", name: "Twitter/X", icon: Twitter, color: "hover:text-[#1DA1F2]" },
  { id: "sp", name: "Spotify", icon: Music, color: "hover:text-[#1DB954]" },
  { id: "tg", name: "Telegram", icon: Send, color: "hover:text-[#0088cc]" },
];

const mockServices = [
  { id: 1, name: "Instagram Followers (Garantili) - 30 Gün Telafi", price: 0.85, min: 100, max: 100000, speed: "1K/Gün" },
  { id: 2, name: "Instagram Likes (Türk Gerçek)", price: 0.45, min: 50, max: 50000, speed: "Anlık" },
  { id: 3, name: "Instagram İzlenme (Keşfet Etkili)", price: 0.15, min: 1000, max: 1000000, speed: "Hızlı" },
  { id: 4, name: "Instagram Yorum (Özel Mavi Tikli)", price: 15.0, min: 10, max: 100, speed: "1 Saat/Yorum" },
];

export default function NewOrderPage() {
  const [step, setStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const currentService = mockServices.find(s => s.id === selectedService);
  const totalPrice = currentService && quantity ? (currentService.price * parseInt(quantity) / 1000).toFixed(2) : "0.00";

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-8 pb-12">
      {/* Header & Progress */}
      <div className="flex flex-col gap-6">
        <h1 className="font-heading text-3xl font-bold text-ghost-white tracking-wide">
          Yeni Sipariş Oluştur
        </h1>

        <div className="flex items-center gap-4 text-sm font-medium">
          {[
            { num: 1, title: "Platform Seçimi" },
            { num: 2, title: "Servis Seçimi" },
            { num: 3, title: "Detaylar & Onay" }
          ].map((s, i) => (
            <div key={s.num} className="flex items-center gap-4">
              <div className={cn(
                "flex items-center gap-2",
                step >= s.num ? "text-accent-ice" : "text-ash-platinum"
              )}>
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center border text-xs",
                  step >= s.num ? "bg-accent-ice/10 border-accent-ice/30" : "bg-glass-ultra border-glass-light"
                )} style={{ borderWidth: '0.5px' }}>
                  {step > s.num ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.num}
                </div>
                <span>{s.title}</span>
              </div>
              {i < 2 && <ChevronRight className="w-4 h-4 text-stone-gray" />}
            </div>
          ))}
        </div>
      </div>

      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          {/* STEP 1: Platform Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6"
            >
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => {
                    setSelectedPlatform(platform.id);
                    handleNext();
                  }}
                  className={cn(
                    "flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border backdrop-blur-[12px] transition-all duration-300 group",
                    selectedPlatform === platform.id
                      ? "bg-glass-strong border-accent-ice shadow-[0_0_20px_rgba(76,201,240,0.15)] scale-[1.02]"
                      : "bg-glass-light border-glass-light hover:bg-glass-medium hover:border-glass-medium hover:scale-[1.015]"
                  )}
                  style={{ borderWidth: selectedPlatform === platform.id ? '1px' : '0.5px' }}
                >
                  <platform.icon className={cn("w-12 h-12 text-ash-platinum transition-colors duration-300", platform.color, selectedPlatform === platform.id && "text-ghost-white")} strokeWidth={1.5} />
                  <span className={cn("font-medium tracking-wide", selectedPlatform === platform.id ? "text-ghost-white" : "text-ash-platinum group-hover:text-ghost-white")}>
                    {platform.name}
                  </span>
                </button>
              ))}
            </motion.div>
          )}

          {/* STEP 2: Service Selection */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              <button onClick={handleBack} className="text-sm text-ash-platinum hover:text-ghost-white flex items-center gap-2 self-start transition-colors">
                <ArrowLeft className="w-4 h-4" /> Geri Dön
              </button>

              <div className="flex flex-col gap-3">
                {mockServices.map((service) => (
                  <GlassCard
                    key={service.id}
                    variant={selectedService === service.id ? "strong" : "light"}
                    className={cn(
                      "p-4 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border",
                      selectedService === service.id && "border-accent-ice bg-accent-ice/5"
                    )}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-ash-platinum bg-onyx-obsidian px-2 py-0.5 rounded border border-glass-light">ID: {service.id}</span>
                        <span className="font-medium text-ghost-white">{service.name}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-ash-platinum mt-1">
                        <span>Min: {service.min} - Max: {service.max.toLocaleString()}</span>
                        <span>•</span>
                        <span>Hız: {service.speed}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end md:self-auto">
                      <div className="text-right flex flex-col">
                        <span className="text-accent-gold font-mono font-bold text-lg">${service.price.toFixed(2)}</span>
                        <span className="text-[10px] text-ash-platinum uppercase tracking-wider">/ 1000 Adet</span>
                      </div>
                      <Button
                        variant={selectedService === service.id ? "primary" : "secondary"}
                        className="w-auto px-6 py-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedService(service.id);
                          handleNext();
                        }}
                      >
                        Seç
                      </Button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Details & Confirm */}
          {step === 3 && currentService && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              <button onClick={handleBack} className="text-sm text-ash-platinum hover:text-ghost-white flex items-center gap-2 self-start transition-colors">
                <ArrowLeft className="w-4 h-4" /> Geri Dön
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-2 flex flex-col gap-6 bg-glass-ultra p-6 rounded-2xl border border-glass-light" style={{ borderWidth: '0.5px' }}>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-ash-platinum font-medium ml-1">Gönderim Bağlantısı</label>
                    <Input
                      placeholder="https://instagram.com/p/..."
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                    <span className="text-xs text-ash-platinum ml-1">Lütfen bağlantının herkese açık olduğundan emin olun. Gizli profillere gönderim yapılamaz.</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-ash-platinum font-medium ml-1 flex justify-between">
                      <span>Miktar</span>
                      <span className="text-xs">Min: {currentService.min} / Max: {currentService.max.toLocaleString()}</span>
                    </label>
                    <Input
                      type="number"
                      placeholder={currentService.min.toString()}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min={currentService.min}
                      max={currentService.max}
                    />
                  </div>
                </div>

                {/* Summary Card */}
                <GlassCard variant="strong" className="p-6 flex flex-col gap-6 sticky top-24 border-accent-gold/20 shadow-[0_0_30px_rgba(232,201,122,0.05)]">
                  <h3 className="font-heading text-lg font-semibold text-ghost-white">Sipariş Özeti</h3>

                  <div className="flex flex-col gap-4 text-sm">
                    <div className="flex justify-between items-center pb-4 border-b border-glass-light/50">
                      <span className="text-ash-platinum">Servis</span>
                      <span className="text-ghost-white font-medium text-right max-w-[150px] truncate" title={currentService.name}>{currentService.name}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-glass-light/50">
                      <span className="text-ash-platinum">Birim Fiyat</span>
                      <span className="text-ghost-white font-mono">${currentService.price.toFixed(2)} <span className="text-xs text-ash-platinum">/ 1K</span></span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-glass-light/50">
                      <span className="text-ash-platinum">Miktar</span>
                      <span className="text-ghost-white font-mono">{quantity || 0}</span>
                    </div>

                    <div className="flex justify-between items-end pt-2">
                      <span className="text-ash-platinum font-medium">Toplam Tutar</span>
                      <span className="text-accent-gold font-mono text-3xl font-bold tracking-tight">${totalPrice}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-2 group relative overflow-hidden bg-accent-gold/10 hover:bg-accent-gold/20 border-accent-gold/30 hover:border-accent-gold/50 text-accent-gold hover:text-white"
                    disabled={!link || !quantity || parseInt(quantity) < currentService.min || parseInt(quantity) > currentService.max}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Siparişi Onayla <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </span>
                  </Button>
                </GlassCard>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}