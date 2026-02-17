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
  Cell,
} from "recharts";
import DashboardShell, { PaletteColor, PowerBIStep } from "@/components/ui/DashboardShell";
import { funnelData } from "@/data/datasets";
import { useInView } from "@/hooks/useInView";

const palette: PaletteColor[] = [
  { hex: "#84cc16", label: "Lime" },
  { hex: "#65a30d", label: "Dark Lime" },
  { hex: "#4d7c0f", label: "Deep Lime" },
  { hex: "#bef264", label: "Light Lime" },
  { hex: "#d9f99d", label: "Pale Lime" },
];

const FUNNEL_COLORS = [palette[0].hex, palette[1].hex, palette[2].hex, palette[3].hex, "#a3e635", "#3f6212"];

const powerBISteps: PowerBIStep[] = [
  { step: "Import funnel data", detail: "Load the funnel dataset with stage, value, and rate columns. Ensure stages are in correct order (top to bottom of funnel)." },
  { step: "Create funnel KPI cards", detail: "Add Card visuals for Total Visits, Final Conversions, Overall Conversion Rate, and Biggest Drop-off. Use DAX: ConversionRate = DIVIDE(LASTNONBLANK(value), FIRSTNONBLANK(value))." },
  { step: "Build funnel chart", detail: "Insert a Funnel Chart visual. Place 'stage' on Category and 'value' on Values. Apply the Lime palette gradient from top (#84cc16) to bottom (#4d7c0f)." },
  { step: "Add conversion rate labels", detail: "Enable data labels showing both absolute values and conversion rates. Format labels in white text with Lime-colored percentage badges." },
  { step: "Create stage-to-stage drop-off bars", detail: "Insert a Bar Chart showing the drop-off (lost count) between each stage. Use a red-to-Lime color scale to highlight problematic stages." },
  { step: "Build conversion details table", detail: "Add a Table visual with stage, value, rate, drop-off count, and drop-off percentage columns. Apply data bars in Lime and red conditional formatting." },
  { step: "Apply Lime theme", detail: "Set primary color to #84cc16, secondary to #65a30d. Apply dark background, enable tooltips with stage details, and add a time period filter." },
];

const topOfFunnel = funnelData[0].value;
const bottomOfFunnel = funnelData[funnelData.length - 1].value;
const overallRate = ((bottomOfFunnel / topOfFunnel) * 100).toFixed(2);

const biggestDrop = funnelData.reduce((worst, d, i) => {
  if (i === 0) return worst;
  const dropCount = funnelData[i - 1].value - d.value;
  const dropRate = (dropCount / funnelData[i - 1].value) * 100;
  return dropRate > worst.rate ? { stage: d.stage, rate: dropRate, count: dropCount } : worst;
}, { stage: "", rate: 0, count: 0 });

const kpis = [
  { label: "Total Visitors", value: topOfFunnel.toLocaleString(), sub: "Top of funnel" },
  { label: "Conversions", value: bottomOfFunnel.toLocaleString(), sub: "Retained (6mo)" },
  { label: "Overall Rate", value: `${overallRate}%`, sub: "End-to-end" },
  { label: "Biggest Drop", value: `${biggestDrop.rate.toFixed(0)}%`, sub: biggestDrop.stage },
];

const dropOffData = funnelData.slice(1).map((d, i) => {
  const prev = funnelData[i];
  const lost = prev.value - d.value;
  return {
    transition: `${prev.stage.split(" ")[0]} > ${d.stage.split(" ")[0]}`,
    lost,
    retained: d.value,
    dropRate: ((lost / prev.value) * 100).toFixed(1),
  };
});

export default function FunnelChart() {
  const [ref, inView] = useInView(0.1);
  const maxValue = funnelData[0].value;

  return (
    <DashboardShell title="Conversion Funnel Dashboard" subtitle="Sales funnel analysis with stage-by-stage conversion tracking" palette={palette} powerBISteps={powerBISteps}>
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

      {/* Main Funnel Visualization */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="mb-6">
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Conversion Funnel</h4>
        <div ref={ref} className="space-y-2 py-2">
          {funnelData.map((item, i) => {
            const widthPercent = (item.value / maxValue) * 100;
            return (
              <motion.div
                key={item.stage}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                style={{ originX: 0.5 }}
                className="relative group"
              >
                <div className="flex items-center gap-3 mx-auto" style={{ maxWidth: "100%" }}>
                  <div
                    className="h-12 rounded-lg flex items-center justify-between px-4 mx-auto transition-all duration-300 group-hover:brightness-110"
                    style={{
                      width: `${Math.max(widthPercent, 15)}%`,
                      background: `linear-gradient(90deg, ${FUNNEL_COLORS[i]}, ${FUNNEL_COLORS[i]}cc)`,
                    }}
                  >
                    <span className="text-sm font-medium text-white truncate">{item.stage}</span>
                    <span className="text-sm font-bold text-white ml-2">{item.value.toLocaleString()}</span>
                  </div>
                </div>
                {i > 0 && (
                  <div className="absolute -top-1 right-4 flex items-center gap-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${palette[0].hex}20`, color: palette[3].hex }}>
                      {item.rate}% conv
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Drop-off Analysis Bar Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="mb-6">
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Stage-to-Stage Drop-off</h4>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={dropOffData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" horizontal={false} />
            <XAxis type="number" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <YAxis type="category" dataKey="transition" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} width={100} />
            <Tooltip
              contentStyle={{ background: "rgba(18,18,26,0.95)", border: `1px solid ${palette[0].hex}40`, borderRadius: 8, color: "#e8e8ed" }}
              formatter={(value: number, name: string) => [value.toLocaleString(), name === "lost" ? "Lost" : "Retained"]}
            />
            <Bar dataKey="lost" fill="#ef4444" radius={[0, 4, 4, 0]} name="lost" opacity={0.7} />
            <Bar dataKey="retained" fill={palette[0].hex} radius={[0, 4, 4, 0]} name="retained" opacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Conversion Details Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>
        <h4 className="text-sm font-semibold text-[--color-foreground] mb-3">Funnel Stage Details</h4>
        <div className="overflow-x-auto rounded-lg border border-[--color-border]">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: `${palette[2].hex}25` }}>
                <th className="text-left py-2.5 px-4 text-[--color-muted] font-semibold">Stage</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Volume</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Conv. Rate</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">Drop-off</th>
                <th className="text-right py-2.5 px-4 text-[--color-muted] font-semibold">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {funnelData.map((d, i) => {
                const dropOff = i > 0 ? funnelData[i - 1].value - d.value : 0;
                const pctOfTotal = ((d.value / maxValue) * 100).toFixed(1);
                return (
                  <tr key={d.stage} className="border-t border-[--color-border]" style={{ backgroundColor: i % 2 === 0 ? `${palette[4].hex}08` : "transparent" }}>
                    <td className="py-2.5 px-4 text-[--color-foreground] font-medium flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: FUNNEL_COLORS[i] }} />
                      {d.stage}
                    </td>
                    <td className="py-2.5 px-4 text-right" style={{ color: palette[0].hex }}>{d.value.toLocaleString()}</td>
                    <td className="py-2.5 px-4 text-right text-[--color-foreground]">{i === 0 ? "---" : `${d.rate}%`}</td>
                    <td className="py-2.5 px-4 text-right">
                      {i === 0 ? (
                        <span className="text-[--color-muted]">---</span>
                      ) : (
                        <span className="text-red-400">-{dropOff.toLocaleString()}</span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-right text-[--color-muted]">{pctOfTotal}%</td>
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
