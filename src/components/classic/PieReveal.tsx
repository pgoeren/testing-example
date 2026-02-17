"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";
import { productData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";

const COLORS = ["#6366f1", "#a855f7", "#ec4899", "#f59e0b", "#22c55e", "#06b6d4", "#f97316", "#84cc16"];

export default function PieReveal() {
  return (
    <ChartWrapper title="Animated Pie Reveal" description="Product revenue with sequential slice animation">
      <motion.div initial={{ opacity: 0, rotate: -10 }} animate={{ opacity: 1, rotate: 0 }} transition={{ duration: 0.8 }}>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie data={productData} dataKey="revenue" nameKey="product" cx="50%" cy="50%" outerRadius={110} animationDuration={1500} animationBegin={200} strokeWidth={0} label={({ product, percent }) => `${product}: ${(percent * 100).toFixed(0)}%`} labelLine={false}>
              {productData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }} formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </ChartWrapper>
  );
}
