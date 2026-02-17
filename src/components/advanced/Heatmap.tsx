"use client";
import { motion } from "framer-motion";
import { heatmapData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getColor(value: number, max: number): string {
  const ratio = value / max;
  if (ratio < 0.25) return "#6366f115";
  if (ratio < 0.5) return "#6366f140";
  if (ratio < 0.75) return "#6366f180";
  return "#6366f1cc";
}

export default function Heatmap() {
  const [ref, inView] = useInView(0.1);
  const [tooltip, setTooltip] = useState<{ day: string; hour: number; value: number } | null>(null);
  const max = Math.max(...heatmapData.flat());

  return (
    <ChartWrapper title="Soft Gradient Heatmap" description="Activity distribution across hours and days">
      <div ref={ref} className="relative overflow-x-auto">
        <div className="flex gap-0.5 min-w-[500px]">
          <div className="flex flex-col gap-0.5 mr-1 shrink-0">
            <div className="h-5" />
            {days.map((d) => (
              <div key={d} className="h-6 flex items-center text-[10px] text-[#71717a]">{d}</div>
            ))}
          </div>
          <div className="flex-1">
            <div className="flex gap-0.5 mb-0.5">
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="flex-1 text-center text-[9px] text-[#71717a] h-5 leading-5">{i}</div>
              ))}
            </div>
            {heatmapData.map((row, di) => (
              <div key={di} className="flex gap-0.5">
                {row.map((val, hi) => (
                  <motion.div
                    key={hi}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3, delay: (di * 24 + hi) * 0.002 }}
                    className="flex-1 h-6 rounded-sm cursor-default transition-all duration-150 hover:ring-1 hover:ring-[#6366f1]"
                    style={{ backgroundColor: getColor(val, max) }}
                    onMouseEnter={() => setTooltip({ day: days[di], hour: hi, value: val })}
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        {tooltip && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 glass rounded-lg px-3 py-2 text-xs pointer-events-none z-20">
            <span className="text-[#e8e8ed]">{tooltip.day} {tooltip.hour}:00</span>
            <span className="text-[#6366f1] ml-2 font-semibold">{tooltip.value} sessions</span>
          </div>
        )}
      </div>
    </ChartWrapper>
  );
}
