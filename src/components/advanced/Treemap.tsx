"use client";
import { motion } from "framer-motion";
import { treemapData, productData } from "@/data/datasets";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import DashboardShell, {
  PaletteColor,
  PowerBIStep,
} from "@/components/ui/DashboardShell";

const palette: PaletteColor[] = [
  { hex: "#16a34a", label: "Forest Green" },
  { hex: "#15803d", label: "Deep Green" },
  { hex: "#166534", label: "Dark Green" },
  { hex: "#86efac", label: "Mint" },
  { hex: "#2d5016", label: "Pine" },
];

const powerBISteps: PowerBIStep[] = [
  {
    step: "Import product revenue data",
    detail:
      "Load the treemap dataset into Power BI via Get Data. Ensure columns include Name, Size (revenue), and Category.",
  },
  {
    step: "Add a Treemap visual",
    detail:
      'From the Visualizations pane, select Treemap. Drag "Category" to Group, "Name" to Details, and "Size" to Values.',
  },
  {
    step: "Configure forest color palette",
    detail:
      "Go to Format > Data colors. Assign #16a34a to Products category and #86efac to Tools category. Enable gradient fill.",
  },
  {
    step: "Add KPI card row",
    detail:
      "Insert four Card visuals for Total Revenue, Product Count, Avg Revenue per Product, and Top Product. Use SUM and AVERAGE DAX measures.",
  },
  {
    step: "Create growth bar chart",
    detail:
      "Add a Clustered Column chart below. Map Product to X-axis and Growth% to Y-axis. Apply conditional formatting using #16a34a for positive growth.",
  },
  {
    step: "Add product detail table",
    detail:
      "Insert a Table visual showing Product, Revenue, Units, Margin, and Growth. Add data bars on the Revenue column.",
  },
  {
    step: "Arrange and theme",
    detail:
      'Apply a custom "Forest" theme. Position KPI cards at top, treemap in center, bar chart and table below side by side.',
  },
];

const total = treemapData.reduce((s, d) => s + d.size, 0);

const CELL_COLORS = [
  "#16a34a",
  "#15803d",
  "#166534",
  "#86efac",
  "#2d5016",
  "#16a34a",
  "#15803d",
  "#86efac",
];

