"use client";

import { motion } from "framer-motion";
import {
  monthlyData,
  quarterlyData,
  regionData,
  kpiData,
  productData,
} from "@/data/datasets";
import DashboardShell, {
  PaletteColor,
  PowerBIStep,
} from "@/components/ui/DashboardShell";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";
import { useInView } from "@/hooks/useInView";

const palette: PaletteColor[] = [
  { hex: "#1e3a5f", label: "Deep Navy" },
  { hex: "#2563eb", label: "Royal Blue" },
  { hex: "#dbeafe", label: "Ice Blue" },
  { hex: "#f8fafc", label: "Snow White" },
  { hex: "#1e40af", label: "Board Blue" },
];

const powerBISteps: PowerBIStep[] = [
  {
    step: "Create a new report page",
    detail:
      'Set the canvas background to a dark navy (#1e3a5f) and name the page "Boardroom Executive Summary".',
  },
  {
    step: "Add KPI card visuals",
    detail:
      "Insert 5 Card visuals across the top row. Bind each to the relevant measure (Revenue, Profit, Margin, Headcount, Growth). Format with white text on navy background.",
  },
  {
    step: "Build the quarterly bar chart",
    detail:
      'Add a Clustered Bar Chart with Quarter on the axis, Revenue and Profit as values. Set Revenue bars to #2563eb and Profit bars to #dbeafe. Enable data labels.',
  },
  {
    step: "Add a monthly revenue trend line",
    detail:
      "Insert a Line Chart with Month on the axis and Revenue as the value. Use #2563eb stroke with a #dbeafe area fill underneath. Disable gridlines for a clean look.",
  },
  {
    step: "Create the regional performance table",
    detail:
      "Add a Table or Matrix visual with Region, Revenue, Profit, and Customers columns. Apply conditional formatting with a blue gradient (#dbeafe to #1e40af) on the Revenue column.",
  },
  {
    step: "Apply consistent theme",
    detail:
      'Go to View > Themes > Customize and set Primary (#2563eb), Secondary (#1e40af), Background (#1e3a5f), Foreground (#f8fafc). Save as "Boardroom" theme.',
  },
  {
    step: "Add a title and slicer",
    detail:
      'Insert a Text Box with "Boardroom Executive Summary" styled in 20pt white bold. Add a Date Slicer for quarter-level filtering across all visuals.',
  },
];

const totalRevenue = quarterlyData.reduce((s, q) => s + q.revenue, 0);
const totalProfit = quarterlyData.reduce((s, q) => s + q.profit, 0);
const margin = ((totalProfit / totalRevenue) * 100).toFixed(1);
const lastHeadcount = quarterlyData[quarterlyData.length - 1].headcount;
const revenueGrowth = (
  ((quarterlyData[3].revenue - quarterlyData[0].revenue) /
    quarterlyData[0].revenue) *
  100
).toFixed(1);

