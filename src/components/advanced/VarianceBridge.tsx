"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, ReferenceLine } from "recharts";
import { motion } from "framer-motion";
import { varianceData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";

export default function VarianceBridge() {
  const data = varianceData.map((d) => ({
    ...d,
    variance: d.actual - d.budget,
    variancePercent: (((d.actual - d.budget) / d.budget) * 100).toFixed(1),
  }));

  return (
    <ChartWrapper title="Variance Bridge" description="Actual vs budget variance comparison across categories">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" horizontal={false} />
            <XAxis type="number" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <YAxis type="category" dataKey="category" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} width={100} />
            <Tooltip contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }} formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
            <ReferenceLine x={0} stroke="#71717a" />
            <Bar dataKey="variance" radius={[0, 4, 4, 0]} animationDuration={1200}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.variance >= 0 ? "#22c55e" : "#ef4444"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-4 mt-3">
          {data.map((d) => (
            <div key={d.category} className="text-xs">
              <span className="text-[#71717a]">{d.category}: </span>
              <span className={d.variance >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}>
                {d.variance >= 0 ? "+" : ""}{d.variancePercent}%
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </ChartWrapper>
  );
}
