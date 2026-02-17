"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import { motion } from "framer-motion";
import { monthlyData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useState } from "react";

export default function GradientBar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <ChartWrapper title="Gradient Bar Chart" description="Monthly revenue with gradient fills and hover effects">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={monthlyData} onMouseMove={(state) => { if (state?.activeTooltipIndex !== undefined) setActiveIndex(state.activeTooltipIndex); }} onMouseLeave={() => setActiveIndex(null)}>
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.4} />
              </linearGradient>
              <linearGradient id="barGradHover" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={1} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }} formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
            <Bar dataKey="revenue" radius={[6, 6, 0, 0]} animationDuration={1200}>
              {monthlyData.map((_, i) => (
                <Cell key={i} fill={activeIndex === i ? "url(#barGradHover)" : "url(#barGrad)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </ChartWrapper>
  );
}
