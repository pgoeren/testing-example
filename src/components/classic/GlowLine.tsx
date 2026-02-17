"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import DashboardShell, { PaletteColor, PowerBIStep } from "@/components/ui/DashboardShell";
import { monthlyData } from "@/data/datasets";

const palette: PaletteColor[] = [
  { hex: "#10b981", label: "Emerald" },
  { hex: "#059669", label: "Dark Emerald" },
  { hex: "#047857", label: "Deep Green" },
  { hex: "#6ee7b7", label: "Light Mint" },
  { hex: "#a7f3d0", label: "Pale Mint" },
];

const powerBISteps: PowerBIStep[] = [
  { step: "Import monthly dataset", detail: "Load the dataset with month, revenue, growth, and forecast fields via Get Data. Ensure month is recognized as a categorical or date axis." },
  { step: "Create growth KPI cards", detail: "Add Card visuals for Peak Growth, Avg Growth, Positive Months, and Trend Direction. Use DAX measures like PeakGrowth = MAX(growth) and AvgGrowth = AVERAGE(growth)." },
  { step: "Build the primary line chart", detail: "Insert a Line Chart. Place 'month' on Axis, 'revenue' and 'forecast' on Values. Format revenue line in #10b981 with 3pt width. Set forecast as dashed #6ee7b7." },
  { step: "Add glow effect via shadow", detail: "In Format > Series > Shadow, enable Drop Shadow with #10b981 color, 50% transparency, 8px blur. This simulates the glow trail effect." },
  { step: "Create growth area chart", detail: "Add an Area Chart with 'month' on Axis and 'growth' on Values. Use conditional formatting to color positive values #10b981 and negative values #ef4444." },
  { step: "Build monthly details table", detail: "Insert a Table showing month, revenue, growth %, cost, and profit. Add data bars on the revenue column using the Emerald palette." },
  { step: "Apply Emerald theme", detail: "Customize theme with #10b981 primary, #059669 secondary. Set background to dark, gridlines to subtle, and enable cross-filtering between charts." },
];

const growthData = monthlyData.map((d) => ({
  ...d,
  positiveGrowth: d.growth >= 0 ? d.growth : 0,
  negativeGrowth: d.growth < 0 ? d.growth : 0,
}));

const peakGrowth = Math.max(...monthlyData.map((d) => d.growth));
const avgGrowth = monthlyData.reduce((s, d) => s + d.growth, 0) / monthlyData.length;
const positiveMonths = monthlyData.filter((d) => d.growth >= 0).length;
const latestGrowth = monthlyData[monthlyData.length - 1].growth;

const kpis = [
  { label: "Peak Growth", value: `${peakGrowth.toFixed(1)}%`, change: "Best month", positive: true },
  { label: "Avg Growth", value: `${avgGrowth.toFixed(1)}%`, change: "12-mo avg", positive: avgGrowth > 0 },
  { label: "Positive Months", value: `${positiveMonths}/12`, change: `${((positiveMonths / 12) * 100).toFixed(0)}% hit rate`, positive: true },
  { label: "Latest Trend", value: `${latestGrowth > 0 ? "+" : ""}${latestGrowth.toFixed(1)}%`, change: "December", positive: latestGrowth > 0 },
];

export default function GlowLine() {
  return (
    <DashboardShell title="Growth Trends Dashboard" subtitle="Monthly growth analysis with trend forecasting" palette={palette} powerBISteps={powerBISteps}>
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
            <span className="text-xs text-[--color-muted]">{kpi.change}</span>
          </motion.div>
        ))}
      </div>

      {/* Main Line Chart with Glow */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="mb-6">
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Revenue & Forecast Trend</h4>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={monthlyData}>
            <defs>
              <filter id="glowEmerald">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip
              contentStyle={{ background: "rgba(18,18,26,0.95)", border: `1px solid ${palette[0].hex}40`, borderRadius: 8, color: "#e8e8ed" }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
            <Line type="monotone" dataKey="revenue" stroke={palette[0].hex} strokeWidth={3} dot={{ r: 4, fill: palette[0].hex, strokeWidth: 0 }} filter="url(#glowEmerald)" name="Revenue" animationDuration={1500} />
            <Line type="monotone" dataKey="forecast" stroke={palette[3].hex} strokeWidth={2} strokeDasharray="6 4" dot={false} name="Forecast" animationDuration={1500} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Growth Rate Area Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="mb-6">
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Monthly Growth Rate (%)</h4>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={growthData}>
            <defs>
              <linearGradient id="growthPositive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={palette[0].hex} stopOpacity={0.4} />
                <stop offset="100%" stopColor={palette[0].hex} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="growthNegative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
            <Tooltip
              contentStyle={{ background: "rgba(18,18,26,0.95)", border: `1px solid ${palette[0].hex}40`, borderRadius: 8, color: "#e8e8ed" }}
              formatter={(value: number) => [`${value.toFixed(1)}%`, ""]}
            />
            <Area type="monotone" dataKey="positiveGrowth" stroke={palette[0].hex} fill="url(#growthPositive)" strokeWidth={2} name="Growth" />
            <Area type="monotone" dataKey="negativeGrowth" stroke="#ef4444" fill="url(#growthNegative)" strokeWidth={2} name="Decline" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Monthly Data Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}>
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Monthly Detail</h4>
        <div className="overflow-x-auto rounded-lg border border-[--color-border]">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: `${palette[2].hex}30` }}>
                <th className="text-left py-2.5 px-4 text-[--color-muted] font-semibold">Month</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Revenue</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Growth</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Forecast</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Variance</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((d, i) => {
                const variance = d.revenue - d.forecast;
                return (
                  <tr key={d.month} className="border-t border-[--color-border]" style={{ backgroundColor: i % 2 === 0 ? `${palette[4].hex}08` : "transparent" }}>
                    <td className="py-2 px-4 text-[--color-foreground] font-medium">{d.month}</td>
                    <td className="py-2 px-4 text-right text-[--color-foreground]">${(d.revenue / 1000).toFixed(0)}K</td>
                    <td className="py-2 px-4 text-right">
                      <span className={d.growth >= 0 ? "text-emerald-400" : "text-red-400"}>
                        {d.growth >= 0 ? "+" : ""}{d.growth.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-2 px-4 text-right text-[--color-muted]">${(d.forecast / 1000).toFixed(0)}K</td>
                    <td className="py-2 px-4 text-right">
                      <span className={variance >= 0 ? "text-emerald-400" : "text-red-400"}>
                        {variance >= 0 ? "+" : ""}${(variance / 1000).toFixed(1)}K
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardShell>
  );
}
