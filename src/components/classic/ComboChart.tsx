"use client";

import { motion } from "framer-motion";
import {
  ComposedChart,
  Bar,
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
import { monthlyData, quarterlyData } from "@/data/datasets";

const palette: PaletteColor[] = [
  { hex: "#6366f1", label: "Indigo" },
  { hex: "#4f46e5", label: "Dark Indigo" },
  { hex: "#f97316", label: "Orange" },
  { hex: "#ea580c", label: "Dark Orange" },
  { hex: "#c7d2fe", label: "Light Indigo" },
];

const powerBISteps: PowerBIStep[] = [
  { step: "Import monthly dataset", detail: "Load monthly data with revenue, cost, profit, and margin fields. Create a DAX column: Margin% = DIVIDE([profit], [revenue]) * 100." },
  { step: "Create comparison KPI cards", detail: "Add Card visuals for Total Revenue, Total Cost, Net Profit, and Profit Margin. Format revenue in Indigo (#6366f1) and cost in Orange (#f97316)." },
  { step: "Build combo chart", detail: "Insert a Combo Chart (Line and Clustered Column). Place 'month' on Axis, 'revenue' as Column (Indigo), 'cost' as Column (Orange), and 'profit' as Line (Light Indigo)." },
  { step: "Configure dual axes", detail: "Set revenue and cost on the primary Y-axis (left). Add profit line on secondary Y-axis (right). Format axis labels and gridlines." },
  { step: "Create profit margin area chart", detail: "Add an Area Chart below showing monthly profit margin trend. Use Indigo gradient fill and Orange reference line for target margin." },
  { step: "Build quarterly comparison table", detail: "Insert a Matrix visual with quarters as rows, Revenue/Cost/Profit/Margin as columns. Add data bars and conditional formatting with the dual-color palette." },
  { step: "Apply dual-tone theme", detail: "Customize theme: primary Indigo #6366f1, secondary Orange #f97316. Set background to dark, enable cross-filtering, and add a time period slicer." },
];

const totalRevenue = monthlyData.reduce((s, d) => s + d.revenue, 0);
const totalCost = monthlyData.reduce((s, d) => s + d.cost, 0);
const netProfit = totalRevenue - totalCost;
const profitMargin = (netProfit / totalRevenue) * 100;

const kpis = [
  { label: "Total Revenue", value: `$${(totalRevenue / 1000).toFixed(0)}K`, color: palette[0].hex, sub: "Indigo metric" },
  { label: "Total Cost", value: `$${(totalCost / 1000).toFixed(0)}K`, color: palette[2].hex, sub: "Orange metric" },
  { label: "Net Profit", value: `$${(netProfit / 1000).toFixed(0)}K`, color: palette[0].hex, sub: `${profitMargin.toFixed(1)}% margin` },
  { label: "Profit Margin", value: `${profitMargin.toFixed(1)}%`, color: palette[4].hex, sub: "Revenue - Cost" },
];

const marginData = monthlyData.map((d) => ({
  month: d.month,
  margin: ((d.revenue - d.cost) / d.revenue) * 100,
  revenue: d.revenue,
  cost: d.cost,
}));

export default function ComboChart() {
  return (
    <DashboardShell title="Revenue vs Cost Dashboard" subtitle="Dual-metric analysis with profit margin tracking" palette={palette} powerBISteps={powerBISteps}>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-xl p-4 border border-[--color-border]"
            style={{ background: `linear-gradient(135deg, ${kpi.color}10, ${kpi.color}18)` }}
          >
            <p className="text-xs text-[--color-muted] uppercase tracking-wider">{kpi.label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: kpi.color }}>{kpi.value}</p>
            <span className="text-xs text-[--color-muted]">{kpi.sub}</span>
          </motion.div>
        ))}
      </div>

      {/* Main Combo Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="mb-6">
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Revenue vs Cost with Profit Trend</h4>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={monthlyData}>
            <defs>
              <linearGradient id="comboRevGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={palette[0].hex} stopOpacity={0.85} />
                <stop offset="100%" stopColor={palette[1].hex} stopOpacity={0.4} />
              </linearGradient>
              <linearGradient id="comboCostGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={palette[2].hex} stopOpacity={0.85} />
                <stop offset="100%" stopColor={palette[3].hex} stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip
              contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
            <Bar dataKey="revenue" fill="url(#comboRevGrad)" radius={[4, 4, 0, 0]} animationDuration={1200} name="Revenue" />
            <Bar dataKey="cost" fill="url(#comboCostGrad)" radius={[4, 4, 0, 0]} animationDuration={1200} name="Cost" />
            <Line type="monotone" dataKey="profit" stroke={palette[4].hex} strokeWidth={2.5} dot={{ r: 4, fill: palette[4].hex }} animationDuration={1500} name="Profit" />
          </ComposedChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Profit Margin Area Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="mb-6">
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Monthly Profit Margin Trend</h4>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={marginData}>
            <defs>
              <linearGradient id="comboMarginGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={palette[0].hex} stopOpacity={0.3} />
                <stop offset="100%" stopColor={palette[1].hex} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} domain={[25, 45]} />
            <Tooltip
              contentStyle={{ background: "rgba(18,18,26,0.95)", border: `1px solid ${palette[0].hex}40`, borderRadius: 8, color: "#e8e8ed" }}
              formatter={(value: number) => [`${value.toFixed(1)}%`, "Margin"]}
            />
            <Area type="monotone" dataKey="margin" stroke={palette[0].hex} strokeWidth={2} fill="url(#comboMarginGrad)" animationDuration={1500} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Quarterly Comparison Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}>
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Quarterly Comparison</h4>
        <div className="overflow-x-auto rounded-lg border border-[--color-border]">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: `${palette[1].hex}25` }}>
                <th className="text-left py-2.5 px-4 text-[--color-muted] font-semibold">Quarter</th>
                <th className="text-right py-2.5 px-4 font-semibold" style={{ color: palette[0].hex }}>Revenue</th>
                <th className="text-right py-2.5 px-4 font-semibold" style={{ color: palette[2].hex }}>Cost</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Profit</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Margin</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Headcount</th>
              </tr>
            </thead>
            <tbody>
              {quarterlyData.map((q, i) => (
                <tr key={q.quarter} className="border-t border-[--color-border]" style={{ backgroundColor: i % 2 === 0 ? `${palette[4].hex}08` : "transparent" }}>
                  <td className="py-2.5 px-4 text-[--color-foreground] font-medium">{q.quarter}</td>
                  <td className="py-2.5 px-4 text-right" style={{ color: palette[0].hex }}>${(q.revenue / 1000).toFixed(0)}K</td>
                  <td className="py-2.5 px-4 text-right" style={{ color: palette[2].hex }}>${(q.cost / 1000).toFixed(0)}K</td>
                  <td className="py-2.5 px-4 text-right text-[--color-foreground]">${(q.profit / 1000).toFixed(0)}K</td>
                  <td className="py-2.5 px-4 text-right text-[--color-foreground]">{((q.profit / q.revenue) * 100).toFixed(1)}%</td>
                  <td className="py-2.5 px-4 text-right text-[--color-muted]">{q.headcount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardShell>
  );
}
