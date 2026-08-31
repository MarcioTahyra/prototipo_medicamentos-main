"use client";

import { useState } from "react";
import { ShoppingCart, Truck, CalendarClock } from "lucide-react";
import { mockPurchases, type Purchase } from "@/data/mock-purchases";
import { PurchaseHistoryChart } from "@/components/charts/purchase-history-chart";

type PurchaseSubTab = "historico" | "agendadas";

const statusConfig: Record<Purchase["status"], { label: string; className: string }> = {
  entregue: { label: "Entregue", className: "border border-[#68ddbd]/20 bg-[#68ddbd]/10 text-[#68ddbd]" },
  em_transito: { label: "Em Trânsito", className: "border border-[#68ddbd]/20 bg-[#68ddbd]/10 text-[#68ddbd]" },
  agendada: { label: "Agendada", className: "border border-[#f3c96d]/20 bg-[#f3c96d]/10 text-[#f3c96d]" },
};

const chartData = [
  { month: "Jan", value: 28400, items: 3 },
  { month: "Fev", value: 31200, items: 4 },
  { month: "Mar", value: 29800, items: 3 },
  { month: "Abr", value: 35100, items: 5 },
  { month: "Mai", value: 42350, items: 5 },
  { month: "Jun", value: 38200, items: 5 },
];

export function PurchasesTab() {
  const [subTab, setSubTab] = useState<PurchaseSubTab>("historico");

  const delivered = mockPurchases.filter((p) => p.status === "entregue");
  const scheduled = mockPurchases.filter((p) => p.status === "agendada" || p.status === "em_transito");

  const subTabItems: { key: PurchaseSubTab; label: string; icon: typeof ShoppingCart }[] = [
    { key: "historico", label: "Histórico", icon: ShoppingCart },
    { key: "agendadas", label: "Agendadas", icon: Truck },
  ];

  return (
    <section className="space-y-5">
      <PurchaseHistoryChart data={chartData} />

      <div className="flex w-fit gap-2 rounded-md bg-[#0d1117] p-2 shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
        {subTabItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setSubTab(key)}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
              subTab === key
                ? "bg-[#68ddbd] text-[#08110f]"
                : "text-slate-300 hover:bg-[#111b22] hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {subTab === "historico" && (
        <div className="overflow-x-auto rounded-md bg-[#0d1117] shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
          <table className="min-w-full text-sm">
            <thead className="bg-[#111b22] text-left text-slate-300">
              <tr>
                <th className="px-4 py-3 font-medium">Medicamento</th>
                <th className="px-4 py-3 font-medium">Fornecedor</th>
                <th className="px-4 py-3 font-medium">Qtd</th>
                <th className="px-4 py-3 font-medium">Valor Total</th>
                <th className="px-4 py-3 font-medium">Pedido</th>
                <th className="px-4 py-3 font-medium">Entrega</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {delivered.map((p) => {
                const sc = statusConfig[p.status];
                return (
                  <tr key={p.id} className="border-t border-[#1b232b] hover:bg-[#101821]">
                    <td className="px-4 py-3 font-medium text-white">{p.medicineName}</td>
                    <td className="px-4 py-3 text-slate-300">{p.supplier}</td>
                    <td className="px-4 py-3 text-slate-200">{p.quantity} un.</td>
                    <td className="px-4 py-3 text-slate-200">
                      R$ {p.totalValue.toLocaleString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {new Date(p.orderDate).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {new Date(p.deliveryDate).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${sc.className}`}>
                        {sc.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {subTab === "agendadas" && (
        <div className="space-y-3">
          {scheduled.map((p) => {
            const sc = statusConfig[p.status];
            return (
              <article
                key={p.id}
                className="flex flex-col gap-3 rounded-md bg-[#0d1117] p-4 shadow-[0_8px_18px_rgba(0,0,0,0.12)] sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CalendarClock className="h-4 w-4 text-[#68ddbd]" />
                    <h3 className="font-semibold text-white">{p.medicineName}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${sc.className}`}>
                      {sc.label}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">
                    {p.supplier} — {p.quantity} un.
                  </p>
                  <p className="text-xs text-slate-400">
                    Pedido: {new Date(p.orderDate).toLocaleDateString("pt-BR")} · Previsão de entrega:{" "}
                    {new Date(p.deliveryDate).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-white">
                    R$ {p.totalValue.toLocaleString("pt-BR")}
                  </p>
                  <p className="text-xs text-slate-400">
                    R$ {p.unitPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/un.
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}

    </section>
  );
}
