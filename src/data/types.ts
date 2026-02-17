export interface DataPoint {
  date: string;
  revenue: number;
  cost: number;
  profit: number;
  region: string;
  product: string;
  segment: string;
  growth: number;
  forecast: number;
}

export interface MonthlyData {
  month: string;
  revenue: number;
  cost: number;
  profit: number;
  growth: number;
  forecast: number;
}

export interface RegionData {
  region: string;
  revenue: number;
  cost: number;
  profit: number;
  customers: number;
}

export interface ProductData {
  product: string;
  revenue: number;
  units: number;
  margin: number;
  growth: number;
}

export interface SegmentData {
  segment: string;
  revenue: number;
  customers: number;
  avgOrder: number;
  retention: number;
}

export interface KPIData {
  label: string;
  value: number;
  change: number;
  prefix?: string;
  suffix?: string;
}

export type VisualizationCategory =
  | "classic"
  | "advanced"
  | "artistic"
  | "executive"
  | "experimental";

export interface VisualizationMeta {
  id: string;
  title: string;
  description: string;
  category: VisualizationCategory;
  tags: string[];
}
