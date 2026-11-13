'use client';

import React, { useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger plugin on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PortfolioAnimatorProps {
  children: React.ReactNode;
}

export function PortfolioAnimator({ children }: PortfolioAnimatorProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Do nothing on /admin route to keep admin 100% lightweight and instant
      if (isAdmin) return;

      const ctx = gsap.context(() => {
        // 1. Floating Navbar Entrance & ScrollTrigger Compact Effect
        const navbar = document.getElementById('gsap-navbar');
        if (navbar) {
          gsap.fromTo(
            navbar,
            { y: -20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              clearProps: 'transform',
            }
          );

          const navbarInner = document.getElementById('gsap-navbar-inner');
          if (navbarInner) {
            ScrollTrigger.create({
              start: 'top -80px',
              end: 99999,
              toggleClass: {
                targets: navbarInner,
                className: 'navbar-scrolled',
              },
            });
          }
        }

        // 2. Hero Section Staggered Entrance
        const heroElements = [
          '.gsap-hero-badge',
          '.gsap-hero-title',
          '.gsap-hero-subtitle',
          '.gsap-hero-bio',
          '.gsap-hero-stack',
          '.gsap-hero-cta',
          '.gsap-hero-social',
          '.gsap-hero-avatar',
        ];

        gsap.fromTo(
          heroElements,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
            clearProps: 'transform',
            delay: 0.1,
          }
        );

        // 3. Projects Grid Staggered Entrance on Scroll
        const projectCards = gsap.utils.toArray<HTMLElement>('.gsap-project-card');
        if (projectCards.length > 0) {
          gsap.fromTo(
            projectCards,
            { y: 32, opacity: 0 },
            {
              scrollTrigger: {
                trigger: '.gsap-projects-grid',
                start: 'top 82%',
                once: true,
              },
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: 'power2.out',
              clearProps: 'transform',
            }
          );
        }

        // 4. Interactive Glass Spotlight Hover on Project Cards (via gsap.quickTo)
        projectCards.forEach((card) => {
          const spotlight = card.querySelector<HTMLElement>('.gsap-spotlight');
          if (!spotlight) return;

          // quickTo for 60-120fps GPU transform movement
          const xTo = gsap.quickTo(spotlight, 'x', { duration: 0.35, ease: 'power3' });
          const yTo = gsap.quickTo(spotlight, 'y', { duration: 0.35, ease: 'power3' });

          const onPointerMove = (e: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            // Center 256px spotlight (half width = 128px) on cursor
            xTo(e.clientX - rect.left - 128);
            yTo(e.clientY - rect.top - 128);
          };

          const onPointerEnter = () => {
            gsap.to(spotlight, { opacity: 1, duration: 0.25 });
          };

          const onPointerLeave = () => {
            gsap.to(spotlight, { opacity: 0, duration: 0.35 });
          };

          card.addEventListener('pointermove', onPointerMove);
          card.addEventListener('pointerenter', onPointerEnter);
          card.addEventListener('pointerleave', onPointerLeave);
        });

        // 5. About & Skills ScrollTrigger
        const aboutCards = gsap.utils.toArray<HTMLElement>('.gsap-about-card');
        if (aboutCards.length > 0) {
          gsap.fromTo(
            aboutCards,
            { y: 28, opacity: 0 },
            {
              scrollTrigger: {
                trigger: '#about',
                start: 'top 82%',
                once: true,
              },
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.12,
              ease: 'power2.out',
              clearProps: 'all',
            }
          );
        }

        // 6. Experience Timeline ScrollTrigger
        const expItems = gsap.utils.toArray<HTMLElement>('.gsap-exp-item');
        if (expItems.length > 0) {
          gsap.fromTo(
            expItems,
            { y: 28, opacity: 0 },
            {
              scrollTrigger: {
                trigger: '#experience',
                start: 'top 82%',
                once: true,
              },
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.15,
              ease: 'power2.out',
              clearProps: 'all',
            }
          );
        }

        // 7. Contact Section ScrollTrigger
        const contactCards = gsap.utils.toArray<HTMLElement>('.gsap-contact-card');
        if (contactCards.length > 0) {
          gsap.fromTo(
            contactCards,
            { y: 28, opacity: 0 },
            {
              scrollTrigger: {
                trigger: '#contact',
                start: 'top 82%',
                once: true,
              },
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.12,
              ease: 'power2.out',
              clearProps: 'all',
            }
          );
        }
      }, scopeRef);

      return () => ctx.revert();
    },
    { dependencies: [isAdmin], scope: scopeRef }
  );

  return <div ref={scopeRef}>{children}</div>;
}

export default PortfolioAnimator;
