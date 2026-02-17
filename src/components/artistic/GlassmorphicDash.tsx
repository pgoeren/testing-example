"use client";
import { motion } from "framer-motion";
import { monthlyData, regionData, kpiData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { useInView } from "@/hooks/useInView";

export default function GlassmorphicDash() {
  const [ref, inView] = useInView(0.1);

  return (
    <ChartWrapper title="Glassmorphic Dashboard" description="Dashboard with frosted glass panels and depth layers">
      <div ref={ref} className="relative min-h-[350px]">
        {/* Background gradient blobs */}
        <div className="absolute top-0 left-1/4 w-40 h-40 bg-[#6366f130] rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-[#a855f730] rounded-full blur-3xl" />
        <div className="absolute top-20 right-10 w-28 h-28 bg-[#ec489920] rounded-full blur-3xl" />

        <div className="relative z-10 grid grid-cols-3 gap-3">
          {/* KPI Row */}
          {kpiData.slice(0, 3).map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass rounded-xl p-4"
            >
              <p className="text-[10px] text-[#71717a] uppercase tracking-wider">{kpi.label}</p>
              <p className="text-lg font-bold text-[#e8e8ed] mt-1">
                {kpi.prefix}{kpi.value >= 1000 ? `${(kpi.value / 1000).toFixed(0)}k` : kpi.value}{kpi.suffix}
              </p>
              <p className={`text-xs ${kpi.change >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                {kpi.change >= 0 ? "+" : ""}{kpi.change}%
              </p>
            </motion.div>
          ))}
        </div>

        {/* Chart area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="relative z-10 glass rounded-xl p-4 mt-3"
        >
          <p className="text-xs text-[#71717a] mb-2">Revenue Trend</p>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="glassFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }} />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="url(#glassFill)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Region pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="relative z-10 flex flex-wrap gap-2 mt-3"
        >
          {regionData.slice(0, 4).map((r) => (
            <div key={r.region} className="glass rounded-full px-3 py-1.5 text-xs text-[#e8e8ed]">
              {r.region}: <span className="font-semibold text-[#6366f1]">${(r.revenue / 1000).toFixed(0)}k</span>
            </div>
          ))}
        </motion.div>
      </div>
    </ChartWrapper>
  );
}
