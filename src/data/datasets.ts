import {
  MonthlyData,
  RegionData,
  ProductData,
  SegmentData,
  KPIData,
} from "./types";

export const monthlyData: MonthlyData[] = [
  { month: "Jan", revenue: 42000, cost: 28000, profit: 14000, growth: 5.2, forecast: 43000 },
  { month: "Feb", revenue: 45000, cost: 29500, profit: 15500, growth: 7.1, forecast: 44500 },
  { month: "Mar", revenue: 48000, cost: 30000, profit: 18000, growth: 6.7, forecast: 47000 },
  { month: "Apr", revenue: 51000, cost: 31500, profit: 19500, growth: 6.3, forecast: 50000 },
  { month: "May", revenue: 47000, cost: 30500, profit: 16500, growth: -7.8, forecast: 52000 },
  { month: "Jun", revenue: 53000, cost: 33000, profit: 20000, growth: 12.8, forecast: 54000 },
  { month: "Jul", revenue: 58000, cost: 35000, profit: 23000, growth: 9.4, forecast: 56000 },
  { month: "Aug", revenue: 55000, cost: 34000, profit: 21000, growth: -5.2, forecast: 58000 },
  { month: "Sep", revenue: 61000, cost: 36500, profit: 24500, growth: 10.9, forecast: 60000 },
  { month: "Oct", revenue: 64000, cost: 38000, profit: 26000, growth: 4.9, forecast: 63000 },
  { month: "Nov", revenue: 68000, cost: 40000, profit: 28000, growth: 6.3, forecast: 66000 },
  { month: "Dec", revenue: 72000, cost: 42000, profit: 30000, growth: 5.9, forecast: 70000 },
];

export const regionData: RegionData[] = [
  { region: "North America", revenue: 285000, cost: 185000, profit: 100000, customers: 12400 },
  { region: "Europe", revenue: 220000, cost: 148000, profit: 72000, customers: 9800 },
  { region: "Asia Pacific", revenue: 195000, cost: 125000, profit: 70000, customers: 15200 },
  { region: "Latin America", revenue: 85000, cost: 58000, profit: 27000, customers: 4300 },
  { region: "Middle East", revenue: 62000, cost: 41000, profit: 21000, customers: 2100 },
  { region: "Africa", revenue: 38000, cost: 28000, profit: 10000, customers: 1800 },
];

export const productData: ProductData[] = [
  { product: "Analytics Suite", revenue: 180000, units: 1200, margin: 68, growth: 12.5 },
  { product: "Cloud Platform", revenue: 245000, units: 890, margin: 72, growth: 18.3 },
  { product: "Data Warehouse", revenue: 156000, units: 650, margin: 58, growth: 8.7 },
  { product: "ML Engine", revenue: 120000, units: 420, margin: 75, growth: 24.1 },
  { product: "Visualization Tool", revenue: 95000, units: 2100, margin: 62, growth: 15.6 },
  { product: "Security Module", revenue: 78000, units: 1800, margin: 55, growth: 6.2 },
  { product: "Integration Hub", revenue: 67000, units: 950, margin: 60, growth: 10.8 },
  { product: "Mobile SDK", revenue: 45000, units: 3200, margin: 48, growth: 22.4 },
];

export const segmentData: SegmentData[] = [
  { segment: "Enterprise", revenue: 420000, customers: 180, avgOrder: 2333, retention: 94 },
  { segment: "Mid-Market", revenue: 285000, customers: 650, avgOrder: 438, retention: 87 },
  { segment: "SMB", revenue: 145000, customers: 2400, avgOrder: 60, retention: 72 },
  { segment: "Startup", revenue: 68000, customers: 1200, avgOrder: 57, retention: 65 },
  { segment: "Government", revenue: 95000, customers: 45, avgOrder: 2111, retention: 96 },
];

