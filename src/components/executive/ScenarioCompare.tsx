"use client";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";
import { scenarioData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";

export default function ScenarioCompare() {
  return (
    <ChartWrapper title="Scenario Comparison" description="Side-by-side conservative, base, and aggressive scenarios">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={scenarioData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" horizontal={false} />
            <XAxis type="number" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey="metric" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} width={90} />
            <Tooltip contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }} />
            <Legend wrapperStyle={{ fontSize: 11, color: "#71717a" }} />
            <Bar dataKey="conservative" fill="#71717a60" radius={[0, 4, 4, 0]} name="Conservative" animationDuration={1000} />
            <Bar dataKey="base" fill="#6366f1" radius={[0, 4, 4, 0]} name="Base Case" animationDuration={1000} />
            <Bar dataKey="aggressive" fill="#22c55e80" radius={[0, 4, 4, 0]} name="Aggressive" animationDuration={1000} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </ChartWrapper>
  );
}
