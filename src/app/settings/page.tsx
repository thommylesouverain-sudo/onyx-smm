"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { GlassCard, Button, Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Copy, CheckCircle2, User, Key, Bell, ShieldAlert, Upload } from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);
  const [apiKey, setApiKey] = useState("onx_live_9f8d7e6c5b4a3f2d1e0");

  const [toggles, setToggles] = useState({
    emailNotifs: true,
    orderUpdates: true,
    promoOffers: false,
    twoFactor: false
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-bold text-ghost-white tracking-wide">
          Ayarlar
        </h1>
        <p className="text-ash-platinum text-sm">Profil bilgilerinizi, güvenlik tercihlerinizi ve API ayarlarınızı yönetin.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <GlassCard variant="ultra" className="p-8 flex flex-col items-center gap-6 text-center border-accent-gold/20 shadow-[0_0_30px_rgba(232,201,122,0.05)]">
            <div className="relative group cursor-pointer">
              <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-accent-gold via-stone-gray to-onyx-charcoal border border-accent-gold/50 shadow-[0_0_20px_rgba(232,201,122,0.2)]">
                <img
                  src={session?.user?.image || "https://ui-avatars.com/api/?name=" + (session?.user?.name || "U") + "&background=1a1a1a&color=C8C8C8&size=256"}
                  alt="Profil"
                  className="w-full h-full rounded-full object-cover border-4 border-onyx-black group-hover:opacity-75 transition-opacity"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/50 p-2 rounded-full backdrop-blur-sm border border-glass-light" style={{ borderWidth: '0.5px' }}>
                  <Upload className="w-5 h-5 text-ghost-white" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="font-heading text-2xl font-bold text-ghost-white">{session?.user?.name || "Onyx Kullanıcısı"}</h2>
              <p className="text-ash-platinum text-sm">{session?.user?.email || "user@onyx.com"}</p>
            </div>

            <div className="w-full h-px bg-glass-medium my-2" />

            <div className="flex justify-between w-full text-sm">
              <span className="text-ash-platinum">Kayıt Tarihi</span>
              <span className="text-ghost-white font-mono">15 Eyl 2025</span>
            </div>
            <div className="flex justify-between w-full text-sm">
              <span className="text-ash-platinum">Hesap Durumu</span>
              <span className="text-[#4ade80] font-medium flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Onaylı</span>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Settings Panels */}
        <div className="lg:col-span-2 flex flex-col gap-8">

          {/* General Info */}
          <section className="flex flex-col gap-4">
            <h3 className="font-heading text-xl font-semibold text-ghost-white flex items-center gap-2">
              <User className="w-5 h-5 text-accent-ice" /> Genel Bilgiler
            </h3>
            <GlassCard variant="light" className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-ash-platinum font-medium ml-1">Kullanıcı Adı</label>
                <Input defaultValue={session?.user?.name || "Onyx Kullanıcısı"} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-ash-platinum font-medium ml-1">E-posta Adresi</label>
                <Input type="email" defaultValue={session?.user?.email || "user@onyx.com"} disabled className="opacity-70 cursor-not-allowed" />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button className="w-auto px-8">Değişiklikleri Kaydet</Button>
              </div>
            </GlassCard>
          </section>

          {/* API Key */}
          <section className="flex flex-col gap-4">
            <h3 className="font-heading text-xl font-semibold text-ghost-white flex items-center gap-2">
              <Key className="w-5 h-5 text-accent-gold" /> API Erişimi
            </h3>
            <GlassCard variant="light" className="p-6 flex flex-col gap-4">
              <p className="text-sm text-ash-platinum">Onyx paneline dışarıdan otomatik istek göndermek için API anahtarınızı kullanın. Bu anahtarı kimseyle paylaşmayın.</p>
              <div className="flex gap-4 items-center mt-2">
                <Input type="text" value={apiKey} readOnly className="font-mono text-sm tracking-wider text-accent-gold" />
                <Button variant="secondary" onClick={handleCopy} className="w-auto px-4 gap-2 border-glass-medium flex-shrink-0">
                  {copied ? <CheckCircle2 className="w-4 h-4 text-[#4ade80]" /> : <Copy className="w-4 h-4" />}
                  <span className="hidden sm:inline">{copied ? "Kopyalandı" : "Kopyala"}</span>
                </Button>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" className="w-auto text-xs text-ash-platinum hover:text-accent-ice">Yeni Anahtar Oluştur</Button>
              </div>
            </GlassCard>
          </section>

          {/* Notifications & Security */}
          <section className="flex flex-col gap-4">
            <h3 className="font-heading text-xl font-semibold text-ghost-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-silver-chrome" /> Bildirimler & Güvenlik
            </h3>
            <GlassCard variant="light" className="p-0 flex flex-col divide-y divide-glass-light/50">

              <div className="flex items-center justify-between p-6 hover:bg-glass-ultra/30 transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-ghost-white">Sipariş Güncellemeleri</span>
                  <span className="text-xs text-ash-platinum">Siparişleriniz tamamlandığında veya iptal edildiğinde e-posta alın.</span>
                </div>
                <button
                  onClick={() => handleToggle('orderUpdates')}
                  className={cn("w-12 h-6 rounded-full p-1 transition-colors relative border", toggles.orderUpdates ? "bg-accent-ice/20 border-accent-ice/50" : "bg-glass-ultra border-glass-light")} style={{ borderWidth: '0.5px' }}
                >
                  <div className={cn("w-4 h-4 rounded-full bg-ghost-white transition-transform", toggles.orderUpdates ? "translate-x-6 bg-accent-ice" : "translate-x-0 bg-ash-platinum")} />
                </button>
              </div>

              <div className="flex items-center justify-between p-6 hover:bg-glass-ultra/30 transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-ghost-white">İki Faktörlü Doğrulama (2FA)</span>
                  <span className="text-xs text-ash-platinum">Giriş yaparken ek bir güvenlik katmanı ekleyin.</span>
                </div>
                <button
                  onClick={() => handleToggle('twoFactor')}
                  className={cn("w-12 h-6 rounded-full p-1 transition-colors relative border", toggles.twoFactor ? "bg-accent-ice/20 border-accent-ice/50" : "bg-glass-ultra border-glass-light")} style={{ borderWidth: '0.5px' }}
                >
                  <div className={cn("w-4 h-4 rounded-full bg-ghost-white transition-transform", toggles.twoFactor ? "translate-x-6 bg-accent-ice" : "translate-x-0 bg-ash-platinum")} />
                </button>
              </div>

            </GlassCard>
          </section>

          {/* Danger Zone */}
          <section className="flex flex-col gap-4 mt-8">
            <h3 className="font-heading text-xl font-semibold text-[#f87171] flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" /> Tehlikeli Bölge
            </h3>
            <GlassCard variant="ultra" className="p-6 border-[#f87171]/20 bg-[#f87171]/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex flex-col gap-1 max-w-md">
                <span className="font-medium text-ghost-white">Hesabı Kalıcı Olarak Sil</span>
                <span className="text-xs text-ash-platinum">Bu işlem geri alınamaz. Tüm verileriniz, bakiyeniz ve sipariş geçmişiniz kalıcı olarak silinecektir.</span>
              </div>
              <Button variant="danger" className="w-auto px-6 whitespace-nowrap">Hesabı Sil</Button>
            </GlassCard>
          </section>

        </div>
      </div>
    </div>
  );
}