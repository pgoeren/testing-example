"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import DashboardShell, {
  PaletteColor,
  PowerBIStep,
} from "@/components/ui/DashboardShell";
import { monthlyData, quarterlyData, productData } from "@/data/datasets";

const palette: PaletteColor[] = [
  { hex: "#ff6b6b", label: "Warm Coral" },
  { hex: "#ee5a24", label: "Burnt Orange" },
  { hex: "#f9ca24", label: "Golden Sun" },
  { hex: "#ffeaa7", label: "Soft Cream" },
  { hex: "#e17055", label: "Terracotta" },
];

const powerBISteps: PowerBIStep[] = [
  {
    step: "Set warm-toned canvas background",
    detail:
      "Set canvas background to a dark warm tone like #2d1b14 or use a custom image with warm sunset gradients. Apply a dark theme and override individual colors.",
  },
  {
    step: "Create radial timeline visual",
    detail:
      'Import the "Timeline Storyteller" or "Radar Chart" custom visual from AppSource. Map milestone data to angular positions. Use #ff6b6b and #f9ca24 for data point colors.',
  },
  {
    step: "Build KPI cards with sunset gradient",
    detail:
      "Use Card visuals with conditional formatting. Set title color to #e17055, value color to #ffeaa7. Background should be semi-transparent using #2d1b14 at 80% opacity.",
  },
  {
    step: "Design quarterly line chart",
    detail:
      "Insert Line Chart with data for each quarter. Set line color to #ff6b6b, dot color to #f9ca24. Use gridlines in #e17055 at 15% opacity for subtle warmth.",
  },
  {
    step: "Add product growth indicators",
    detail:
      "Use a Table or Matrix visual with conditional formatting icon sets. Map growth rates to color gradient: #ff6b6b (low) to #f9ca24 (high). Enable data bars.",
  },
  {
    step: "Create animated milestone markers",
    detail:
      "Use Bookmarks with navigation buttons to simulate timeline progression. Each bookmark shows a different milestone with a spotlight effect using shape overlays.",
  },
  {
    step: "Apply warm glow shape layers",
    detail:
      "Add circle/ellipse shapes behind the timeline with fill colors #ff6b6b and #f9ca24 at 5-10% opacity, blurred edges. This creates the warm sunset ambient glow.",
  },
];

const events = [
  { month: "Jan", event: "Series A Closed", value: "$12M", angle: 0 },
  { month: "Mar", event: "100k Users", value: "100,000", angle: 60 },
  { month: "May", event: "EU Launch", value: "3 Markets", angle: 120 },
  { month: "Jul", event: "AI Feature", value: "+45% Engagement", angle: 180 },
  { month: "Sep", event: "Enterprise Tier", value: "$2M ARR", angle: 240 },
  { month: "Nov", event: "Series B", value: "$35M", angle: 300 },
];

