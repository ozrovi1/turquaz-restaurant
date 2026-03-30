"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";

export interface Testimonial {
  quote: string;
  author: string;
  avatar: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToSlide = useCallback(
    (index: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const slide = el.children[index] as HTMLElement;
      if (slide) {
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth";
        slide.scrollIntoView({ behavior, inline: "center", block: "nearest" });
      }
      setActiveIndex(index);
    },
    []
  );

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || testimonials.length === 0) return;
    const scrollLeft = el.scrollLeft;
    const slideWidth = el.offsetWidth;
    if (slideWidth <= 0) return;
    const index = Math.round(scrollLeft / slideWidth);
    setActiveIndex(Math.min(Math.max(0, index), testimonials.length - 1));
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <div className="w-full min-w-0 overflow-hidden">
      <div
        ref={scrollRef}
        className="testimonialsCarousel flex overflow-x-auto overscroll-x-contain snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-0 lg:px-0"
        onScroll={handleScroll}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-full min-w-full snap-center"
            style={{ scrollSnapAlign: "center" }}
          >
            <div className="bg-[#0d2818]/80 backdrop-blur-sm p-10 sm:p-14 lg:p-20 flex flex-col justify-center relative rounded-2xl border border-[#d4a017]/10 min-h-[320px] sm:min-h-[380px]">
              <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-[#d4a017]/30 rounded-tl-lg" />
              <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-[#d4a017]/30 rounded-bl-lg" />
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <span className="text-[#d4a017] text-sm">◆</span>
                <p className="text-[#d4a017] text-[11px] tracking-[0.3em] uppercase">Reviews</p>
                <span className="text-[#d4a017] text-sm">◆</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium text-center lg:text-left mb-6">
                Happy Testimonials
              </h2>
              <p className="text-[#faf8f5]/80 text-center lg:text-left leading-relaxed mb-8">
                {t.quote}
              </p>
              <div className="flex justify-center lg:justify-start gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#d4a017]/30">
                  <Image src={t.avatar} alt="" width={48} height={48} className="w-full h-full object-cover" />
                </div>
              </div>
              <p className="text-[#d4a017] text-[11px] tracking-[0.2em] uppercase mt-4 text-center lg:text-left">
                {t.author}
              </p>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length > 1 && (
        <div
          className="flex justify-center gap-2 mt-6"
          role="tablist"
          aria-label="Testimonial slides"
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`View testimonial ${i + 1}`}
              onClick={() => scrollToSlide(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cta-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1f0a] ${
                i === activeIndex
                  ? "bg-[#d4a017] w-6"
                  : "bg-[#d4a017]/40 hover:bg-[#d4a017]/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
