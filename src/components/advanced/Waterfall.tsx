"use client";
import { motion } from "framer-motion";
import { waterfallData, monthlyData } from "@/data/datasets";
import { useInView } from "@/hooks/useInView";
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
  Legend,
} from "recharts";
import DashboardShell, {
  PaletteColor,
  PowerBIStep,
} from "@/components/ui/DashboardShell";

const palette: PaletteColor[] = [
  { hex: "#3b82f6", label: "Steel Blue" },
  { hex: "#2563eb", label: "Royal Blue" },
  { hex: "#1d4ed8", label: "Deep Blue" },
  { hex: "#93c5fd", label: "Light Sky" },
  { hex: "#1e3a5f", label: "Navy" },
];

const powerBISteps: PowerBIStep[] = [
  {
    step: "Import revenue bridge data",
    detail:
      "Load the waterfall dataset into Power BI Desktop via Get Data > Excel/CSV. Ensure columns include Name, Value, and Type (total/increase/decrease).",
  },
  {
    step: "Add a Waterfall chart visual",
    detail:
      'From the Visualizations pane, select the Waterfall chart. Drag "Name" to Category and "Value" to Y-axis.',
  },
  {
    step: "Configure sentiment colors",
    detail:
      'Go to Format > Data colors. Set Increase to #3b82f6, Decrease to #1d4ed8, and Total to #1e3a5f.',
  },
  {
    step: "Add KPI cards",
    detail:
      "Insert four Card visuals above the chart. Bind them to Starting Revenue, Net Change, Ending Revenue, and Growth % using DAX measures.",
  },
  {
    step: "Create monthly trend line chart",
    detail:
      "Add a Line chart visual below. Map Month to X-axis, Revenue and Profit to Y-axis lines with colors #3b82f6 and #93c5fd.",
  },
  {
    step: "Add data labels & formatting",
    detail:
      'Enable data labels on the waterfall bars. Format the tooltip to show dollar amounts. Apply the "Steel Blue" theme to all visuals.',
  },
  {
    step: "Arrange dashboard layout",
    detail:
      "Position KPI cards in a row at the top, waterfall chart in the center, and trend chart at the bottom. Align and distribute evenly.",
  },
];