export default function CircularTimeline() {
  const [ref, inView] = useInView(0.1);
  const cx = 180;
  const cy = 160;
  const radius = 110;

  const topKpis = [
    { label: "Total Milestones", value: "6", change: "On Track", positive: true },
    { label: "Total Funding", value: "$47M", change: "+191%", positive: true },
    { label: "User Growth", value: "100K", change: "+45%", positive: true },
    { label: "Markets Entered", value: "3", change: "New", positive: true },
  ];

  return (
    <DashboardShell
      title="Timeline Events Dashboard"
      subtitle="Warm sunset-themed circular timeline with key milestones and quarterly data"
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
                background: `linear-gradient(135deg, #2d1b14, #1a1008)`,
                borderColor: `${palette[i % 5].hex}30`,
              }}
            >
              <div
                className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full blur-2xl opacity-15"
                style={{ backgroundColor: palette[i % 5].hex }}
              />
              <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: palette[4].hex }}>
                {kpi.label}
              </p>
              <p className="text-2xl font-black" style={{ color: palette[3].hex }}>
                {kpi.value}
              </p>
              <p className="text-xs font-medium mt-1" style={{ color: palette[2].hex }}>
                {kpi.change}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Hero: Circular Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-xl border overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #1a0f08, #2d1b14)",
            borderColor: `${palette[0].hex}15`,
          }}
        >
          {/* Warm ambient glows */}
          <div
            className="absolute top-1/4 left-1/3 w-48 h-48 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: palette[0].hex }}
          />
          <div
            className="absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full blur-3xl opacity-8"
            style={{ backgroundColor: palette[2].hex }}
          />

          <div className="flex justify-center py-4">
            <svg viewBox="0 0 360 320" className="w-full max-w-lg h-auto">
              {/* Outer decorative ring */}
              <motion.circle
                cx={cx}
                cy={cy}
                r={radius + 15}
                fill="none"
                stroke={`${palette[4].hex}15`}
                strokeWidth={1}
                strokeDasharray="4 6"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.5 }}
              />
              {/* Main circle track */}
              <motion.circle
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                stroke={`${palette[4].hex}30`}
                strokeWidth={2}
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1 }}
              />
              {/* Inner decorative ring */}
              <motion.circle
                cx={cx}
                cy={cy}
                r={radius - 20}
                fill="none"
                stroke={`${palette[2].hex}10`}
                strokeWidth={1}
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
              />

              {/* Events */}
              {events.map((ev, i) => {
                const rad = (ev.angle - 90) * (Math.PI / 180);
                const x = cx + Math.cos(rad) * radius;
                const y = cy + Math.sin(rad) * radius;
                const labelX = cx + Math.cos(rad) * (radius + 38);
                const labelY = cy + Math.sin(rad) * (radius + 38);
                const color = palette[i % 5].hex;

                return (
                  <motion.g
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
                    }
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
                  >
                    {/* Glow behind dot */}
                    <circle cx={x} cy={y} r={12} fill={color} opacity={0.15} />
                    <circle cx={x} cy={y} r={7} fill={color} opacity={0.8} />
                    <circle cx={x} cy={y} r={3} fill={palette[3].hex} />
                    <line
                      x1={x}
                      y1={y}
                      x2={labelX}
                      y2={labelY}
                      stroke={`${color}40`}
                      strokeWidth={1}
                    />
                    <text
                      x={labelX}
                      y={labelY - 10}
                      textAnchor="middle"
                      fill={color}
                      fontSize={10}
                      fontWeight={700}
                    >
                      {ev.month}
                    </text>
                    <text
                      x={labelX}
                      y={labelY + 3}
                      textAnchor="middle"
                      fill={palette[3].hex}
                      fontSize={8}
                    >
                      {ev.event}
                    </text>
                    <text
                      x={labelX}
                      y={labelY + 15}
                      textAnchor="middle"
                      fill={`${palette[3].hex}80`}
                      fontSize={7}
                    >
                      {ev.value}
                    </text>
                  </motion.g>
                );
              })}

              {/* Center label */}
              <text
                x={cx}
                y={cy - 8}
                textAnchor="middle"
                fill={palette[3].hex}
                fontSize={16}
                fontWeight={800}
              >
                2024
              </text>
              <text
                x={cx}
                y={cy + 8}
                textAnchor="middle"
                fill={palette[4].hex}
                fontSize={10}
              >
                Milestones
              </text>
            </svg>
          </div>
        </motion.div>

        {/* Bottom Row: Quarterly Trend + Product Growth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Quarterly Revenue Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="rounded-xl p-4 border"
            style={{
              background: "linear-gradient(135deg, #1a0f08, #2d1b14)",
              borderColor: `${palette[0].hex}20`,
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: palette[0].hex }}>
              Quarterly Revenue
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={quarterlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke={`${palette[4].hex}30`} vertical={false} />
                <XAxis
                  dataKey="quarter"
                  stroke={`${palette[4].hex}80`}
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke={`${palette[4].hex}80`}
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1a0f08",
                    border: `1px solid ${palette[0].hex}40`,
                    borderRadius: 8,
                    color: palette[3].hex,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke={palette[0].hex}
                  strokeWidth={3}
                  dot={{ r: 5, fill: palette[2].hex, stroke: palette[0].hex, strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke={palette[2].hex}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3, fill: palette[2].hex }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Product Growth Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="rounded-xl p-4 border overflow-x-auto"
            style={{
              background: "linear-gradient(135deg, #1a0f08, #2d1b14)",
              borderColor: `${palette[2].hex}20`,
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: palette[2].hex }}>
              Product Growth
            </p>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b" style={{ borderColor: `${palette[4].hex}30` }}>
                  <th className="text-left py-2 font-semibold" style={{ color: palette[4].hex }}>
                    Product
                  </th>
                  <th className="text-right py-2 font-semibold" style={{ color: palette[4].hex }}>
                    Revenue
                  </th>
                  <th className="text-right py-2 font-semibold" style={{ color: palette[4].hex }}>
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody>
                {productData.map((p, i) => (
                  <motion.tr
                    key={p.product}
                    initial={{ opacity: 0, x: 10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
                    className="border-b"
                    style={{ borderColor: `${palette[4].hex}15` }}
                  >
                    <td className="py-2 font-medium" style={{ color: palette[3].hex }}>
                      {p.product}
                    </td>
                    <td className="text-right py-2" style={{ color: palette[0].hex }}>
                      ${(p.revenue / 1000).toFixed(0)}K
                    </td>
                    <td className="text-right py-2">
                      <span
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{
                          backgroundColor: `${p.growth > 15 ? palette[2].hex : palette[4].hex}20`,
                          color: p.growth > 15 ? palette[2].hex : palette[3].hex,
                        }}
                      >
                        +{p.growth}%
                      </span>
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
