"use client";
import { motion } from "framer-motion";
import { VisualizationMeta } from "@/data/types";
import { categoryColors } from "@/data/visualizations";

interface VisualizationCardProps {
  viz: VisualizationMeta;
  index: number;
  onClick: () => void;
}

export default function VisualizationCard({
  viz,
  index,
  onClick,
}: VisualizationCardProps) {
  const color = categoryColors[viz.category];

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.02, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass glass-hover rounded-xl p-5 text-left cursor-pointer transition-colors duration-200 group w-full"
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: `${color}20`,
            color: color,
          }}
        >
          {viz.category}
        </span>
        <span className="text-xs text-[--color-muted]">#{index + 1}</span>
      </div>
      <h3 className="text-sm font-semibold text-[--color-foreground] mb-1 group-hover:text-[--color-accent] transition-colors">
        {viz.title}
      </h3>
      <p className="text-xs text-[--color-muted] line-clamp-2">
        {viz.description}
      </p>
      <div className="flex flex-wrap gap-1 mt-3">
        {viz.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-1.5 py-0.5 rounded bg-[--color-border] text-[--color-muted]"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.button>
  );
}
