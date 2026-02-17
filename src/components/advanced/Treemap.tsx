"use client";
import { motion } from "framer-motion";
import { treemapData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";

const COLORS = ["#6366f1", "#a855f7", "#ec4899", "#f59e0b", "#22c55e", "#06b6d4", "#f97316", "#84cc16"];
const total = treemapData.reduce((s, d) => s + d.size, 0);

export default function Treemap() {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState<string | null>(null);

  // Simple treemap layout: single row wrapping
  const items = treemapData.map((d, i) => ({
    ...d,
    percent: (d.size / total) * 100,
    color: COLORS[i % COLORS.length],
  }));

  return (
    <ChartWrapper title="Animated Treemap" description="Proportional product revenue visualization">
      <div ref={ref} className="flex flex-wrap gap-1.5 min-h-[280px]">
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ scale: 1.03, zIndex: 10 }}
            onMouseEnter={() => setHovered(item.name)}
            onMouseLeave={() => setHovered(null)}
            className="rounded-lg flex flex-col items-center justify-center p-3 cursor-default relative overflow-hidden"
            style={{
              backgroundColor: `${item.color}20`,
              border: `1px solid ${hovered === item.name ? item.color : "transparent"}`,
              flexBasis: `${Math.max(item.percent * 1.8, 20)}%`,
              flexGrow: 1,
              minHeight: `${Math.max(item.percent * 2.5, 60)}px`,
            }}
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundColor: item.color }} />
            <span className="text-xs font-semibold text-[#e8e8ed] z-10 text-center">{item.name}</span>
            <span className="text-lg font-bold z-10" style={{ color: item.color }}>${(item.size / 1000).toFixed(0)}k</span>
            <span className="text-[10px] text-[#71717a] z-10">{item.percent.toFixed(1)}%</span>
          </motion.div>
        ))}
      </div>
    </ChartWrapper>
  );
}