export const kpiData: KPIData[] = [
  { label: "Total Revenue", value: 885000, change: 12.4, prefix: "$" },
  { label: "Active Users", value: 45600, change: 8.7, suffix: "" },
  { label: "Avg. Order Value", value: 284, change: -2.1, prefix: "$" },
  { label: "Customer Satisfaction", value: 94.2, change: 1.8, suffix: "%" },
  { label: "Churn Rate", value: 3.2, change: -0.5, suffix: "%" },
  { label: "MRR Growth", value: 18.6, change: 3.2, suffix: "%" },
  { label: "LTV:CAC Ratio", value: 4.8, change: 0.3, suffix: "x" },
  { label: "Net Promoter Score", value: 72, change: 5, suffix: "" },
];

// Secondary dataset - quarterly
export const quarterlyData = [
  { quarter: "Q1 2024", revenue: 135000, cost: 87500, profit: 47500, headcount: 120 },
  { quarter: "Q2 2024", revenue: 151000, cost: 95000, profit: 56000, headcount: 128 },
  { quarter: "Q3 2024", revenue: 174000, cost: 105500, profit: 68500, headcount: 135 },
  { quarter: "Q4 2024", revenue: 204000, cost: 120000, profit: 84000, headcount: 142 },
];

// Waterfall data
export const waterfallData = [
  { name: "Starting Revenue", value: 500000, type: "total" as const },
  { name: "New Customers", value: 120000, type: "increase" as const },
  { name: "Upsells", value: 85000, type: "increase" as const },
  { name: "Churn", value: -65000, type: "decrease" as const },
  { name: "Downgrades", value: -25000, type: "decrease" as const },
  { name: "Price Changes", value: 30000, type: "increase" as const },
  { name: "Ending Revenue", value: 645000, type: "total" as const },
];

// Heatmap data (hours x days)
export const heatmapData: number[][] = [
  [2, 3, 5, 8, 12, 15, 18, 20, 22, 25, 20, 18, 15, 12, 10, 8, 6, 5, 4, 3, 2, 2, 1, 1],
  [1, 2, 4, 7, 11, 14, 17, 19, 21, 24, 22, 19, 16, 13, 11, 9, 7, 6, 5, 4, 3, 2, 1, 1],
  [3, 4, 6, 9, 13, 16, 19, 22, 25, 28, 24, 21, 18, 15, 12, 10, 8, 7, 5, 4, 3, 2, 2, 1],
  [2, 3, 5, 8, 12, 15, 20, 23, 26, 30, 26, 23, 19, 16, 13, 11, 9, 7, 6, 5, 3, 2, 2, 1],
  [4, 5, 7, 10, 14, 18, 22, 25, 28, 32, 28, 24, 20, 17, 14, 11, 9, 8, 6, 5, 4, 3, 2, 2],
  [1, 1, 2, 3, 5, 7, 9, 10, 11, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 3, 2, 1, 1, 1],
  [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 1, 1],
];

// Funnel data
export const funnelData = [
  { stage: "Website Visits", value: 100000, rate: 100 },
  { stage: "Sign Ups", value: 25000, rate: 25 },
  { stage: "Activated", value: 12000, rate: 48 },
  { stage: "Trial Started", value: 6500, rate: 54 },
  { stage: "Paid Conversion", value: 3200, rate: 49 },
  { stage: "Retained (6mo)", value: 2400, rate: 75 },
];

// Cohort data
export const cohortData = [
  { cohort: "Jan", m0: 100, m1: 72, m2: 65, m3: 58, m4: 52, m5: 48 },
  { cohort: "Feb", m0: 100, m1: 68, m2: 60, m3: 54, m4: 49, m5: 45 },
  { cohort: "Mar", m0: 100, m1: 75, m2: 68, m3: 62, m4: 57, m5: 0 },
  { cohort: "Apr", m0: 100, m1: 70, m2: 63, m3: 57, m4: 0, m5: 0 },
  { cohort: "May", m0: 100, m1: 74, m2: 67, m3: 0, m4: 0, m5: 0 },
  { cohort: "Jun", m0: 100, m1: 71, m2: 0, m3: 0, m4: 0, m5: 0 },
];

