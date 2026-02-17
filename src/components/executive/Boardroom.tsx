"use client";
import { motion } from "framer-motion";
import { kpiData, quarterlyData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { useInView } from "@/hooks/useInView";

export default function Boardroom() {
  const [ref, inView] = useInView(0.1);
  const totalRevenue = quarterlyData.reduce((s, q) => s + q.revenue, 0);
  const totalProfit = quarterlyData.reduce((s, q) => s + q.profit, 0);

  return (
    <ChartWrapper title="Boardroom Summary" description="Executive boardroom-style quarterly performance summary">
      <div ref={ref} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Annual Revenue", value: `$${(totalRevenue / 1000).toFixed(0)}k`, sub: "+18.2% YoY" },
            { label: "Net Profit", value: `$${(totalProfit / 1000).toFixed(0)}k`, sub: "38.5% margin" },
            { label: "Headcount", value: "142", sub: "+22 this year" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="border-l-2 border-[#6366f1] pl-4"
            >
              <p className="text-[10px] text-[#71717a] uppercase tracking-wider">{item.label}</p>
              <p className="text-xl font-bold text-[#e8e8ed]">{item.value}</p>
              <p className="text-xs text-[#22c55e]">{item.sub}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={quarterlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
              <XAxis dataKey="quarter" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
              <Tooltip contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} animationDuration={1000} />
              <Bar dataKey="profit" fill="#22c55e80" radius={[4, 4, 0, 0]} animationDuration={1000} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </ChartWrapper>
  );
}
