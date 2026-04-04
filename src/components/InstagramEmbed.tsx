"use client";

import { useEffect, useRef } from "react";

interface InstagramEmbedProps {
  postUrl: string;
}

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export function InstagramEmbed({ postUrl }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Instagram embed script once
    if (!document.getElementById("instagram-embed-script")) {
      const script = document.createElement("script");
      script.id = "instagram-embed-script";
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Re-process embeds when component mounts or URL changes
    const timer = setTimeout(() => {
      window.instgrm?.Embeds.process();
    }, 500);

    return () => clearTimeout(timer);
  }, [postUrl]);

  return (
    <div ref={containerRef} className="instagram-embed-container">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={postUrl}
        style={{
          background: "#0a1f0a",
          border: 0,
          borderRadius: "12px",
          margin: 0,
          maxWidth: "540px",
          minWidth: "280px",
          width: "100%",
        }}
      />
    </div>
  );
}
