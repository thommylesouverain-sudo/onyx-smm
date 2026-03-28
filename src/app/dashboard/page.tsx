"use client";

import { useEffect, useState } from "react";
import { GlassCard, Button, Input, StatusBadge } from "@/components/ui";
import { ShoppingCart, Activity, CheckCircle, DollarSign, Send } from "lucide-react";

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalDuration = 1000;
    let incrementTime = (totalDuration / end) * 5;

    let timer = setInterval(() => {
      start += end / 20;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const mockOrders = [
  { id: "ORD-9821", service: "Instagram Followers (HQ)", link: "instagram.com/onyx", qty: 5000, status: "Active" },
  { id: "ORD-9820", service: "TikTok Views", link: "tiktok.com/@onyx/v/1", qty: 10000, status: "Completed" },
  { id: "ORD-9819", service: "Twitter Likes", link: "twitter.com/onyx/status/123", qty: 500, status: "Pending" },
  { id: "ORD-9818", service: "YouTube Subscribers", link: "youtube.com/c/onyx", qty: 1000, status: "Cancelled" },
];

export default function DashboardPage() {
  const stats = [
    { label: "Toplam Sipariş", value: 12480, icon: ShoppingCart },
    { label: "Aktif Sipariş", value: 42, icon: Activity },
    { label: "Tamamlanan", value: 12100, icon: CheckCircle },
    { label: "Bakiye", value: 2450, icon: DollarSign, prefix: "$" },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-[1400px] mx-auto w-full">
      {/* Stats Grid */}
      {/* Decorative Header Sparkles */}
      <div className="relative mb-4">
        <h1 className="font-heading text-4xl font-bold text-ghost-white tracking-wide">
          Kontrol Paneli
        </h1>
        <p className="text-ash-platinum mt-1 text-sm">Güncel hesap istatistikleriniz ve son işlemleriniz.</p>
        <div className="absolute top-0 right-10 w-[200px] h-[50px] bg-gradient-to-r from-transparent via-accent-ice/20 to-transparent blur-[40px] pointer-events-none" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <GlassCard key={i} variant="ultra" className="p-6 relative overflow-hidden group border-glass-light hover:border-glass-medium transition-all duration-500 shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_rgba(76,201,240,0.05)]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-accent-gold/5 to-accent-ice/5 rounded-full blur-[40px] -mr-16 -mt-16 group-hover:opacity-100 transition-opacity duration-700 opacity-50" />
            <div className="flex items-center justify-between relative z-10">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-ash-platinum">{stat.label}</span>
                <span className="text-3xl font-heading font-bold text-ghost-white tracking-tight">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} />
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-glass-ultra flex items-center justify-center border border-glass-light shadow-inner group-hover:border-glass-medium transition-colors" style={{ borderWidth: '0.5px' }}>
                <stat.icon className="w-6 h-6 text-accent-gold" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        {/* Recent Orders Table */}
        <div className="xl:col-span-2 flex flex-col gap-4">
          <h2 className="font-heading text-xl font-semibold text-ghost-white px-1">Son Siparişler</h2>
          <div className="bg-onyx-charcoal border border-glass-light rounded-xl overflow-hidden shadow-2xl" style={{ borderWidth: '0.5px' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-glass-ultra text-ash-platinum border-b border-glass-light" style={{ borderBottomWidth: '0.5px' }}>
                  <tr>
                    <th className="px-6 py-4 font-medium">Sipariş ID</th>
                    <th className="px-6 py-4 font-medium">Servis</th>
                    <th className="px-6 py-4 font-medium">Bağlantı</th>
                    <th className="px-6 py-4 font-medium text-right">Miktar</th>
                    <th className="px-6 py-4 font-medium">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-glass-light/50">
                  {mockOrders.map((order, i) => (
                    <tr key={order.id} className="hover:bg-glass-ultra/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-ash-platinum">{order.id}</td>
                      <td className="px-6 py-4 text-ghost-white truncate max-w-[200px]">{order.service}</td>
                      <td className="px-6 py-4 text-ash-platinum truncate max-w-[150px]">{order.link}</td>
                      <td className="px-6 py-4 text-ghost-white font-mono text-right">{order.qty.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={order.status as any} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Order Widget */}
        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-xl font-semibold text-ghost-white px-1">Hızlı Sipariş</h2>
          <GlassCard variant="light" className="p-6 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-ash-platinum font-medium ml-1">Platform</label>
              <select className="bg-onyx-obsidian border border-stone-gray rounded-xl px-4 py-3 text-ghost-white focus:outline-none focus:border-silver-chrome focus:ring-1 focus:ring-silver-chrome/20 transition-all font-body w-full appearance-none" style={{ borderWidth: '0.5px' }}>
                <option>Instagram</option>
                <option>TikTok</option>
                <option>Twitter</option>
                <option>YouTube</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-ash-platinum font-medium ml-1">Servis</label>
              <select className="bg-onyx-obsidian border border-stone-gray rounded-xl px-4 py-3 text-ghost-white focus:outline-none focus:border-silver-chrome focus:ring-1 focus:ring-silver-chrome/20 transition-all font-body w-full appearance-none" style={{ borderWidth: '0.5px' }}>
                <option>Instagram Takipçi (Garantili) - $0.50/1K</option>
                <option>Instagram Beğeni (Gerçek) - $0.20/1K</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-ash-platinum font-medium ml-1">Bağlantı</label>
              <Input placeholder="https://" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-ash-platinum font-medium ml-1">Miktar</label>
              <Input type="number" placeholder="1000" />
            </div>

            <div className="pt-2">
              <Button className="flex items-center justify-center gap-2 group">
                <span>Sipariş Oluştur</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}