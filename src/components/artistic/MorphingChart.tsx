"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { monthlyData, regionData, kpiData } from "@/data/datasets";
import DashboardShell, {
  PaletteColor,
  PowerBIStep,
} from "@/components/ui/DashboardShell";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const palette: PaletteColor[] = [
  { hex: "#7c3aed", label: "Electric Violet" },
  { hex: "#2563eb", label: "Royal Blue" },
  { hex: "#06b6d4", label: "Cyan" },
  { hex: "#c084fc", label: "Light Lavender" },
  { hex: "#1e1b4b", label: "Deep Indigo" },
];

const powerBISteps: PowerBIStep[] = [
  {
    step: "Set electric-themed canvas",
    detail:
      "Set canvas background to #1e1b4b. Apply a dark theme and customize accent colors to #7c3aed and #2563eb across all visuals.",
  },
  {
    step: "Create switchable chart views",
    detail:
      'Use Bookmarks to create Bar, Line, and Area views of the same data. Add bookmark navigator buttons styled with #7c3aed background and #c084fc text to switch between views.',
  },
  {
    step: "Build animated KPI cards",
    detail:
      'Use Card visuals with value color #c084fc and label color #06b6d4. Set card background to #1e1b4b with a 1px #7c3aed border. Enable "Callout value" animation.',
  },
  {
    step: "Design morphing bar-to-line chart",
    detail:
      "Create duplicate pages: one with Bar Chart, one with Line Chart, both using same data. Use Drillthrough or Page Navigation to simulate morphing between chart types.",
  },
  {
    step: "Add region comparison panel",
    detail:
      "Insert a Clustered Bar Chart with region data. Use gradient fills from #7c3aed to #06b6d4. Enable data labels with #c084fc color and semi-transparent bar borders.",
  },
  {
    step: "Create revenue vs forecast comparison",
    detail:
      "Use a Combo Chart with revenue as bars (#7c3aed) and forecast as a line (#06b6d4 dashed). Set Y-axis label color to #c084fc.",
  },
  {
    step: "Apply electric glow effects",
    detail:
      "Add Shape visuals with #7c3aed fill at 5% opacity behind key panels. Layer multiple semi-transparent circles to create depth and an electric ambiance.",
  },
];

type ChartMode = "bar" | "line" | "area";

