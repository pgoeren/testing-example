"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import { monthlyData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";

export default function GlowLine() {
  return (
    <ChartWrapper title="Glow Trail Line Chart" description="Revenue trend with luminous glow trail effect">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={monthlyData}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }} formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
            <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} dot={false} filter="url(#glow)" animationDuration={1500} />
            <Line type="monotone" dataKey="forecast" stroke="#a855f740" strokeWidth={2} strokeDasharray="6 4" dot={false} animationDuration={1500} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </ChartWrapper>
  );
}
