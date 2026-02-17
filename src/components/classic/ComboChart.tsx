"use client";
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import { monthlyData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";

export default function ComboChart() {
  return (
    <ChartWrapper title="Combo Bar + Line" description="Revenue bars with profit trend line overlay">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={monthlyData}>
            <defs>
              <linearGradient id="comboBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }} formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
            <Bar dataKey="revenue" fill="url(#comboBar)" radius={[4, 4, 0, 0]} animationDuration={1200} />
            <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 4, fill: "#22c55e" }} animationDuration={1500} />
          </ComposedChart>
        </ResponsiveContainer>
      </motion.div>
    </ChartWrapper>
  );
}
