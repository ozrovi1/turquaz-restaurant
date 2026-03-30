"use client";

import Image from "next/image";
import { useId } from "react";
import "./ShapedMedia.css";

type ShapedMediaVariant = "arch" | "circle";

interface ShapedMediaProps {
  src: string;
  alt: string;
  variant?: ShapedMediaVariant;
  width?: number | string;
  height?: number | string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/** Arch path: doorway shape – curved top, straight sides (objectBoundingBox 0–1) */
const ARCH_PATH = "M 0 1 L 0 0.18 Q 0.5 0 1 0.18 L 1 1 Z";

export function ShapedMedia({
  src,
  alt,
  variant = "arch",
  width,
  height,
  className = "",
  sizes = "(max-width: 640px) 100vw, 33vw",
  priority = false,
}: ShapedMediaProps) {
  const id = useId().replace(/:/g, "-");
  const maskId = `shaped-media-mask-${id}`;

  const style: React.CSSProperties = { aspectRatio: "4/3" };
  if (width !== undefined) style.width = typeof width === "number" ? `${width}px` : width;
  if (height !== undefined) style.height = typeof height === "number" ? `${height}px` : height;

  const isArch = variant === "arch";

  return (
    <>
      {isArch && (
        <svg width={0} height={0} aria-hidden>
          <defs>
            <mask id={maskId} maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
              <path d={ARCH_PATH} fill="white" />
            </mask>
          </defs>
        </svg>
      )}
      <div
        className={`shaped-media shaped-media--${variant} ${className}`.trim()}
        style={style}
      >
        <div
          className="shaped-media__clip"
          style={
            isArch
              ? {
                  mask: `url(#${maskId})`,
                  WebkitMask: `url(#${maskId})`,
                }
              : undefined
          }
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="shaped-media__img"
            sizes={sizes}
            priority={priority}
          />
        </div>
      </div>
    </>
  );
}
