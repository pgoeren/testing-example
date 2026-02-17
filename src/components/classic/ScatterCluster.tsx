"use client";

import { motion } from "framer-motion";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ZAxis,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import DashboardShell, { PaletteColor, PowerBIStep } from "@/components/ui/DashboardShell";
import { segmentData, scatterData } from "@/data/datasets";

const palette: PaletteColor[] = [
  { hex: "#14b8a6", label: "Teal" },
  { hex: "#0d9488", label: "Dark Teal" },
  { hex: "#0f766e", label: "Deep Teal" },
  { hex: "#5eead4", label: "Light Teal" },
  { hex: "#99f6e4", label: "Pale Teal" },
];

const CLUSTER_COLORS: Record<string, string> = {
  A: palette[0].hex,
  B: palette[2].hex,
  C: palette[3].hex,
};

const powerBISteps: PowerBIStep[] = [
  { step: "Import segmentation data", detail: "Load scatter data with x, y, size, and category fields plus segment data with revenue, customers, avgOrder, and retention columns." },
  { step: "Create segment KPI cards", detail: "Add Card visuals for Total Segments, Highest Revenue Segment, Avg Retention, and Total Customers. Use DAX: AvgRetention = AVERAGE(retention)." },
  { step: "Build scatter chart", detail: "Insert a Scatter Chart. Place 'x' on X-Axis, 'y' on Y-Axis, 'size' on Bubble Size, and 'category' on Legend. Apply Teal palette: Category A=#14b8a6, B=#0f766e, C=#5eead4." },
  { step: "Add cluster grouping", detail: "Use the Legend field to color code clusters. In Format > Markers, set size range 5-30. Enable zoom slider for detailed exploration." },
  { step: "Create segment revenue bar chart", detail: "Add a Bar Chart with segment on Axis and revenue on Values. Sort descending. Apply gradient fill from #0f766e to #14b8a6." },
  { step: "Build segment details table", detail: "Insert a Table visual with segment, revenue, customers, avg order value, and retention rate. Apply conditional formatting to retention column." },
  { step: "Apply Teal theme", detail: "Set primary color to #14b8a6, secondary to #0d9488. Enable cross-filtering so clicking a scatter cluster filters the bar chart and table." },
];

const totalCustomers = segmentData.reduce((s, d) => s + d.customers, 0);
const topSegment = segmentData.reduce((top, d) => (d.revenue > top.revenue ? d : top), segmentData[0]);
const avgRetention = segmentData.reduce((s, d) => s + d.retention, 0) / segmentData.length;
const totalRevenue = segmentData.reduce((s, d) => s + d.revenue, 0);

const kpis = [
  { label: "Total Revenue", value: `$${(totalRevenue / 1000).toFixed(0)}K`, sub: `${segmentData.length} segments` },
  { label: "Top Segment", value: topSegment.segment, sub: `$${(topSegment.revenue / 1000).toFixed(0)}K rev` },
  { label: "Avg Retention", value: `${avgRetention.toFixed(1)}%`, sub: "Across segments" },
  { label: "Total Customers", value: totalCustomers.toLocaleString(), sub: "All segments" },
];

const groups = ["A", "B", "C"].map((cat) => scatterData.filter((d) => d.category === cat));
const segmentBarData = [...segmentData].sort((a, b) => b.revenue - a.revenue);

const SEGMENT_COLORS = [palette[0].hex, palette[1].hex, palette[2].hex, palette[3].hex, palette[4].hex];

export default function ScatterCluster() {
  return (
    <DashboardShell title="Market Segmentation Dashboard" subtitle="Customer clusters and segment performance analysis" palette={palette} powerBISteps={powerBISteps}>
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

      {/* Main Scatter Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="mb-6">
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Customer Cluster Map</h4>
        <div className="flex items-center gap-4 mb-2">
          {["A", "B", "C"].map((cat) => (
            <div key={cat} className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CLUSTER_COLORS[cat] }} />
              <span className="text-xs text-[--color-muted]">Cluster {cat}</span>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" />
            <XAxis dataKey="x" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} name="Engagement" />
            <YAxis dataKey="y" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} name="Value" />
            <ZAxis dataKey="size" range={[30, 300]} />
            <Tooltip
              contentStyle={{ background: "rgba(18,18,26,0.95)", border: `1px solid ${palette[0].hex}40`, borderRadius: 8, color: "#e8e8ed" }}
              cursor={{ strokeDasharray: "3 3" }}
            />
            {groups.map((data, i) => (
              <Scatter key={["A", "B", "C"][i]} data={data} fill={CLUSTER_COLORS[["A", "B", "C"][i]]} fillOpacity={0.7} animationDuration={1200} name={`Cluster ${["A", "B", "C"][i]}`} />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Segment Revenue Bar Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="mb-6">
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Revenue by Segment</h4>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={segmentBarData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
            <XAxis dataKey="segment" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip
              contentStyle={{ background: "rgba(18,18,26,0.95)", border: `1px solid ${palette[0].hex}40`, borderRadius: 8, color: "#e8e8ed" }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
            />
            <Bar dataKey="revenue" radius={[6, 6, 0, 0]} animationDuration={1000}>
              {segmentBarData.map((_, i) => (
                <Cell key={i} fill={SEGMENT_COLORS[i % SEGMENT_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Segment Details Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}>
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
              </tr>
            </thead>
            <tbody>
              {segmentBarData.map((d, i) => (
                <tr key={d.segment} className="border-t border-[--color-border]" style={{ backgroundColor: i % 2 === 0 ? `${palette[4].hex}08` : "transparent" }}>
                  <td className="py-2.5 px-4 text-[--color-foreground] font-medium flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: SEGMENT_COLORS[i] }} />
                    {d.segment}
                  </td>
                  <td className="py-2.5 px-4 text-right text-[--color-foreground]">${(d.revenue / 1000).toFixed(0)}K</td>
                  <td className="py-2.5 px-4 text-right text-[--color-muted]">{d.customers.toLocaleString()}</td>
                  <td className="py-2.5 px-4 text-right text-[--color-foreground]">${d.avgOrder.toLocaleString()}</td>
                  <td className="py-2.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="font-medium" style={{ color: d.retention >= 80 ? palette[0].hex : d.retention >= 70 ? palette[3].hex : "#fbbf24" }}>
                        {d.retention}%
                      </span>
                      <span className="w-12 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: `${palette[4].hex}20` }}>
                        <span className="block h-full rounded-full" style={{ width: `${d.retention}%`, backgroundColor: d.retention >= 80 ? palette[0].hex : d.retention >= 70 ? palette[3].hex : "#fbbf24" }} />
                      </span>
                    </span>
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
