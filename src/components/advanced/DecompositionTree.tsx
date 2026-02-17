"use client";
import { motion } from "framer-motion";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";

interface TreeNode {
  name: string;
  value: number;
  children?: TreeNode[];
}

const treeData: TreeNode = {
  name: "Total Revenue",
  value: 885000,
  children: [
    {
      name: "Products",
      value: 620000,
      children: [
        { name: "Cloud Platform", value: 245000 },
        { name: "Analytics Suite", value: 180000 },
        { name: "Data Warehouse", value: 156000 },
        { name: "Other", value: 39000 },
      ],
    },
    {
      name: "Services",
      value: 265000,
      children: [
        { name: "Consulting", value: 120000 },
        { name: "Training", value: 85000 },
        { name: "Support", value: 60000 },
      ],
    },
  ],
};

function TreeNodeComponent({ node, depth, inView }: { node: TreeNode; depth: number; inView: boolean }) {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  const colors = ["#6366f1", "#a855f7", "#ec4899", "#f59e0b"];
  const color = colors[depth % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.4, delay: depth * 0.15 }}
      className="ml-4"
    >
      <button
        onClick={() => hasChildren && setExpanded(!expanded)}
        className="flex items-center gap-2 py-1.5 group cursor-pointer"
      >
        {hasChildren && (
          <motion.span animate={{ rotate: expanded ? 90 : 0 }} className="text-[#71717a] text-xs">▶</motion.span>
        )}
        {!hasChildren && <span className="w-3" />}
        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
        <span className="text-sm text-[#e8e8ed] group-hover:text-[#6366f1] transition-colors">{node.name}</span>
        <span className="text-sm font-semibold" style={{ color }}>${(node.value / 1000).toFixed(0)}k</span>
      </button>
      {expanded && hasChildren && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} transition={{ duration: 0.3 }}>
          {node.children!.map((child) => (
            <TreeNodeComponent key={child.name} node={child} depth={depth + 1} inView={inView} />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function DecompositionTree() {
  const [ref, inView] = useInView(0.1);
  return (
    <ChartWrapper title="Decomposition Tree" description="Hierarchical revenue breakdown with drill-down">
      <div ref={ref} className="py-2">
        <TreeNodeComponent node={treeData} depth={0} inView={inView} />
      </div>
    </ChartWrapper>
  );
}
