"use client";

import { useState } from "react";
import { GlassCard, Input, Button, StatusBadge } from "@/components/ui";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

const mockOrders = Array.from({ length: 15 }).map((_, i) => ({
  id: `ORD-98${20 - i}`,
  platform: ["Instagram", "TikTok", "YouTube", "Twitter"][Math.floor(Math.random() * 4)],
  service: "Premium Followers (Garantili)",
  link: "https://social.link/user" + i,
  qty: Math.floor(Math.random() * 10000) + 500,
  price: (Math.random() * 50).toFixed(2),
  status: ["Pending", "Active", "Completed", "Cancelled"][Math.floor(Math.random() * 4)],
  date: new Date(Date.now() - i * 86400000).toLocaleDateString("tr-TR"),
}));

export default function OrdersPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-ghost-white tracking-wide">
          Siparişler
        </h1>
      </div>

      <GlassCard variant="ultra" className="p-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ash-platinum" />
            <Input
              placeholder="Sipariş ID veya Bağlantı ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select className="bg-onyx-obsidian border border-stone-gray rounded-xl px-4 py-3 text-ghost-white focus:outline-none focus:border-silver-chrome focus:ring-1 focus:ring-silver-chrome/20 transition-all font-body appearance-none min-w-[150px]" style={{ borderWidth: '0.5px' }}>
            <option value="">Tüm Platformlar</option>
            <option value="ig">Instagram</option>
            <option value="tt">TikTok</option>
          </select>
          <select className="bg-onyx-obsidian border border-stone-gray rounded-xl px-4 py-3 text-ghost-white focus:outline-none focus:border-silver-chrome focus:ring-1 focus:ring-silver-chrome/20 transition-all font-body appearance-none min-w-[150px]" style={{ borderWidth: '0.5px' }}>
            <option value="">Tüm Durumlar</option>
            <option value="Active">Aktif</option>
            <option value="Completed">Tamamlandı</option>
            <option value="Pending">Bekliyor</option>
            <option value="Cancelled">İptal</option>
          </select>
          <Button variant="ghost" className="w-12 px-0 border-glass-light hover:bg-glass-medium">
            <Filter className="w-4 h-4 text-ash-platinum" />
          </Button>
        </div>
      </GlassCard>

      <div className="bg-onyx-charcoal border border-glass-light rounded-2xl overflow-hidden shadow-2xl" style={{ borderWidth: '0.5px' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-glass-ultra text-ash-platinum border-b border-glass-light" style={{ borderBottomWidth: '0.5px' }}>
              <tr>
                <th className="px-6 py-4 font-medium">Sipariş ID</th>
                <th className="px-6 py-4 font-medium">Tarih</th>
                <th className="px-6 py-4 font-medium">Platform / Servis</th>
                <th className="px-6 py-4 font-medium">Bağlantı</th>
                <th className="px-6 py-4 font-medium text-right">Miktar</th>
                <th className="px-6 py-4 font-medium text-right">Tutar</th>
                <th className="px-6 py-4 font-medium">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-light/50">
              {mockOrders.map((order, i) => (
                <tr key={order.id} className="hover:bg-glass-ultra transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs text-ash-platinum group-hover:text-ghost-white transition-colors">{order.id}</td>
                  <td className="px-6 py-4 text-ash-platinum text-xs">{order.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-ash-platinum">{order.platform}</span>
                      <span className="text-ghost-white max-w-[200px] truncate">{order.service}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-ash-platinum truncate max-w-[150px]">{order.link}</td>
                  <td className="px-6 py-4 text-ghost-white font-mono text-right">{order.qty.toLocaleString()}</td>
                  <td className="px-6 py-4 text-accent-gold font-mono text-right font-medium">${order.price}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status as any} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-glass-light/50 bg-glass-ultra/30">
          <span className="text-sm text-ash-platinum">Toplam 145 siparişten 1-15 arası gösteriliyor</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="w-10 h-10 px-0 rounded-lg"><ChevronLeft className="w-4 h-4" /></Button>
            <Button variant="primary" className="w-10 h-10 px-0 rounded-lg bg-glass-medium">1</Button>
            <Button variant="ghost" className="w-10 h-10 px-0 rounded-lg">2</Button>
            <Button variant="ghost" className="w-10 h-10 px-0 rounded-lg">3</Button>
            <Button variant="ghost" className="w-10 h-10 px-0 rounded-lg"><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}