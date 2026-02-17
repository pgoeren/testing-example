"use client";
import { motion } from "framer-motion";
import { calendarData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";

function getIntensity(value: number): string {
  if (value < 5) return "#6366f110";
  if (value < 15) return "#6366f130";
  if (value < 25) return "#6366f160";
  if (value < 35) return "#6366f190";
  return "#6366f1cc";
}

export default function CalendarHeatmap() {
  const [ref, inView] = useInView(0.05);
  const [hovered, setHovered] = useState<{ date: string; value: number } | null>(null);

  // Group by week
  const firstDay = new Date(calendarData[0].date);
  const startOffset = firstDay.getDay();
  const weeks: (typeof calendarData[0] | null)[][] = [];
  let currentWeek: (typeof calendarData[0] | null)[] = Array(startOffset).fill(null);

  calendarData.forEach((d) => {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(d);
  });
  if (currentWeek.length > 0) weeks.push(currentWeek);

  return (
    <ChartWrapper title="Calendar Heatmap" description="Year-long activity visualization with daily intensity">
      <div ref={ref} className="overflow-x-auto relative">
        <div className="flex gap-[2px] min-w-[700px] py-2">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[2px]">
              {week.map((day, di) => (
                <motion.div
                  key={`${wi}-${di}`}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.1, delay: wi * 0.005 }}
                  className="w-3 h-3 rounded-[2px] cursor-default"
                  style={{ backgroundColor: day ? getIntensity(day.value) : "transparent" }}
                  onMouseEnter={() => day && setHovered(day)}
                  onMouseLeave={() => setHovered(null)}
                />
              ))}
            </div>
          ))}
        </div>
        {hovered && (
          <div className="absolute top-0 right-0 glass rounded-lg px-3 py-2 text-xs z-10">
            <span className="text-[#e8e8ed]">{hovered.date}</span>
            <span className="text-[#6366f1] ml-2 font-semibold">{hovered.value} events</span>
          </div>
        )}
        <div className="flex items-center gap-2 mt-2 text-[10px] text-[#71717a]">
          <span>Less</span>
          {["#6366f110", "#6366f130", "#6366f160", "#6366f190", "#6366f1cc"].map((c) => (
            <div key={c} className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: c }} />
          ))}
          <span>More</span>
        </div>
      </div>
    </ChartWrapper>
  );
}
