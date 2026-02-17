"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { regionData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";

const COLORS = ["#6366f1", "#a855f7", "#ec4899", "#f59e0b", "#22c55e", "#06b6d4"];

export default function DonutStats() {
  const total = regionData.reduce((s, d) => s + d.revenue, 0);
  return (
    <ChartWrapper title="Donut with Center Stats" description="Regional revenue distribution with key metrics">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie data={regionData} dataKey="revenue" nameKey="region" cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={3} animationDuration={1200} strokeWidth={0}>
              {regionData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }} formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs text-[#71717a] uppercase tracking-wider">Total</span>
          <span className="text-2xl font-bold text-[#e8e8ed]">${(total / 1000).toFixed(0)}k</span>
          <span className="text-xs text-[#71717a]">Revenue</span>
        </div>
      </motion.div>
    </ChartWrapper>
  );
}
