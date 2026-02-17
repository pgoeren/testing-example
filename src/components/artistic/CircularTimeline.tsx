"use client";
import { motion } from "framer-motion";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useInView } from "@/hooks/useInView";

const events = [
  { month: "Jan", event: "Series A Closed", value: "$12M", angle: 0 },
  { month: "Mar", event: "100k Users", value: "100,000", angle: 60 },
  { month: "May", event: "EU Launch", value: "3 Markets", angle: 120 },
  { month: "Jul", event: "AI Feature", value: "+45% Engagement", angle: 180 },
  { month: "Sep", event: "Enterprise Tier", value: "$2M ARR", angle: 240 },
  { month: "Nov", event: "Series B", value: "$35M", angle: 300 },
];

export default function CircularTimeline() {
  const [ref, inView] = useInView(0.1);
  const cx = 200, cy = 175, radius = 120;

  return (
    <ChartWrapper title="Circular Timeline" description="Radial timeline showing key milestones throughout the year">
      <div ref={ref} className="flex justify-center">
        <svg viewBox="0 0 400 350" className="w-full max-w-md h-auto">
          {/* Circle track */}
          <motion.circle
            cx={cx} cy={cy} r={radius}
            fill="none" stroke="#1e1e2e" strokeWidth={2}
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1 }}
          />
          {/* Events */}
          {events.map((ev, i) => {
            const rad = (ev.angle - 90) * (Math.PI / 180);
            const x = cx + Math.cos(rad) * radius;
            const y = cy + Math.sin(rad) * radius;
            const labelX = cx + Math.cos(rad) * (radius + 40);
            const labelY = cy + Math.sin(rad) * (radius + 40);
            const colors = ["#6366f1", "#a855f7", "#ec4899", "#f59e0b", "#22c55e", "#06b6d4"];

            return (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
              >
                <circle cx={x} cy={y} r={6} fill={colors[i]} />
                <line x1={x} y1={y} x2={labelX} y2={labelY} stroke="#1e1e2e" strokeWidth={1} />
                <text x={labelX} y={labelY - 8} textAnchor="middle" fill={colors[i]} fontSize={10} fontWeight={600}>{ev.month}</text>
                <text x={labelX} y={labelY + 5} textAnchor="middle" fill="#e8e8ed" fontSize={8}>{ev.event}</text>
                <text x={labelX} y={labelY + 17} textAnchor="middle" fill="#71717a" fontSize={8}>{ev.value}</text>
              </motion.g>
            );
          })}
          {/* Center label */}
          <text x={cx} y={cy - 5} textAnchor="middle" fill="#e8e8ed" fontSize={14} fontWeight={700}>2024</text>
          <text x={cx} y={cy + 12} textAnchor="middle" fill="#71717a" fontSize={10}>Milestones</text>
        </svg>
      </div>
    </ChartWrapper>
  );
}