// Treemap data
export const treemapData = [
  { name: "Cloud Platform", size: 245000, category: "Products" },
  { name: "Analytics Suite", size: 180000, category: "Products" },
  { name: "Data Warehouse", size: 156000, category: "Products" },
  { name: "ML Engine", size: 120000, category: "Products" },
  { name: "Visualization Tool", size: 95000, category: "Tools" },
  { name: "Security Module", size: 78000, category: "Tools" },
  { name: "Integration Hub", size: 67000, category: "Tools" },
  { name: "Mobile SDK", size: 45000, category: "Tools" },
];

// Sankey-style flow data
export const sankeyData = {
  nodes: [
    "Organic", "Paid Search", "Social", "Referral", "Direct",
    "Landing Page A", "Landing Page B", "Landing Page C",
    "Sign Up", "Demo Request", "Free Trial",
    "Converted", "Lost",
  ],
  links: [
    { source: 0, target: 5, value: 35 },
    { source: 0, target: 6, value: 20 },
    { source: 1, target: 5, value: 25 },
    { source: 1, target: 7, value: 15 },
    { source: 2, target: 6, value: 30 },
    { source: 3, target: 5, value: 10 },
    { source: 3, target: 7, value: 8 },
    { source: 4, target: 6, value: 12 },
    { source: 5, target: 8, value: 40 },
    { source: 5, target: 9, value: 20 },
    { source: 6, target: 8, value: 30 },
    { source: 6, target: 10, value: 25 },
    { source: 7, target: 9, value: 15 },
    { source: 7, target: 10, value: 8 },
    { source: 8, target: 11, value: 45 },
    { source: 8, target: 12, value: 25 },
    { source: 9, target: 11, value: 28 },
    { source: 9, target: 12, value: 7 },
    { source: 10, target: 11, value: 20 },
    { source: 10, target: 12, value: 13 },
  ],
};

// Radar chart data
export const radarData = [
  { metric: "Revenue Growth", current: 85, target: 90, industry: 70 },
  { metric: "Customer Sat.", current: 92, target: 95, industry: 78 },
  { metric: "Market Share", current: 68, target: 80, industry: 65 },
  { metric: "Innovation", current: 78, target: 85, industry: 60 },
  { metric: "Efficiency", current: 88, target: 90, industry: 75 },
  { metric: "Employee Sat.", current: 82, target: 88, industry: 72 },
];

// Calendar heatmap data (generated for 365 days)
export const calendarData: { date: string; value: number }[] = (() => {
  const data: { date: string; value: number }[] = [];
  const start = new Date(2024, 0, 1);
  for (let i = 0; i < 365; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const dayOfWeek = d.getDay();
    const base = dayOfWeek === 0 || dayOfWeek === 6 ? 5 : 20;
    const value = Math.max(0, Math.floor(base + Math.random() * 40 - 10));
    data.push({
      date: d.toISOString().split("T")[0],
      value,
    });
  }
  return data;
})();

// Network graph data
export const networkData = {
  nodes: [
    { id: "CEO", group: 1, size: 30 },
    { id: "CTO", group: 1, size: 25 },
    { id: "CFO", group: 1, size: 25 },
    { id: "VP Eng", group: 2, size: 20 },
    { id: "VP Sales", group: 3, size: 20 },
    { id: "VP Product", group: 2, size: 20 },
    { id: "Lead Dev A", group: 2, size: 15 },
    { id: "Lead Dev B", group: 2, size: 15 },
    { id: "Sales Mgr", group: 3, size: 15 },
    { id: "PM", group: 2, size: 15 },
    { id: "Designer", group: 4, size: 12 },
    { id: "Data Eng", group: 2, size: 12 },
  ],
  links: [
    { source: "CEO", target: "CTO" },
    { source: "CEO", target: "CFO" },
    { source: "CTO", target: "VP Eng" },
    { source: "CTO", target: "VP Product" },
    { source: "CEO", target: "VP Sales" },
    { source: "VP Eng", target: "Lead Dev A" },
    { source: "VP Eng", target: "Lead Dev B" },
    { source: "VP Sales", target: "Sales Mgr" },
    { source: "VP Product", target: "PM" },
    { source: "VP Product", target: "Designer" },
    { source: "VP Eng", target: "Data Eng" },
    { source: "Lead Dev A", target: "Lead Dev B" },
    { source: "PM", target: "Designer" },
  ],
};

