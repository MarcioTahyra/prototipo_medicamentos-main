"use client";

import { useMemo, useState } from "react";
import { Boxes } from "lucide-react";
import type { MedicineItem } from "@/data/mock-medicines";
import { StockLevelChart } from "@/components/charts/stock-level-chart";
import type { PlatformSnapshot } from "@/lib/platform-types";

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const EXPIRING_FILTER_DAYS = 45;
const DAYS_IN_PERIOD = 15;

function getStatus(item: MedicineItem): { label: string; className: string } {
  const daysToExpiry =
    (new Date(item.expiryDate).getTime() - new Date().getTime()) / MILLISECONDS_PER_DAY;
  if (item.shortageRisk >= 80 || daysToExpiry <= 30)
    return { label: "Crítico", className: "border border-red-500/20 bg-red-500/10 text-red-200" };
  if (item.shortageRisk >= 50 || daysToExpiry <= 60)
    return { label: "Atenção", className: "border border-[#f3c96d]/20 bg-[#f3c96d]/10 text-[#f3c96d]" };
  return { label: "Saudável", className: "border border-[#68ddbd]/20 bg-[#68ddbd]/10 text-[#68ddbd]" };
}

function getDaysToRuptura(item: MedicineItem): number {
  if (item.currentStock <= 0) return 0;
  const dailyRate = Math.max(1, item.forecastConsumption / DAYS_IN_PERIOD);
  return Math.floor(item.currentStock / dailyRate);
}

function getRupturaClass(days: number): string {
  if (days <= 7) return "text-red-300 font-semibold";
  if (days <= 15) return "text-[#f3c96d] font-medium";
  return "text-[#68ddbd]";
}

type StockTabProps = {
  data: PlatformSnapshot;
  selectedUnitId: string;
};

