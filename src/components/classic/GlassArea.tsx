"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import { monthlyData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";

export default function GlassArea() {
  return (
    <ChartWrapper title="Glass Area Chart" description="Revenue area with frosted glass fill effect">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="areaGlass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="50%" stopColor="#a855f7" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }} formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
            <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#areaGlass)" animationDuration={1500} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </ChartWrapper>
  );
}
