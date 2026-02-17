"use client";
import { motion } from "framer-motion";
import { quarterlyData, regionData, productData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useInView } from "@/hooks/useInView";

export default function FinancialWall() {
  const [ref, inView] = useInView(0.1);
  const totalRevenue = quarterlyData.reduce((s, q) => s + q.revenue, 0);
  const totalProfit = quarterlyData.reduce((s, q) => s + q.profit, 0);
  const margin = ((totalProfit / totalRevenue) * 100).toFixed(1);

  return (
    <ChartWrapper title="Financial Performance Wall" description="Comprehensive financial performance metrics display">
      <div ref={ref} className="space-y-4">
        {/* Top metrics */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Revenue", value: `$${(totalRevenue/1000).toFixed(0)}k`, color: "#6366f1" },
            { label: "Profit", value: `$${(totalProfit/1000).toFixed(0)}k`, color: "#22c55e" },
            { label: "Margin", value: `${margin}%`, color: "#a855f7" },
            { label: "Growth", value: "+18.2%", color: "#f59e0b" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="glass rounded-lg p-3 text-center"
            >
              <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</p>
              <p className="text-[10px] text-[#71717a] uppercase mt-1">{item.label}</p>
            </motion.div>
          ))}
        </div>
        {/* Revenue by region */}
        <div>
          <p className="text-xs text-[#71717a] mb-2">Revenue by Region</p>
          <div className="space-y-1.5">
            {regionData.slice(0, 4).map((r, i) => {
              const pct = (r.revenue / totalRevenue) * 100;
              return (
                <motion.div
                  key={r.region}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  style={{ originX: 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-xs text-[#71717a] w-24 shrink-0">{r.region}</span>
                  <div className="flex-1 h-5 bg-[#1e1e2e] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-[#6366f1]" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs text-[#e8e8ed] font-medium w-16 text-right">${(r.revenue/1000).toFixed(0)}k</span>
                </motion.div>
              );
            })}
          </div>
        </div>
        {/* Top products */}
        <div>
          <p className="text-xs text-[#71717a] mb-2">Top Products</p>
          <div className="flex flex-wrap gap-2">
            {productData.slice(0, 4).map((p) => (
              <div key={p.product} className="glass rounded-lg px-3 py-2 text-xs">
                <span className="text-[#e8e8ed] font-medium">{p.product}</span>
                <span className="text-[#22c55e] ml-2">+{p.growth}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChartWrapper>
  );
}