export default function MorphingChart() {
  const [mode, setMode] = useState<ChartMode>("bar");
  const [ref, inView] = useInView(0.1);

  const modes: { key: ChartMode; label: string }[] = [
    { key: "bar", label: "Bar" },
    { key: "line", label: "Line" },
    { key: "area", label: "Area" },
  ];

  const topKpis = [
    { label: "Total Revenue", value: "$885K", change: "+12.4%", positive: true },
    { label: "Avg Growth", value: "4.7%", change: "+1.2%", positive: true },
    { label: "Peak Month", value: "Dec", change: "$72K", positive: true },
    { label: "Total Profit", value: "$256K", change: "+8.9%", positive: true },
  ];

  const tooltipStyle = {
    background: `${palette[4].hex}f0`,
    border: `1px solid ${palette[0].hex}40`,
    borderRadius: 8,
    color: palette[3].hex,
  };

  return (
    <DashboardShell
      title="Dynamic View Dashboard"
      subtitle="Electric-themed morphing charts with switchable visualization modes"
      palette={palette}
      powerBISteps={powerBISteps}
    >
      <div ref={ref} className="space-y-4">
        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {topKpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-xl p-4 border overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${palette[4].hex}, #0f0d2e)`,
                borderColor: `${palette[i % 4].hex}25`,
              }}
            >
              <div
                className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-10"
                style={{ backgroundColor: palette[i % 4].hex }}
              />
              <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: palette[2].hex }}>
                {kpi.label}
              </p>
              <p className="text-2xl font-black" style={{ color: palette[3].hex }}>
                {kpi.value}
              </p>
              <p className="text-xs font-medium mt-1" style={{ color: palette[0].hex }}>
                {kpi.change}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Hero: Morphing Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl p-4 border relative overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${palette[4].hex}, #0f0d2e)`,
            borderColor: `${palette[0].hex}15`,
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full blur-3xl opacity-8"
            style={{ backgroundColor: palette[0].hex }}
          />
          <div
            className="absolute bottom-0 right-1/3 w-36 h-36 rounded-full blur-3xl opacity-6"
            style={{ backgroundColor: palette[2].hex }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: palette[2].hex }}>
                Monthly Revenue
              </p>
              <div className="flex gap-1">
                {modes.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setMode(m.key)}
                    className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                    style={{
                      background:
                        mode === m.key
                          ? `linear-gradient(135deg, ${palette[0].hex}, ${palette[1].hex})`
                          : `${palette[4].hex}80`,
                      color: mode === m.key ? "#fff" : palette[3].hex,
                      border: `1px solid ${mode === m.key ? palette[0].hex : palette[0].hex + "20"}`,
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
              >
                <ResponsiveContainer width="100%" height={260}>
                  {mode === "bar" ? (
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={`${palette[0].hex}15`} vertical={false} />
                      <XAxis dataKey="month" stroke={`${palette[3].hex}60`} fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke={`${palette[3].hex}60`} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                      <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
                      <Bar dataKey="revenue" fill={palette[0].hex} radius={[4, 4, 0, 0]} animationDuration={800} />
                      <Bar dataKey="profit" fill={palette[2].hex} radius={[4, 4, 0, 0]} animationDuration={800} />
                    </BarChart>
                  ) : mode === "line" ? (
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={`${palette[0].hex}15`} vertical={false} />
                      <XAxis dataKey="month" stroke={`${palette[3].hex}60`} fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke={`${palette[3].hex}60`} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                      <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
                      <Line type="monotone" dataKey="revenue" stroke={palette[0].hex} strokeWidth={3} dot={{ r: 4, fill: palette[0].hex }} animationDuration={800} />
                      <Line type="monotone" dataKey="forecast" stroke={palette[2].hex} strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3, fill: palette[2].hex }} animationDuration={800} />
                    </LineChart>
                  ) : (
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient id="electricAreaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={palette[0].hex} stopOpacity={0.4} />
                          <stop offset="100%" stopColor={palette[1].hex} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="electricAreaGrad2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={palette[2].hex} stopOpacity={0.3} />
                          <stop offset="100%" stopColor={palette[2].hex} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={`${palette[0].hex}15`} vertical={false} />
                      <XAxis dataKey="month" stroke={`${palette[3].hex}60`} fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke={`${palette[3].hex}60`} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                      <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
                      <Area type="monotone" dataKey="revenue" stroke={palette[0].hex} fill="url(#electricAreaGrad)" strokeWidth={2} animationDuration={800} />
                      <Area type="monotone" dataKey="profit" stroke={palette[2].hex} fill="url(#electricAreaGrad2)" strokeWidth={2} animationDuration={800} />
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom: Region Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-xl p-4 border"
          style={{
            background: `linear-gradient(135deg, ${palette[4].hex}, #0f0d2e)`,
            borderColor: `${palette[1].hex}20`,
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: palette[1].hex }}>
            Region Revenue Comparison
          </p>
          <div className="space-y-3">
            {regionData.map((r, i) => {
              const maxRevenue = Math.max(...regionData.map((d) => d.revenue));
              const pct = (r.revenue / maxRevenue) * 100;
              return (
                <motion.div
                  key={r.region}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-xs w-28 shrink-0" style={{ color: palette[3].hex }}>
                    {r.region}
                  </span>
                  <div className="flex-1 h-5 rounded-full overflow-hidden" style={{ background: `${palette[4].hex}80` }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${palette[0].hex}, ${palette[2].hex})`,
                      }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${pct}%` } : { width: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                    />
                  </div>
                  <span className="text-xs font-bold w-16 text-right" style={{ color: palette[2].hex }}>
                    ${(r.revenue / 1000).toFixed(0)}K
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </DashboardShell>
  );
}
