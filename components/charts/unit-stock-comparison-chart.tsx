"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type UnitStockComparisonChartProps = {
  data: Array<{
    unitName: string;
    stock: number;
    forecast: number;
    excess: number;
  }>;
};

export function UnitStockComparisonChart({ data }: UnitStockComparisonChartProps) {
  return (
    <div className="w-full rounded-md bg-[#0f1519] p-4 shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
      <h3 className="mb-3 text-sm font-semibold text-white">
        Comparação de estoque por unidade
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
          <defs>
            <linearGradient id="unitStockGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8ae4c7" stopOpacity={1} />
              <stop offset="100%" stopColor="#56c9a7" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="unitForecastGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c8f2e6" stopOpacity={1} />
              <stop offset="100%" stopColor="#9be0ca" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
          <XAxis dataKey="unitName" stroke="#94a3b8" fontSize={12} tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <YAxis stroke="#94a3b8" fontSize={12} tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <Tooltip
            cursor={{ fill: "rgba(148, 163, 184, 0.04)" }}
            formatter={(value, name) => [
              typeof value === "number" ? value.toLocaleString("pt-BR") : value,
              String(name),
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
          <Bar dataKey="stock" name="Estoque atual" fill="url(#unitStockGradient)" radius={[6, 6, 0, 0]} activeBar={{ fill: "#4ec79a" }} />
          <Bar dataKey="forecast" name="Previsão" fill="url(#unitForecastGradient)" radius={[6, 6, 0, 0]} activeBar={{ fill: "#a8e8d3" }} />
          <Bar dataKey="excess" name="Excedente" fill="#eafaf4" radius={[6, 6, 0, 0]} activeBar={{ fill: "#eafaf4" }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
