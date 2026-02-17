"use client";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ZAxis } from "recharts";
import { motion } from "framer-motion";
import { scatterData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";

const COLORS: Record<string, string> = { A: "#6366f1", B: "#a855f7", C: "#ec4899" };

export default function ScatterCluster() {
  const groups = ["A", "B", "C"].map((cat) => scatterData.filter((d) => d.category === cat));
  return (
    <ChartWrapper title="Dynamic Scatter Plot" description="Clustered scatter visualization with size encoding">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <ResponsiveContainer width="100%" height={320}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
            <XAxis dataKey="x" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} name="X" />
            <YAxis dataKey="y" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} name="Y" />
            <ZAxis dataKey="size" range={[30, 300]} />
            <Tooltip contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }} cursor={{ strokeDasharray: "3 3" }} />
            {groups.map((data, i) => (
              <Scatter key={["A","B","C"][i]} data={data} fill={COLORS[["A","B","C"][i]]} fillOpacity={0.7} animationDuration={1200} />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </motion.div>
    </ChartWrapper>
  );
}
