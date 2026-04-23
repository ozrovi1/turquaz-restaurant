"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap } from "leaflet";

interface BranchMapProps {
  center: [number, number];
  branchName: string;
  logoUrl: string;
  address?: string;
}

export function BranchMap({ center, branchName, logoUrl, address }: BranchMapProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address || branchName)}`;
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!mapRef.current || typeof window === "undefined") return;

    const initMap = async () => {
      const L = (await import("leaflet")).default;
      if (!mapRef.current) return;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      const map = L.map(mapRef.current, {
        zoomControl: false,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
      }).setView(center, 15);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(map);

      const logoIcon = L.divIcon({
        className: "branch-map-marker",
        html: `<div style="
          width: 48px;
          height: 48px;
          background: #0d1f0d;
          border: 2px solid rgba(212,175,55,0.6);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          overflow: hidden;
        "><img src="${logoUrl}" alt="${branchName}" style="width: 36px; height: 36px; object-fit: contain;" /></div>`,
        iconSize: [48, 48],
        iconAnchor: [24, 48],
      });

      L.marker(center, { icon: logoIcon }).addTo(map).bindPopup(branchName);

      setTimeout(() => map.invalidateSize(), 100);
    };

    initMap();
    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, [center, branchName, logoUrl]);

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-[#d4a017]/20 bg-[#081408] group cursor-pointer"
    >
      <div
        ref={mapRef}
        className="branch-map-static w-full h-full [&_.leaflet-tile-pane]:opacity-90"
        aria-label={`Map showing ${branchName} location`}
      />
      <div
        className="absolute inset-0 pointer-events-none bg-[#081408]/25 mix-blend-multiply"
        aria-hidden
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-[#d4a017] text-[#0a0a0a] font-semibold text-xs tracking-[0.2em] uppercase rounded-lg opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none">
        Open in Maps
      </div>
    </a>
  );
}
