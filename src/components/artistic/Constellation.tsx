"use client";
import { motion } from "framer-motion";
import ChartWrapper from "@/components/ui/ChartWrapper";
import { useInView } from "@/hooks/useInView";
import { useMemo, useState } from "react";
import { productData } from "@/data/datasets";

export default function Constellation() {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState<string | null>(null);

  const stars = useMemo(() => {
    const maxRev = Math.max(...productData.map((p) => p.revenue));
    return productData.map((p, i) => {
      const angle = (i / productData.length) * Math.PI * 2;
      const dist = 60 + (p.revenue / maxRev) * 80;
      return {
        ...p,
        x: 250 + Math.cos(angle) * dist,
        y: 170 + Math.sin(angle) * dist,
        size: 3 + (p.revenue / maxRev) * 10,
      };
    });
  }, []);

  // Background stars
  const bgStars = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      x: Math.random() * 500,
      y: Math.random() * 340,
      size: 0.5 + Math.random() * 1.5,
      delay: Math.random() * 3,
    })), []);

  return (
    <ChartWrapper title="Data Constellation" description="Star-field visualization of product data points">
      <div ref={ref}>
        <svg viewBox="0 0 500 340" className="w-full h-auto bg-[#050510] rounded-xl">
          {/* Background stars */}
          {bgStars.map((s, i) => (
            <motion.circle
              key={`bg-${i}`}
              cx={s.x} cy={s.y} r={s.size}
              fill="#ffffff"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: [0.1, 0.5, 0.1] } : { opacity: 0 }}
              transition={{ duration: 2 + s.delay, repeat: Infinity, delay: s.delay }}
            />
          ))}
          {/* Constellation lines */}
          {stars.map((s, i) => {
            const next = stars[(i + 1) % stars.length];
            return (
              <motion.line
                key={`line-${i}`}
                x1={s.x} y1={s.y} x2={next.x} y2={next.y}
                stroke="#6366f130"
                strokeWidth={1}
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            );
          })}
          {/* Data stars */}
          {stars.map((s, i) => (
            <motion.g
              key={s.product}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              onMouseEnter={() => setHovered(s.product)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              <circle cx={s.x} cy={s.y} r={s.size + 4} fill="#6366f1" opacity={0.15} />
              <circle cx={s.x} cy={s.y} r={s.size} fill="#6366f1" opacity={hovered === s.product ? 1 : 0.7} />
              {(hovered === s.product) && (
                <>
                  <rect x={s.x - 45} y={s.y - 35} width={90} height={28} rx={6} fill="rgba(18,18,26,0.9)" stroke="#6366f140" />
                  <text x={s.x} y={s.y - 22} textAnchor="middle" fill="#e8e8ed" fontSize={8} fontWeight={600}>{s.product}</text>
                  <text x={s.x} y={s.y - 12} textAnchor="middle" fill="#6366f1" fontSize={8}>${(s.revenue / 1000).toFixed(0)}k</text>
                </>
              )}
            </motion.g>
          ))}
        </svg>
      </div>
    </ChartWrapper>
  );
}
