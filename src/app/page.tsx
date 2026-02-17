"use client";

import { useState, useMemo, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { visualizations, categoryLabels, categoryColors } from "@/data/visualizations";
import type { VisualizationCategory } from "@/data/types";
import Modal from "@/components/ui/Modal";
import CardPreview from "@/components/ui/CardPreview";

// Lazy-load visualization components
const components: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  "gradient-bar": lazy(() => import("@/components/classic/GradientBar")),
  "glow-line": lazy(() => import("@/components/classic/GlowLine")),
  "glass-area": lazy(() => import("@/components/classic/GlassArea")),
  "donut-stats": lazy(() => import("@/components/classic/DonutStats")),
  "pie-reveal": lazy(() => import("@/components/classic/PieReveal")),
  "scatter-cluster": lazy(() => import("@/components/classic/ScatterCluster")),
  "combo-chart": lazy(() => import("@/components/classic/ComboChart")),
  "kpi-counter": lazy(() => import("@/components/classic/KPICounter")),
  "stacked-bar": lazy(() => import("@/components/classic/StackedBar")),
  "funnel-chart": lazy(() => import("@/components/classic/FunnelChart")),
  "waterfall": lazy(() => import("@/components/advanced/Waterfall")),
  "radar-chart": lazy(() => import("@/components/advanced/RadarChart")),
  "treemap": lazy(() => import("@/components/advanced/Treemap")),
  "heatmap": lazy(() => import("@/components/advanced/Heatmap")),
  "cohort-grid": lazy(() => import("@/components/advanced/CohortGrid")),
  "decomposition": lazy(() => import("@/components/advanced/DecompositionTree")),
  "network-graph": lazy(() => import("@/components/advanced/NetworkGraph")),
  "sankey": lazy(() => import("@/components/advanced/Sankey")),
  "calendar-heatmap": lazy(() => import("@/components/advanced/CalendarHeatmap")),
  "variance-bridge": lazy(() => import("@/components/advanced/VarianceBridge")),
  "particle-flow": lazy(() => import("@/components/artistic/ParticleFlow")),
  "liquid-gauge": lazy(() => import("@/components/artistic/LiquidGauge")),
  "circular-timeline": lazy(() => import("@/components/artistic/CircularTimeline")),
  "morphing-chart": lazy(() => import("@/components/artistic/MorphingChart")),
  "spiral-radial": lazy(() => import("@/components/artistic/SpiralRadial")),
  "constellation": lazy(() => import("@/components/artistic/Constellation")),
  "floating-3d": lazy(() => import("@/components/artistic/Floating3D")),
  "aurora-chart": lazy(() => import("@/components/artistic/AuroraChart")),
  "neumorphic-kpi": lazy(() => import("@/components/artistic/NeumorphicKPI")),
  "glassmorphic-dash": lazy(() => import("@/components/artistic/GlassmorphicDash")),
  "boardroom": lazy(() => import("@/components/executive/Boardroom")),
  "investor-snapshot": lazy(() => import("@/components/executive/InvestorSnapshot")),
  "saas-dashboard": lazy(() => import("@/components/executive/SaasDashboard")),
  "neon-trading": lazy(() => import("@/components/executive/NeonTrading")),
  "financial-wall": lazy(() => import("@/components/executive/FinancialWall")),
  "territory-map": lazy(() => import("@/components/executive/TerritoryMap")),
  "leaderboard": lazy(() => import("@/components/executive/Leaderboard")),
  "goal-tracker": lazy(() => import("@/components/executive/GoalTracker")),
  "forecast-view": lazy(() => import("@/components/executive/ForecastView")),
  "scenario-compare": lazy(() => import("@/components/executive/ScenarioCompare")),
};

const categories: (VisualizationCategory | "all")[] = [
  "all",
  "classic",
  "advanced",
  "artistic",
  "executive",
];

function VizCard({
  viz,
  index,
  onClick,
}: {
  viz: (typeof visualizations)[number];
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const color = categoryColors[viz.category];
  const Component = components[viz.id];

  return (
    <motion.button
      key={viz.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.02, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass glass-hover rounded-xl p-4 text-left cursor-pointer transition-colors duration-200 group w-full"
    >
      {/* Live preview thumbnail */}
      {Component && (
        <CardPreview Component={Component} hovered={hovered} />
      )}

      <div className="flex items-start justify-between mb-2">
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: `${color}20`,
            color: color,
          }}
        >
          {categoryLabels[viz.category]}
        </span>
        <span className="text-xs text-[--color-muted]">#{index + 1}</span>
      </div>
      <h3 className="text-sm font-semibold text-[--color-foreground] mb-1 group-hover:text-[--color-accent] transition-colors">
        {viz.title}
      </h3>
      <p className="text-xs text-[--color-muted] line-clamp-2">
        {viz.description}
      </p>
      <div className="flex flex-wrap gap-1 mt-2">
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

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<VisualizationCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedViz, setSelectedViz] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return visualizations.filter((v) => {
      const matchesCategory = activeCategory === "all" || v.category === activeCategory;
      const matchesSearch =
        !search ||
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.description.toLowerCase().includes(search.toLowerCase()) ||
        v.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch && components[v.id];
    });
  }, [activeCategory, search]);

  const selectedMeta = visualizations.find((v) => v.id === selectedViz);
  const SelectedComponent = selectedViz ? components[selectedViz] : null;

  return (
    <div className="min-h-screen bg-[--color-background] text-[--color-foreground]">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-[--color-border]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold gradient-text">
                Power BI Visualization Explorer
              </h1>
              <p className="text-xs text-[--color-muted] mt-0.5">
                {filtered.length} of {Object.keys(components).length} visualizations
              </p>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search visualizations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 bg-[--color-card] border border-[--color-border] rounded-lg px-3 py-2 text-sm text-[--color-foreground] placeholder:text-[--color-muted] focus:outline-none focus:border-[--color-accent] transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[--color-muted] hover:text-[--color-foreground] text-xs"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto hide-scrollbar pb-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const color = cat === "all" ? "#6366f1" : categoryColors[cat];
              const count =
                cat === "all"
                  ? Object.keys(components).length
                  : visualizations.filter((v) => v.category === cat && components[v.id]).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? `${color}20` : "transparent",
                    color: isActive ? color : "var(--color-muted)",
                  }}
                >
                  {cat === "all" ? "All" : categoryLabels[cat]}
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: isActive ? `${color}30` : "var(--color-border)",
                      color: isActive ? color : "var(--color-muted)",
                    }}
                  >
                    {count}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        border: `1px solid ${color}40`,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filtered.map((viz, i) => (
              <VizCard
                key={viz.id}
                viz={viz}
                index={i}
                onClick={() => setSelectedViz(viz.id)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[--color-muted] text-lg">No visualizations found</p>
            <p className="text-[--color-muted] text-sm mt-2">
              Try adjusting your search or category filter
            </p>
          </div>
        )}
      </main>

      {/* Modal */}
      <Modal
        open={!!selectedViz}
        onClose={() => setSelectedViz(null)}
        title={selectedMeta?.title || ""}
      >
        {SelectedComponent && (
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-64">
                <div className="shimmer rounded-lg w-full h-full" />
              </div>
            }
          >
            <SelectedComponent />
          </Suspense>
        )}
      </Modal>
    </div>
  );
}
