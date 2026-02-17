"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface ChartWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export default function ChartWrapper({
  title,
  description,
  children,
  className = "",
}: ChartWrapperProps) {
  const [ref, inView] = useInView(0.05);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`glass rounded-2xl p-6 ${className}`}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[--color-foreground]">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-[--color-muted] mt-1">{description}</p>
        )}
      </div>
      <div className="w-full">{children}</div>
    </motion.div>
  );
}
