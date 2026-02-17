"use client";

import { motion } from "framer-motion";
import {
  monthlyData,
  segmentData,
  kpiData,
  quarterlyData,
  funnelData,
} from "@/data/datasets";
import DashboardShell, {
  PaletteColor,
  PowerBIStep,
} from "@/components/ui/DashboardShell";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useInView } from "@/hooks/useInView";

const palette: PaletteColor[] = [
  { hex: "#18181b", label: "Ink Black" },
  { hex: "#3f3f46", label: "Charcoal" },
  { hex: "#71717a", label: "Mid Gray" },
  { hex: "#f4f4f5", label: "Near White" },
  { hex: "#a1a1aa", label: "Silver" },
];

const powerBISteps: PowerBIStep[] = [
  {
    step: "Set up a minimal theme",
    detail:
      'Create a custom theme JSON with background #18181b, foreground #f4f4f5, and accent #a1a1aa. Import under View > Themes. Name it "Investor Minimal".',
  },
  {
    step: "Design the KPI header row",
    detail:
      "Insert 5 Card visuals in a single row. Bind to ARR, Total Customers, Net Revenue Retention, Burn Multiple, and Rule of 40. Use #f4f4f5 for values, #71717a for labels.",
  },
  {
    step: "Create the ARR growth area chart",
    detail:
      "Add an Area Chart with Month on X-axis and Revenue on Y-axis. Set fill to a gray gradient (#3f3f46 to transparent), line stroke to #a1a1aa. Remove gridlines.",
  },
  {
    step: "Build the segment breakdown table",
    detail:
      "Insert a Table visual with Segment, Revenue, Customers, Avg Order, and Retention columns. Format headers in #71717a, data rows in #f4f4f5, alternating row background #3f3f4620.",
  },
  {
    step: "Add the funnel conversion strip",
    detail:
      "Use a horizontal Bar Chart showing funnel stages with values. Apply a sequential gray palette from #a1a1aa (top) to #3f3f46 (bottom).",
  },
  {
    step: "Apply typographic hierarchy",
    detail:
      "Use a clean sans-serif font (Segoe UI or Inter). Title 18pt bold #f4f4f5, subtitles 11pt #71717a, KPI values 28pt light #f4f4f5.",
  },
  {
    step: "Export investor-ready PDF",
    detail:
      'Set page size to 16:9 landscape. Enable "Optimize for Presentation" under Format. Export as PDF with high-quality rendering.',
  },
];

const arr = monthlyData.reduce((s, d) => s + d.revenue, 0);
const totalCustomers = segmentData.reduce((s, d) => s + d.customers, 0);
const avgRetention =
  segmentData.reduce((s, d) => s + d.retention, 0) / segmentData.length;

