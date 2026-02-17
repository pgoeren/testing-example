"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  LineChart,
  Line,
} from "recharts";
import DashboardShell, { PaletteColor, PowerBIStep } from "@/components/ui/DashboardShell";
import { monthlyData, quarterlyData } from "@/data/datasets";
import { useState } from "react";

const palette: PaletteColor[] = [
  { hex: "#0ea5e9", label: "Sky Blue" },
  { hex: "#0284c7", label: "Ocean" },
  { hex: "#0369a1", label: "Deep Blue" },
  { hex: "#7dd3fc", label: "Light Sky" },
  { hex: "#bae6fd", label: "Ice Blue" },
];

const powerBISteps: PowerBIStep[] = [
  { step: "Import monthly data", detail: "Load your revenue dataset into Power BI Desktop via Get Data > Excel/CSV and map month, revenue, cost, and profit columns." },
  { step: "Create KPI cards", detail: "Add four Card visuals to the top row. Bind each to a DAX measure: Total Revenue = SUM(revenue), Total Profit = SUM(profit), Avg Monthly = AVERAGE(revenue), Growth = DIVIDE(last-first, first)." },
  { step: "Build clustered bar chart", detail: "Insert a Clustered Bar Chart. Place 'month' on Axis, 'revenue' on Values. Apply a gradient via conditional formatting > Background color > Gradient with Ocean Blue palette." },
  { step: "Add revenue trend line", detail: "Insert a Line Chart below the bar. Use 'month' on Axis, 'revenue' and 'forecast' on Values. Format forecast as dashed line." },
  { step: "Create quarterly summary table", detail: "Add a Table visual with quarterly data showing Quarter, Revenue, Cost, Profit columns. Apply alternating row colors using the Ice Blue shade." },
  { step: "Apply theme colors", detail: "Go to View > Themes > Customize. Set primary to #0ea5e9, secondary to #0284c7. Apply #0369a1 for data bar fills and #bae6fd for background accents." },
  { step: "Add interactivity", detail: "Enable cross-filtering between the bar chart and line chart. Add a month slicer at the top for filtering." },
];

const totalRevenue = monthlyData.reduce((s, d) => s + d.revenue, 0);
const totalProfit = monthlyData.reduce((s, d) => s + d.profit, 0);
const avgMonthly = totalRevenue / monthlyData.length;
const yoyGrowth = ((monthlyData[monthlyData.length - 1].revenue - monthlyData[0].revenue) / monthlyData[0].revenue) * 100;

const kpis = [
  { label: "Total Revenue", value: `$${(totalRevenue / 1000).toFixed(0)}K`, change: "+12.4%", positive: true },
  { label: "Total Profit", value: `$${(totalProfit / 1000).toFixed(0)}K`, change: "+15.2%", positive: true },
  { label: "Avg Monthly", value: `$${(avgMonthly / 1000).toFixed(1)}K`, change: "+8.7%", positive: true },
  { label: "YoY Growth", value: `${yoyGrowth.toFixed(1)}%`, change: "+3.1pp", positive: true },
];

export default function GradientBar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <DashboardShell title="Revenue Analytics Dashboard" subtitle="Monthly revenue performance with trend analysis" palette={palette} powerBISteps={powerBISteps}>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-xl p-4 border border-[--color-border]"
            style={{ background: `linear-gradient(135deg, ${palette[3].hex}10, ${palette[0].hex}15)` }}
          >
            <p className="text-xs text-[--color-muted] uppercase tracking-wider">{kpi.label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: palette[0].hex }}>{kpi.value}</p>
            <span className={`text-xs font-medium ${kpi.positive ? "text-emerald-400" : "text-red-400"}`}>
              {kpi.change} <span className="text-[--color-muted]">vs last year</span>
            </span>
          </motion.div>
        ))}
      </div>

      {/* Main Bar Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="mb-6">
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Monthly Revenue Breakdown</h4>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={monthlyData}
            onMouseMove={(state) => {
              if (state?.activeTooltipIndex !== undefined) setActiveIndex(state.activeTooltipIndex);
            }}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <defs>
              <linearGradient id="oceanBarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={palette[0].hex} stopOpacity={0.95} />
                <stop offset="100%" stopColor={palette[2].hex} stopOpacity={0.5} />
              </linearGradient>
              <linearGradient id="oceanBarHover" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={palette[3].hex} stopOpacity={1} />
                <stop offset="100%" stopColor={palette[0].hex} stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip
              contentStyle={{ background: "rgba(18,18,26,0.95)", border: `1px solid ${palette[0].hex}40`, borderRadius: 8, color: "#e8e8ed" }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
            />
            <Bar dataKey="revenue" radius={[6, 6, 0, 0]} animationDuration={1200}>
              {monthlyData.map((_, i) => (
                <Cell key={i} fill={activeIndex === i ? "url(#oceanBarHover)" : "url(#oceanBarGrad)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Secondary: Trend Line Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="mb-6">
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Revenue vs Forecast Trend</h4>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip
              contentStyle={{ background: "rgba(18,18,26,0.95)", border: `1px solid ${palette[0].hex}40`, borderRadius: 8, color: "#e8e8ed" }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
            <Line type="monotone" dataKey="revenue" stroke={palette[0].hex} strokeWidth={2.5} dot={{ r: 3, fill: palette[0].hex }} name="Actual" />
            <Line type="monotone" dataKey="forecast" stroke={palette[3].hex} strokeWidth={2} strokeDasharray="6 4" dot={false} name="Forecast" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Quarterly Summary Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}>
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Quarterly Summary</h4>
        <div className="overflow-x-auto rounded-lg border border-[--color-border]">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: `${palette[2].hex}30` }}>
                <th className="text-left py-2.5 px-4 text-[--color-muted] font-semibold">Quarter</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Revenue</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Cost</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Profit</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Margin</th>
              </tr>
            </thead>
            <tbody>
              {quarterlyData.map((q, i) => (
                <tr key={q.quarter} className="border-t border-[--color-border]" style={{ backgroundColor: i % 2 === 0 ? `${palette[4].hex}08` : "transparent" }}>
                  <td className="py-2.5 px-4 text-[--color-foreground] font-medium">{q.quarter}</td>
                  <td className="py-2.5 px-4 text-right text-[--color-foreground]">${(q.revenue / 1000).toFixed(0)}K</td>
                  <td className="py-2.5 px-4 text-right text-[--color-muted]">${(q.cost / 1000).toFixed(0)}K</td>
                  <td className="py-2.5 px-4 text-right font-medium" style={{ color: palette[0].hex }}>${(q.profit / 1000).toFixed(0)}K</td>
                  <td className="py-2.5 px-4 text-right text-[--color-foreground]">{((q.profit / q.revenue) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardShell>
  );
}