export function StockTab({ data, selectedUnitId }: StockTabProps) {
  const [expiringSoonFilter, setExpiringSoonFilter] = useState(false);
  const [lowStockFilter, setLowStockFilter] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<MedicineItem | null>(null);

  const chartData = useMemo(() => {
    if (selectedUnitId === "all") {
      return data.medicines.map((m) => ({
        name: m.name,
        currentStock: m.currentStock,
        forecastConsumption: m.forecastConsumption,
      }));
    }
    return data.unitStocks
      .filter((s) => s.unitId === selectedUnitId)
      .map((s) => {
        const med = data.medicines.find((m) => m.id === s.medicineId);
        return {
          name: med?.name ?? s.medicineId,
          currentStock: s.currentStock,
          forecastConsumption: s.forecastConsumption,
        };
      });
  }, [data.medicines, data.unitStocks, selectedUnitId]);

  const filteredMedicines = useMemo(() => {
    let list = data.medicines;
    if (selectedUnitId !== "all") {
      const unitStockMap = new Map(
        data.unitStocks.filter((s) => s.unitId === selectedUnitId).map((s) => [s.medicineId, s]),
      );
      list = list.map((m) => {
        const us = unitStockMap.get(m.id);
        return us ? { ...m, currentStock: us.currentStock, forecastConsumption: us.forecastConsumption } : m;
      });
    }
    return list.filter((item) => {
      const daysToExpiry =
        (new Date(item.expiryDate).getTime() - new Date().getTime()) / MILLISECONDS_PER_DAY;
      const matchesExpiring = !expiringSoonFilter || daysToExpiry <= EXPIRING_FILTER_DAYS;
      const matchesLowStock = !lowStockFilter || item.currentStock < item.forecastConsumption;
      return matchesExpiring && matchesLowStock;
    });
  }, [data.medicines, data.unitStocks, expiringSoonFilter, lowStockFilter, selectedUnitId]);

  const unitLabel =
    selectedUnitId === "all"
      ? "Todas as Unidades"
      : data.units.find((u) => u.id === selectedUnitId)?.name ?? selectedUnitId;

  return (
    <section className="space-y-5">
      <StockLevelChart data={chartData} />

      <div className="flex flex-wrap items-center gap-3 rounded-md bg-[#0d1117] p-4 shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
        <span className="flex items-center gap-1.5 text-sm font-medium text-slate-200">
          <Boxes className="h-4 w-4 text-[#68ddbd]" />
          {unitLabel}
        </span>
        <div className="ml-auto flex flex-wrap gap-2">
          <button
            onClick={() => setExpiringSoonFilter((p) => !p)}
            className={`rounded-full px-3 py-1.5 text-sm transition ${expiringSoonFilter
                ? "bg-[#f3c96d]/15 text-[#f3c96d] ring-1 ring-[#f3c96d]/20"
                : "bg-[#111b22] text-slate-300 hover:bg-[#162229]"
              }`}
          >
            Próximos ao Vencimento
          </button>
          <button
            onClick={() => setLowStockFilter((p) => !p)}
            className={`rounded-full px-3 py-1.5 text-sm transition ${lowStockFilter
                ? "bg-red-500/10 text-red-200 ring-1 ring-red-500/20"
                : "bg-[#111b22] text-slate-300 hover:bg-[#162229]"
              }`}
          >
            Estoque Baixo
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md bg-[#0d1117] shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
        <table className="min-w-full text-sm">
          <thead className="bg-[#111b22] text-left text-slate-300">
            <tr>
              <th className="px-4 py-3 font-medium">Medicamento</th>
              <th className="px-4 py-3 font-medium">Lote</th>
              <th className="px-4 py-3 font-medium">Validade</th>
              <th className="px-4 py-3 font-medium">Estoque Atual</th>
              <th className="px-4 py-3 font-medium">Forecast</th>
              <th className="px-4 py-3 font-medium">Dias até Ruptura</th>
              <th className="px-4 py-3 font-medium">Risco</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.map((item) => {
              const status = getStatus(item);
              const days = getDaysToRuptura(item);
              return (
                <tr key={item.id} className="border-t border-[#1b232b] hover:bg-[#101821]">
                  <td className="px-4 py-3 font-medium text-white">{item.name}</td>
                  <td className="px-4 py-3 text-slate-400">{item.batch}</td>
                  <td className="px-4 py-3 text-slate-300">
                    {new Date(item.expiryDate).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3 text-slate-200">{item.currentStock} un.</td>
                  <td className="px-4 py-3 text-slate-300">{item.forecastConsumption} un.</td>
                  <td className={`px-4 py-3 ${getRupturaClass(days)}`}>{days} dias</td>
                  <td className="px-4 py-3 text-slate-300">{item.shortageRisk}%</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedMedicine(item)}
                      className="rounded-lg bg-[#68ddbd]/10 px-3 py-1.5 text-xs font-medium text-[#68ddbd] transition hover:bg-[#68ddbd]/15"
                    >
                      Detalhes
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedMedicine && (
        <aside className="fixed inset-y-0 right-0 z-20 w-full max-w-md border-l border-[#1b232b] bg-[#0d1117] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.35)]">
          <button
            onClick={() => setSelectedMedicine(null)}
            className="mb-4 rounded-lg bg-[#111b22] px-3 py-1.5 text-sm text-slate-300 transition hover:bg-[#162229]"
          >
            Fechar
          </button>
          <h3 className="text-lg font-semibold text-white">{selectedMedicine.name}</h3>
          <p className="mt-1 text-sm text-slate-400">Lote {selectedMedicine.batch}</p>
          <div className="mt-4 space-y-2 rounded-2xl bg-[#111b22] p-4 text-sm text-slate-200 ring-1 ring-[#1b232b]">
            <p>Validade: {new Date(selectedMedicine.expiryDate).toLocaleDateString("pt-BR")}</p>
            <p>Estoque atual: {selectedMedicine.currentStock} un.</p>
            <p>Consumo previsto: {selectedMedicine.forecastConsumption} un.</p>
            <p>Consumo real: {selectedMedicine.actualConsumption} un.</p>
            <p>Risco de ruptura: {selectedMedicine.shortageRisk}%</p>
            <p>Dias até ruptura: {getDaysToRuptura(selectedMedicine)} dias</p>
            <p>Valor financeiro em risco: R$ {selectedMedicine.financialRisk.toLocaleString("pt-BR")}</p>
          </div>
        </aside>
      )}
    </section>
  );
}
