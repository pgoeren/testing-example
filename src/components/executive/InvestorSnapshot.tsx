"use client";
import { motion } from "framer-motion";
import { monthlyData, segmentData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useInView } from "@/hooks/useInView";

export default function InvestorSnapshot() {
  const [ref, inView] = useInView(0.1);
  const arr = monthlyData.reduce((s, d) => s + d.revenue, 0);
  const totalCustomers = segmentData.reduce((s, d) => s + d.customers, 0);

  return (
    <ChartWrapper title="Investor Snapshot" description="Minimal investor-ready metrics overview">
      <div ref={ref} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {[
            { label: "ARR", value: `$${(arr / 1000).toFixed(0)}k`, change: "+24.1%" },
            { label: "Total Customers", value: totalCustomers.toLocaleString(), change: "+18.7%" },
            { label: "Net Revenue Retention", value: "118%", change: "+3.2pp" },
            { label: "Burn Multiple", value: "1.2x", change: "Improving" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <p className="text-xs text-[#71717a]">{item.label}</p>
              <p className="text-2xl font-light text-[#e8e8ed] mt-0.5">{item.value}</p>
              <p className="text-xs text-[#22c55e] mt-0.5">{item.change}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs text-[#71717a] mb-2">MRR Trend</p>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }} />
              <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </ChartWrapper>
  );
}
