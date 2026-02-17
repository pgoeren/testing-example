"use client";

import { motion } from "framer-motion";
import {
  monthlyData,
  segmentData,
  funnelData,
  kpiData,
  productData,
} from "@/data/datasets";
import DashboardShell, {
  PaletteColor,
  PowerBIStep,
} from "@/components/ui/DashboardShell";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import { useInView } from "@/hooks/useInView";

const palette: PaletteColor[] = [
  { hex: "#7c3aed", label: "Vivid Purple" },
  { hex: "#5b21b6", label: "Deep Violet" },
  { hex: "#a78bfa", label: "Lavender" },
  { hex: "#ede9fe", label: "Pale Lilac" },
  { hex: "#2e1065", label: "Midnight Purple" },
];

const powerBISteps: PowerBIStep[] = [
  {
    step: "Create SaaS theme",
    detail:
      'Build a custom theme JSON with primary #7c3aed, secondary #5b21b6, background #2e1065, and foreground #ede9fe. Save as "SaaS Purple".',
  },
  {
    step: "Build the KPI card row",
    detail:
      "Insert 5 Multi-row Card visuals for MRR, Conversion Rate, Churn, LTV:CAC, and NPS. Use #ede9fe for values and #a78bfa for labels on a #2e1065 background.",
  },
  {
    step: "Create MRR growth area chart",
    detail:
      "Add an Area Chart with Month on X-axis and Revenue on Y-axis. Set line stroke to #7c3aed, fill gradient from #7c3aed (20% opacity) to transparent. Add a forecast dashed line in #a78bfa.",
  },
  {
    step: "Add the product revenue bar chart",
    detail:
      "Insert a Clustered Bar Chart with Product on Y-axis and Revenue on X-axis (horizontal layout). Use a purple gradient palette from #7c3aed to #5b21b6.",
  },
  {
    step: "Build the conversion funnel",
    detail:
      "Use a Funnel Chart visual or stacked horizontal bars to show Website Visits through Retained stages. Apply sequential purple shading from #a78bfa to #2e1065.",
  },
  {
    step: "Add segment breakdown cards",
    detail:
      "Create small Card visuals or a Table showing each segment with customer count and retention rate. Use conditional formatting with purple intensity based on retention.",
  },
  {
    step: "Format and align",
    detail:
      "Ensure all visuals are aligned to a grid. Set consistent padding of 8px. Enable cross-filtering between the area chart and bar chart for interactive drill-down.",
  },
];

const mrr = monthlyData[monthlyData.length - 1].revenue;
const convRate = ((funnelData[4].value / funnelData[0].value) * 100).toFixed(1);
const totalCustomers = segmentData.reduce((s, d) => s + d.customers, 0);

