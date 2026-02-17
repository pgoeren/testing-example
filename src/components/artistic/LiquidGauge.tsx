"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DashboardShell, {
  PaletteColor,
  PowerBIStep,
} from "@/components/ui/DashboardShell";
import { regionData, segmentData, kpiData } from "@/data/datasets";

const palette: PaletteColor[] = [
  { hex: "#0077b6", label: "Ocean Blue" },
  { hex: "#023e8a", label: "Deep Sapphire" },
  { hex: "#00b4d8", label: "Bright Aqua" },
  { hex: "#90e0ef", label: "Pale Cyan" },
  { hex: "#03045e", label: "Midnight Navy" },
];

const powerBISteps: PowerBIStep[] = [
  {
    step: "Set deep ocean canvas background",
    detail:
      "Go to Format > Canvas background, set to #03045e. Choose a dark theme as your base and customize further.",
  },
  {
    step: "Create liquid gauge visuals",
    detail:
      'Import the "Liquid Fill Gauge" custom visual from AppSource. Configure fill colors using #0077b6 to #90e0ef gradient. Set wave amplitude and speed for animation effect.',
  },
  {
    step: "Build KPI cards with ocean styling",
    detail:
      "Use Card visuals with background color #023e8a at 80% opacity. Set value font color to #90e0ef and title font color to #00b4d8. Add rounded corners via Format > Shape.",
  },
  {
    step: "Design segment bar chart",
    detail:
      "Insert a Clustered Bar Chart. Set bar fill to #00b4d8, gridlines to #023e8a, and axis labels to #90e0ef. Disable unnecessary gridlines for a cleaner look.",
  },
  {
    step: "Add capacity indicators",
    detail:
      'Use gauge visuals or the "Bullet Chart" custom visual. Set target line color to #90e0ef, fill to gradient from #0077b6 to #00b4d8. Set background arc to #03045e.',
  },
  {
    step: "Create region summary table",
    detail:
      "Insert a Matrix visual. Set alternating row colors between #03045e and #023e8a. Use #90e0ef for column headers and #00b4d8 for data values with conditional formatting.",
  },
  {
    step: "Apply wave-like shape overlays",
    detail:
      "Use custom SVG shapes or the Wave visual from AppSource. Layer semi-transparent shapes with #0077b6 at 10-20% opacity to create depth. Position behind chart visuals.",
  },
];

