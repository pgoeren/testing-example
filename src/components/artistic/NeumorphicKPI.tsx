"use client";
import { motion } from "framer-motion";
import { kpiData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useInView } from "@/hooks/useInView";

function NeuCard({ label, value, change, prefix = "", suffix = "" }: { label: string; value: number; change: number; prefix?: string; suffix?: string }) {
  const [ref, inView] = useInView(0.1);
  const animated = useAnimatedCounter(value, 1500, inView);
  const display = value >= 1000 ? `${(animated / 1000).toFixed(1)}k` : animated < 10 ? animated.toFixed(1) : Math.floor(animated).toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5 }}
      className="neumorphic rounded-2xl p-5 cursor-default"
    >
      <p className="text-[10px] text-[#71717a] uppercase tracking-widest mb-2">{label}</p>
      <p className="text-2xl font-bold text-[#e8e8ed]">{prefix}{display}{suffix}</p>
      <div className="mt-3 h-1.5 rounded-full bg-[#0d0d14] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: change >= 0 ? "#22c55e" : "#ef4444" }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${Math.min(Math.abs(change) * 8, 100)}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>
      <p className={`text-xs mt-2 ${change >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
        {change >= 0 ? "+" : ""}{change}%
      </p>
    </motion.div>
  );
}

export default function NeumorphicKPI() {
  return (
    <ChartWrapper title="Neumorphic KPI Board" description="KPI dashboard with soft neumorphic design style">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <NeuCard key={kpi.label} {...kpi} />
        ))}
      </div>
    </ChartWrapper>
  );
}
