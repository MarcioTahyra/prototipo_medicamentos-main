"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type PurchaseHistoryChartProps = {
  data: Array<{
    month: string;
    value: number;
    items: number;
  }>;
};

export function PurchaseHistoryChart({ data }: PurchaseHistoryChartProps) {
  return (
    <div className="w-full rounded-md bg-[#0f1519] p-4 shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
      <h3 className="mb-3 text-sm font-semibold text-white">
        Histórico de gastos em compras
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#68ddbd" stopOpacity={0.26} />
              <stop offset="95%" stopColor="#68ddbd" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
          <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <YAxis stroke="#94a3b8" fontSize={12} tick={{ fill: "#94a3b8", fontSize: 12 }} tickFormatter={(v: number) => `R$${(v / 1000).toFixed(0)}k`} />
          <Tooltip
            cursor={{ stroke: "rgba(104, 221, 189, 0.25)", strokeWidth: 1 }}
            formatter={(value) => [
              `R$ ${typeof value === "number" ? value.toLocaleString("pt-BR") : value}`,
              "Valor",
            ]}
            labelStyle={{ color: "#e2e8f0" }}
            itemStyle={{ color: "#e2e8f0" }}
            contentStyle={{
              backgroundColor: "#0f1720",
              border: "1px solid rgba(148,163,184,0.18)",
              borderRadius: 12,
              color: "#e2e8f0",
              boxShadow: "none",
            }}
          />
          <Legend wrapperStyle={{ color: "#cbd5e1", fontSize: "12px" }} />
          <Area
            type="monotone"
            dataKey="value"
            name="Valor"
            stroke="#68ddbd"
            strokeWidth={2}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
