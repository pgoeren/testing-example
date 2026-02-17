"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import DashboardShell, {
  PaletteColor,
  PowerBIStep,
} from "@/components/ui/DashboardShell";
import {
  monthlyData,
  regionData,
  kpiData,
  productData,
} from "@/data/datasets";

const palette: PaletteColor[] = [
  { hex: "#00ff87", label: "Neon Green" },
  { hex: "#60efff", label: "Neon Cyan" },
  { hex: "#ff00e5", label: "Neon Pink" },
  { hex: "#1a1a2e", label: "Deep Navy" },
  { hex: "#00b4d8", label: "Bright Teal" },
];

const powerBISteps: PowerBIStep[] = [
  {
    step: "Set dark canvas background",
    detail:
      'Go to Format > Canvas background and set color to #1a1a2e with 100% transparency. Under Theme, select a dark base theme.',
  },
  {
    step: "Create neon KPI cards",
    detail:
      'Use Card visuals with conditional formatting. Set font color to #00ff87 for positive values, #ff00e5 for negative. Add a thin border with neon color glow using shadow settings.',
  },
  {
    step: "Build gradient area chart",
    detail:
      'Insert an Area Chart visual. In Format > Data colors, set series to #00ff87. Enable gradient fill from #00ff87 (top) to transparent (bottom). Set line width to 3.',
  },
  {
    step: "Add particle animation effect",
    detail:
      'Use the "Animated Dots" or "HTML Content" custom visual from AppSource. Configure small dot elements with neon colors that float. Alternatively, use a static scatter plot with small dot sizes as a simulated particle field.',
  },
  {
    step: "Create neon bar chart",
    detail:
      'Use a Clustered Bar Chart. Set bar colors to #60efff and #00b4d8. Enable data labels in white. Set gridline color to #1a1a2e with 50% opacity for subtle lines.',
  },
  {
    step: "Apply glow effects via overlay",
    detail:
      'Layer a transparent Shape visual behind charts with a radial gradient fill (#00ff87 at 5% opacity) to simulate glow. Use multiple shapes for multi-color glow spots.',
  },
  {
    step: "Add data table with neon styling",
    detail:
      'Insert a Table visual. Set header background to #1a1a2e, text color to #60efff. Use conditional formatting with gradient rules: #00ff87 for high values, #ff00e5 for low values.',
  },
];

