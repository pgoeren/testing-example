"use client";
import { motion } from "framer-motion";
import { funnelData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useInView } from "@/hooks/useInView";

const COLORS = ["#6366f1", "#a855f7", "#ec4899", "#f59e0b", "#22c55e", "#06b6d4"];

export default function FunnelChart() {
  const [ref, inView] = useInView(0.1);
  const maxValue = funnelData[0].value;

  return (
    <ChartWrapper title="Funnel Chart" description="Sales funnel with conversion rates between stages">
      <div ref={ref} className="space-y-2 py-4">
        {funnelData.map((item, i) => {
          const widthPercent = (item.value / maxValue) * 100;
          return (
            <motion.div
              key={item.stage}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ originX: 0 }}
              className="relative group"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-10 rounded-r-lg flex items-center px-4 transition-all duration-300 group-hover:brightness-110"
                  style={{ width: `${widthPercent}%`, backgroundColor: COLORS[i], minWidth: 120 }}
                >
                  <span className="text-sm font-medium text-white truncate">{item.stage}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-semibold text-[#e8e8ed]">{item.value.toLocaleString()}</span>
                  {i > 0 && <span className="text-xs text-[#71717a]">({item.rate}%)</span>}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </ChartWrapper>
  );
}
