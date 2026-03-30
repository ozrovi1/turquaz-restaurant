"use client";

import { ReactNode } from "react";

interface OrnamentalFrameProps {
  children: ReactNode;
  className?: string;
  shape?: "rectangle" | "circle";
}

function RectangleFrame({ children, className }: { children: ReactNode; className: string }) {
  return (
    <div className={`ornamental-frame relative ${className}`}>
      {/* Corner ornaments */}
      <svg className="ornamental-corner ornamental-corner--tl" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path d="M2 58 L2 20 Q2 2 20 2 L58 2" stroke="#d4a017" strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="2" r="3" fill="#d4a017" />
        <circle cx="2" cy="20" r="3" fill="#d4a017" />
        <path d="M8 2 L8 8 Q8 12 12 12 L18 12" stroke="#d4a017" strokeWidth="1" fill="none" />
        <circle cx="13" cy="7" r="1.5" fill="#d4a017" />
      </svg>
      <svg className="ornamental-corner ornamental-corner--tr" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path d="M58 58 L58 20 Q58 2 40 2 L2 2" stroke="#d4a017" strokeWidth="1.5" fill="none" />
        <circle cx="40" cy="2" r="3" fill="#d4a017" />
        <circle cx="58" cy="20" r="3" fill="#d4a017" />
        <path d="M52 2 L52 8 Q52 12 48 12 L42 12" stroke="#d4a017" strokeWidth="1" fill="none" />
        <circle cx="47" cy="7" r="1.5" fill="#d4a017" />
      </svg>
      <svg className="ornamental-corner ornamental-corner--bl" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path d="M2 2 L2 40 Q2 58 20 58 L58 58" stroke="#d4a017" strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="58" r="3" fill="#d4a017" />
        <circle cx="2" cy="40" r="3" fill="#d4a017" />
        <path d="M8 58 L8 52 Q8 48 12 48 L18 48" stroke="#d4a017" strokeWidth="1" fill="none" />
        <circle cx="13" cy="53" r="1.5" fill="#d4a017" />
      </svg>
      <svg className="ornamental-corner ornamental-corner--br" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path d="M58 2 L58 40 Q58 58 40 58 L2 58" stroke="#d4a017" strokeWidth="1.5" fill="none" />
        <circle cx="40" cy="58" r="3" fill="#d4a017" />
        <circle cx="58" cy="40" r="3" fill="#d4a017" />
        <path d="M52 58 L52 52 Q52 48 48 48 L42 48" stroke="#d4a017" strokeWidth="1" fill="none" />
        <circle cx="47" cy="53" r="1.5" fill="#d4a017" />
      </svg>

      {/* Top center ornament */}
      <svg className="ornamental-edge ornamental-edge--top" width="120" height="24" viewBox="0 0 120 24" fill="none">
        <line x1="0" y1="12" x2="35" y2="12" stroke="#d4a017" strokeWidth="1" />
        <line x1="85" y1="12" x2="120" y2="12" stroke="#d4a017" strokeWidth="1" />
        <circle cx="40" cy="12" r="3" fill="#d4a017" />
        <circle cx="80" cy="12" r="3" fill="#d4a017" />
        <path d="M44 12 Q50 4 60 4 Q70 4 76 12" stroke="#d4a017" strokeWidth="1" fill="none" />
        <path d="M44 12 Q50 20 60 20 Q70 20 76 12" stroke="#d4a017" strokeWidth="1" fill="none" />
        <circle cx="60" cy="4" r="2" fill="#d4a017" />
        <circle cx="60" cy="20" r="2" fill="#d4a017" />
      </svg>

      {/* Bottom center ornament */}
      <svg className="ornamental-edge ornamental-edge--bottom" width="120" height="24" viewBox="0 0 120 24" fill="none">
        <line x1="0" y1="12" x2="35" y2="12" stroke="#d4a017" strokeWidth="1" />
        <line x1="85" y1="12" x2="120" y2="12" stroke="#d4a017" strokeWidth="1" />
        <circle cx="40" cy="12" r="3" fill="#d4a017" />
        <circle cx="80" cy="12" r="3" fill="#d4a017" />
        <path d="M44 12 Q50 4 60 4 Q70 4 76 12" stroke="#d4a017" strokeWidth="1" fill="none" />
        <path d="M44 12 Q50 20 60 20 Q70 20 76 12" stroke="#d4a017" strokeWidth="1" fill="none" />
        <circle cx="60" cy="4" r="2" fill="#d4a017" />
        <circle cx="60" cy="20" r="2" fill="#d4a017" />
      </svg>

      {/* Left center ornament */}
      <svg className="ornamental-edge ornamental-edge--left" width="24" height="80" viewBox="0 0 24 80" fill="none">
        <line x1="12" y1="0" x2="12" y2="20" stroke="#d4a017" strokeWidth="1" />
        <line x1="12" y1="60" x2="12" y2="80" stroke="#d4a017" strokeWidth="1" />
        <circle cx="12" cy="25" r="3" fill="#d4a017" />
        <circle cx="12" cy="55" r="3" fill="#d4a017" />
        <path d="M12 29 Q4 35 4 40 Q4 45 12 51" stroke="#d4a017" strokeWidth="1" fill="none" />
        <path d="M12 29 Q20 35 20 40 Q20 45 12 51" stroke="#d4a017" strokeWidth="1" fill="none" />
        <circle cx="4" cy="40" r="2" fill="#d4a017" />
        <circle cx="20" cy="40" r="2" fill="#d4a017" />
      </svg>

      {/* Right center ornament */}
      <svg className="ornamental-edge ornamental-edge--right" width="24" height="80" viewBox="0 0 24 80" fill="none">
        <line x1="12" y1="0" x2="12" y2="20" stroke="#d4a017" strokeWidth="1" />
        <line x1="12" y1="60" x2="12" y2="80" stroke="#d4a017" strokeWidth="1" />
        <circle cx="12" cy="25" r="3" fill="#d4a017" />
        <circle cx="12" cy="55" r="3" fill="#d4a017" />
        <path d="M12 29 Q4 35 4 40 Q4 45 12 51" stroke="#d4a017" strokeWidth="1" fill="none" />
        <path d="M12 29 Q20 35 20 40 Q20 45 12 51" stroke="#d4a017" strokeWidth="1" fill="none" />
        <circle cx="4" cy="40" r="2" fill="#d4a017" />
        <circle cx="20" cy="40" r="2" fill="#d4a017" />
      </svg>

      {/* Border lines */}
      <div className="ornamental-border ornamental-border--top" />
      <div className="ornamental-border ornamental-border--bottom" />
      <div className="ornamental-border ornamental-border--left" />
      <div className="ornamental-border ornamental-border--right" />

      {/* Content */}
      <div className="ornamental-content">
        {children}
      </div>
    </div>
  );
}

