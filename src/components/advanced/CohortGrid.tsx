"use client";
import { motion } from "framer-motion";
import { cohortData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useInView } from "@/hooks/useInView";

function getCellColor(value: number): string {
  if (value === 0) return "transparent";
  if (value >= 90) return "#22c55ecc";
  if (value >= 70) return "#22c55e80";
  if (value >= 50) return "#f59e0b80";
  if (value >= 30) return "#f9731680";
  return "#ef444480";
}

export default function CohortGrid() {
  const [ref, inView] = useInView(0.1);
  const months = ["M0", "M1", "M2", "M3", "M4", "M5"];

  return (
    <ChartWrapper title="Cohort Retention Grid" description="User retention analysis across monthly cohorts">
      <div ref={ref} className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left text-[#71717a] p-2 font-medium">Cohort</th>
              {months.map((m) => (
                <th key={m} className="text-center text-[#71717a] p-2 font-medium">{m}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cohortData.map((row, ri) => (
              <tr key={row.cohort}>
                <td className="text-[#e8e8ed] p-2 font-medium">{row.cohort}</td>
                {[row.m0, row.m1, row.m2, row.m3, row.m4, row.m5].map((val, ci) => (
                  <td key={ci} className="p-1">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, delay: (ri * 6 + ci) * 0.04 }}
                      className="rounded-md h-9 flex items-center justify-center font-semibold text-[#e8e8ed] cursor-default"
                      style={{ backgroundColor: getCellColor(val) }}
                    >
                      {val > 0 ? `${val}%` : ""}
                    </motion.div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartWrapper>
  );
}
