"use client";
import { motion } from "framer-motion";
import { monthlyData, kpiData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useInView } from "@/hooks/useInView";

export default function NeonTrading() {
  const [ref, inView] = useInView(0.1);

  return (
    <ChartWrapper title="Dark Neon Trading Screen" description="Neon-lit trading terminal aesthetic with live data">
      <div ref={ref} className="bg-[#050510] rounded-xl p-4 border border-[#1a1a2e]">
        {/* Ticker bar */}
        <div className="flex gap-4 overflow-hidden mb-4 pb-2 border-b border-[#1a1a2e]">
          {kpiData.slice(0, 5).map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="shrink-0"
            >
              <span className="text-[10px] text-[#71717a]">{kpi.label}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-mono font-bold text-[#e8e8ed]">
                  {kpi.prefix}{kpi.value >= 1000 ? `${(kpi.value/1000).toFixed(1)}k` : kpi.value}{kpi.suffix}
                </span>
                <span className={`text-xs font-mono ${kpi.change >= 0 ? "neon-green" : "neon-red"}`}>
                  {kpi.change >= 0 ? "▲" : "▼"} {Math.abs(kpi.change)}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <defs>
                <filter id="neonGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="1 4" stroke="#1a1a2e" />
              <XAxis dataKey="month" stroke="#71717a40" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a40" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#050510", border: "1px solid #22c55e40", borderRadius: 4, color: "#22c55e", fontFamily: "monospace", fontSize: 12 }} />
              <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} dot={false} filter="url(#neonGlow)" />
              <Line type="monotone" dataKey="forecast" stroke="#ef444460" strokeWidth={1} dot={false} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </ChartWrapper>
  );
}
