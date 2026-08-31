"use client";

import { useMemo } from "react";
import { AlertTriangle, TrendingUp, CalendarDays, Activity } from "lucide-react";
import {
  mockEpidemicAlerts,
  mockSeasonalEvents,
  mockRegionalOccupancy,
} from "@/data/mock-external";
import { mockMedicines } from "@/data/mock-medicines";
import { categoryLossRisk, consumptionTrend } from "@/data/mock-medicines";
import { ConsumptionTrendChart } from "@/components/charts/consumption-trend-chart";
import { CategoryLossBarChart } from "@/components/charts/category-loss-bar-chart";

const EXCESS_THRESHOLD = 1.4;
const POTENTIAL_SAVINGS_RATE = 0.22;

const severityConfig = {
  alta: { label: "Alta", className: "border border-red-500/20 bg-red-500/10 text-red-200", dot: "bg-red-400" },
  moderada: { label: "Moderada", className: "border border-amber-500/20 bg-amber-500/10 text-amber-200", dot: "bg-amber-400" },
  baixa: { label: "Baixa", className: "border border-[#68ddbd]/30 bg-[#68ddbd]/10 text-[#7ce4c7]", dot: "bg-[#68ddbd]" },
};

const trendConfig = {
  subindo: { label: "↑ Subindo", className: "text-red-300" },
  estável: { label: "→ Estável", className: "text-slate-300" },
  caindo: { label: "↓ Caindo", className: "text-[#68ddbd]" },
};