export default function ParticleFlow() {
  const [ref, inView] = useInView(0.1);

  const particles = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 4,
        color: [
          palette[0].hex,
          palette[1].hex,
          palette[2].hex,
          palette[4].hex,
        ][i % 4],
      })),
    []
  );

  const topKpis = [
    {
      label: "Total Revenue",
      value: "$885K",
      change: "+12.4%",
      positive: true,
    },
    {
      label: "Active Users",
      value: "45.6K",
      change: "+8.7%",
      positive: true,
    },
    {
      label: "Avg Order Value",
      value: "$284",
      change: "-2.1%",
      positive: false,
    },
    {
      label: "Satisfaction",
      value: "94.2%",
      change: "+1.8%",
      positive: true,
    },
  ];

  return (
    <DashboardShell
      title="Data Flow Dashboard"
      subtitle="Neon-themed particle visualization with real-time data streams"
      palette={palette}
      powerBISteps={powerBISteps}
    >
      <div ref={ref} className="space-y-4">
        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {topKpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative overflow-hidden rounded-xl p-4 border"
              style={{
                background: `linear-gradient(135deg, ${palette[3].hex}, ${palette[3].hex}ee)`,
                borderColor: `${palette[i % 4 === 3 ? 4 : i].hex}40`,
              }}
            >
              {/* Glow dot */}
              <div
                className="absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl opacity-20"
                style={{
                  backgroundColor:
                    palette[i % 4 === 3 ? 4 : i].hex,
                }}
              />
              <p className="text-[10px] uppercase tracking-widest text-[#a0a0b0] mb-1">
                {kpi.label}
              </p>
              <p
                className="text-2xl font-black"
                style={{
                  color: palette[i % 4 === 3 ? 4 : i].hex,
                }}
              >
                {kpi.value}
              </p>
              <p
                className="text-xs font-medium mt-1"
                style={{
                  color: kpi.positive ? "#00ff87" : "#ff00e5",
                }}
              >
                {kpi.change}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Hero: Particle Field with floating data */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative h-[320px] overflow-hidden rounded-xl"
          style={{ background: `linear-gradient(180deg, #0a0a1a, ${palette[3].hex})` }}
        >
          {/* Ambient glow spots */}
          <div
            className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full blur-3xl opacity-15"
            style={{ backgroundColor: palette[0].hex }}
          />
          <div
            className="absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: palette[2].hex }}
          />
          <div
            className="absolute top-1/2 right-1/4 w-36 h-36 rounded-full blur-3xl opacity-12"
            style={{ backgroundColor: palette[1].hex }}
          />

          {/* Particles */}
          {inView &&
            particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  boxShadow: `0 0 ${p.size * 2}px ${p.color}80`,
                }}
                animate={{
                  x: [
                    0,
                    (Math.random() - 0.5) * 200,
                    (Math.random() - 0.5) * 150,
                    0,
                  ],
                  y: [
                    0,
                    (Math.random() - 0.5) * 200,
                    (Math.random() - 0.5) * 150,
                    0,
                  ],
                  opacity: [0, 0.9, 0.6, 0],
                  scale: [0, 1.3, 0.7, 0],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

          {/* Floating data labels */}
          {inView &&
            [
              { text: "$885K Revenue", x: 10, y: 25 },
              { text: "45.6K Users", x: 55, y: 20 },
              { text: "+12.4% Growth", x: 30, y: 60 },
              { text: "94% CSAT", x: 65, y: 55 },
              { text: "72 NPS", x: 15, y: 75 },
            ].map((label, i) => (
              <motion.div
                key={label.text}
                className="absolute rounded-lg px-3 py-2 text-xs font-semibold backdrop-blur-md border"
                style={{
                  left: `${label.x}%`,
                  top: `${label.y}%`,
                  background: "rgba(26,26,46,0.6)",
                  borderColor: `${palette[i % palette.length].hex}30`,
                  color: palette[i % palette.length].hex,
                  boxShadow: `0 0 20px ${palette[i % palette.length].hex}15`,
                }}
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 3 + i * 0.5,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {label.text}
              </motion.div>
            ))}

          {/* Connection lines between labels */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {inView && (
              <>
                <motion.line
                  x1="18%" y1="30%" x2="38%" y2="65%"
                  stroke={`${palette[0].hex}25`}
                  strokeWidth={1}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                />
                <motion.line
                  x1="63%" y1="25%" x2="73%" y2="60%"
                  stroke={`${palette[1].hex}25`}
                  strokeWidth={1}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1.3 }}
                />
                <motion.line
                  x1="38%" y1="65%" x2="73%" y2="60%"
                  stroke={`${palette[2].hex}20`}
                  strokeWidth={1}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1.6 }}
                />
              </>
            )}
          </svg>
        </motion.div>

        {/* Bottom row: Area Chart + Product Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Revenue Trend Area Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-xl p-4 border"
            style={{
              background: `linear-gradient(135deg, ${palette[3].hex}, #0a0a1a)`,
              borderColor: `${palette[0].hex}20`,
            }}
          >
            <p
              className="text-xs font-semibold mb-3 uppercase tracking-wider"
              style={{ color: palette[1].hex }}
            >
              Revenue Trend
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="neonAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={palette[0].hex} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={palette[0].hex} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  stroke="#4a4a6a"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#4a4a6a"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(10,10,26,0.95)",
                    border: `1px solid ${palette[0].hex}40`,
                    borderRadius: 8,
                    color: palette[0].hex,
                  }}
                  formatter={(value: number) => [
                    `$${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={palette[0].hex}
                  fill="url(#neonAreaGrad)"
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Product Performance Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="rounded-xl p-4 border"
            style={{
              background: `linear-gradient(135deg, ${palette[3].hex}, #0a0a1a)`,
              borderColor: `${palette[1].hex}20`,
            }}
          >
            <p
              className="text-xs font-semibold mb-3 uppercase tracking-wider"
              style={{ color: palette[2].hex }}
            >
              Product Revenue
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={productData.slice(0, 5)}
                layout="vertical"
              >
                <XAxis
                  type="number"
                  stroke="#4a4a6a"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <YAxis
                  type="category"
                  dataKey="product"
                  stroke="#4a4a6a"
                  fontSize={9}
                  tickLine={false}
                  axisLine={false}
                  width={85}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(10,10,26,0.95)",
                    border: `1px solid ${palette[1].hex}40`,
                    borderRadius: 8,
                    color: palette[1].hex,
                  }}
                  formatter={(value: number) => [
                    `$${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Bar
                  dataKey="revenue"
                  fill={palette[1].hex}
                  radius={[0, 4, 4, 0]}
                  barSize={14}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Region Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="rounded-xl p-4 border overflow-x-auto"
          style={{
            background: `linear-gradient(135deg, ${palette[3].hex}, #0a0a1a)`,
            borderColor: `${palette[4].hex}20`,
          }}
        >
          <p
            className="text-xs font-semibold mb-3 uppercase tracking-wider"
            style={{ color: palette[4].hex }}
          >
            Regional Performance
          </p>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: palette[1].hex }} className="border-b border-white/5">
                <th className="text-left py-2 font-semibold">Region</th>
                <th className="text-right py-2 font-semibold">Revenue</th>
                <th className="text-right py-2 font-semibold">Profit</th>
                <th className="text-right py-2 font-semibold">Customers</th>
                <th className="text-right py-2 font-semibold">Margin</th>
              </tr>
            </thead>
            <tbody>
              {regionData.map((r, i) => (
                <motion.tr
                  key={r.region}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
                  className="border-b border-white/5"
                  style={{ color: "#c0c0d0" }}
                >
                  <td className="py-2 font-medium">{r.region}</td>
                  <td className="text-right py-2" style={{ color: palette[0].hex }}>
                    ${(r.revenue / 1000).toFixed(0)}K
                  </td>
                  <td className="text-right py-2" style={{ color: palette[1].hex }}>
                    ${(r.profit / 1000).toFixed(0)}K
                  </td>
                  <td className="text-right py-2">
                    {r.customers.toLocaleString()}
                  </td>
                  <td className="text-right py-2" style={{ color: palette[2].hex }}>
                    {((r.profit / r.revenue) * 100).toFixed(1)}%
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </DashboardShell>
  );
}
