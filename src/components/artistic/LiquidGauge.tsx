"use client";
import { motion } from "framer-motion";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useInView } from "@/hooks/useInView";

function Gauge({ value, label, color }: { value: number; label: string; color: string }) {
  const [ref, inView] = useInView(0.1);
  const fillHeight = inView ? value : 0;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#1e1e2e]" style={{ background: "#0a0a0f" }}>
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          initial={{ height: "0%" }}
          animate={{ height: `${fillHeight}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ background: `linear-gradient(to top, ${color}40, ${color}90)` }}
        >
          {/* Wave effect */}
          <svg className="absolute -top-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
            <motion.path
              d="M0 5 Q 12.5 0, 25 5 Q 37.5 10, 50 5 Q 62.5 0, 75 5 Q 87.5 10, 100 5 V 10 H 0 Z"
              fill={`${color}90`}
              animate={{ d: [
                "M0 5 Q 12.5 0, 25 5 Q 37.5 10, 50 5 Q 62.5 0, 75 5 Q 87.5 10, 100 5 V 10 H 0 Z",
                "M0 5 Q 12.5 10, 25 5 Q 37.5 0, 50 5 Q 62.5 10, 75 5 Q 87.5 0, 100 5 V 10 H 0 Z",
                "M0 5 Q 12.5 0, 25 5 Q 37.5 10, 50 5 Q 62.5 0, 75 5 Q 87.5 10, 100 5 V 10 H 0 Z",
              ] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-[#e8e8ed]">{value}%</span>
        </div>
      </div>
      <span className="text-xs text-[#71717a]">{label}</span>
    </div>
  );
}

export default function LiquidGauge() {
  return (
    <ChartWrapper title="Liquid Fill Gauge" description="Liquid-style fill gauges with wave animation effect">
      <div className="flex justify-around flex-wrap gap-6 py-4">
        <Gauge value={72} label="Revenue Target" color="#6366f1" />
        <Gauge value={88} label="Customer Sat." color="#22c55e" />
        <Gauge value={45} label="Market Share" color="#a855f7" />
        <Gauge value={94} label="Retention" color="#ec4899" />
      </div>
    </ChartWrapper>
  );
}
