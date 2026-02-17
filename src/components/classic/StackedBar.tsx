"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { motion } from "framer-motion";
import { monthlyData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";

export default function StackedBar() {
  return (
    <ChartWrapper title="Stacked Bar Expansion" description="Cost and profit breakdown with hover expansion">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }} formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
            <Legend wrapperStyle={{ color: "#71717a", fontSize: 12 }} />
            <Bar dataKey="cost" stackId="a" fill="#6366f180" radius={[0, 0, 0, 0]} animationDuration={1200} name="Cost" />
            <Bar dataKey="profit" stackId="a" fill="#22c55e" radius={[4, 4, 0, 0]} animationDuration={1200} name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </ChartWrapper>
  );
}
