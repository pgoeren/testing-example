"use client";
import { AreaChart, Area, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { forecastData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";

export default function ForecastView() {
  return (
    <ChartWrapper title="Forecast Projection" description="Multi-scenario forecast with confidence bands">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={forecastData}>
            <defs>
              <linearGradient id="forecastBand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
            <Tooltip contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }} formatter={(value: number | null) => value ? [`$${value.toLocaleString()}`, ""] : ["-", ""]} />
            <Area type="monotone" dataKey="high" stroke="none" fill="url(#forecastBand)" />
            <Area type="monotone" dataKey="low" stroke="none" fill="#0a0a0f" />
            <Line type="monotone" dataKey="mid" stroke="#6366f1" strokeWidth={2} strokeDasharray="6 4" dot={false} />
            <Line type="monotone" dataKey="actual" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 4, fill: "#22c55e" }} connectNulls={false} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-2 text-xs text-[#71717a]">
          <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-[#22c55e]" />Actual</div>
          <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-[#6366f1] border-dashed" />Forecast</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[#6366f115] rounded" />Confidence Band</div>
        </div>
      </motion.div>
    </ChartWrapper>
  );
}
