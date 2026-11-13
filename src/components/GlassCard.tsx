import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  hoverEffect?: boolean;
  glow?: boolean;
}

export const GLASS_CARD_BASE =
  'bg-white/65 dark:bg-slate-900/55 backdrop-blur-md border border-white/80 dark:border-white/10 shadow-[0_8px_32px_0_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.15)] rounded-2xl transition-all duration-300';

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ as: Component = 'div', className, hoverEffect = false, glow = false, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={twMerge(
          clsx(
            GLASS_CARD_BASE,
            hoverEffect &&
              'hover:border-blue-400/60 dark:hover:border-sky-400/40 hover:-translate-y-1 hover:shadow-[0_16px_40px_0_rgba(37,99,235,0.12),inset_0_1px_0_0_rgba(255,255,255,1)] dark:hover:shadow-[0_16px_40px_0_rgba(56,189,248,0.15),inset_0_1px_0_0_rgba(255,255,255,0.2)]',
            glow &&
              'relative before:absolute before:-inset-px before:-z-10 before:rounded-2xl before:bg-linear-to-r before:from-blue-500/20 before:via-sky-400/20 before:to-cyan-400/20 before:blur-xl',
            className
          )
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