export default function Boardroom() {
  const [ref, inView] = useInView(0.1);

  const kpis = [
    {
      label: "Annual Revenue",
      value: `$${(totalRevenue / 1000).toFixed(0)}K`,
      sub: "+18.2% YoY",
      trend: "up" as const,
    },
    {
      label: "Net Profit",
      value: `$${(totalProfit / 1000).toFixed(0)}K`,
      sub: `${margin}% margin`,
      trend: "up" as const,
    },
    {
      label: "Profit Margin",
      value: `${margin}%`,
      sub: "+2.4pp vs prior",
      trend: "up" as const,
    },
    {
      label: "Headcount",
      value: lastHeadcount.toString(),
      sub: "+22 this year",
      trend: "up" as const,
    },
    {
      label: "Rev. Growth",
      value: `${revenueGrowth}%`,
      sub: "Quarter-over-quarter",
      trend: "up" as const,
    },
  ];

  return (
    <DashboardShell
      title="Boardroom Executive Summary"
      subtitle="Quarterly business performance for board review"
      palette={palette}
      powerBISteps={powerBISteps}
    >
      <div ref={ref} className="space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-5 gap-3">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-xl p-4"
              style={{ backgroundColor: "#1e3a5f", border: "1px solid #2563eb30" }}
            >
              <p
                className="text-[10px] uppercase tracking-widest font-semibold mb-1"
                style={{ color: "#dbeafe" }}
              >
                {kpi.label}
              </p>
              <p className="text-2xl font-bold" style={{ color: "#f8fafc" }}>
                {kpi.value}
              </p>
              <p className="text-xs mt-1" style={{ color: "#2563eb" }}>
                {kpi.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Main Chart: Quarterly Revenue & Profit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-xl p-5"
          style={{ backgroundColor: "#1e3a5f20", border: "1px solid #2563eb20" }}
        >
          <h4
            className="text-sm font-semibold mb-4"
            style={{ color: "#f8fafc" }}
          >
            Quarterly Revenue vs. Profit
          </h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={quarterlyData} barGap={4}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e3a5f"
                vertical={false}
              />
              <XAxis
                dataKey="quarter"
                stroke="#dbeafe"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#dbeafe"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "#1e3a5f",
                  border: "1px solid #2563eb",
                  borderRadius: 8,
                  color: "#f8fafc",
                }}
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "",
                ]}
              />
              <Legend wrapperStyle={{ fontSize: 11, color: "#dbeafe" }} />
              <Bar
                dataKey="revenue"
                fill="#2563eb"
                radius={[4, 4, 0, 0]}
                name="Revenue"
                animationDuration={1000}
              />
              <Bar
                dataKey="profit"
                fill="#dbeafe"
                radius={[4, 4, 0, 0]}
                name="Profit"
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Secondary Section: Monthly Trend + Regional Table */}
        <div className="grid grid-cols-2 gap-4">
          {/* Monthly Revenue Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-xl p-5"
            style={{
              backgroundColor: "#1e3a5f20",
              border: "1px solid #2563eb20",
            }}
          >
            <h4
              className="text-sm font-semibold mb-3"
              style={{ color: "#f8fafc" }}
            >
              Monthly Revenue Trend
            </h4>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e3a5f"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="#dbeafe"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#dbeafe"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1e3a5f",
                    border: "1px solid #2563eb",
                    borderRadius: 8,
                    color: "#f8fafc",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#2563eb" }}
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#1e40af"
                  strokeWidth={1.5}
                  strokeDasharray="6 3"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Regional Performance Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-xl p-5"
            style={{
              backgroundColor: "#1e3a5f20",
              border: "1px solid #2563eb20",
            }}
          >
            <h4
              className="text-sm font-semibold mb-3"
              style={{ color: "#f8fafc" }}
            >
              Regional Performance
            </h4>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ color: "#dbeafe" }}>
                  <th className="text-left pb-2 font-medium">Region</th>
                  <th className="text-right pb-2 font-medium">Revenue</th>
                  <th className="text-right pb-2 font-medium">Profit</th>
                  <th className="text-right pb-2 font-medium">Customers</th>
                </tr>
              </thead>
              <tbody>
                {regionData.map((r, i) => (
                  <motion.tr
                    key={r.region}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    className="border-t"
                    style={{ borderColor: "#2563eb20" }}
                  >
                    <td className="py-2" style={{ color: "#f8fafc" }}>
                      {r.region}
                    </td>
                    <td
                      className="py-2 text-right font-medium"
                      style={{ color: "#2563eb" }}
                    >
                      ${(r.revenue / 1000).toFixed(0)}K
                    </td>
                    <td
                      className="py-2 text-right"
                      style={{ color: "#dbeafe" }}
                    >
                      ${(r.profit / 1000).toFixed(0)}K
                    </td>
                    <td
                      className="py-2 text-right"
                      style={{ color: "#dbeafe" }}
                    >
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
