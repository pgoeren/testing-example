"use client";
import { motion } from "framer-motion";
import { kpiData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useInView } from "@/hooks/useInView";

function KPICard({ label, value, change, prefix = "", suffix = "" }: { label: string; value: number; change: number; prefix?: string; suffix?: string }) {
  const [ref, inView] = useInView(0.1);
  const animated = useAnimatedCounter(value, 1500, inView);
  const isPositive = change >= 0;
  const displayValue = value >= 1000 ? `${(animated / 1000).toFixed(1)}k` : animated < 10 ? animated.toFixed(1) : Math.floor(animated).toString();

  return (
    <motion.div ref={ref} whileHover={{ y: -2 }} className="glass rounded-xl p-4 cursor-default">
      <p className="text-xs text-[#71717a] mb-1 uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-[#e8e8ed]">{prefix}{displayValue}{suffix}</p>
      <div className="flex items-center gap-1 mt-2">
        <span className={`text-xs font-medium ${isPositive ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
          {isPositive ? "+" : ""}{change}%
        </span>
        <span className="text-xs text-[#71717a]">vs last period</span>
      </div>
    </motion.div>
  );
}

export default function KPICounter() {
  return (
    <ChartWrapper title="KPI Animated Counter" description="Key performance indicators with smooth counting animation">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>
    </ChartWrapper>
  );
}