function LiquidGaugeVisual({
  value,
  label,
  color,
  inView,
  delay,
}: {
  value: number;
  label: string;
  color: string;
  inView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div
        className="relative w-[90px] h-[90px] rounded-full overflow-hidden"
        style={{
          border: `2px solid ${color}40`,
          background: palette[4].hex,
          boxShadow: `0 0 30px ${color}20, inset 0 0 20px ${color}10`,
        }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          initial={{ height: "0%" }}
          animate={inView ? { height: `${value}%` } : { height: "0%" }}
          transition={{ duration: 1.5, ease: "easeOut", delay: delay + 0.2 }}
          style={{
            background: `linear-gradient(to top, ${color}50, ${color}90)`,
          }}
        >
          <svg
            className="absolute -top-2 left-0 w-full"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0 5 Q 12.5 0, 25 5 Q 37.5 10, 50 5 Q 62.5 0, 75 5 Q 87.5 10, 100 5 V 10 H 0 Z"
              fill={`${color}90`}
              animate={{
                d: [
                  "M0 5 Q 12.5 0, 25 5 Q 37.5 10, 50 5 Q 62.5 0, 75 5 Q 87.5 10, 100 5 V 10 H 0 Z",
                  "M0 5 Q 12.5 10, 25 5 Q 37.5 0, 50 5 Q 62.5 10, 75 5 Q 87.5 0, 100 5 V 10 H 0 Z",
                  "M0 5 Q 12.5 0, 25 5 Q 37.5 10, 50 5 Q 62.5 0, 75 5 Q 87.5 10, 100 5 V 10 H 0 Z",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-bold" style={{ color: palette[3].hex }}>
            {value}%
          </span>
        </div>
      </div>
      <span className="text-[10px] font-medium" style={{ color: palette[2].hex }}>
        {label}
      </span>
    </motion.div>
  );
}

export default function LiquidGauge() {
  const [ref, inView] = useInView(0.1);

  const gauges = [
    { value: 72, label: "Revenue Target", color: palette[0].hex },
    { value: 88, label: "Customer Sat.", color: palette[2].hex },
    { value: 45, label: "Market Share", color: palette[3].hex },
    { value: 94, label: "Retention Rate", color: palette[0].hex },
  ];

  const topKpis = [
    { label: "Total Revenue", value: "$885K", change: "+12.4%", positive: true },
    { label: "Capacity Used", value: "78%", change: "+3.1%", positive: true },
    { label: "Churn Rate", value: "3.2%", change: "-0.5%", positive: true },
    { label: "MRR Growth", value: "18.6%", change: "+3.2%", positive: true },
  ];

  return (
    <DashboardShell
      title="Capacity Gauge Dashboard"
      subtitle="Deep ocean-themed liquid fill gauges with real-time capacity metrics"
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
              className="rounded-xl p-4 border"
              style={{
                background: `linear-gradient(135deg, ${palette[4].hex}, ${palette[1].hex}80)`,
                borderColor: `${palette[0].hex}25`,
              }}
            >
              <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: palette[2].hex }}>
                {kpi.label}
              </p>
              <p className="text-xl font-bold" style={{ color: palette[3].hex }}>
                {kpi.value}
              </p>
              <p
                className="text-xs font-medium mt-1"
                style={{ color: kpi.positive ? palette[2].hex : "#ef4444" }}
              >
                {kpi.change}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Hero: Liquid Gauges Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-xl p-6 border overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${palette[4].hex}, ${palette[1].hex}60)`,
            borderColor: `${palette[0].hex}15`,
          }}
        >
          {/* Underwater ambient glow */}
          <div
            className="absolute top-0 left-1/3 w-64 h-64 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: palette[2].hex }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-8"
            style={{ backgroundColor: palette[0].hex }}
          />

          <p className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: palette[2].hex }}>
            Capacity Gauges
          </p>
          <div className="relative z-10 flex justify-around flex-wrap gap-6">
            {gauges.map((g, i) => (
              <LiquidGaugeVisual
                key={g.label}
                value={g.value}
                label={g.label}
                color={g.color}
                inView={inView}
                delay={i * 0.15}
              />
            ))}
          </div>

          {/* Bubbles effect */}
          {inView &&
            Array.from({ length: 12 }, (_, i) => (
              <motion.div
                key={`bubble-${i}`}
                className="absolute rounded-full"
                style={{
                  width: 4 + Math.random() * 6,
                  height: 4 + Math.random() * 6,
                  left: `${10 + Math.random() * 80}%`,
                  bottom: 0,
                  backgroundColor: `${palette[3].hex}30`,
                  border: `1px solid ${palette[3].hex}15`,
                }}
                animate={{
                  y: [0, -(150 + Math.random() * 200)],
                  opacity: [0.6, 0],
                  scale: [1, 0.5],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  delay: Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
        </motion.div>

        {/* Bottom Row: Segment Chart + Region Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Segment Retention Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="rounded-xl p-4 border"
            style={{
              background: `linear-gradient(135deg, ${palette[4].hex}, ${palette[1].hex}40)`,
              borderColor: `${palette[2].hex}20`,
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: palette[2].hex }}>
              Segment Retention
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={segmentData}>
                <XAxis
                  dataKey="segment"
                  stroke={`${palette[3].hex}80`}
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke={`${palette[3].hex}80`}
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{
                    background: palette[4].hex,
                    border: `1px solid ${palette[0].hex}40`,
                    borderRadius: 8,
                    color: palette[3].hex,
                  }}
                  formatter={(value: number) => [`${value}%`, "Retention"]}
                />
                <Bar
                  dataKey="retention"
                  fill={palette[2].hex}
                  radius={[4, 4, 0, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Region Data Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="rounded-xl p-4 border overflow-x-auto"
            style={{
              background: `linear-gradient(135deg, ${palette[4].hex}, ${palette[1].hex}40)`,
              borderColor: `${palette[0].hex}20`,
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: palette[0].hex }}>
              Region Overview
            </p>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ color: palette[2].hex }} className="border-b" style2={{ borderColor: `${palette[0].hex}20` }}>
                  <th className="text-left py-2 font-semibold" style={{ color: palette[2].hex }}>Region</th>
                  <th className="text-right py-2 font-semibold" style={{ color: palette[2].hex }}>Revenue</th>
                  <th className="text-right py-2 font-semibold" style={{ color: palette[2].hex }}>Customers</th>
                </tr>
              </thead>
              <tbody>
                {regionData.map((r, i) => (
                  <motion.tr
                    key={r.region}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.8 + i * 0.06 }}
                    className="border-b"
                    style={{ borderColor: `${palette[0].hex}10`, color: palette[3].hex }}
                  >
                    <td className="py-2 font-medium">{r.region}</td>
                    <td className="text-right py-2" style={{ color: palette[2].hex }}>
                      ${(r.revenue / 1000).toFixed(0)}K
                    </td>
                    <td className="text-right py-2">
                      {r.customers.toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
    </DashboardShell>
  );
}
