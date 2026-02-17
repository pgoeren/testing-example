"use client";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { monthlyData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useState } from "react";

export default function MorphingChart() {
  const [isBar, setIsBar] = useState(true);

  return (
    <ChartWrapper title="Morphing Bar-to-Line" description="Click to morph between bar and line chart views">
      <div className="mb-3 flex items-center gap-2">
        <button
          onClick={() => setIsBar(!isBar)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium glass glass-hover cursor-pointer transition-colors"
        >
          Switch to {isBar ? "Line" : "Bar"} View
        </button>
        <span className="text-xs text-[#71717a]">Currently: {isBar ? "Bar" : "Line"}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={isBar ? "bar" : "line"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <ResponsiveContainer width="100%" height={280}>
            {isBar ? (
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
                <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }} />
                <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} animationDuration={800} />
              </BarChart>
            ) : (
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
                <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }} />
                <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} dot={{ r: 5, fill: "#6366f1" }} animationDuration={800} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </motion.div>
      </AnimatePresence>
    </ChartWrapper>
  );
}
