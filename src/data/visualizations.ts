import { VisualizationMeta } from "./types";

export const visualizations: VisualizationMeta[] = [
  // Classic (Enhanced) - 10
  { id: "gradient-bar", title: "Gradient Bar Chart", description: "Animated bar chart with smooth gradient fills", category: "classic", tags: ["bar", "gradient", "animated"] },
  { id: "glow-line", title: "Glow Trail Line Chart", description: "Line chart with luminous glow trail effect", category: "classic", tags: ["line", "glow", "trail"] },
  { id: "glass-area", title: "Glass Area Chart", description: "Area chart with frosted glass fill effect", category: "classic", tags: ["area", "glass", "smooth"] },
  { id: "donut-stats", title: "Donut with Center Stats", description: "Donut chart displaying key metrics in center", category: "classic", tags: ["donut", "kpi", "circular"] },
  { id: "pie-reveal", title: "Animated Pie Reveal", description: "Pie chart with sequential slice animation", category: "classic", tags: ["pie", "animated", "reveal"] },
  { id: "scatter-cluster", title: "Dynamic Scatter Plot", description: "Scatter plot with dynamic clustering visualization", category: "classic", tags: ["scatter", "cluster", "interactive"] },
  { id: "combo-chart", title: "Combo Bar + Line", description: "Combined bar and line chart overlay", category: "classic", tags: ["combo", "bar", "line"] },
  { id: "kpi-counter", title: "KPI Animated Counter", description: "KPI cards with smooth counting animation", category: "classic", tags: ["kpi", "counter", "card"] },
  { id: "stacked-bar", title: "Stacked Bar Expansion", description: "Stacked bar chart with hover expansion detail", category: "classic", tags: ["stacked", "bar", "interactive"] },
  { id: "funnel-chart", title: "Funnel Chart", description: "Sales funnel with conversion rate display", category: "classic", tags: ["funnel", "conversion", "sales"] },
  // Advanced Analytical - 10
  { id: "waterfall", title: "Waterfall Chart", description: "Revenue bridge showing incremental changes", category: "advanced", tags: ["waterfall", "bridge", "financial"] },
  { id: "radar-chart", title: "Radar Chart", description: "Multi-axis performance comparison radar", category: "advanced", tags: ["radar", "comparison", "multi-axis"] },
  { id: "treemap", title: "Animated Treemap", description: "Proportional treemap with growth animation", category: "advanced", tags: ["treemap", "proportional", "animated"] },
  { id: "heatmap", title: "Soft Gradient Heatmap", description: "Activity heatmap with soft gradient colors", category: "advanced", tags: ["heatmap", "gradient", "activity"] },
  { id: "cohort-grid", title: "Cohort Retention Grid", description: "User cohort analysis with retention matrix", category: "advanced", tags: ["cohort", "retention", "matrix"] },
  { id: "decomposition", title: "Decomposition Tree", description: "Hierarchical breakdown of metrics", category: "advanced", tags: ["tree", "hierarchy", "drill-down"] },
  { id: "network-graph", title: "Network Graph", description: "Interactive organizational network visualization", category: "advanced", tags: ["network", "graph", "connections"] },
  { id: "sankey", title: "Sankey Diagram", description: "Flow diagram showing data movement between stages", category: "advanced", tags: ["sankey", "flow", "diagram"] },
  { id: "calendar-heatmap", title: "Calendar Heatmap", description: "Year-long activity calendar with intensity mapping", category: "advanced", tags: ["calendar", "heatmap", "yearly"] },
  { id: "variance-bridge", title: "Variance Bridge", description: "Actual vs budget variance comparison", category: "advanced", tags: ["variance", "budget", "comparison"] },
  // Artistic / Experimental - 10
  { id: "particle-flow", title: "Particle Data Flow", description: "Animated particles representing data streams", category: "artistic", tags: ["particle", "animation", "flow"] },
  { id: "liquid-gauge", title: "Liquid Fill Gauge", description: "Liquid-style fill gauge with wave animation", category: "artistic", tags: ["liquid", "gauge", "wave"] },
  { id: "circular-timeline", title: "Circular Timeline", description: "Radial timeline of events and milestones", category: "artistic", tags: ["circular", "timeline", "radial"] },
  { id: "morphing-chart", title: "Morphing Bar-to-Line", description: "Chart that morphs between bar and line views", category: "artistic", tags: ["morph", "transition", "animated"] },
  { id: "spiral-radial", title: "Spiral Radial Chart", description: "Data displayed in an expanding spiral pattern", category: "artistic", tags: ["spiral", "radial", "unique"] },
  { id: "constellation", title: "Data Constellation", description: "Star-field visualization of data points", category: "artistic", tags: ["constellation", "stars", "cosmic"] },
  { id: "floating-3d", title: "Floating 3D Cards", description: "CSS 3D perspective data cards with depth", category: "artistic", tags: ["3d", "cards", "perspective"] },
  { id: "aurora-chart", title: "Aurora Gradient Chart", description: "Chart with aurora borealis gradient animation", category: "artistic", tags: ["aurora", "gradient", "ambient"] },
  { id: "neumorphic-kpi", title: "Neumorphic KPI Board", description: "KPI dashboard with neumorphic design style", category: "artistic", tags: ["neumorphic", "kpi", "soft"] },
  { id: "glassmorphic-dash", title: "Glassmorphic Dashboard", description: "Dashboard with frosted glass panels", category: "artistic", tags: ["glass", "dashboard", "blur"] },
  // Executive Dashboard Styles - 10
  { id: "boardroom", title: "Boardroom Summary", description: "Executive boardroom-style summary layout", category: "executive", tags: ["executive", "summary", "boardroom"] },
  { id: "investor-snapshot", title: "Investor Snapshot", description: "Minimal investor-ready metrics overview", category: "executive", tags: ["investor", "minimal", "snapshot"] },
  { id: "saas-dashboard", title: "SaaS Metrics Dashboard", description: "Key SaaS metrics in a clean dashboard", category: "executive", tags: ["saas", "metrics", "dashboard"] },
  { id: "neon-trading", title: "Dark Neon Trading Screen", description: "Neon-lit trading terminal aesthetic", category: "executive", tags: ["neon", "trading", "dark"] },
  { id: "financial-wall", title: "Financial Performance Wall", description: "Wall display of financial performance metrics", category: "executive", tags: ["financial", "wall", "performance"] },
  { id: "territory-map", title: "Sales Territory Map", description: "Geographic sales territory visualization", category: "executive", tags: ["map", "territory", "geographic"] },
  { id: "leaderboard", title: "Animated Leaderboard", description: "Animated sales team leaderboard rankings", category: "executive", tags: ["leaderboard", "ranking", "animated"] },
  { id: "goal-tracker", title: "Goal Tracking Panel", description: "Progress tracking for organizational goals", category: "executive", tags: ["goals", "tracking", "progress"] },
  { id: "forecast-view", title: "Forecast Projection", description: "Multi-scenario forecast projection display", category: "executive", tags: ["forecast", "projection", "prediction"] },
  { id: "scenario-compare", title: "Scenario Comparison", description: "Side-by-side scenario comparison view", category: "executive", tags: ["scenario", "comparison", "planning"] },
  // Experimental Layouts - 10
  { id: "bento-box", title: "Bento Box Dashboard", description: "Japanese bento-inspired grid dashboard layout", category: "experimental", tags: ["bento", "grid", "layout"] },
  { id: "masonry-metrics", title: "Masonry Metric Layout", description: "Pinterest-style masonry layout for metrics", category: "experimental", tags: ["masonry", "layout", "creative"] },
  { id: "scroll-story", title: "Scroll Storytelling", description: "Scroll-driven data storytelling page", category: "experimental", tags: ["scroll", "story", "narrative"] },
  { id: "metric-carousel", title: "Swipeable Carousel", description: "Swipeable carousel of metric cards", category: "experimental", tags: ["carousel", "swipe", "mobile"] },
  { id: "parallax-hero", title: "Parallax Data Hero", description: "Parallax scrolling data hero section", category: "experimental", tags: ["parallax", "hero", "scroll"] },
  { id: "collapsible-panels", title: "Collapsible Insights", description: "Expandable/collapsible insight panels", category: "experimental", tags: ["collapsible", "panels", "accordion"] },
  { id: "ai-insights", title: "AI Insight Generator", description: "Mocked AI-powered insight generation panel", category: "experimental", tags: ["ai", "insights", "generated"] },
  { id: "filter-playground", title: "Filter Playground", description: "Interactive filtering playground for data", category: "experimental", tags: ["filter", "interactive", "playground"] },
  { id: "theme-switcher", title: "Theme Switcher Preview", description: "Live theme switching preview system", category: "experimental", tags: ["theme", "switcher", "preview"] },
  { id: "layout-canvas", title: "Layout Canvas Grid", description: "Build-your-own-layout drag grid canvas", category: "experimental", tags: ["canvas", "grid", "builder"] },
];

export const categoryLabels: Record<string, string> = {
  classic: "Classic (Enhanced)",
  advanced: "Advanced Analytical",
  artistic: "Artistic / Experimental",
  executive: "Executive Dashboard",
  experimental: "Experimental Layouts",
};

export const categoryColors: Record<string, string> = {
  classic: "#3b82f6",
  advanced: "#8b5cf6",
  artistic: "#ec4899",
  executive: "#f59e0b",
  experimental: "#10b981",
};
