'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Code2, Sparkles, Shield } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

interface NavbarProps {
  activeSection?: string;
}

export default function Navbar({ activeSection = 'hero' }: NavbarProps) {
  const [currentSection, setCurrentSection] = useState(activeSection);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Calculate sliding pill coordinates based on active link's bounding box inside the nav container
  useEffect(() => {
    const updatePill = () => {
      if (!navRef.current) return;
      const activeLinkEl = navRef.current.querySelector(
        `[data-nav-id="${currentSection}"]`
      ) as HTMLElement | null;

      if (activeLinkEl) {
        setPillStyle({
          left: activeLinkEl.offsetLeft,
          width: activeLinkEl.offsetWidth,
          opacity: 1,
        });
      }
    };

    // Run initially and after layout paint
    updatePill();
    const rafId = requestAnimationFrame(updatePill);
    window.addEventListener('resize', updatePill);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updatePill);
    };
  }, [currentSection]);

  useEffect(() => {
    const sections = ['hero', 'projects', 'about', 'experience', 'contact'];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // When reaching near the bottom, activate contact section
      if (windowHeight + scrollY >= documentHeight - 80) {
        setCurrentSection('contact');
        return;
      }

      // When near the top, activate hero section
      if (scrollY < 120) {
        setCurrentSection('hero');
        return;
      }

      // Check section relative to 35% from viewport top for natural activation
      const triggerLine = scrollY + windowHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (triggerLine >= top) {
            setCurrentSection(id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setCurrentSection(id);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 90; // accounts for floating navbar and spacing
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - navOffset),
        behavior: 'smooth',
      });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <div id="gsap-navbar" className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8">
      <header id="gsap-navbar-inner" className="max-w-5xl mx-auto bg-white/75 dark:bg-slate-950/70 backdrop-blur-xl border border-white/90 dark:border-white/10 rounded-full shadow-[0_8px_32px_0_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.15)] transition-all duration-300">
        <div className="px-3.5 sm:px-5 py-2.5 navbar-inner-padding flex items-center justify-between transition-all duration-300">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-blue-600 via-sky-500 to-cyan-400 dark:from-sky-400 dark:via-blue-500 dark:to-cyan-300 flex items-center justify-center text-white dark:text-slate-950 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Code2 className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base leading-tight tracking-tight text-slate-900 dark:text-white">
                Rangga<span className="text-blue-600 dark:text-sky-400">.dev</span>
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
                Portfolio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with Smooth Contained Sliding Pill */}
          <nav
            ref={navRef}
            className="relative hidden md:flex items-center gap-1 bg-slate-100/60 dark:bg-slate-900/60 p-1 rounded-full border border-slate-200/50 dark:border-white/5"
          >
            {/* Sliding Pill Indicator (Physically constrained inside <nav>, zero layout projection overflow bugs) */}
            <span
              aria-hidden="true"
              className="absolute top-1 bottom-1 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200/60 dark:border-white/10 transition-all duration-300 ease-out pointer-events-none"
              style={{
                left: `${pillStyle.left}px`,
                width: `${pillStyle.width}px`,
                opacity: pillStyle.opacity,
              }}
            />

            {navLinks.map((link) => {
              const isActive = currentSection === link.id;
              return (
                <a
                  key={link.id}
                  data-nav-id={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative z-10 px-4 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 cursor-pointer select-none ${
                    isActive
                      ? 'text-blue-600 dark:text-sky-400 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons: Admin shortcut, ThemeToggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <a
              href="/admin"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-200/60 dark:hover:border-white/10"
              title="Admin Dashboard"
            >
              <Shield className="w-3 h-3 text-blue-500 dark:text-sky-400" />
              <span>Admin</span>
            </a>

            {/* Synchronized ThemeToggle (No hydration mismatch) */}
            <ThemeToggle size="md" />

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200/60 dark:border-white/10 px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.id);
                  setMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 text-xs font-semibold rounded-xl transition-colors ${
                  currentSection === link.id
                    ? 'bg-blue-50 dark:bg-sky-950/40 text-blue-600 dark:text-sky-400 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
            >
              <Shield className="w-3.5 h-3.5 text-blue-500 dark:text-sky-400" />
              <span>Admin Dashboard</span>
            </a>
          </div>
        )}
      </header>
    </div>
  );
}
