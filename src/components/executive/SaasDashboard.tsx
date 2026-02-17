"use client";
import { motion } from "framer-motion";
import { monthlyData, segmentData, funnelData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { useInView } from "@/hooks/useInView";

export default function SaasDashboard() {
  const [ref, inView] = useInView(0.1);
  const mrr = monthlyData[monthlyData.length - 1].revenue;
  const convRate = ((funnelData[4].value / funnelData[0].value) * 100).toFixed(1);

  return (
    <ChartWrapper title="SaaS Metrics Dashboard" description="Key SaaS metrics in a clean dashboard layout">
      <div ref={ref} className="space-y-4">
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "MRR", value: `$${(mrr / 1000).toFixed(0)}k`, color: "#6366f1" },
            { label: "Conv. Rate", value: `${convRate}%`, color: "#22c55e" },
            { label: "Churn", value: "3.2%", color: "#ef4444" },
            { label: "LTV:CAC", value: "4.8x", color: "#a855f7" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="w-2 h-2 rounded-full mx-auto mb-1" style={{ backgroundColor: item.color }} />
              <p className="text-lg font-bold text-[#e8e8ed]">{item.value}</p>
              <p className="text-[10px] text-[#71717a] uppercase">{item.label}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="saasFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }} />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="url(#saasFill)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
        <div className="flex gap-2 flex-wrap">
          {segmentData.map((seg) => (
            <div key={seg.segment} className="glass rounded-lg px-3 py-1.5 text-xs">
              <span className="text-[#71717a]">{seg.segment}:</span>
              <span className="text-[#e8e8ed] ml-1 font-medium">{seg.customers.toLocaleString()} customers</span>
            </div>
          ))}
        </div>
      </div>
    </ChartWrapper>
  );
}