export default function InvestorSnapshot() {
  const [ref, inView] = useInView(0.1);

  const kpis = [
    { label: "ARR", value: `$${(arr / 1000).toFixed(0)}K`, change: "+24.1%" },
    {
      label: "Total Customers",
      value: totalCustomers.toLocaleString(),
      change: "+18.7%",
    },
    { label: "Net Rev. Retention", value: "118%", change: "+3.2pp" },
    { label: "Burn Multiple", value: "1.2x", change: "Improving" },
    {
      label: "Rule of 40",
      value: "52",
      change: "Above threshold",
    },
  ];

  return (
    <DashboardShell
      title="Investor Metrics Snapshot"
      subtitle="Board-ready financial and operational metrics for investor review"
      palette={palette}
      powerBISteps={powerBISteps}
    >
      <div ref={ref} className="space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-5 gap-4">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="py-3"
              style={{ borderBottom: "1px solid #3f3f46" }}
            >
              <p
                className="text-[10px] uppercase tracking-wider font-medium"
                style={{ color: "#71717a" }}
              >
                {kpi.label}
              </p>
              <p
                className="text-2xl font-light mt-1"
                style={{ color: "#f4f4f5" }}
              >
                {kpi.value}
              </p>
              <p className="text-xs mt-1" style={{ color: "#a1a1aa" }}>
                {kpi.change}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Main Chart: ARR Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-lg p-5"
          style={{ backgroundColor: "#18181b", border: "1px solid #3f3f46" }}
        >
          <h4 className="text-sm font-semibold mb-4" style={{ color: "#f4f4f5" }}>
            Monthly Revenue Trajectory
          </h4>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="investorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a1a1aa" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#a1a1aa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#3f3f46"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke="#71717a"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#71717a"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "#18181b",
                  border: "1px solid #3f3f46",
                  borderRadius: 6,
                  color: "#f4f4f5",
                }}
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "",
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#a1a1aa"
                strokeWidth={2}
                fill="url(#investorGrad)"
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#71717a"
                strokeWidth={1}
                strokeDasharray="4 4"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2 text-xs" style={{ color: "#71717a" }}>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 rounded" style={{ backgroundColor: "#a1a1aa" }} />
              Revenue
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 rounded border-dashed" style={{ backgroundColor: "#71717a" }} />
              Profit
            </div>
          </div>
        </motion.div>

        {/* Bottom Section: Segment Table + Funnel */}
        <div className="grid grid-cols-2 gap-4">
          {/* Segment Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-lg p-5"
            style={{ backgroundColor: "#18181b", border: "1px solid #3f3f46" }}
          >
            <h4
              className="text-sm font-semibold mb-3"
              style={{ color: "#f4f4f5" }}
            >
              Revenue by Segment
            </h4>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ color: "#71717a" }}>
                  <th className="text-left pb-2 font-medium">Segment</th>
                  <th className="text-right pb-2 font-medium">Revenue</th>
                  <th className="text-right pb-2 font-medium">Customers</th>
                  <th className="text-right pb-2 font-medium">Retention</th>
                </tr>
              </thead>
              <tbody>
                {segmentData.map((s, i) => (
                  <motion.tr
                    key={s.segment}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    className="border-t"
                    style={{ borderColor: "#3f3f4640" }}
                  >
                    <td className="py-2" style={{ color: "#f4f4f5" }}>
                      {s.segment}
                    </td>
                    <td
                      className="py-2 text-right font-medium"
                      style={{ color: "#a1a1aa" }}
                    >
                      ${(s.revenue / 1000).toFixed(0)}K
                    </td>
                    <td className="py-2 text-right" style={{ color: "#71717a" }}>
                      {s.customers.toLocaleString()}
                    </td>
                    <td className="py-2 text-right" style={{ color: "#a1a1aa" }}>
                      {s.retention}%
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Conversion Funnel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-lg p-5"
            style={{ backgroundColor: "#18181b", border: "1px solid #3f3f46" }}
          >
            <h4
              className="text-sm font-semibold mb-3"
              style={{ color: "#f4f4f5" }}
            >
              Conversion Funnel
            </h4>
            <div className="space-y-2">
              {funnelData.map((stage, i) => {
                const widthPct = (stage.value / funnelData[0].value) * 100;
                return (
                  <motion.div
                    key={stage.stage}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={
                      inView
                        ? { opacity: 1, scaleX: 1 }
                        : { opacity: 0, scaleX: 0 }
                    }
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                    style={{ transformOrigin: "left" }}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[11px]" style={{ color: "#a1a1aa" }}>
                        {stage.stage}
                      </span>
                      <span
                        className="text-[11px] font-medium"
                        style={{ color: "#f4f4f5" }}
                      >
                        {stage.value.toLocaleString()}
                      </span>
                    </div>
                    <div
                      className="h-3 rounded-sm overflow-hidden"
                      style={{ backgroundColor: "#3f3f4640" }}
                    >
                      <div
                        className="h-full rounded-sm"
                        style={{
                          width: `${widthPct}%`,
                          backgroundColor: `rgba(161,161,170,${0.3 + (1 - i / funnelData.length) * 0.5})`,
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardShell>
  );
}