// Scatter plot data
export const scatterData = Array.from({ length: 60 }, (_, i) => ({
  x: Math.floor(Math.random() * 100),
  y: Math.floor(Math.random() * 100),
  size: Math.floor(Math.random() * 30) + 5,
  category: ["A", "B", "C"][i % 3],
  label: `Point ${i + 1}`,
}));

// Variance data
export const varianceData = [
  { category: "Product Sales", actual: 245000, budget: 230000 },
  { category: "Services", actual: 180000, budget: 200000 },
  { category: "Subscriptions", actual: 320000, budget: 300000 },
  { category: "Licensing", actual: 95000, budget: 110000 },
  { category: "Consulting", actual: 67000, budget: 60000 },
  { category: "Training", actual: 42000, budget: 45000 },
];

// Leaderboard data
export const leaderboardData = [
  { rank: 1, name: "Sarah Chen", region: "West", revenue: 1250000, deals: 42, avatar: "SC" },
  { rank: 2, name: "James O'Brien", region: "East", revenue: 1180000, deals: 38, avatar: "JO" },
  { rank: 3, name: "Maria Santos", region: "South", revenue: 1050000, deals: 35, avatar: "MS" },
  { rank: 4, name: "Alex Kim", region: "North", revenue: 980000, deals: 33, avatar: "AK" },
  { rank: 5, name: "David Park", region: "West", revenue: 920000, deals: 31, avatar: "DP" },
  { rank: 6, name: "Emma Wilson", region: "East", revenue: 870000, deals: 29, avatar: "EW" },
  { rank: 7, name: "Omar Hassan", region: "South", revenue: 810000, deals: 27, avatar: "OH" },
  { rank: 8, name: "Lisa Chang", region: "North", revenue: 750000, deals: 25, avatar: "LC" },
];

// Goal tracking data
export const goalData = [
  { goal: "Annual Revenue", current: 885000, target: 1000000, unit: "$" },
  { goal: "New Customers", current: 3200, target: 4000, unit: "" },
  { goal: "NPS Score", current: 72, target: 80, unit: "" },
  { goal: "Churn Rate", current: 3.2, target: 2.5, unit: "%", inverse: true },
  { goal: "Team Size", current: 142, target: 160, unit: "" },
  { goal: "Market Share", current: 18, target: 25, unit: "%" },
];

// Forecast data
export const forecastData = [
  { month: "Jul", actual: 58000, low: 55000, mid: 60000, high: 65000 },
  { month: "Aug", actual: 55000, low: 53000, mid: 58000, high: 64000 },
  { month: "Sep", actual: 61000, low: 57000, mid: 63000, high: 69000 },
  { month: "Oct", actual: null, low: 60000, mid: 66000, high: 73000 },
  { month: "Nov", actual: null, low: 63000, mid: 70000, high: 78000 },
  { month: "Dec", actual: null, low: 66000, mid: 74000, high: 83000 },
];

// Scenario comparison data
export const scenarioData = [
  { metric: "Revenue", conservative: 800000, base: 950000, aggressive: 1200000 },
  { metric: "Customers", conservative: 3500, base: 4200, aggressive: 5500 },
  { metric: "Margin %", conservative: 55, base: 62, aggressive: 68 },
  { metric: "Headcount", conservative: 135, base: 155, aggressive: 180 },
  { metric: "Market Share", conservative: 15, base: 20, aggressive: 28 },
];
