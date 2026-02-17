"use client";
import { motion } from "framer-motion";
import { heatmapData, monthlyData } from "@/data/datasets";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DashboardShell, {
  PaletteColor,
  PowerBIStep,
} from "@/components/ui/DashboardShell";

const palette: PaletteColor[] = [
  { hex: "#f97316", label: "Sunset Orange" },
  { hex: "#ea580c", label: "Deep Orange" },
  { hex: "#c2410c", label: "Burnt Orange" },
  { hex: "#fdba74", label: "Peach" },
  { hex: "#431407", label: "Dark Cocoa" },
];

const powerBISteps: PowerBIStep[] = [
  {
    step: "Prepare activity data matrix",
    detail:
      "Structure data as rows (days) and columns (hours 0-23) with activity counts as values. Import via Get Data > CSV/Excel.",
  },
  {
    step: "Create a Matrix visual",
    detail:
      "Add a Matrix visual. Drag Day to Rows, Hour to Columns, and Activity Count to Values. This creates the heatmap structure.",
  },
  {
    step: "Apply conditional formatting",
    detail:
      'Right-click values > Conditional formatting > Background color. Set minimum color to #431407 (Dark Cocoa) and maximum to #f97316 (Sunset Orange).',
  },
  {
    step: "Add KPI summary cards",
    detail:
      "Create four Card visuals: Peak Hour, Peak Day, Total Sessions, and Avg Sessions/Hour. Use DAX MAX and AVERAGE functions.",
  },
  {
    step: "Create hourly activity area chart",
    detail:
      "Add an Area chart below the heatmap. Aggregate all days by hour. Set fill to #f97316 with 30% opacity.",
  },
  {
    step: "Style the dashboard",
    detail:
      'Apply the Sunset palette. Set grid lines to #431407, labels to #fdba74. Enable tooltips showing day, hour, and value.',
  },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getColor(value: number, max: number): string {
  const ratio = value / max;
  if (ratio < 0.2) return `${palette[4].hex}40`;
  if (ratio < 0.4) return `${palette[2].hex}60`;
  if (ratio < 0.6) return `${palette[1].hex}80`;
  if (ratio < 0.8) return `${palette[0].hex}aa`;
  return `${palette[0].hex}ee`;
}

export default function Heatmap() {
  const [ref, inView] = useInView(0.1);
  const [tooltip, setTooltip] = useState<{
    day: string;
    hour: number;
    value: number;
  } | null>(null);
  const max = Math.max(...heatmapData.flat());

  // Calculate aggregate stats
  const totalSessions = heatmapData.flat().reduce((s, v) => s + v, 0);
  const flatWithIndex = heatmapData.flatMap((row, di) =>
    row.map((val, hi) => ({ day: days[di], hour: hi, value: val }))
  );
  const peak = flatWithIndex.reduce((best, cur) =>
    cur.value > best.value ? cur : best
  );
  const avgPerHour = (totalSessions / (7 * 24)).toFixed(1);

  // Hourly aggregation for area chart
  const hourlyAgg = Array.from({ length: 24 }, (_, h) => ({
    hour: `${h}:00`,
    sessions: heatmapData.reduce((sum, row) => sum + row[h], 0),
  }));

  // Daily totals
  const dailyTotals = days.map((day, i) => ({
    day,
    total: heatmapData[i].reduce((s, v) => s + v, 0),
  }));

  const kpis = [
    {
      label: "Total Sessions",
      value: totalSessions.toLocaleString(),
      sub: "All days & hours",
      color: palette[0].hex,
    },
    {
      label: "Peak Activity",
      value: `${peak.value}`,
      sub: `${peak.day} at ${peak.hour}:00`,
      color: palette[3].hex,
    },
    {
      label: "Avg Sessions/Hour",
      value: avgPerHour,
      sub: "Across all slots",
      color: palette[1].hex,
    },
    {
      label: "Busiest Day",
      value: dailyTotals.reduce((best, d) => (d.total > best.total ? d : best)).day,
      sub: `${dailyTotals.reduce((best, d) => (d.total > best.total ? d : best)).total} sessions`,
      color: palette[2].hex,
    },
  ];

  return (
    <DashboardShell
      title="Activity Heatmap Dashboard"
      subtitle="Hourly and daily activity distribution with intensity analysis"
      palette={palette}
      powerBISteps={powerBISteps}
    >
      <div ref={ref} className="space-y-4">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl p-4 border border-[--color-border] bg-[--color-card]"
            >
              <div className="text-xs text-[--color-muted] mb-1">
                {kpi.label}
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: kpi.color }}
              >
                {kpi.value}
              </div>
              <div className="text-[10px] text-[--color-muted] mt-1">
                {kpi.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-xl border border-[--color-border] bg-[--color-card] p-4"
        >
          <div className="text-sm font-semibold text-[--color-foreground] mb-3">
            Activity Heatmap (Hours x Days)
          </div>
          <div className="relative overflow-x-auto">
            <div className="flex gap-0.5 min-w-[500px]">
              <div className="flex flex-col gap-0.5 mr-1 shrink-0">
                <div className="h-5" />
                {days.map((d) => (
                  <div
                    key={d}
                    className="h-6 flex items-center text-[10px]"
                    style={{ color: palette[3].hex }}
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <div className="flex gap-0.5 mb-0.5">
                  {Array.from({ length: 24 }, (_, i) => (
                    <div
                      key={i}
                      className="flex-1 text-center text-[9px] h-5 leading-5"
                      style={{ color: "#71717a" }}
                    >
                      {i}
                    </div>
                  ))}
                </div>
                {heatmapData.map((row, di) => (
                  <div key={di} className="flex gap-0.5">
                    {row.map((val, hi) => (
                      <motion.div
                        key={hi}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: (di * 24 + hi) * 0.002,
                        }}
                        className="flex-1 h-6 rounded-sm cursor-default transition-all duration-150"
                        style={{
                          backgroundColor: getColor(val, max),
                          boxShadow:
                            tooltip?.day === days[di] && tooltip?.hour === hi
                              ? `0 0 0 1px ${palette[0].hex}`
                              : "none",
                        }}
                        onMouseEnter={() =>
                          setTooltip({ day: days[di], hour: hi, value: val })
                        }
                        onMouseLeave={() => setTooltip(null)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {tooltip && (
              <div className="absolute top-0 right-0 rounded-lg px-3 py-2 text-xs z-10 border border-[--color-border] bg-[--color-card]">
                <span style={{ color: palette[3].hex }}>
                  {tooltip.day} {tooltip.hour}:00
                </span>
                <span
                  className="ml-2 font-semibold"
                  style={{ color: palette[0].hex }}
                >
                  {tooltip.value} sessions
                </span>
              </div>
            )}
            {/* Legend */}
            <div className="flex items-center gap-2 mt-2 text-[10px] text-[--color-muted]">
              <span>Less</span>
              {[`${palette[4].hex}40`, `${palette[2].hex}60`, `${palette[1].hex}80`, `${palette[0].hex}aa`, `${palette[0].hex}ee`].map(
                (c) => (
                  <div
                    key={c}
                    className="w-3 h-3 rounded-[2px]"
                    style={{ backgroundColor: c }}
                  />
                )
              )}
              <span>More</span>
            </div>
          </div>
        </motion.div>

        {/* Secondary: Hourly Activity Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-xl border border-[--color-border] bg-[--color-card] p-4"
        >
          <div className="text-sm font-semibold text-[--color-foreground] mb-3">
            Hourly Activity Aggregate
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={hourlyAgg}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={palette[4].hex}
                strokeOpacity={0.5}
                vertical={false}
              />
              <XAxis
                dataKey="hour"
                stroke="#71717a"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                interval={2}
              />
              <YAxis
                stroke="#71717a"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(18,18,26,0.95)",
                  border: `1px solid ${palette[2].hex}`,
                  borderRadius: 8,
                  color: "#e8e8ed",
                }}
              />
              <Area
                type="monotone"
                dataKey="sessions"
                stroke={palette[0].hex}
                fill={palette[0].hex}
                fillOpacity={0.25}
                strokeWidth={2}
                animationDuration={1200}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Daily Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="rounded-xl border border-[--color-border] bg-[--color-card] p-4"
        >
          <div className="text-sm font-semibold text-[--color-foreground] mb-3">
            Daily Activity Summary
          </div>
          <div className="grid grid-cols-7 gap-2">
            {dailyTotals.map((d, i) => {
              const maxDay = Math.max(...dailyTotals.map((dt) => dt.total));
              const pct = (d.total / maxDay) * 100;
              return (
                <motion.div
                  key={d.day}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: i * 0.05 + 0.6 }}
                  className="text-center"
                >
                  <div className="text-[10px] text-[--color-muted] mb-1">{d.day}</div>
                  <div className="relative h-20 bg-[--color-border] bg-opacity-20 rounded overflow-hidden">
                    <div
                      className="absolute bottom-0 w-full rounded-t transition-all"
                      style={{
                        height: `${pct}%`,
                        backgroundColor: palette[i < 5 ? 0 : 2].hex,
                        opacity: 0.7,
                      }}
                    />
                  </div>
                  <div
                    className="text-xs font-semibold mt-1"
                    style={{ color: palette[0].hex }}
                  >
                    {d.total}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </DashboardShell>
  );
}
