"use client";
import { RadarChart as RChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";
import { radarData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";

export default function RadarChartViz() {
  return (
    <ChartWrapper title="Radar Chart" description="Multi-axis performance comparison across key metrics">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
        <ResponsiveContainer width="100%" height={340}>
          <RChart data={radarData}>
            <PolarGrid stroke="#1e1e2e" />
            <PolarAngleAxis dataKey="metric" stroke="#71717a" fontSize={11} />
            <PolarRadiusAxis stroke="#1e1e2e" fontSize={10} />
            <Radar name="Current" dataKey="current" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} animationDuration={1200} />
            <Radar name="Target" dataKey="target" stroke="#a855f7" fill="#a855f7" fillOpacity={0.1} strokeDasharray="4 4" animationDuration={1200} />
            <Radar name="Industry" dataKey="industry" stroke="#71717a" fill="#71717a" fillOpacity={0.05} animationDuration={1200} />
            <Tooltip contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#71717a" }} />
          </RChart>
        </ResponsiveContainer>
      </motion.div>
    </ChartWrapper>
  );
}
