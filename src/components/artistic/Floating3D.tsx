"use client";
import { motion } from "framer-motion";
import { kpiData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useState } from "react";

export default function Floating3D() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const colors = ["#6366f1", "#a855f7", "#ec4899", "#f59e0b", "#22c55e", "#06b6d4", "#f97316", "#84cc16"];

  return (
    <ChartWrapper title="Floating 3D Cards" description="CSS 3D perspective data cards with depth effect">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4" style={{ perspective: "1000px" }}>
        {kpiData.map((kpi, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <motion.div
              key={kpi.label}
              className="rounded-xl p-4 cursor-default border border-[#1e1e2e]"
              style={{
                transformStyle: "preserve-3d",
                background: `linear-gradient(135deg, ${colors[i]}15, ${colors[i]}05)`,
              }}
              initial={{ opacity: 0, rotateX: 20, rotateY: -10 }}
              animate={{
                opacity: 1,
                rotateX: isHovered ? 0 : 5,
                rotateY: isHovered ? 0 : -5,
                z: isHovered ? 30 : 0,
              }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div style={{ transform: "translateZ(20px)" }}>
                <p className="text-[10px] text-[#71717a] uppercase tracking-wider mb-1">{kpi.label}</p>
                <p className="text-xl font-bold" style={{ color: colors[i] }}>
                  {kpi.prefix}{kpi.value >= 1000 ? `${(kpi.value / 1000).toFixed(1)}k` : kpi.value}{kpi.suffix}
                </p>
                <p className={`text-xs mt-1 ${kpi.change >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                  {kpi.change >= 0 ? "+" : ""}{kpi.change}%
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </ChartWrapper>
  );
}
