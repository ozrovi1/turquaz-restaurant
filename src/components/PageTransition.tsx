"use client";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <div
      className={`page-entrance page-entrance--visible ${className}`.trim()}
    >
      {children}
    </div>
  );
}
