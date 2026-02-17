"use client";
import { motion } from "framer-motion";
import { sankeyData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useInView } from "@/hooks/useInView";

const LAYER_X = [50, 220, 390, 520];
const COLORS = ["#6366f1", "#a855f7", "#ec4899", "#f59e0b", "#22c55e", "#06b6d4", "#f97316", "#84cc16", "#6366f1", "#a855f7", "#22c55e", "#22c55e", "#ef4444"];

export default function Sankey() {
  const [ref, inView] = useInView(0.1);

  // Assign layers
  const layers = [
    [0, 1, 2, 3, 4],          // Sources
    [5, 6, 7],                  // Landing pages
    [8, 9, 10],                 // Actions
    [11, 12],                   // Outcomes
  ];

  // Position nodes
  const nodePositions: { x: number; y: number; height: number }[] = [];
  const nodeValues = new Array(sankeyData.nodes.length).fill(0);

  sankeyData.links.forEach((l) => {
    nodeValues[l.source] = (nodeValues[l.source] || 0) + l.value;
    nodeValues[l.target] = (nodeValues[l.target] || 0) + l.value;
  });

  layers.forEach((layer, li) => {
    const totalHeight = layer.reduce((s, ni) => s + Math.max(nodeValues[ni], 10), 0);
    const spacing = (280 - totalHeight * 1.5) / (layer.length + 1);
    let yOffset = 20 + spacing;
    layer.forEach((ni) => {
      const h = Math.max((nodeValues[ni] / 80) * 40, 12);
      nodePositions[ni] = { x: LAYER_X[li], y: yOffset, height: h };
      yOffset += h + spacing;
    });
  });

  return (
    <ChartWrapper title="Sankey Diagram" description="Flow visualization showing traffic through conversion stages">
      <div ref={ref}>
        <svg viewBox="0 0 600 320" className="w-full h-auto">
          {sankeyData.links.map((link, i) => {
            const s = nodePositions[link.source];
            const t = nodePositions[link.target];
            if (!s || !t) return null;
            const thickness = Math.max((link.value / 50) * 15, 2);
            const path = `M${s.x + 80},${s.y + s.height / 2} C${(s.x + 80 + t.x) / 2},${s.y + s.height / 2} ${(s.x + 80 + t.x) / 2},${t.y + t.height / 2} ${t.x},${t.y + t.height / 2}`;
            return (
              <motion.path
                key={i}
                d={path}
                fill="none"
                stroke={COLORS[link.source] || "#6366f1"}
                strokeWidth={thickness}
                strokeOpacity={0.25}
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.8, delay: i * 0.03 }}
              />
            );
          })}
          {sankeyData.nodes.map((name, i) => {
            const pos = nodePositions[i];
            if (!pos) return null;
            return (
              <motion.g
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <rect x={pos.x} y={pos.y} width={80} height={pos.height} rx={4} fill={COLORS[i] || "#6366f1"} opacity={0.8} />
                <text x={pos.x + 40} y={pos.y + pos.height / 2 + 4} textAnchor="middle" fill="#e8e8ed" fontSize={8} fontWeight={600}>
                  {name}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>
    </ChartWrapper>
  );
}
