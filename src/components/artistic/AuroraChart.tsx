"use client";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { monthlyData } from "@/data/datasets";
import ChartWrapper from "@/components/ui/ChartWrapper";

export default function AuroraChart() {
  return (
    <ChartWrapper title="Aurora Gradient Chart" description="Revenue chart with aurora borealis gradient animation">
      <div className="relative overflow-hidden rounded-xl">
        {/* Aurora background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: "linear-gradient(45deg, #6366f130, #a855f730, #ec489930, #06b6d430, #22c55e30)",
            backgroundSize: "400% 400%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="auroraGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="33%" stopColor="#a855f7" stopOpacity={0.3} />
                  <stop offset="66%" stopColor="#ec4899" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="auroraStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ background: "rgba(18,18,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e8e8ed" }} formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
              <Area type="monotone" dataKey="revenue" stroke="url(#auroraStroke)" strokeWidth={3} fill="url(#auroraGrad)" animationDuration={1500} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </ChartWrapper>
  );
}