export function DashboardTab() {
  const metrics = useMemo(() => {
    const totalFinancialRisk = mockMedicines.reduce((a, m) => a + m.financialRisk, 0);
    const criticalShortageAlerts = mockMedicines.filter((m) => m.shortageRisk >= 80).length;
    const excessStockItems = mockMedicines.filter(
      (m) => m.currentStock > m.forecastConsumption * EXCESS_THRESHOLD,
    ).length;
    const potentialSavings = Math.round(totalFinancialRisk * POTENTIAL_SAVINGS_RATE);
    return { totalFinancialRisk, criticalShortageAlerts, excessStockItems, potentialSavings };
  }, []);

  return (
    <section className="space-y-5">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">Visão executiva</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Métricas operacionais</h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-lg bg-[#0f1519] p-4 shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Risco financeiro</p>
            <span className="rounded-full border border-red-500/15 bg-red-500/5 px-2 py-0.5 text-[10px] font-medium text-red-200">Alta</span>
          </div>
          <p className="text-3xl font-semibold tracking-[-0.06em] text-[#ff8a8a]">
            R$ {metrics.totalFinancialRisk.toLocaleString("pt-BR")}
          </p>
          <p className="mt-2 text-xs text-slate-400">Valor em risco operacional</p>
        </article>

        <article className="rounded-lg bg-[#0f1519] p-4 shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Ruptura crítica</p>
            <span className="rounded-full border border-red-500/15 bg-red-500/5 px-2 py-0.5 text-[10px] font-medium text-red-200">Prioridade</span>
          </div>
          <p className="text-3xl font-semibold tracking-[-0.06em] text-[#ff8a8a]">{metrics.criticalShortageAlerts}</p>
          <p className="mt-2 text-xs text-slate-400">Itens com alerta prioritário</p>
        </article>

        <article className="rounded-lg bg-[#0f1519] p-4 shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Excesso de estoque</p>
            <span className="rounded-full border border-[#f3c96d]/15 bg-[#f3c96d]/5 px-2 py-0.5 text-[10px] font-medium text-[#f3c96d]">Alvo</span>
          </div>
          <p className="text-3xl font-semibold tracking-[-0.06em] text-[#f3c96d]">{metrics.excessStockItems}</p>
          <p className="mt-2 text-xs text-slate-400">Itens acima do alvo</p>
        </article>

        <article className="rounded-lg bg-[#0d1718] p-4 shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#7ce4c7]">Economia potencial</p>
            <span className="rounded-full border border-[#68ddbd]/15 bg-[#68ddbd]/5 px-2 py-0.5 text-[10px] font-medium text-[#68ddbd]">Match</span>
          </div>
          <p className="text-3xl font-semibold tracking-[-0.06em] text-[#68ddbd]">
            R$ {metrics.potentialSavings.toLocaleString("pt-BR")}
          </p>
          <p className="mt-2 text-xs text-slate-300">Por redistribuição inteligente</p>
        </article>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <ConsumptionTrendChart data={consumptionTrend} />
        <CategoryLossBarChart data={categoryLossRisk} />
      </div>

      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
          <AlertTriangle className="h-4 w-4 text-[#ff8a8a]" />
          Alertas Externos — Epidemias e Surtos
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          {mockEpidemicAlerts.map((alert) => {
            const sc = severityConfig[alert.severity];
            return (
              <article
                key={alert.id}
                className="rounded-2xl border border-[#1b232b] bg-[#0d1117] p-4 shadow-[0_18px_30px_rgba(0,0,0,0.18)]"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${sc.dot}`} />
                  <h3 className="font-semibold text-white">{alert.disease}</h3>
                  <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium ${sc.className}`}>
                    {sc.label}
                  </span>
                </div>
                <p className="mb-2 text-xs leading-5 text-slate-300 line-clamp-3">{alert.description}</p>
                <p className="text-xs text-slate-400">
                  Regiões: {alert.affectedRegions.join(", ")}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Medicamentos afetados: {alert.impactedMedicines.join(", ")}
                </p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
            <CalendarDays className="h-4 w-4 text-[#68ddbd]" />
            Eventos Sazonais
          </h2>
          <div className="space-y-3">
            {mockSeasonalEvents.map((ev) => (
              <article
                key={ev.id}
                className="flex items-start gap-3 rounded-2xl border border-[#1b232b] bg-[#0d1117] p-3 shadow-[0_18px_30px_rgba(0,0,0,0.18)]"
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#68ddbd]/15 text-[#68ddbd]">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{ev.name}</p>
                  <p className="text-xs text-slate-400">{ev.period}</p>
                  <p className="mt-0.5 text-xs leading-5 text-slate-300">{ev.description}</p>
                  <p className="mt-1 text-xs font-medium text-[#f3c96d]">
                    +{ev.expectedDemandIncrease}% demanda esperada em: {ev.affectedCategories.join(", ")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
            <Activity className="h-4 w-4 text-[#68ddbd]" />
            Ocupação Regional das Unidades
          </h2>
          <div className="overflow-hidden rounded-2xl border border-[#1b232b] bg-[#0d1117] shadow-[0_18px_30px_rgba(0,0,0,0.18)]">
            <table className="min-w-full text-sm">
              <thead className="bg-[#111b22] text-slate-300">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Unidade</th>
                  <th className="px-4 py-3 text-left font-medium">Ocupação</th>
                  <th className="px-4 py-3 text-left font-medium">UTI</th>
                  <th className="px-4 py-3 text-left font-medium">Tendência</th>
                </tr>
              </thead>
              <tbody>
                {mockRegionalOccupancy.map((occ) => {
                  const tc = trendConfig[occ.trend];
                  const occupancyColor =
                    occ.occupancyRate >= 90
                      ? "text-red-300 font-semibold"
                      : occ.occupancyRate >= 75
                        ? "text-[#f3c96d] font-medium"
                        : "text-[#68ddbd]";
                  return (
                    <tr key={occ.unitId} className="border-t border-[#1b232b] hover:bg-[#101821]">
                      <td className="px-4 py-3 font-medium text-white">{occ.unitName}</td>
                      <td className={`px-4 py-3 ${occupancyColor}`}>{occ.occupancyRate}%</td>
                      <td className={`px-4 py-3 ${occ.icuOccupancy >= 95 ? "text-red-300 font-semibold" : "text-slate-200"}`}>
                        {occ.icuOccupancy}%
                      </td>
                      <td className={`px-4 py-3 text-xs font-medium ${tc.className}`}>{tc.label}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
