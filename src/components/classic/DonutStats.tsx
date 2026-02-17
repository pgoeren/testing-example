"use client";

import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import DashboardShell, { PaletteColor, PowerBIStep } from "@/components/ui/DashboardShell";
import { regionData } from "@/data/datasets";

const palette: PaletteColor[] = [
  { hex: "#f43f5e", label: "Rose" },
  { hex: "#e11d48", label: "Dark Rose" },
  { hex: "#be123c", label: "Deep Rose" },
  { hex: "#fda4af", label: "Light Pink" },
  { hex: "#fecdd3", label: "Pale Pink" },
];

const DONUT_COLORS = [palette[0].hex, palette[1].hex, palette[2].hex, palette[3].hex, palette[4].hex, "#fb7185"];

const powerBISteps: PowerBIStep[] = [
  { step: "Import regional data", detail: "Load the dataset with region, revenue, cost, profit, and customer columns. Ensure region is a text field for categorical grouping." },
  { step: "Create regional KPI cards", detail: "Add Card visuals for Total Revenue, Total Customers, Top Region, and Avg Profit per Region. Use DAX: TopRegion = FIRSTNONBLANK(TOPN(1, region, SUM(revenue)))." },
  { step: "Build donut chart", detail: "Insert a Donut Chart. Place 'region' on Legend, 'revenue' on Values. Set inner radius to ~60%. Apply the Rose palette colors for each slice." },
  { step: "Add center label", detail: "Overlay a text box or card in the donut center showing total revenue. Position with precise coordinates to center align." },
  { step: "Create regional comparison bar chart", detail: "Add a Clustered Bar Chart with 'region' on Axis, 'revenue' and 'profit' on Values. Sort descending by revenue. Apply Rose palette gradient." },
  { step: "Build customer breakdown table", detail: "Insert a Table visual with region, customers, revenue per customer calculated field, and profit margin. Apply conditional formatting with Rose color scale." },
  { step: "Enable drill-through", detail: "Set up drill-through from donut slices to a detail page. Apply Rose theme colors and ensure cross-highlighting between donut and bar chart." },
];

const totalRevenue = regionData.reduce((s, d) => s + d.revenue, 0);
const totalCustomers = regionData.reduce((s, d) => s + d.customers, 0);
const topRegion = regionData.reduce((top, d) => (d.revenue > top.revenue ? d : top), regionData[0]);
const avgProfit = regionData.reduce((s, d) => s + d.profit, 0) / regionData.length;

const kpis = [
  { label: "Total Revenue", value: `$${(totalRevenue / 1000).toFixed(0)}K`, sub: "All regions" },
  { label: "Total Customers", value: totalCustomers.toLocaleString(), sub: "Active accounts" },
  { label: "Top Region", value: topRegion.region.split(" ")[0], sub: `$${(topRegion.revenue / 1000).toFixed(0)}K revenue` },
  { label: "Avg Profit/Region", value: `$${(avgProfit / 1000).toFixed(0)}K`, sub: `${regionData.length} regions` },
];

export default function DonutStats() {
  return (
    <DashboardShell title="Regional Performance Dashboard" subtitle="Revenue and customer distribution across global regions" palette={palette} powerBISteps={powerBISteps}>
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

      {/* Main Donut Chart */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="relative mb-6">
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Revenue by Region</h4>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={regionData}
              dataKey="revenue"
              nameKey="region"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={130}
              paddingAngle={3}
              animationDuration={1200}
              strokeWidth={0}
            >
              {regionData.map((_, i) => (
                <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: "rgba(18,18,26,0.95)", border: `1px solid ${palette[0].hex}40`, borderRadius: 8, color: "#e8e8ed" }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ marginTop: 28 }}>
          <span className="text-xs text-[--color-muted] uppercase tracking-wider">Total</span>
          <span className="text-3xl font-bold" style={{ color: palette[0].hex }}>${(totalRevenue / 1000).toFixed(0)}K</span>
          <span className="text-xs text-[--color-muted]">Revenue</span>
        </div>
      </motion.div>

      {/* Regional Comparison Bar Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="mb-6">
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Revenue vs Profit by Region</h4>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={[...regionData].sort((a, b) => b.revenue - a.revenue)} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" horizontal={false} />
            <XAxis type="number" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <YAxis type="category" dataKey="region" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} width={100} />
            <Tooltip
              contentStyle={{ background: "rgba(18,18,26,0.95)", border: `1px solid ${palette[0].hex}40`, borderRadius: 8, color: "#e8e8ed" }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
            <Bar dataKey="revenue" fill={palette[0].hex} radius={[0, 4, 4, 0]} name="Revenue" opacity={0.85} />
            <Bar dataKey="profit" fill={palette[3].hex} radius={[0, 4, 4, 0]} name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Customer Breakdown Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}>
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Regional Breakdown</h4>
        <div className="overflow-x-auto rounded-lg border border-[--color-border]">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: `${palette[2].hex}25` }}>
                <th className="text-left py-2.5 px-4 text-[--color-muted] font-semibold">Region</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Revenue</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Customers</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Rev/Customer</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Margin</th>
              </tr>
            </thead>
            <tbody>
              {[...regionData].sort((a, b) => b.revenue - a.revenue).map((d, i) => (
                <tr key={d.region} className="border-t border-[--color-border]" style={{ backgroundColor: i % 2 === 0 ? `${palette[4].hex}08` : "transparent" }}>
                  <td className="py-2.5 px-4 text-[--color-foreground] font-medium flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: DONUT_COLORS[i] }} />
                    {d.region}
                  </td>
                  <td className="py-2.5 px-4 text-right text-[--color-foreground]">${(d.revenue / 1000).toFixed(0)}K</td>
                  <td className="py-2.5 px-4 text-right text-[--color-muted]">{d.customers.toLocaleString()}</td>
                  <td className="py-2.5 px-4 text-right text-[--color-foreground]">${(d.revenue / d.customers).toFixed(0)}</td>
                  <td className="py-2.5 px-4 text-right font-medium" style={{ color: palette[0].hex }}>{((d.profit / d.revenue) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardShell>
  );
}
