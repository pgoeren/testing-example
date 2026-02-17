"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, ReferenceLine } from "recharts";
import { motion } from "framer-motion";
import { waterfallData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";

export default function Waterfall() {
  let cumulative = 0;
  const processed = waterfallData.map((d) => {
    if (d.type === "total") {
      const result = { ...d, start: 0, end: d.value, fill: "#6366f1" };
      cumulative = d.value;
      return result;
    }
    const start = cumulative;
    cumulative += d.value;
    return { ...d, start: Math.min(start, cumulative), end: Math.max(start, cumulative), fill: d.value >= 0 ? "#22c55e" : "#ef4444" };
  });

  return (
    <ChartWrapper title="Waterfall Chart" description="Revenue bridge showing incremental changes">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={processed}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="name" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} angle={-20} textAnchor="end" height={60} />
            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }} formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
            <ReferenceLine y={0} stroke="#71717a" strokeDasharray="3 3" />
            <Bar dataKey="end" radius={[4, 4, 0, 0]} animationDuration={1200}>
              {processed.map((d, i) => (
                <Cell key={i} fill={d.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </ChartWrapper>
  );
}