export default function Treemap() {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState<string | null>(null);

  const items = treemapData
    .slice()
    .sort((a, b) => b.size - a.size)
    .map((d, i) => ({
      ...d,
      percent: (d.size / total) * 100,
      color: CELL_COLORS[i % CELL_COLORS.length],
    }));

  const topProduct = items[0];
  const categories = [...new Set(treemapData.map((d) => d.category))];

  const kpis = [
    {
      label: "Total Revenue",
      value: `$${(total / 1000).toFixed(0)}k`,
      sub: `${treemapData.length} products`,
      color: palette[0].hex,
    },
    {
      label: "Top Product",
      value: topProduct.name,
      sub: `$${(topProduct.size / 1000).toFixed(0)}k (${topProduct.percent.toFixed(1)}%)`,
      color: palette[3].hex,
    },
    {
      label: "Categories",
      value: `${categories.length}`,
      sub: categories.join(", "),
      color: palette[1].hex,
    },
    {
      label: "Avg Revenue",
      value: `$${(total / treemapData.length / 1000).toFixed(0)}k`,
      sub: "Per product",
      color: palette[2].hex,
    },
  ];

  const growthData = productData
    .slice()
    .sort((a, b) => b.growth - a.growth)
    .slice(0, 6);

  return (
    <DashboardShell
      title="Product Revenue Treemap Dashboard"
      subtitle="Proportional revenue breakdown by product with growth and margin analysis"
      palette={palette}
      powerBISteps={powerBISteps}
    >
      <div ref={ref} className="space-y-4">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl p-4 border border-[--color-border] bg-[--color-card]"
            >
              <div className="text-xs text-[--color-muted] mb-1">
                {kpi.label}
              </div>
              <div
                className="text-2xl font-bold truncate"
                style={{ color: kpi.color }}
              >
                {kpi.value}
              </div>
              <div className="text-[10px] text-[--color-muted] mt-1 truncate">
                {kpi.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Treemap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-xl border border-[--color-border] bg-[--color-card] p-4"
        >
          <div className="text-sm font-semibold text-[--color-foreground] mb-3">
            Revenue Treemap
          </div>
          <div className="flex flex-wrap gap-1.5 min-h-[280px]">
            {items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ scale: 1.03, zIndex: 10 }}
                onMouseEnter={() => setHovered(item.name)}
                onMouseLeave={() => setHovered(null)}
                className="rounded-lg flex flex-col items-center justify-center p-3 cursor-default relative overflow-hidden"
                style={{
                  backgroundColor: `${item.color}20`,
                  border: `1px solid ${hovered === item.name ? item.color : "transparent"}`,
                  flexBasis: `${Math.max(item.percent * 1.8, 20)}%`,
                  flexGrow: 1,
                  minHeight: `${Math.max(item.percent * 2.5, 60)}px`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-semibold text-[--color-foreground] z-10 text-center">
                  {item.name}
                </span>
                <span
                  className="text-lg font-bold z-10"
                  style={{ color: item.color }}
                >
                  ${(item.size / 1000).toFixed(0)}k
                </span>
                <span className="text-[10px] text-[--color-muted] z-10">
                  {item.percent.toFixed(1)}%
                </span>
                <span
                  className="text-[9px] z-10 mt-0.5 px-1.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${item.color}25`,
                    color: item.color,
                  }}
                >
                  {item.category}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Secondary: Product Growth Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-xl border border-[--color-border] bg-[--color-card] p-4"
        >
          <div className="text-sm font-semibold text-[--color-foreground] mb-3">
            Product Growth Rate (%)
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={growthData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={palette[4].hex}
                strokeOpacity={0.3}
                vertical={false}
              />
              <XAxis
                dataKey="product"
                stroke="#71717a"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                angle={-15}
                textAnchor="end"
                height={50}
              />
              <YAxis
                stroke="#71717a"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(18,18,26,0.95)",
                  border: `1px solid ${palette[2].hex}`,
                  borderRadius: 8,
                  color: "#e8e8ed",
                }}
                formatter={(value: number) => [`${value}%`, "Growth"]}
              />
              <Bar
                dataKey="growth"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              >
                {growthData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={i < 2 ? palette[0].hex : i < 4 ? palette[1].hex : palette[2].hex}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Product Detail Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="rounded-xl border border-[--color-border] bg-[--color-card] p-4"
        >
          <div className="text-sm font-semibold text-[--color-foreground] mb-3">
            Product Details
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[--color-border]">
                  <th className="text-left p-2 text-[--color-muted] font-medium">Product</th>
                  <th className="text-right p-2 text-[--color-muted] font-medium">Revenue</th>
                  <th className="text-right p-2 text-[--color-muted] font-medium">Units</th>
                  <th className="text-right p-2 text-[--color-muted] font-medium">Margin</th>
                  <th className="text-right p-2 text-[--color-muted] font-medium">Growth</th>
                </tr>
              </thead>
              <tbody>
                {productData.map((d, i) => (
                  <tr
                    key={d.product}
                    className="border-b border-[--color-border] border-opacity-30"
                  >
                    <td className="p-2 text-[--color-foreground] font-medium">
                      <span
                        className="inline-block w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: CELL_COLORS[i % CELL_COLORS.length] }}
                      />
                      {d.product}
                    </td>
                    <td className="p-2 text-right" style={{ color: palette[0].hex }}>
                      ${(d.revenue / 1000).toFixed(0)}k
                    </td>
                    <td className="p-2 text-right text-[--color-muted]">
                      {d.units.toLocaleString()}
                    </td>
                    <td className="p-2 text-right">
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                        style={{
                          backgroundColor: `${d.margin >= 65 ? palette[0].hex : palette[2].hex}25`,
                          color: d.margin >= 65 ? palette[3].hex : palette[0].hex,
                        }}
                      >
                        {d.margin}%
                      </span>
                    </td>
                    <td
                      className="p-2 text-right font-semibold"
                      style={{ color: d.growth >= 15 ? palette[3].hex : palette[0].hex }}
                    >
                      +{d.growth}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DashboardShell>
  );
}
