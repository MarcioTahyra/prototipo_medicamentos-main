"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type CategoryLossBarChartProps = {
  data: Array<{
    category: string;
    risk: number;
  }>;
};

const COLORS = ["#a7f1dc", "#7fe4ca", "#59d3b0", "#2ebd93", "#159a78"];

export function CategoryLossBarChart({ data }: CategoryLossBarChartProps) {
  return (
    <div className="h-80 w-full rounded-md bg-[#0f1519] p-4 shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
      <h3 className="mb-3 text-sm font-semibold text-white">
        Categorias com maior risco de perda
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
          <XAxis type="number" stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <YAxis type="category" dataKey="category" width={96} stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 11 }} />
          <Tooltip
            cursor={{ fill: "rgba(148, 163, 184, 0.04)" }}
            formatter={(value) => [
              `R$ ${typeof value === "number" ? value.toLocaleString("pt-BR") : value}`,
              "Risco financeiro",
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
          <Bar dataKey="risk" name="Risco financeiro" radius={[0, 6, 6, 0]} activeBar={{ fill: "#1a9d80", opacity: 0.95 }}>
            {data.map((item, index) => (
              <Cell key={item.category} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
