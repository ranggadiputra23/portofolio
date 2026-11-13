'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({ className, size = 'md' }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Eliminate hydration mismatch by only rendering icon after mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? (theme === 'system' ? resolvedTheme === 'dark' : theme === 'dark') : false;

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const sizeClasses = {
    sm: 'p-1.5 rounded-lg text-xs',
    md: 'p-2.5 rounded-xl text-sm',
    lg: 'p-3 rounded-2xl text-base',
  }[size];

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size];

  return (
    <button
      suppressHydrationWarning
      type="button"
      onClick={toggleTheme}
      aria-label={mounted ? (isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap') : 'Ganti Tema'}
      className={twMerge(
        clsx(
          'relative flex items-center justify-center transition-all duration-300',
          'bg-white/70 dark:bg-slate-900/70 backdrop-blur-md',
          'border border-white/80 dark:border-white/10',
          'text-slate-700 dark:text-slate-200',
          'hover:bg-white dark:hover:bg-slate-800',
          'hover:border-blue-300 dark:hover:border-sky-500/40',
          'shadow-[0_2px_8px_0_rgba(15,23,42,0.04),inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:shadow-[0_2px_8px_0_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)]',
          'active:scale-95 cursor-pointer',
          sizeClasses,
          className
        )
      )}
    >
      {!mounted ? (
        // Hydration placeholder: neutral circle to match geometry exactly
        <span className={clsx('block rounded-full bg-slate-300 dark:bg-slate-700 animate-pulse', iconSizes)} />
      ) : isDark ? (
        <Sun className={clsx('text-amber-400 rotate-0 transition-transform duration-300 hover:rotate-45', iconSizes)} />
      ) : (
        <Moon className={clsx('text-blue-600 rotate-0 transition-transform duration-300 hover:-rotate-12', iconSizes)} />
      )}
    </button>
  );
}

export default ThemeToggle;
