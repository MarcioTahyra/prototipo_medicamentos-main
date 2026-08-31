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

type StockLevelChartProps = {
  data: Array<{
    name: string;
    currentStock: number;
    forecastConsumption: number;
  }>;
};

export function StockLevelChart({ data }: StockLevelChartProps) {
  return (
    <div className="w-full rounded-md bg-[#0f1519] p-4 shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
      <h3 className="mb-3 text-sm font-semibold text-white">
        Estoque Atual vs Previsão de Consumo
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
          <defs>
            <linearGradient id="barCurrentStock" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4fd3a5" stopOpacity={1} />
              <stop offset="100%" stopColor="#1ca77f" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="barForecastStock" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#dffaf3" stopOpacity={1} />
              <stop offset="100%" stopColor="#9fe4cd" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
          <XAxis type="number" stroke="#94a3b8" fontSize={12} tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <YAxis type="category" dataKey="name" width={130} stroke="#94a3b8" fontSize={11} tick={{ fill: "#94a3b8", fontSize: 11 }} />
          <Tooltip
            cursor={{ fill: "rgba(148, 163, 184, 0.04)" }}
            formatter={(value, name) => [
              typeof value === "number" ? value.toLocaleString("pt-BR") : value ?? "—",
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
          <Bar
            dataKey="currentStock"
            name="Estoque Atual"
            fill="url(#barCurrentStock)"
            radius={[0, 6, 6, 0]}
            activeBar={{ fill: "#1ca77f" }}
          />
          <Bar
            dataKey="forecastConsumption"
            name="Previsão de Consumo"
            fill="url(#barForecastStock)"
            radius={[0, 6, 6, 0]}
            activeBar={{ fill: "#9fe4cd" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
