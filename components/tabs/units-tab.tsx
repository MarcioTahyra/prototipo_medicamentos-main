"use client";

import { useMemo, useState } from "react";
import { Building2, AlertTriangle, BedDouble, Users } from "lucide-react";
import type { Unit, UnitStock } from "@/data/mock-units";
import { UnitStockComparisonChart } from "@/components/charts/unit-stock-comparison-chart";
import type { PlatformSnapshot } from "@/lib/platform-types";

type UnitsTabProps = {
  data: PlatformSnapshot;
};

const EXCESS_THRESHOLD = 1.4;

function getCriticalCount(unitStocks: UnitStock[], unitId: string): number {
  return unitStocks.filter((s) => {
    if (s.unitId !== unitId) return false;
    return s.currentStock < s.forecastConsumption;
  }).length;
}

function getStockStatus(stock: number, forecast: number) {
  if (stock < forecast) {
    return { label: "Falta", className: "border border-red-500/20 bg-red-500/10 text-red-200" };
  }
  if (stock > forecast * EXCESS_THRESHOLD) {
    return { label: "Excesso", className: "border border-[#f3c96d]/20 bg-[#f3c96d]/10 text-[#f3c96d]" };
  }
  return { label: "Normal", className: "border border-[#68ddbd]/20 bg-[#68ddbd]/10 text-[#68ddbd]" };
}

export function UnitsTab({ data }: UnitsTabProps) {
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  const comparisonData = useMemo(() => {
    return data.units.map((unit) => {
      const stocks = data.unitStocks.filter((s) => s.unitId === unit.id);
      const totalStock = stocks.reduce((a, s) => a + s.currentStock, 0);
      const totalForecast = stocks.reduce((a, s) => a + s.forecastConsumption, 0);
      const excess = Math.max(0, totalStock - totalForecast);
      return { unitName: unit.name, stock: totalStock, forecast: totalForecast, excess };
    });
  }, [data.unitStocks, data.units]);

  const unitStockRows = useMemo(() => {
    if (!selectedUnit) return [];
    return data.unitStocks
      .filter((s) => s.unitId === selectedUnit.id)
      .map((s) => {
        const medicine = data.medicines.find((m) => m.id === s.medicineId);
        return { ...s, medicineName: medicine?.name ?? s.medicineId, category: medicine?.category ?? "—" };
      });
  }, [data.medicines, data.unitStocks, selectedUnit]);

  return (
    <section className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">Operações locais</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Unidades e performance</h2>
        </div>
      </header>

      <UnitStockComparisonChart data={comparisonData} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.units.map((unit) => {
          const criticalCount = getCriticalCount(data.unitStocks, unit.id);
          const isSelected = selectedUnit?.id === unit.id;
          return (
            <button
              key={unit.id}
              onClick={() => setSelectedUnit(isSelected ? null : unit)}
              className={`rounded-2xl border p-4 text-left transition ${isSelected
                  ? "border-[#68ddbd]/35 bg-[#0f171a]"
                  : "border-white/5 bg-[#10171c] hover:border-white/10"
                }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-xl bg-[#68ddbd]/10 p-1.5 text-[#68ddbd] ring-1 ring-[#68ddbd]/15">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold text-white">{unit.name}</span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.14em] text-slate-400">{unit.companyName}</span>
              </div>

              <p className="mb-3 text-xs text-slate-400">{unit.location}</p>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5">
                    <BedDouble className="h-3.5 w-3.5 text-[#68ddbd]" />
                    {unit.beds} leitos
                  </span>
                  <span className="font-medium text-slate-200">{unit.occupancyRate}% ocup.</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-[#ff8a8a]" />
                    {criticalCount} em falta
                  </span>
                  <span className="text-[#ff8a8a]">Ativo</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedUnit && (
        <div className="rounded-2xl border border-white/5 bg-[#10171c]">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#68ddbd]" />
              <h3 className="text-sm font-semibold text-white">Estoque — {selectedUnit.name}</h3>
            </div>
            <button
              onClick={() => setSelectedUnit(null)}
              className="rounded-lg bg-[#111b22] px-2.5 py-1.5 text-xs text-slate-300 hover:bg-[#171f26]"
            >
              Fechar
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[#0e151a] text-left text-slate-300">
                <tr>
                  <th className="px-4 py-3 font-medium">Medicamento</th>
                  <th className="px-4 py-3 font-medium">Categoria</th>
                  <th className="px-4 py-3 font-medium">Estoque Atual</th>
                  <th className="px-4 py-3 font-medium">Previsão</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {unitStockRows.map((row) => {
                  const status = getStockStatus(row.currentStock, row.forecastConsumption);
                  return (
                    <tr key={row.medicineId} className="border-t border-white/5 hover:bg-[#111b22]">
                      <td className="px-4 py-3 font-medium text-white">{row.medicineName}</td>
                      <td className="px-4 py-3 text-slate-400">{row.category}</td>
                      <td className="px-4 py-3 text-slate-200">{row.currentStock} un.</td>
                      <td className="px-4 py-3 text-slate-200">{row.forecastConsumption} un.</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${status.className}`}>
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
