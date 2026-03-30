"use client";

import { useEffect, useState } from "react";

interface AnimateInProps {
  children: React.ReactNode;
  /** Delay in ms before animation starts */
  delay?: number;
  /** Custom class name */
  className?: string;
  /** Animation variant */
  variant?: "fade-up" | "fade" | "scale";
}

export function AnimateIn({
  children,
  delay = 0,
  className = "",
  variant = "fade-up",
}: AnimateInProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`animate-in animate-in--${variant} ${mounted ? "animate-in--visible" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
