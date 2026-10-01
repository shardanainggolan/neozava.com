"use client";

import { useEffect, useRef, useState } from "react";

const PIN_SVG = (
  <svg className="w-6! h-6!" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EXTERNAL_SVG = (
  <svg className="w-3.5! h-3.5!" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export default function MapFacade({
  mapSrc,
  lat,
  lng,
  label,
  height = 240,
  accent = "#9a0000",
}: {
  mapSrc: string;
  lat: string;
  lng: string;
  label: string;
  height?: number;
  accent?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const isValid = !!mapSrc && mapSrc.includes("google.com/maps");

  useEffect(() => {
    if (!isValid) return;

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const scheduleLoad = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(() => setLoaded(true), { timeout: 2000 });
      } else {
        timeoutId = setTimeout(() => setLoaded(true), 1200);
      }
    };

    // Start loading once the map is about to be visible, deferred to an
    // idle slot so the heavy Maps embed JS never competes with the
    // initial render/hydration work (keeps FCP/LCP/TBT intact) while
    // still appearing automatically with no click needed.
    const el = rootRef.current;
    if (el && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            scheduleLoad();
            observer.disconnect();
          }
        },
        { rootMargin: "200px" }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    scheduleLoad();
    return () => {
      if (idleId !== undefined && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [isValid]);

  if (!isValid) return null;

  const directUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  if (loaded) {
    return (
      <div className="bg-white">
        <iframe
          src={mapSrc}
          width="100%"
          height={height}
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={label}
        />
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="relative w-full bg-gray-100 flex flex-col items-center justify-center text-center gap-2! px-4!"
      style={{ height }}
    >
      <div
        className="w-11! h-11! rounded-2xl flex items-center justify-center animate-pulse"
        style={{ background: "#fdf0f0", color: accent }}
      >
        {PIN_SVG}
      </div>
      <p className="text-[12px] font-bold text-gray-700 leading-snug">{label}</p>
      <p className="text-[11px] text-gray-500">Memuat peta…</p>
      <a
        href={directUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1! flex items-center gap-1! text-[11px] font-semibold text-[#646464] hover:text-gray-900 transition-colors"
      >
        Buka di Google Maps {EXTERNAL_SVG}
      </a>
    </div>
  );
}
