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
import { productData } from "@/data/datasets";

const palette: PaletteColor[] = [
  { hex: "#f59e0b", label: "Amber" },
  { hex: "#d97706", label: "Dark Amber" },
  { hex: "#b45309", label: "Deep Amber" },
  { hex: "#fcd34d", label: "Light Gold" },
  { hex: "#fef3c7", label: "Pale Gold" },
];

const PIE_COLORS = [
  palette[0].hex, palette[1].hex, palette[2].hex, palette[3].hex,
  "#fbbf24", "#92400e", "#f59e0b", "#d97706",
];

const powerBISteps: PowerBIStep[] = [
  { step: "Import product data", detail: "Load product dataset with product name, revenue, units, margin, and growth fields. Verify data types are correct (revenue as currency, margin as percentage)." },
  { step: "Create product KPI cards", detail: "Add Card visuals for Total Products Revenue, Top Product, Avg Margin, and Highest Growth. Use DAX: TopProduct = FIRSTNONBLANK(TOPN(1, product, SUM(revenue)))." },
  { step: "Build pie chart", detail: "Insert a Pie Chart. Place 'product' on Legend and 'revenue' on Values. Apply the Amber palette colors. Enable data labels showing product name and percentage." },
  { step: "Add sequential animation", detail: "While Power BI doesn't support custom animations, use Drill-through and page navigation to simulate reveal. Apply Focus mode for interactive exploration." },
  { step: "Create margin vs growth scatter-bar", detail: "Add a Clustered Bar Chart with products on Axis, 'margin' and 'growth' on Values. Sort by revenue descending. Use #f59e0b for margin and #fcd34d for growth bars." },
  { step: "Build product details table", detail: "Insert a Matrix or Table visual showing product, revenue, units sold, margin, and growth. Add sparklines for growth trend if using recent Power BI versions." },
  { step: "Apply Amber theme and publish", detail: "Customize theme: primary #f59e0b, accent #d97706, background dark. Add product name slicer and enable cross-filtering between pie chart and bar chart." },
];

const totalRevenue = productData.reduce((s, d) => s + d.revenue, 0);
const topProduct = productData.reduce((top, d) => (d.revenue > top.revenue ? d : top), productData[0]);
const avgMargin = productData.reduce((s, d) => s + d.margin, 0) / productData.length;
const highestGrowth = productData.reduce((top, d) => (d.growth > top.growth ? d : top), productData[0]);

const kpis = [
  { label: "Portfolio Revenue", value: `$${(totalRevenue / 1000).toFixed(0)}K`, sub: `${productData.length} products` },
  { label: "Top Product", value: topProduct.product.split(" ")[0], sub: `$${(topProduct.revenue / 1000).toFixed(0)}K rev` },
  { label: "Avg Margin", value: `${avgMargin.toFixed(1)}%`, sub: "Across all products" },
  { label: "Highest Growth", value: `+${highestGrowth.growth}%`, sub: highestGrowth.product.split(" ")[0] },
];

const sortedProducts = [...productData].sort((a, b) => b.revenue - a.revenue);

export default function PieReveal() {
  return (
    <DashboardShell title="Product Portfolio Dashboard" subtitle="Product revenue distribution, margins, and growth analysis" palette={palette} powerBISteps={powerBISteps}>
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

      {/* Main Pie Chart */}
      <motion.div initial={{ opacity: 0, rotate: -5 }} animate={{ opacity: 1, rotate: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mb-6">
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Revenue by Product</h4>
        <ResponsiveContainer width="100%" height={340}>
          <PieChart>
            <Pie
              data={productData}
              dataKey="revenue"
              nameKey="product"
              cx="50%"
              cy="50%"
              outerRadius={130}
              animationDuration={1500}
              animationBegin={200}
              strokeWidth={2}
              stroke="rgba(0,0,0,0.3)"
              label={({ product, percent }: { product: string; percent: number }) => `${product.split(" ")[0]}: ${(percent * 100).toFixed(0)}%`}
              labelLine={{ stroke: palette[3].hex, strokeWidth: 1 }}
            >
              {productData.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: "rgba(18,18,26,0.95)", border: `1px solid ${palette[0].hex}40`, borderRadius: 8, color: "#e8e8ed" }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Margin & Growth Bar Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="mb-6">
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Margin & Growth by Product</h4>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={sortedProducts}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="product" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} angle={-20} textAnchor="end" height={50} />
            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
            <Tooltip
              contentStyle={{ background: "rgba(18,18,26,0.95)", border: `1px solid ${palette[0].hex}40`, borderRadius: 8, color: "#e8e8ed" }}
              formatter={(value: number) => [`${value}%`, ""]}
            />
            <Bar dataKey="margin" fill={palette[0].hex} radius={[4, 4, 0, 0]} name="Margin %" opacity={0.85} />
            <Bar dataKey="growth" fill={palette[3].hex} radius={[4, 4, 0, 0]} name="Growth %" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Product Details Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}>
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Product Details</h4>
        <div className="overflow-x-auto rounded-lg border border-[--color-border]">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: `${palette[2].hex}25` }}>
                <th className="text-left py-2.5 px-4 text-[--color-muted] font-semibold">Product</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Revenue</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Units</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Margin</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Growth</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((d, i) => (
                <tr key={d.product} className="border-t border-[--color-border]" style={{ backgroundColor: i % 2 === 0 ? `${palette[4].hex}08` : "transparent" }}>
                  <td className="py-2.5 px-4 text-[--color-foreground] font-medium flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                    {d.product}
                  </td>
                  <td className="py-2.5 px-4 text-right text-[--color-foreground]">${(d.revenue / 1000).toFixed(0)}K</td>
                  <td className="py-2.5 px-4 text-right text-[--color-muted]">{d.units.toLocaleString()}</td>
                  <td className="py-2.5 px-4 text-right text-[--color-foreground]">{d.margin}%</td>
                  <td className="py-2.5 px-4 text-right font-medium" style={{ color: palette[0].hex }}>+{d.growth}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardShell>
  );
}
