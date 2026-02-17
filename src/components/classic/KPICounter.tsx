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
  LineChart,
  Line,
  Cell,
} from "recharts";
import DashboardShell, { PaletteColor, PowerBIStep } from "@/components/ui/DashboardShell";
import { kpiData, monthlyData, quarterlyData } from "@/data/datasets";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useInView } from "@/hooks/useInView";

const palette: PaletteColor[] = [
  { hex: "#06b6d4", label: "Cyan" },
  { hex: "#0891b2", label: "Dark Cyan" },
  { hex: "#155e75", label: "Deep Teal" },
  { hex: "#67e8f9", label: "Light Cyan" },
  { hex: "#334155", label: "Slate" },
];

const powerBISteps: PowerBIStep[] = [
  { step: "Import KPI and monthly data", detail: "Load the KPI dataset with label, value, change fields and monthly dataset. Create DAX measures for each KPI card." },
  { step: "Build animated KPI cards", detail: "Add 4 Card visuals in a row at the top. Use DAX for each: TotalRevenue, ActiveUsers, AvgOrderValue, CustomerSatisfaction. Apply Cyan (#06b6d4) text formatting." },
  { step: "Add change indicators", detail: "For each card, add a secondary measure showing % change. Use conditional formatting to color positive changes green and negative red." },
  { step: "Create KPI trend sparklines", detail: "In recent Power BI versions, enable Sparklines in Card visuals. Otherwise, add small Line Charts next to each card showing 12-month trends." },
  { step: "Build quarterly performance bars", detail: "Insert a Clustered Bar Chart with quarters on Axis and revenue/profit on Values. Apply Cyan gradient with #06b6d4 to #155e75." },
  { step: "Create KPI summary table", detail: "Add a Table visual listing all KPIs: label, current value, change %, and status. Apply conditional formatting with icon sets for status." },
  { step: "Apply Slate+Cyan theme", detail: "Customize theme: primary #06b6d4, background Slate #334155, accent #67e8f9. Add date range slicer and enable auto-refresh for real-time KPI updates." },
];

function KPICard({ label, value, change, prefix = "", suffix = "" }: { label: string; value: number; change: number; prefix?: string; suffix?: string }) {
  const [ref, inView] = useInView(0.1);
  const animated = useAnimatedCounter(value, 1500, inView);
  const isPositive = change >= 0;
  const displayValue = value >= 1000
    ? `${(animated / 1000).toFixed(1)}k`
    : animated < 10
    ? animated.toFixed(1)
    : Math.floor(animated).toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="rounded-xl p-4 border border-[--color-border]"
      style={{ background: `linear-gradient(135deg, ${palette[4].hex}40, ${palette[2].hex}20)` }}
    >
      <p className="text-xs text-[--color-muted] mb-1 uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold" style={{ color: palette[0].hex }}>
        {prefix}{displayValue}{suffix}
      </p>
      <div className="flex items-center gap-1 mt-2">
        <span className={`text-xs font-medium ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
          {isPositive ? "+" : ""}{change}%
        </span>
        <span className="text-xs text-[--color-muted]">vs last period</span>
      </div>
    </motion.div>
  );
}

const revenueByQuarter = quarterlyData.map((q) => ({
  quarter: q.quarter.replace("2024", "").trim(),
  revenue: q.revenue,
  profit: q.profit,
  cost: q.cost,
}));

export default function KPICounter() {
  return (
    <DashboardShell title="Executive KPI Dashboard" subtitle="Key performance indicators with real-time tracking" palette={palette} powerBISteps={powerBISteps}>
      {/* KPI Cards - Top 4 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {kpiData.slice(0, 4).map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* KPI Cards - Bottom 4 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {kpiData.slice(4, 8).map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Revenue Trend Line */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="mb-6">
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Revenue Trend (Monthly)</h4>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={monthlyData}>
            <defs>
              <filter id="cyanGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
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
            <Line type="monotone" dataKey="revenue" stroke={palette[0].hex} strokeWidth={2.5} dot={{ r: 3, fill: palette[0].hex }} filter="url(#cyanGlow)" name="Revenue" />
            <Line type="monotone" dataKey="profit" stroke={palette[3].hex} strokeWidth={2} dot={false} strokeDasharray="4 4" name="Profit" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Quarterly Performance */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="mb-6">
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Quarterly Performance</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={revenueByQuarter}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="quarter" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip
              contentStyle={{ background: "rgba(18,18,26,0.95)", border: `1px solid ${palette[0].hex}40`, borderRadius: 8, color: "#e8e8ed" }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
            <Bar dataKey="revenue" radius={[6, 6, 0, 0]} name="Revenue">
              {revenueByQuarter.map((_, i) => (
                <Cell key={i} fill={[palette[2].hex, palette[1].hex, palette[0].hex, palette[3].hex][i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* KPI Summary Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">KPI Summary</h4>
        <div className="overflow-x-auto rounded-lg border border-[--color-border]">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: `${palette[2].hex}30` }}>
                <th className="text-left py-2.5 px-4 text-[--color-muted] font-semibold">Metric</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Value</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Change</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {kpiData.map((kpi, i) => (
                <tr key={kpi.label} className="border-t border-[--color-border]" style={{ backgroundColor: i % 2 === 0 ? `${palette[4].hex}15` : "transparent" }}>
                  <td className="py-2.5 px-4 text-[--color-foreground] font-medium">{kpi.label}</td>
                  <td className="py-2.5 px-4 text-right" style={{ color: palette[0].hex }}>
                    {kpi.prefix || ""}{kpi.value >= 1000 ? `${(kpi.value / 1000).toFixed(1)}k` : kpi.value < 10 ? kpi.value.toFixed(1) : kpi.value}{kpi.suffix || ""}
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <span className={kpi.change >= 0 ? "text-emerald-400" : "text-red-400"}>
                      {kpi.change >= 0 ? "+" : ""}{kpi.change}%
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <span className={`inline-block w-2 h-2 rounded-full ${kpi.change >= 0 ? "bg-emerald-400" : "bg-red-400"}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardShell>
  );
}
