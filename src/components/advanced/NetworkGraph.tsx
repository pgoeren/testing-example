"use client";
import { motion } from "framer-motion";
import { networkData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useInView } from "@/hooks/useInView";
import { useState, useMemo } from "react";

const GROUP_COLORS: Record<number, string> = { 1: "#6366f1", 2: "#a855f7", 3: "#22c55e", 4: "#ec4899" };

export default function NetworkGraph() {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState<string | null>(null);

  const positions = useMemo(() => {
    const pos: Record<string, { x: number; y: number }> = {};
    const cx = 300, cy = 170;
    networkData.nodes.forEach((node, i) => {
      const angle = (i / networkData.nodes.length) * Math.PI * 2 - Math.PI / 2;
      const radius = node.group === 1 ? 0 : 80 + node.group * 30;
      pos[node.id] = {
        x: node.id === "CEO" ? cx : cx + Math.cos(angle) * radius,
        y: node.id === "CEO" ? cy : cy + Math.sin(angle) * radius,
      };
    });
    return pos;
  }, []);

  return (
    <ChartWrapper title="Network Graph" description="Interactive organizational network visualization">
      <div ref={ref}>
        <svg viewBox="0 0 600 340" className="w-full h-auto">
          {networkData.links.map((link, i) => {
            const s = positions[link.source];
            const t = positions[link.target];
            if (!s || !t) return null;
            const isHighlighted = hovered === link.source || hovered === link.target;
            return (
              <motion.line
                key={i}
                x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                stroke={isHighlighted ? "#6366f1" : "#1e1e2e"}
                strokeWidth={isHighlighted ? 2 : 1}
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
              />
            );
          })}
          {networkData.nodes.map((node, i) => {
            const pos = positions[node.id];
            if (!pos) return null;
            const isHighlighted = hovered === node.id || networkData.links.some(
              (l) => (l.source === hovered && l.target === node.id) || (l.target === hovered && l.source === node.id)
            );
            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
              >
                <circle cx={pos.x} cy={pos.y} r={node.size / 2} fill={GROUP_COLORS[node.group] || "#6366f1"} opacity={isHighlighted || !hovered ? 0.9 : 0.3} />
                <text x={pos.x} y={pos.y + node.size / 2 + 12} textAnchor="middle" fill="#71717a" fontSize={9} opacity={isHighlighted || !hovered ? 1 : 0.3}>
                  {node.id}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>
    </ChartWrapper>
  );
}
