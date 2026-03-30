"use client";

function MandalaSymbol({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.12">
        {/* Outer petals - 8 directions */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 100 100)`}>
            {/* Large outer petal */}
            <path
              d="M100 15 Q115 50 120 70 Q125 85 100 95 Q75 85 80 70 Q85 50 100 15Z"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
            />
            {/* Inner line detail */}
            <path
              d="M100 25 Q110 55 100 85"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
            />
            {/* Small teardrop at tip */}
            <ellipse cx="100" cy="18" rx="3" ry="5" stroke="currentColor" strokeWidth="0.5" fill="none" />
          </g>
        ))}
        {/* Mid petals - offset by 22.5 degrees */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 100 100)`}>
            <path
              d="M100 35 Q112 58 115 68 Q118 78 100 88 Q82 78 85 68 Q88 58 100 35Z"
              stroke="currentColor"
              strokeWidth="0.6"
              fill="none"
            />
            <path
              d="M100 42 Q108 60 100 80"
              stroke="currentColor"
              strokeWidth="0.4"
              fill="none"
            />
          </g>
        ))}
        {/* Inner scalloped ring */}
        <circle cx="100" cy="100" r="38" stroke="currentColor" strokeWidth="0.6" fill="none" />
        <circle cx="100" cy="100" r="42" stroke="currentColor" strokeWidth="0.4" fill="none" strokeDasharray="4 3" />
        {/* Inner flower petals */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
          <g key={`inner-${angle}`} transform={`rotate(${angle} 100 100)`}>
            <path
              d="M100 65 Q108 75 108 82 Q108 90 100 95 Q92 90 92 82 Q92 75 100 65Z"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
            />
          </g>
        ))}
        {/* Center rings */}
        <circle cx="100" cy="100" r="22" stroke="currentColor" strokeWidth="0.6" fill="none" />
        <circle cx="100" cy="100" r="15" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="100" cy="100" r="8" stroke="currentColor" strokeWidth="0.4" fill="none" />
        {/* Center dot */}
        <circle cx="100" cy="100" r="3" fill="currentColor" opacity="0.3" />
        {/* Outer decorative ring */}
        <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.4" fill="none" strokeDasharray="2 4" />
        <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="0.3" fill="none" />
        {/* Small dots on outer ring */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 100 + 90 * Math.cos(rad - Math.PI / 2);
          const cy = 100 + 90 * Math.sin(rad - Math.PI / 2);
          return <circle key={`dot-${angle}`} cx={cx} cy={cy} r="2" fill="currentColor" opacity="0.2" />;
        })}
        {/* Scroll/vine details between outer petals */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
          <g key={`scroll-${angle}`} transform={`rotate(${angle} 100 100)`}>
            <path
              d="M95 12 Q90 18 92 22 Q94 26 98 24"
              stroke="currentColor"
              strokeWidth="0.4"
              fill="none"
            />
            <path
              d="M105 12 Q110 18 108 22 Q106 26 102 24"
              stroke="currentColor"
              strokeWidth="0.4"
              fill="none"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function MandalaBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center" aria-hidden="true">
      <div className="text-[#d4a017]" style={{ width: "600px", height: "600px" }}>
        <MandalaSymbol className="w-full h-full" />
      </div>
    </div>
  );
}
