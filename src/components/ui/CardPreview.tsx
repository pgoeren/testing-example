"use client";

import { Suspense, useState, useEffect, useRef, ComponentType, LazyExoticComponent } from "react";

interface CardPreviewProps {
  Component: LazyExoticComponent<ComponentType>;
  hovered: boolean;
}

export default function CardPreview({ Component, hovered }: CardPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-36 overflow-hidden rounded-lg mb-3 relative bg-[--color-card]"
      style={{
        transition: "box-shadow 0.3s ease, filter 0.3s ease",
        boxShadow: hovered
          ? "0 0 20px rgba(99, 102, 241, 0.2), inset 0 0 0 1px rgba(99, 102, 241, 0.15)"
          : "none",
        filter: hovered ? "brightness(1.15)" : "brightness(0.85)",
      }}
    >
      {visible && (
        <div
          className="absolute top-0 left-0 pointer-events-none select-none"
          style={{
            width: "286%",
            height: "286%",
            transform: "scale(0.35)",
            transformOrigin: "top left",
          }}
        >
          <Suspense
            fallback={
              <div className="shimmer w-full h-full rounded-lg" />
            }
          >
            <Component />
          </Suspense>
        </div>
      )}
      {/* Gradient fade at bottom so it looks clean */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--color-card), transparent)",
        }}
      />
    </div>
  );
}
