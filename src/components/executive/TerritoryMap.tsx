"use client";
import { motion } from "framer-motion";
import { regionData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";

const regions = [
  { name: "North America", x: 120, y: 100, w: 100, h: 60 },
  { name: "Europe", x: 280, y: 70, w: 70, h: 50 },
  { name: "Asia Pacific", x: 380, y: 100, w: 90, h: 60 },
  { name: "Latin America", x: 140, y: 180, w: 70, h: 55 },
  { name: "Middle East", x: 310, y: 140, w: 50, h: 40 },
  { name: "Africa", x: 270, y: 180, w: 60, h: 70 },
];

export default function TerritoryMap() {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState<string | null>(null);
  const maxRevenue = Math.max(...regionData.map((r) => r.revenue));

  return (
    <ChartWrapper title="Sales Territory Map" description="Geographic sales territory visualization with revenue data">
      <div ref={ref}>
        <svg viewBox="0 0 500 300" className="w-full h-auto">
          {regions.map((reg, i) => {
            const data = regionData.find((r) => r.region === reg.name);
            if (!data) return null;
            const intensity = data.revenue / maxRevenue;
            const isHov = hovered === reg.name;
            return (
              <motion.g
                key={reg.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onMouseEnter={() => setHovered(reg.name)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
              >
                <rect
                  x={reg.x} y={reg.y} width={reg.w} height={reg.h}
                  rx={8} ry={8}
                  fill={`rgba(99,102,241,${0.15 + intensity * 0.5})`}
                  stroke={isHov ? "#6366f1" : "#1e1e2e"}
                  strokeWidth={isHov ? 2 : 1}
                />
                <text x={reg.x + reg.w / 2} y={reg.y + reg.h / 2 - 6} textAnchor="middle" fill="#e8e8ed" fontSize={9} fontWeight={600}>
                  {reg.name.split(" ").map((w) => w[0]).join("")}
                </text>
                <text x={reg.x + reg.w / 2} y={reg.y + reg.h / 2 + 8} textAnchor="middle" fill="#6366f1" fontSize={9} fontWeight={700}>
                  ${(data.revenue / 1000).toFixed(0)}k
                </text>
                {isHov && (
                  <text x={reg.x + reg.w / 2} y={reg.y + reg.h / 2 + 20} textAnchor="middle" fill="#71717a" fontSize={8}>
                    {data.customers.toLocaleString()} customers
                  </text>
                )}
              </motion.g>
            );
          })}
        </svg>
      </div>
    </ChartWrapper>
  );
}
