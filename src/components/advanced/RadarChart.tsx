"use client";
import { motion } from "framer-motion";
import { radarData, productData } from "@/data/datasets";
import { useInView } from "@/hooks/useInView";
import {
  RadarChart as RChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";
import DashboardShell, {
  PaletteColor,
  PowerBIStep,
} from "@/components/ui/DashboardShell";

const palette: PaletteColor[] = [
  { hex: "#9333ea", label: "Purple" },
  { hex: "#7e22ce", label: "Deep Purple" },
  { hex: "#eab308", label: "Gold" },
  { hex: "#fbbf24", label: "Amber" },
  { hex: "#e9d5ff", label: "Lavender" },
];

const powerBISteps: PowerBIStep[] = [
  {
    step: "Import performance metrics data",
    detail:
      "Load the radar dataset with columns: Metric, Current, Target, and Industry. Use Get Data > Excel or enter data manually.",
  },
  {
    step: "Insert a Radar/Spider chart",
    detail:
      'Power BI does not have a native radar chart. Install "Radar Chart" from AppSource. Add it to the canvas and bind Metric to Category, values to Value fields.',
  },
  {
    step: "Configure series colors",
    detail:
      "Set Current series to #9333ea (Purple), Target to #eab308 (Gold), and Industry to #e9d5ff (Lavender) in Format > Data colors.",
  },
  {
    step: "Add KPI cards row",
    detail:
      "Create four Card visuals for top-level metrics: Avg Score, Top Metric, Gap to Target, and Industry Lead. Use DAX AVERAGE and MAX functions.",
  },
  {
    step: "Create product margin bar chart",
    detail:
      "Add a Clustered Bar chart. Map Product to Y-axis and Margin to X-axis. Apply conditional formatting with gold (#eab308) for high margins.",
  },
  {
    step: "Add gap analysis table",
    detail:
      "Insert a Table visual with Metric, Current, Target, Gap columns. Add conditional formatting to highlight negative gaps in purple.",
  },
  {
    step: "Apply theme and finalize",
    detail:
      'Apply a custom Purple/Gold theme via View > Themes > Custom. Set background to dark, text to #e9d5ff.',
  },
];

export default function RadarChartViz() {
  const [ref, inView] = useInView(0.1);

  const avgCurrent =
    radarData.reduce((s, d) => s + d.current, 0) / radarData.length;
  const avgTarget =
    radarData.reduce((s, d) => s + d.target, 0) / radarData.length;
  const topMetric = radarData.reduce((best, d) =>
    d.current > best.current ? d : best
  );
  const biggestGap = radarData.reduce((worst, d) =>
    d.target - d.current > worst.target - worst.current ? d : worst
  );

  const kpis = [
    {
      label: "Avg Performance",
      value: `${avgCurrent.toFixed(1)}`,
      sub: "Across all metrics",
      color: palette[0].hex,
    },
    {
      label: "Top Metric",
      value: topMetric.metric,
      sub: `Score: ${topMetric.current}`,
      color: palette[2].hex,
    },
    {
      label: "Avg Target Gap",
      value: `${(avgTarget - avgCurrent).toFixed(1)}pts`,
      sub: "Points to close",
      color: palette[1].hex,
    },
    {
      label: "Biggest Gap",
      value: biggestGap.metric,
      sub: `${biggestGap.target - biggestGap.current}pts behind`,
      color: palette[3].hex,
    },
  ];

  const marginData = productData
    .slice()
    .sort((a, b) => b.margin - a.margin)
    .slice(0, 6);

  return (
    <DashboardShell
      title="Performance Radar Dashboard"
      subtitle="Multi-axis performance benchmarking against targets and industry averages"
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
                className="text-2xl font-bold"
                style={{ color: kpi.color }}
              >
                {kpi.value}
              </div>
              <div className="text-[10px] text-[--color-muted] mt-1">
                {kpi.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Radar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-xl border border-[--color-border] bg-[--color-card] p-4"
        >
          <div className="text-sm font-semibold text-[--color-foreground] mb-3">
            Performance Radar
          </div>
          <ResponsiveContainer width="100%" height={340}>
            <RChart data={radarData}>
              <PolarGrid stroke={palette[1].hex} strokeOpacity={0.25} />
              <PolarAngleAxis
                dataKey="metric"
                stroke="#71717a"
                fontSize={11}
                tick={{ fill: palette[4].hex, fontSize: 10 }}
              />
              <PolarRadiusAxis
                stroke={palette[1].hex}
                strokeOpacity={0.2}
                fontSize={9}
                tick={{ fill: "#71717a" }}
              />
              <Radar
                name="Current"
                dataKey="current"
                stroke={palette[0].hex}
                fill={palette[0].hex}
                fillOpacity={0.3}
                animationDuration={1200}
              />
              <Radar
                name="Target"
                dataKey="target"
                stroke={palette[2].hex}
                fill={palette[2].hex}
                fillOpacity={0.1}
                strokeDasharray="4 4"
                animationDuration={1200}
              />
              <Radar
                name="Industry"
                dataKey="industry"
                stroke={palette[4].hex}
                fill={palette[4].hex}
                fillOpacity={0.05}
                animationDuration={1200}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(18,18,26,0.95)",
                  border: `1px solid ${palette[1].hex}`,
                  borderRadius: 8,
                  color: "#e8e8ed",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: 11, color: "#71717a" }}
              />
            </RChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Secondary: Product Margin Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-xl border border-[--color-border] bg-[--color-card] p-4"
        >
          <div className="text-sm font-semibold text-[--color-foreground] mb-3">
            Product Margin Ranking
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={marginData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={palette[1].hex}
                strokeOpacity={0.15}
                horizontal={false}
              />
              <XAxis
                type="number"
                stroke="#71717a"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                type="category"
                dataKey="product"
                stroke="#71717a"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                width={110}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(18,18,26,0.95)",
                  border: `1px solid ${palette[1].hex}`,
                  borderRadius: 8,
                  color: "#e8e8ed",
                }}
                formatter={(value: number) => [`${value}%`, "Margin"]}
              />
              <Bar
                dataKey="margin"
                radius={[0, 4, 4, 0]}
                animationDuration={1000}
              >
                {marginData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={i < 2 ? palette[2].hex : i < 4 ? palette[0].hex : palette[1].hex}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Gap Analysis Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="rounded-xl border border-[--color-border] bg-[--color-card] p-4"
        >
          <div className="text-sm font-semibold text-[--color-foreground] mb-3">
            Target Gap Analysis
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[--color-border]">
                  <th className="text-left p-2 text-[--color-muted] font-medium">Metric</th>
                  <th className="text-right p-2 text-[--color-muted] font-medium">Current</th>
                  <th className="text-right p-2 text-[--color-muted] font-medium">Target</th>
                  <th className="text-right p-2 text-[--color-muted] font-medium">Gap</th>
                  <th className="text-right p-2 text-[--color-muted] font-medium">vs Industry</th>
                </tr>
              </thead>
              <tbody>
                {radarData.map((d) => {
                  const gap = d.target - d.current;
                  const vsIndustry = d.current - d.industry;
                  return (
                    <tr
                      key={d.metric}
                      className="border-b border-[--color-border] border-opacity-30"
                    >
                      <td className="p-2 text-[--color-foreground] font-medium">
                        {d.metric}
                      </td>
                      <td className="p-2 text-right" style={{ color: palette[0].hex }}>
                        {d.current}
                      </td>
                      <td className="p-2 text-right" style={{ color: palette[2].hex }}>
                        {d.target}
                      </td>
                      <td className="p-2 text-right">
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                          style={{
                            backgroundColor: gap > 5 ? `${palette[0].hex}25` : `${palette[2].hex}25`,
                            color: gap > 5 ? palette[0].hex : palette[2].hex,
                          }}
                        >
                          -{gap}pts
                        </span>
                      </td>
                      <td
                        className="p-2 text-right font-semibold"
                        style={{ color: vsIndustry > 0 ? palette[2].hex : palette[0].hex }}
                      >
                        {vsIndustry > 0 ? "+" : ""}
                        {vsIndustry}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DashboardShell>
  );
}
