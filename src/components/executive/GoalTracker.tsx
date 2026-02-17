"use client";
import { motion } from "framer-motion";
import { goalData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useInView } from "@/hooks/useInView";

export default function GoalTracker() {
  const [ref, inView] = useInView(0.1);

  return (
    <ChartWrapper title="Goal Tracking Panel" description="Progress tracking for organizational goals">
      <div ref={ref} className="space-y-4">
        {goalData.map((goal, i) => {
          const progress = goal.inverse
            ? Math.max(0, Math.min(100, ((goal.target - goal.current + goal.target) / (goal.target * 2)) * 100))
            : Math.min(100, (goal.current / goal.target) * 100);
          const isOnTrack = goal.inverse ? goal.current <= goal.target : goal.current >= goal.target * 0.7;
          const color = progress >= 100 ? "#22c55e" : isOnTrack ? "#6366f1" : "#f59e0b";

          return (
            <motion.div
              key={goal.goal}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-[#e8e8ed]">{goal.goal}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#71717a]">{goal.unit === "$" ? "$" : ""}{goal.current}{goal.unit === "%" ? "%" : ""}</span>
                  <span className="text-xs text-[#71717a]">/</span>
                  <span className="text-xs text-[#71717a]">{goal.unit === "$" ? "$" : ""}{goal.target}{goal.unit === "%" ? "%" : ""}</span>
                </div>
              </div>
              <div className="h-2.5 bg-[#1e1e2e] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${progress}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.08 }}
                />
              </div>
              <p className="text-[10px] mt-1" style={{ color }}>
                {progress >= 100 ? "Goal achieved!" : `${progress.toFixed(0)}% complete`}
              </p>
            </motion.div>
          );
        })}
      </div>
    </ChartWrapper>
  );
}
