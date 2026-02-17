"use client";
import { motion } from "framer-motion";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useInView } from "@/hooks/useInView";
import { useMemo } from "react";

export default function ParticleFlow() {
  const [ref, inView] = useInView(0.1);

  const particles = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4,
      color: ["#6366f1", "#a855f7", "#ec4899", "#22c55e", "#06b6d4"][i % 5],
    })), []);

  return (
    <ChartWrapper title="Particle Data Flow" description="Animated particles representing data streams and connections">
      <div ref={ref} className="relative h-[300px] overflow-hidden rounded-xl bg-[#0a0a0f]">
        {inView && particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{ width: p.size, height: p.size, backgroundColor: p.color, left: `${p.x}%`, top: `${p.y}%` }}
            animate={{
              x: [0, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 150, 0],
              y: [0, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 150, 0],
              opacity: [0, 0.8, 0.6, 0],
              scale: [0, 1.2, 0.8, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* Data labels floating */}
        {inView && ["$885k Revenue", "45.6k Users", "+12.4% Growth", "94% Satisfaction"].map((label, i) => (
          <motion.div
            key={label}
            className="absolute glass rounded-lg px-3 py-1.5 text-xs font-medium text-[#e8e8ed]"
            style={{ left: `${15 + i * 20}%`, top: `${30 + (i % 2) * 30}%` }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3 + i, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {label}
          </motion.div>
        ))}
      </div>
    </ChartWrapper>
  );
}
