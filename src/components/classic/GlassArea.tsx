"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import DashboardShell, { PaletteColor, PowerBIStep } from "@/components/ui/DashboardShell";
import { monthlyData, quarterlyData } from "@/data/datasets";

const palette: PaletteColor[] = [
  { hex: "#8b5cf6", label: "Violet" },
  { hex: "#7c3aed", label: "Dark Violet" },
  { hex: "#6d28d9", label: "Deep Purple" },
  { hex: "#c4b5fd", label: "Light Lavender" },
  { hex: "#ddd6fe", label: "Pale Lavender" },
];

const powerBISteps: PowerBIStep[] = [
  { step: "Import cost dataset", detail: "Load monthly data with cost, revenue, and profit fields. Create a calculated column for Efficiency = (Revenue - Cost) / Revenue * 100." },
  { step: "Build efficiency KPI cards", detail: "Add Card visuals for Total Cost, Cost Ratio, Best Efficiency Month, and Avg Margin. Use DAX: CostRatio = DIVIDE(SUM(cost), SUM(revenue))." },
  { step: "Create stacked area chart", detail: "Insert an Area Chart with 'month' on Axis. Add 'cost' and 'profit' as stacked values. Use gradient fills from #8b5cf6 (cost) and #c4b5fd (profit)." },
  { step: "Apply glass/frost effect", detail: "Set Area transparency to 60% and add a subtle border stroke. Use Format > Series > Line > Stroke at 2px in #7c3aed." },
  { step: "Build cost vs margin bar chart", detail: "Add a Clustered Bar Chart with quarterly data. Show cost and margin side by side. Apply #6d28d9 for cost bars and #c4b5fd for margin." },
  { step: "Add efficiency ranking list", detail: "Create a Table visual sorted by efficiency descending. Add conditional formatting with data bars in violet shades to highlight top performers." },
  { step: "Theme and polish", detail: "Apply Violet theme: primary #8b5cf6, backgrounds dark. Add page-level filters and bookmarks for monthly/quarterly views." },
];

const totalCost = monthlyData.reduce((s, d) => s + d.cost, 0);
const totalRevenue = monthlyData.reduce((s, d) => s + d.revenue, 0);
const costRatio = (totalCost / totalRevenue) * 100;
const avgMargin = monthlyData.reduce((s, d) => s + ((d.revenue - d.cost) / d.revenue) * 100, 0) / monthlyData.length;
const bestMonth = monthlyData.reduce((best, d) => {
  const eff = ((d.revenue - d.cost) / d.revenue) * 100;
  return eff > best.eff ? { month: d.month, eff } : best;
}, { month: "", eff: 0 });

const kpis = [
  { label: "Total Cost", value: `$${(totalCost / 1000).toFixed(0)}K`, sub: "Annual spend" },
  { label: "Cost Ratio", value: `${costRatio.toFixed(1)}%`, sub: "Cost / Revenue" },
  { label: "Best Efficiency", value: bestMonth.month, sub: `${bestMonth.eff.toFixed(1)}% margin` },
  { label: "Avg Margin", value: `${avgMargin.toFixed(1)}%`, sub: "12-month average" },
];

const efficiencyData = monthlyData.map((d) => ({
  month: d.month,
  cost: d.cost,
  profit: d.profit,
  efficiency: ((d.revenue - d.cost) / d.revenue) * 100,
}));

export default function GlassArea() {
  return (
    <DashboardShell title="Cost & Efficiency Dashboard" subtitle="Cost analysis with operational efficiency metrics" palette={palette} powerBISteps={powerBISteps}>
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

      {/* Main Glass Area Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="mb-6">
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Cost vs Profit (Stacked Area)</h4>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="violetCostGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={palette[1].hex} stopOpacity={0.35} />
                <stop offset="100%" stopColor={palette[2].hex} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="violetProfitGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={palette[3].hex} stopOpacity={0.4} />
                <stop offset="100%" stopColor={palette[4].hex} stopOpacity={0.08} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip
              contentStyle={{ background: "rgba(18,18,26,0.95)", border: `1px solid ${palette[0].hex}40`, borderRadius: 8, color: "#e8e8ed" }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
            <Area type="monotone" dataKey="cost" stackId="1" stroke={palette[1].hex} strokeWidth={2} fill="url(#violetCostGrad)" name="Cost" animationDuration={1500} />
            <Area type="monotone" dataKey="profit" stackId="1" stroke={palette[3].hex} strokeWidth={2} fill="url(#violetProfitGrad)" name="Profit" animationDuration={1500} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Quarterly Cost Breakdown Bar Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="mb-6">
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Quarterly Cost vs Profit</h4>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={quarterlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="quarter" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip
              contentStyle={{ background: "rgba(18,18,26,0.95)", border: `1px solid ${palette[0].hex}40`, borderRadius: 8, color: "#e8e8ed" }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
            <Bar dataKey="cost" fill={palette[2].hex} radius={[4, 4, 0, 0]} name="Cost" opacity={0.8} />
            <Bar dataKey="profit" fill={palette[3].hex} radius={[4, 4, 0, 0]} name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Efficiency Ranking */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}>
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Monthly Efficiency Ranking</h4>
        <div className="space-y-2">
          {[...efficiencyData]
            .sort((a, b) => b.efficiency - a.efficiency)
            .map((d, i) => (
              <div key={d.month} className="flex items-center gap-3">
                <span className="text-xs text-[--color-muted] w-5 text-right">{i + 1}</span>
                <span className="text-sm text-[--color-foreground] w-10 font-medium">{d.month}</span>
                <div className="flex-1 h-6 rounded-full overflow-hidden" style={{ backgroundColor: `${palette[4].hex}15` }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d.efficiency}%` }}
                    transition={{ duration: 0.8, delay: 0.7 + i * 0.05 }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${palette[2].hex}, ${palette[0].hex})` }}
                  />
                </div>
                <span className="text-sm font-semibold w-14 text-right" style={{ color: palette[0].hex }}>{d.efficiency.toFixed(1)}%</span>
              </div>
            ))}
        </div>
      </motion.div>
    </DashboardShell>
  );
}