export default function Waterfall() {
  const [ref, inView] = useInView(0.1);

  // Process waterfall data for custom SVG rendering
  let cumulative = 0;
  const processed = waterfallData.map((d) => {
    if (d.type === "total") {
      const result = { ...d, start: 0, end: d.value };
      cumulative = d.value;
      return result;
    }
    const start = cumulative;
    cumulative += d.value;
    return {
      ...d,
      start: Math.min(start, cumulative),
      end: Math.max(start, cumulative),
    };
  });

  const maxVal = Math.max(...processed.map((d) => d.end));
  const totalChange =
    waterfallData[waterfallData.length - 1].value - waterfallData[0].value;
  const pctGrowth = ((totalChange / waterfallData[0].value) * 100).toFixed(1);

  const kpis = [
    {
      label: "Starting Revenue",
      value: `$${(waterfallData[0].value / 1000).toFixed(0)}k`,
      sub: "Base period",
      color: palette[4].hex,
    },
    {
      label: "Net Change",
      value: `+$${(totalChange / 1000).toFixed(0)}k`,
      sub: `${pctGrowth}% growth`,
      color: palette[0].hex,
    },
    {
      label: "Ending Revenue",
      value: `$${(waterfallData[waterfallData.length - 1].value / 1000).toFixed(0)}k`,
      sub: "Current period",
      color: palette[1].hex,
    },
    {
      label: "Avg Monthly Rev",
      value: `$${(monthlyData.reduce((s, d) => s + d.revenue, 0) / monthlyData.length / 1000).toFixed(0)}k`,
      sub: "12-month average",
      color: palette[2].hex,
    },
  ];

  // Monthly trend data
  const trendData = monthlyData.map((d) => ({
    month: d.month,
    revenue: d.revenue,
    profit: d.profit,
    cost: d.cost,
  }));

  return (
    <DashboardShell
      title="Revenue Bridge Dashboard"
      subtitle="Waterfall analysis of revenue drivers and monthly performance trends"
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

        {/* Main Waterfall Chart - Custom SVG */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-xl border border-[--color-border] bg-[--color-card] p-4"
        >
          <div className="text-sm font-semibold text-[--color-foreground] mb-3">
            Revenue Bridge
          </div>
          <svg viewBox="0 0 700 280" className="w-full h-auto">
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
              <g key={pct}>
                <line
                  x1={60}
                  y1={240 - pct * 200}
                  x2={680}
                  y2={240 - pct * 200}
                  stroke="#1e3a5f"
                  strokeOpacity={0.3}
                  strokeDasharray="3 3"
                />
                <text
                  x={55}
                  y={244 - pct * 200}
                  textAnchor="end"
                  fill="#71717a"
                  fontSize={10}
                >
                  ${((maxVal * pct) / 1000).toFixed(0)}k
                </text>
              </g>
            ))}
            {/* Waterfall bars */}
            {processed.map((d, i) => {
              const barWidth = 70;
              const gap = (620 - barWidth * processed.length) / (processed.length - 1);
              const x = 65 + i * (barWidth + gap);
              const yStart = 240 - (d.start / maxVal) * 200;
              const yEnd = 240 - (d.end / maxVal) * 200;
              const barHeight = Math.abs(yEnd - yStart);
              const barY = Math.min(yStart, yEnd);

              let fill = palette[0].hex;
              if (d.type === "total") fill = palette[4].hex;
              else if (d.value < 0) fill = palette[2].hex;

              return (
                <motion.g key={d.name}>
                  {/* Connector line */}
                  {i > 0 && d.type !== "total" && (
                    <line
                      x1={x - gap}
                      y1={240 - (processed[i].start / maxVal) * 200 + (d.value < 0 ? barHeight : 0)}
                      x2={x}
                      y2={240 - (processed[i].start / maxVal) * 200 + (d.value < 0 ? barHeight : 0)}
                      stroke="#93c5fd"
                      strokeWidth={1}
                      strokeDasharray="3 2"
                      strokeOpacity={0.4}
                    />
                  )}
                  <motion.rect
                    x={x}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    rx={4}
                    fill={fill}
                    initial={{ height: 0, y: 240 }}
                    animate={inView ? { height: barHeight, y: barY } : {}}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  />
                  {/* Value label */}
                  <motion.text
                    x={x + barWidth / 2}
                    y={barY - 6}
                    textAnchor="middle"
                    fill={palette[3].hex}
                    fontSize={10}
                    fontWeight={600}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: i * 0.1 + 0.4 }}
                  >
                    {d.type === "total"
                      ? `$${(d.value / 1000).toFixed(0)}k`
                      : `${d.value >= 0 ? "+" : ""}$${(d.value / 1000).toFixed(0)}k`}
                  </motion.text>
                  {/* Name label */}
                  <text
                    x={x + barWidth / 2}
                    y={258}
                    textAnchor="middle"
                    fill="#71717a"
                    fontSize={9}
                  >
                    {d.name.length > 10 ? d.name.slice(0, 10) + "..." : d.name}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </motion.div>

        {/* Secondary: Monthly Revenue & Profit Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-xl border border-[--color-border] bg-[--color-card] p-4"
        >
          <div className="text-sm font-semibold text-[--color-foreground] mb-3">
            Monthly Revenue & Profit Trend
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e3a5f"
                strokeOpacity={0.3}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                stroke="#71717a"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#71717a"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(18,18,26,0.95)",
                  border: `1px solid ${palette[4].hex}`,
                  borderRadius: 8,
                  color: "#e8e8ed",
                }}
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "",
                ]}
              />
              <Legend wrapperStyle={{ fontSize: 11, color: "#71717a" }} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke={palette[0].hex}
                strokeWidth={2}
                dot={{ r: 3, fill: palette[0].hex }}
                name="Revenue"
                animationDuration={1200}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke={palette[3].hex}
                strokeWidth={2}
                dot={{ r: 3, fill: palette[3].hex }}
                name="Profit"
                animationDuration={1200}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Breakdown Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="rounded-xl border border-[--color-border] bg-[--color-card] p-4"
        >
          <div className="text-sm font-semibold text-[--color-foreground] mb-3">
            Bridge Components Detail
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[--color-border]">
                  <th className="text-left p-2 text-[--color-muted] font-medium">
                    Component
                  </th>
                  <th className="text-right p-2 text-[--color-muted] font-medium">
                    Value
                  </th>
                  <th className="text-right p-2 text-[--color-muted] font-medium">
                    Type
                  </th>
                  <th className="text-right p-2 text-[--color-muted] font-medium">
                    Impact
                  </th>
                </tr>
              </thead>
              <tbody>
                {waterfallData.map((d) => (
                  <tr
                    key={d.name}
                    className="border-b border-[--color-border] border-opacity-30"
                  >
                    <td className="p-2 text-[--color-foreground] font-medium">
                      {d.name}
                    </td>
                    <td className="p-2 text-right font-semibold" style={{ color: palette[0].hex }}>
                      ${(Math.abs(d.value) / 1000).toFixed(0)}k
                    </td>
                    <td className="p-2 text-right">
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                        style={{
                          backgroundColor:
                            d.type === "total"
                              ? `${palette[4].hex}30`
                              : d.type === "increase"
                                ? `${palette[0].hex}30`
                                : `${palette[2].hex}30`,
                          color:
                            d.type === "total"
                              ? palette[3].hex
                              : d.type === "increase"
                                ? palette[0].hex
                                : palette[2].hex,
                        }}
                      >
                        {d.type}
                      </span>
                    </td>
                    <td className="p-2 text-right text-[--color-muted]">
                      {d.type === "total"
                        ? "--"
                        : `${((d.value / waterfallData[0].value) * 100).toFixed(1)}%`}
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
