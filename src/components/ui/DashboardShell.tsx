"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface PaletteColor {
  hex: string;
  label: string;
}

export interface PowerBIStep {
  step: string;
  detail: string;
}

interface DashboardShellProps {
  title: string;
  subtitle?: string;
  palette: PaletteColor[];
  powerBISteps: PowerBIStep[];
  children: ReactNode;
}

export default function DashboardShell({
  title,
  subtitle,
  palette,
  powerBISteps,
  children,
}: DashboardShellProps) {
  const [showSteps, setShowSteps] = useState(false);

  return (
    <div className="space-y-4">
      {/* Dashboard header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-[--color-foreground]">{title}</h3>
          {subtitle && (
            <p className="text-sm text-[--color-muted] mt-0.5">{subtitle}</p>
          )}
        </div>
        {/* Color palette swatches */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {palette.map((c) => (
            <div key={c.hex} className="flex items-center gap-1 group relative">
              <div
                className="w-5 h-5 rounded-md border border-white/10 shrink-0"
                style={{ backgroundColor: c.hex }}
              />
              <span className="text-[10px] text-[--color-muted] font-mono">
                {c.hex}
              </span>
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] bg-[--color-card] text-[--color-foreground] px-1.5 py-0.5 rounded border border-[--color-border] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                {c.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard content */}
      <div>{children}</div>

      {/* Power BI recreation steps */}
      <div className="border-t border-[--color-border] pt-3">
        <button
          onClick={() => setShowSteps(!showSteps)}
          className="flex items-center gap-2 text-sm font-medium text-[--color-accent] hover:text-[--color-foreground] transition-colors"
        >
          <span
            className="inline-block transition-transform duration-200"
            style={{ transform: showSteps ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            &#9654;
          </span>
          How to recreate in Power BI
        </button>
        <AnimatePresence>
          {showSteps && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <ol className="mt-3 space-y-2.5 pl-1">
                {powerBISteps.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[--color-accent-soft] text-[--color-accent] flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <span className="font-semibold text-[--color-foreground]">
                        {s.step}
                      </span>
                      <span className="text-[--color-muted]"> — {s.detail}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