export default function SaasDashboard() {
  const [ref, inView] = useInView(0.1);

  const kpis = [
    { label: "MRR", value: `$${(mrr / 1000).toFixed(0)}K`, change: "+5.9%" },
    { label: "Conv. Rate", value: `${convRate}%`, change: "+0.3pp" },
    { label: "Churn Rate", value: "3.2%", change: "-0.5pp" },
    { label: "LTV:CAC", value: "4.8x", change: "+0.3x" },
    { label: "NPS", value: "72", change: "+5pts" },
  ];

  const productRevSorted = [...productData].sort(
    (a, b) => b.revenue - a.revenue
  );

  return (
    <DashboardShell
      title="SaaS Metrics Dashboard"
      subtitle="Core SaaS performance indicators and growth metrics"
      palette={palette}
      powerBISteps={powerBISteps}
    >
      <div ref={ref} className="space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-5 gap-3">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              className="rounded-xl p-4 text-center"
              style={{
                backgroundColor: "#2e1065",
                border: "1px solid #5b21b630",
              }}
            >
              <div
                className="w-2 h-2 rounded-full mx-auto mb-2"
                style={{ backgroundColor: "#7c3aed" }}
              />
              <p className="text-xl font-bold" style={{ color: "#ede9fe" }}>
                {kpi.value}
              </p>
              <p
                className="text-[10px] uppercase tracking-wider mt-1"
                style={{ color: "#a78bfa" }}
              >
                {kpi.label}
              </p>
              <p className="text-xs mt-1" style={{ color: "#7c3aed" }}>
                {kpi.change}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Main Chart: MRR Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-xl p-5"
          style={{
            backgroundColor: "#2e106530",
            border: "1px solid #5b21b620",
          }}
        >
          <h4
            className="text-sm font-semibold mb-4"
            style={{ color: "#ede9fe" }}
          >
            Monthly Recurring Revenue Growth
          </h4>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="saasGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#5b21b620"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke="#a78bfa"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#a78bfa"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "#2e1065",
                  border: "1px solid #7c3aed",
                  borderRadius: 8,
                  color: "#ede9fe",
                }}
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "",
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#7c3aed"
                strokeWidth={2.5}
                fill="url(#saasGrad)"
              />
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="#a78bfa"
                strokeWidth={1.5}
                strokeDasharray="6 3"
                fill="none"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div
            className="flex items-center gap-4 mt-2 text-xs"
            style={{ color: "#a78bfa" }}
          >
            <div className="flex items-center gap-1.5">
              <div
                className="w-3 h-0.5 rounded"
                style={{ backgroundColor: "#7c3aed" }}
              />
              Actual MRR
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="w-3 h-0.5 rounded"
                style={{
                  backgroundColor: "#a78bfa",
                  borderStyle: "dashed",
                }}
              />
              Forecast
            </div>
          </div>
        </motion.div>

        {/* Secondary: Product Revenue + Segment Table */}
        <div className="grid grid-cols-2 gap-4">
          {/* Product Revenue */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-xl p-5"
            style={{
              backgroundColor: "#2e106530",
              border: "1px solid #5b21b620",
            }}
          >
            <h4
              className="text-sm font-semibold mb-3"
              style={{ color: "#ede9fe" }}
            >
              Revenue by Product
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={productRevSorted.slice(0, 6)}
                layout="vertical"
                barSize={16}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#5b21b615"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  stroke="#a78bfa"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <YAxis
                  type="category"
                  dataKey="product"
                  stroke="#a78bfa"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    background: "#2e1065",
                    border: "1px solid #7c3aed",
                    borderRadius: 8,
                    color: "#ede9fe",
                  }}
                  formatter={(value: number) => [
                    `$${value.toLocaleString()}`,
                    "",
                  ]}
                />
                <Bar dataKey="revenue" radius={[0, 6, 6, 0]} animationDuration={800}>
                  {productRevSorted.slice(0, 6).map((_, i) => (
                    <Cell
                      key={i}
                      fill={i === 0 ? "#7c3aed" : i === 1 ? "#5b21b6" : "#a78bfa"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Segment + Funnel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-xl p-5"
            style={{
              backgroundColor: "#2e106530",
              border: "1px solid #5b21b620",
            }}
          >
            <h4
              className="text-sm font-semibold mb-3"
              style={{ color: "#ede9fe" }}
            >
              Customer Segments
            </h4>
            <div className="space-y-3">
              {segmentData.map((seg, i) => (
                <motion.div
                  key={seg.segment}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.06 }}
                  className="flex items-center justify-between rounded-lg px-3 py-2"
                  style={{ backgroundColor: "#2e1065", border: "1px solid #5b21b620" }}
                >
                  <div>
                    <p className="text-xs font-medium" style={{ color: "#ede9fe" }}>
                      {seg.segment}
                    </p>
                    <p className="text-[10px]" style={{ color: "#a78bfa" }}>
                      {seg.customers.toLocaleString()} customers
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold" style={{ color: "#7c3aed" }}>
                      ${(seg.revenue / 1000).toFixed(0)}K
                    </p>
                    <p className="text-[10px]" style={{ color: "#a78bfa" }}>
                      {seg.retention}% retention
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardShell>
  );
}
