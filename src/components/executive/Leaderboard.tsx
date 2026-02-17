"use client";
import { motion } from "framer-motion";
import { leaderboardData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useInView } from "@/hooks/useInView";

const MEDAL_COLORS = ["#f59e0b", "#94a3b8", "#cd7c2f"];

export default function Leaderboard() {
  const [ref, inView] = useInView(0.1);
  const maxRevenue = leaderboardData[0].revenue;

  return (
    <ChartWrapper title="Animated Leaderboard" description="Sales team rankings with animated transitions">
      <div ref={ref} className="space-y-2">
        {leaderboardData.map((person, i) => {
          const pct = (person.revenue / maxRevenue) * 100;
          return (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center gap-3 glass rounded-lg p-3 group hover:border-[#6366f130] transition-colors"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{
                  backgroundColor: i < 3 ? `${MEDAL_COLORS[i]}20` : "#1e1e2e",
                  color: i < 3 ? MEDAL_COLORS[i] : "#71717a",
                }}
              >
                {person.rank}
              </div>
              <div className="w-8 h-8 rounded-full bg-[#6366f120] flex items-center justify-center text-xs font-semibold text-[#6366f1] shrink-0">
                {person.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#e8e8ed] truncate">{person.name}</span>
                  <span className="text-sm font-bold text-[#e8e8ed] shrink-0 ml-2">${(person.revenue / 1000000).toFixed(2)}M</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-[#1e1e2e] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-[#6366f1]"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${pct}%` } : { width: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.06 }}
                    />
                  </div>
                  <span className="text-[10px] text-[#71717a] shrink-0">{person.deals} deals</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </ChartWrapper>
  );
}