function CircleFrame({ children, className }: { children: ReactNode; className: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center p-5 ${className}`}>
      {/* Circular ornamental SVG - sized with padding to sit outside the content */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 300 300" fill="none" preserveAspectRatio="xMidYMid meet">
        {/* Main circle border */}
        <circle cx="150" cy="150" r="135" stroke="#d4a017" strokeWidth="1.2" opacity="0.6" />
        <circle cx="150" cy="150" r="142" stroke="#d4a017" strokeWidth="0.6" opacity="0.35" strokeDasharray="4 5" />

        {/* 4 cardinal ornaments (top, right, bottom, left) */}
        {[0, 90, 180, 270].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 150 150)`}>
            <circle cx="150" cy="5" r="4.5" fill="#d4a017" opacity="0.85" />
            <circle cx="137" cy="10" r="2.5" fill="#d4a017" opacity="0.7" />
            <circle cx="163" cy="10" r="2.5" fill="#d4a017" opacity="0.7" />
            <path d="M134 10 Q142 0 150 0 Q158 0 166 10" stroke="#d4a017" strokeWidth="1" fill="none" opacity="0.7" />
            <path d="M134 10 Q142 20 150 20 Q158 20 166 10" stroke="#d4a017" strokeWidth="1" fill="none" opacity="0.7" />
            <circle cx="150" cy="0" r="2" fill="#d4a017" opacity="0.6" />
            <circle cx="150" cy="20" r="2" fill="#d4a017" opacity="0.6" />
          </g>
        ))}

        {/* 4 diagonal ornaments (45, 135, 225, 315) */}
        {[45, 135, 225, 315].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 150 150)`}>
            <circle cx="150" cy="7" r="3" fill="#d4a017" opacity="0.7" />
            <path d="M142 11 L150 3 L158 11" stroke="#d4a017" strokeWidth="0.8" fill="none" opacity="0.6" />
            <path d="M142 11 L150 19 L158 11" stroke="#d4a017" strokeWidth="0.8" fill="none" opacity="0.6" />
          </g>
        ))}
      </svg>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export function OrnamentalFrame({ children, className = "", shape = "rectangle" }: OrnamentalFrameProps) {
  if (shape === "circle") {
    return <CircleFrame className={className}>{children}</CircleFrame>;
  }
  return <RectangleFrame className={className}>{children}</RectangleFrame>;
}
