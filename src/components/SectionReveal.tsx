"use client";

import { useEffect, useRef, useState } from "react";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Root margin for IntersectionObserver (default: 0px 0px -60px) */
  rootMargin?: string;
  /** Threshold 0–1 (default: 0.1) */
  threshold?: number;
}

export function SectionReveal({
  children,
  className = "",
  rootMargin = "0px 0px -60px 0px",
  threshold = 0.1,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div
      ref={ref}
      className={`sectionReveal ${visible ? "sectionReveal--visible" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
