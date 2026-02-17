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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import DashboardShell, { PaletteColor, PowerBIStep } from "@/components/ui/DashboardShell";
import { segmentData, monthlyData } from "@/data/datasets";

const palette: PaletteColor[] = [
  { hex: "#d946ef", label: "Fuchsia" },
  { hex: "#c026d3", label: "Dark Fuchsia" },
  { hex: "#a21caf", label: "Deep Fuchsia" },
  { hex: "#f0abfc", label: "Light Fuchsia" },
  { hex: "#f5d0fe", label: "Pale Fuchsia" },
];

const powerBISteps: PowerBIStep[] = [
  { step: "Import segment data", detail: "Load segment dataset with segment name, revenue, customers, avg order, and retention fields. Create DAX for segment share: SegShare = DIVIDE([revenue], CALCULATE(SUM([revenue]), ALL(segment)))." },
  { step: "Create segment KPI cards", detail: "Add Card visuals for Total Segments Revenue, Top Segment, Avg Retention, and Avg Order Value. Use DAX measures with Fuchsia #d946ef text formatting." },
  { step: "Build stacked bar chart", detail: "Insert a Stacked Bar Chart. Place 'month' on Axis, with 'cost' and 'profit' stacked on Values. Apply #a21caf for cost and #f0abfc for profit. Set bar radius." },
  { step: "Add segment mix donut", detail: "Insert a Donut Chart showing revenue by segment. Apply the Fuchsia palette colors for each slice. Add data labels with percentage." },
  { step: "Create retention comparison", detail: "Add a horizontal Bar Chart showing retention by segment. Use conditional formatting with gradient from #a21caf (low) to #d946ef (high)." },
  { step: "Build segment detail table", detail: "Insert a Table visual with segment, revenue, customers, avg order, retention, and revenue share columns. Apply data bars in Fuchsia." },
  { step: "Apply Fuchsia theme", detail: "Customize theme: primary #d946ef, secondary #c026d3. Set background dark, enable cross-filtering between stacked bar and donut. Add segment slicer." },
];

const totalRevenue = segmentData.reduce((s, d) => s + d.revenue, 0);
const topSegment = segmentData.reduce((top, d) => (d.revenue > top.revenue ? d : top), segmentData[0]);
const avgRetention = segmentData.reduce((s, d) => s + d.retention, 0) / segmentData.length;
const avgOrder = segmentData.reduce((s, d) => s + d.avgOrder, 0) / segmentData.length;

const kpis = [
  { label: "Segment Revenue", value: `$${(totalRevenue / 1000).toFixed(0)}K`, sub: `${segmentData.length} segments` },
  { label: "Top Segment", value: topSegment.segment, sub: `$${(topSegment.revenue / 1000).toFixed(0)}K` },
  { label: "Avg Retention", value: `${avgRetention.toFixed(1)}%`, sub: "All segments" },
  { label: "Avg Order Value", value: `$${avgOrder.toFixed(0)}`, sub: "Weighted mean" },
];

const SEGMENT_PIE_COLORS = [palette[0].hex, palette[1].hex, palette[2].hex, palette[3].hex, palette[4].hex];

const sortedRetention = [...segmentData].sort((a, b) => b.retention - a.retention);

export default function StackedBar() {
  return (
    <DashboardShell title="Segment Analysis Dashboard" subtitle="Customer segment breakdown with retention and revenue mix" palette={palette} powerBISteps={powerBISteps}>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-xl p-4 border border-[--color-border]"
            style={{ background: `linear-gradient(135deg, ${palette[3].hex}10, ${palette[0].hex}12)` }}
          >
            <p className="text-xs text-[--color-muted] uppercase tracking-wider">{kpi.label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: palette[0].hex }}>{kpi.value}</p>
            <span className="text-xs text-[--color-muted]">{kpi.sub}</span>
          </motion.div>
        ))}
      </div>

      {/* Main Stacked Bar Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="mb-6">
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Monthly Cost & Profit Breakdown</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <defs>
              <linearGradient id="fuchsiaCostGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={palette[2].hex} stopOpacity={0.8} />
                <stop offset="100%" stopColor={palette[2].hex} stopOpacity={0.4} />
              </linearGradient>
              <linearGradient id="fuchsiaProfitGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={palette[3].hex} stopOpacity={0.9} />
                <stop offset="100%" stopColor={palette[0].hex} stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip
              contentStyle={{ background: "rgba(18,18,26,0.95)", border: `1px solid ${palette[0].hex}40`, borderRadius: 8, color: "#e8e8ed" }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
            <Bar dataKey="cost" stackId="a" fill="url(#fuchsiaCostGrad)" radius={[0, 0, 0, 0]} animationDuration={1200} name="Cost" />
            <Bar dataKey="profit" stackId="a" fill="url(#fuchsiaProfitGrad)" radius={[4, 4, 0, 0]} animationDuration={1200} name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Segment Mix Donut + Retention Bars Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Donut */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
          <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Revenue Mix by Segment</h4>
          <div className="relative">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={segmentData}
                  dataKey="revenue"
                  nameKey="segment"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={3}
                  animationDuration={1200}
                  strokeWidth={0}
                >
                  {segmentData.map((_, i) => (
                    <Cell key={i} fill={SEGMENT_PIE_COLORS[i % SEGMENT_PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "rgba(18,18,26,0.95)", border: `1px solid ${palette[0].hex}40`, borderRadius: 8, color: "#e8e8ed" }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-bold" style={{ color: palette[0].hex }}>${(totalRevenue / 1000).toFixed(0)}K</span>
              <span className="text-[10px] text-[--color-muted]">Total</span>
            </div>
          </div>
        </motion.div>

        {/* Retention Bars */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }}>
          <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Retention by Segment</h4>
          <div className="space-y-3 pt-2">
            {sortedRetention.map((d, i) => (
              <div key={d.segment} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[--color-foreground]">{d.segment}</span>
                  <span className="text-sm font-semibold" style={{ color: palette[0].hex }}>{d.retention}%</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: `${palette[4].hex}20` }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d.retention}%` }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${palette[2].hex}, ${palette[0].hex})` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Segment Detail Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Segment Details</h4>
        <div className="overflow-x-auto rounded-lg border border-[--color-border]">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: `${palette[2].hex}25` }}>
                <th className="text-left py-2.5 px-4 text-[--color-muted] font-semibold">Segment</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Revenue</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Customers</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Avg Order</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Retention</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Share</th>
              </tr>
            </thead>
            <tbody>
              {[...segmentData].sort((a, b) => b.revenue - a.revenue).map((d, i) => (
                <tr key={d.segment} className="border-t border-[--color-border]" style={{ backgroundColor: i % 2 === 0 ? `${palette[4].hex}08` : "transparent" }}>
                  <td className="py-2.5 px-4 text-[--color-foreground] font-medium flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: SEGMENT_PIE_COLORS[i] }} />
                    {d.segment}
                  </td>
                  <td className="py-2.5 px-4 text-right text-[--color-foreground]">${(d.revenue / 1000).toFixed(0)}K</td>
                  <td className="py-2.5 px-4 text-right text-[--color-muted]">{d.customers.toLocaleString()}</td>
                  <td className="py-2.5 px-4 text-right text-[--color-foreground]">${d.avgOrder.toLocaleString()}</td>
                  <td className="py-2.5 px-4 text-right font-medium" style={{ color: palette[0].hex }}>{d.retention}%</td>
                  <td className="py-2.5 px-4 text-right text-[--color-muted]">{((d.revenue / totalRevenue) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardShell>
  );
}
