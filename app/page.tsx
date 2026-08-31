"use client";

import { useState } from "react";
import {
  Activity,
  ArrowLeftRight,
  Boxes,
  Building2,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { mockUnits } from "@/data/mock-units";
import { DashboardTab } from "@/components/tabs/dashboard-tab";
import { UnitsTab } from "@/components/tabs/units-tab";
import { TransferTab } from "@/components/tabs/transfer-tab";
import { StockTab } from "@/components/tabs/stock-tab";
import { PurchasesTab } from "@/components/tabs/purchases-tab";
import { InventorySyncTab } from "@/components/tabs/inventory-sync-tab";

type TabKey = "dashboard" | "match" | "unidades" | "estoque" | "sincronizar" | "compras";

const APP_NAME = "SYNTHERA";

const tabItems: { key: TabKey; label: string; icon: typeof TrendingUp }[] = [
  { key: "dashboard", label: "Dashboard Executivo", icon: TrendingUp },
  { key: "match", label: "Synthera Match", icon: ArrowLeftRight },
  { key: "unidades", label: "Gestão de Unidades", icon: Building2 },
  { key: "estoque", label: "Monitor de Estoque", icon: Boxes },
  { key: "sincronizar", label: "Sincronizar Estoque", icon: Boxes },
  { key: "compras", label: "Compras Inteligentes", icon: ShoppingCart },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");
  const [selectedUnitId, setSelectedUnitId] = useState<string>("all");

  return (
    <div className="site-shell min-h-screen text-slate-100">
      <div className="mx-auto flex max-w-[1700px] flex-col xl:flex-row">
        <aside className="w-full border-b border-white/5 bg-[#0d1419] px-5 py-5 xl:min-h-screen xl:w-[280px] xl:border-b-0 xl:border-r">
          <div className="mb-8 flex items-center justify-end gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden">
              <img
                src="/logo-synthera.svg"
                alt="Synthera logo"
                className="h-full w-full object-contain filter brightness-0 invert"
              />
            </div>
            <div>
              <p className="text-[18px] font-semibold tracking-[0.22em] text-white xl:text-[20px]">
                {APP_NAME}
              </p>
            </div>
          </div>

          <div className="mb-6 rounded-2xl border border-white/5 bg-[#0f171c] p-4">
            <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-400">
              <span>Sistema</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-[#68ddbd]/20 bg-[#68ddbd]/10 px-2 py-1 text-[#68ddbd]">
                <Activity className="h-3 w-3" />
                Online
              </span>
            </div>
            <p className="text-3xl font-semibold tracking-[-0.06em] text-white">94.2%</p>
            <p className="mt-1 text-xs text-slate-400">Eficácia operacional</p>
          </div>

          <nav className="space-y-1.5">
            {tabItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-[#68ddbd] text-[#07120f]"
                      : "text-slate-300 hover:bg-[#111b22] hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-6 border-t border-white/5 pt-5">
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Filtro
            </label>
            <select
              value={selectedUnitId}
              onChange={(e) => setSelectedUnitId(e.target.value)}
              className="w-full rounded-xl border border-white/5 bg-[#10181d] px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-[#68ddbd]/45"
            >
              <option value="all">Todas as unidades</option>
              {mockUnits.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.companyName} · {u.name}
                </option>
              ))}
            </select>
          </div>
        </aside>

        <main className="w-full px-4 py-6 lg:px-8">
          <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/5 bg-[#10171c] p-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#68ddbd]">
                Synthera Platform
              </p>
              <p className="mt-1 text-sm text-slate-400">Operações integradas em tempo real</p>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-[#68ddbd]/15 bg-[#0d1718] px-3 py-2 text-sm text-slate-200">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#68ddbd]" />
              Rede multiempresa e parceiros estratégicos
            </div>
          </header>

          {activeTab === "dashboard" && <DashboardTab />}
          {activeTab === "match" && <TransferTab />}
          {activeTab === "unidades" && <UnitsTab />}
          {activeTab === "estoque" && <StockTab selectedUnitId={selectedUnitId} />}
          {activeTab === "sincronizar" && <InventorySyncTab />}
          {activeTab === "compras" && <PurchasesTab />}
        </main>
      </div>
    </div>
  );
}
