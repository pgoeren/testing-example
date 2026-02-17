"use client";
import { motion } from "framer-motion";
import { monthlyData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useInView } from "@/hooks/useInView";

export default function SpiralRadial() {
  const [ref, inView] = useInView(0.1);
  const cx = 200, cy = 180;
  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <ChartWrapper title="Spiral Radial Chart" description="Monthly revenue displayed in an expanding spiral pattern">
      <div ref={ref} className="flex justify-center">
        <svg viewBox="0 0 400 360" className="w-full max-w-md h-auto">
          {monthlyData.map((d, i) => {
            const angle = (i / monthlyData.length) * Math.PI * 2 - Math.PI / 2;
            const normalizedValue = d.revenue / maxRevenue;
            const minR = 40, maxR = 140;
            const radius = minR + normalizedValue * (maxR - minR);
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            const dotR = 4 + normalizedValue * 8;
            const labelR = radius + 22;
            const lx = cx + Math.cos(angle) * labelR;
            const ly = cy + Math.sin(angle) * labelR;

            return (
              <motion.g
                key={d.month}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <line x1={cx} y1={cy} x2={x} y2={y} stroke="#1e1e2e" strokeWidth={1} />
                <circle cx={x} cy={y} r={dotR} fill="#6366f1" opacity={0.3 + normalizedValue * 0.7} />
                <circle cx={x} cy={y} r={dotR * 0.5} fill="#6366f1" />
                <text x={lx} y={ly} textAnchor="middle" fill="#71717a" fontSize={9} dominantBaseline="middle">
                  {d.month}
                </text>
              </motion.g>
            );
          })}
          {/* Connecting spiral */}
          <motion.path
            d={monthlyData.map((d, i) => {
              const angle = (i / monthlyData.length) * Math.PI * 2 - Math.PI / 2;
              const normalizedValue = d.revenue / maxRevenue;
              const radius = 40 + normalizedValue * 100;
              const x = cx + Math.cos(angle) * radius;
              const y = cy + Math.sin(angle) * radius;
              return `${i === 0 ? "M" : "L"} ${x} ${y}`;
            }).join(" ") + " Z"}
            fill="#6366f110"
            stroke="#6366f140"
            strokeWidth={1.5}
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.5 }}
          />
          <text x={cx} y={cy - 5} textAnchor="middle" fill="#e8e8ed" fontSize={12} fontWeight={700}>Revenue</text>
          <text x={cx} y={cy + 10} textAnchor="middle" fill="#71717a" fontSize={9}>by Month</text>
        </svg>
      </div>
    </ChartWrapper>
  );
}
