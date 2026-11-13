'use client';

import React, { useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function AmbientBackground() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  // GSAP Organic Floating Orbs only on public routes (Disabled completely on /admin)
  useGSAP(
    () => {
      if (isAdmin) return;

      const ctx = gsap.context(() => {
        if (orb1Ref.current) {
          gsap.to(orb1Ref.current, {
            x: 60,
            y: 50,
            scale: 1.1,
            duration: 9,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        if (orb2Ref.current) {
          gsap.to(orb2Ref.current, {
            x: -70,
            y: 60,
            scale: 1.15,
            duration: 11,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1,
          });
        }

        if (orb3Ref.current) {
          gsap.to(orb3Ref.current, {
            x: 50,
            y: -60,
            scale: 1.08,
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.5,
          });
        }
      }, containerRef);

      return () => ctx.revert();
    },
    { dependencies: [isAdmin], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-50 transition-colors duration-500 dark:bg-[#090D16]"
    >
      {/* Orb 1: Kiri Atas (Sky / Deep Blue) */}
      <div
        ref={orb1Ref}
        className="ambient-orb absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-sky-300/50 blur-[120px] transition-colors duration-500 dark:bg-blue-950/60 will-change-transform"
      />

      {/* Orb 2: Kanan Tengah (Blue / Cyan) */}
      <div
        ref={orb2Ref}
        className="ambient-orb absolute top-1/4 -right-32 h-[30rem] w-[30rem] rounded-full bg-blue-300/45 blur-[120px] transition-colors duration-500 dark:bg-cyan-900/40 will-change-transform"
      />

      {/* Orb 3: Bawah Tengah (Cyan / Sky) */}
      <div
        ref={orb3Ref}
        className="ambient-orb absolute -bottom-40 left-1/3 h-[28rem] w-[28rem] rounded-full bg-cyan-200/50 blur-[120px] transition-colors duration-500 dark:bg-sky-950/50 will-change-transform"
      />

      {/* Grid Halus & Tekstur Kaca Buram (Frosted Grain) */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.03] dark:opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="glass-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#glass-noise)" />
      </svg>
    </div>
  );
}

export default AmbientBackground;
