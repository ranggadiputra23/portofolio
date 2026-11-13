'use client';

import React from 'react';
import { Cpu } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export function ReactLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} aria-label="React">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function NextjsLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 180 180" className={className} aria-label="Next.js">
      <circle cx="90" cy="90" r="90" fill="#000000" />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.16 149.508 157.52Z"
        fill="url(#next-grad-custom)"
      />
      <rect fill="url(#next-grad-custom-2)" height="72" width="12" x="115" y="54" />
      <defs>
        <linearGradient id="next-grad-custom" x1="109" x2="144.5" y1="116.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="next-grad-custom-2" x1="121" x2="120.8" y1="54" y2="106.9" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function TailwindLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-label="Tailwind CSS">
      <path
        d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
        fill="#06B6D4"
      />
    </svg>
  );
}

export function TypeScriptLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-label="TypeScript">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path
        d="M11.4 10.6H8.2V9h7.6v1.6h-3.2v7.6h-1.2v-7.6zm4.8 5.7c.5.4 1.2.7 2 .7 1 0 1.6-.5 1.6-1.2 0-.8-.7-1.1-1.7-1.5-1.4-.5-2.2-1.1-2.2-2.3 0-1.3 1.1-2.2 2.7-2.2 1 0 1.7.3 2.2.6l-.4 1.3c-.4-.3-1-.5-1.8-.5-.8 0-1.4.4-1.4 1 0 .6.5.9 1.5 1.3 1.5.6 2.4 1.2 2.4 2.5 0 1.4-1.1 2.3-2.9 2.3-1.1 0-2.1-.4-2.7-.8l.4-1.4z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function JavaScriptLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-label="JavaScript">
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path
        d="M6 16.5c.5.8 1.3 1.3 2.3 1.3 1.3 0 2.1-.8 2.1-2.3v-6.3h-1.7v6.3c0 .6-.3.9-.7.9-.4 0-.7-.3-.9-.6l-1.1.7zm7.5.1c.7.8 1.7 1.2 2.9 1.2 1.8 0 2.9-1 2.9-2.5 0-1.5-.9-2.2-2.5-2.9-1.1-.5-1.5-.8-1.5-1.4 0-.5.4-.9 1.1-.9.7 0 1.3.3 1.7.9l1.3-.9c-.7-1-1.7-1.5-3-1.5-1.7 0-2.7 1.1-2.7 2.4 0 1.5.9 2.2 2.4 2.8 1.1.5 1.6.8 1.6 1.5 0 .6-.5 1-1.3 1-.9 0-1.6-.4-2.1-1.1l-1.4.9z"
        fill="#000000"
      />
    </svg>
  );
}

export function HTML5Logo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-label="HTML5">
      <path d="M3.2 2l1.6 18.2L12 22.4l7.2-2.2L20.8 2H3.2z" fill="#E34F26" />
      <path d="M12 3.6v17.2l5.7-1.7 1.4-15.5H12z" fill="#EF652A" />
      <path
        d="M7 6.4h10l-.2 2.2H9.4l.2 2.2h7l-.5 5.8-4.1 1.2-4.1-1.2-.3-3.2h2.2l.2 1.7 2 .6 2-.6.2-2.3H7.4L7 6.4z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function CSS3Logo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-label="CSS3">
      <path d="M3.2 2l1.6 18.2L12 22.4l7.2-2.2L20.8 2H3.2z" fill="#1572B6" />
      <path d="M12 3.6v17.2l5.7-1.7 1.4-15.5H12z" fill="#33A9DC" />
      <path
        d="M7 6.4h10l-.2 2.2H9.4l.2 2.2h7l-.5 5.8-4.1 1.2-4.1-1.2-.3-3.2h2.2l.2 1.7 2 .6 2-.6.2-2.3H7.4L7 6.4z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function GitLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-label="Git">
      <path
        d="M22.5 10.9L13.1 1.5c-.7-.7-1.8-.7-2.5 0L8.7 3.4l3.1 3.1c.7-.2 1.5 0 2 .5.6.6.7 1.4.5 2.1l3 3c.7-.2 1.5 0 2.1.5.8.8.8 2.2 0 3-.8.8-2.2.8-3 0-.6-.6-.7-1.4-.5-2.1l-2.8-2.8v5.5c.2.2.4.4.5.7.8.8.8 2.2 0 3s-2.2.8-3 0c-.8-.8-.8-2.2 0-3 .2-.3.5-.5.8-.7v-5.6c-.3-.2-.6-.4-.8-.7-.6-.6-.7-1.5-.4-2.2L7.3 4.8 1.5 10.6c-.7.7-.7 1.8 0 2.5l9.4 9.4c.7.7 1.8.7 2.5 0l9.1-9.1c.7-.7.7-1.8 0-2.5z"
        fill="#F05032"
      />
    </svg>
  );
}

export function ViteLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-label="Vite">
      <path
        d="M21.7 3.6L12.5 20.3c-.2.4-.8.4-1 0L2.3 3.6c-.3-.5.1-1.1.7-1l9 1.8 9-1.8c.6-.1 1 .5.7 1z"
        fill="url(#vite-grad-custom)"
      />
      <path d="M12.9 2.5l-6 1.2 5 10.5 1-11.7zm1.1 5.3l-2.2 4.3 1.2 7 4.8-9.8-3.8-1.5z" fill="#FFD62E" />
      <defs>
        <linearGradient id="vite-grad-custom" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#41D1FF" />
          <stop offset="1" stopColor="#BD34FE" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function WebpackLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-label="Webpack">
      <path d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2z" fill="#8DD6F9" />
      <path d="M12 3.3L19.5 7.6v8.8L12 20.7l-7.5-4.3V7.6L12 3.3z" fill="#1C78C0" />
      <path d="M12 7l5.2 3v6L12 19l-5.2-3v-6L12 7z" fill="#8DD6F9" />
    </svg>
  );
}

export function FigmaLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-label="Figma">
      <path d="M8 2h4v5H8a2.5 2.5 0 010-5z" fill="#F24E1E" />
      <path d="M12 2h4a2.5 2.5 0 010 5h-4V2z" fill="#FF7262" />
      <path d="M8 7h4v5H8A2.5 2.5 0 018 7z" fill="#A259FF" />
      <circle cx="14.5" cy="9.5" r="2.5" fill="#1ABCFE" />
      <path d="M8 12h4v5a2.5 2.5 0 11-4-2.5V12z" fill="#0ACF83" />
    </svg>
  );
}

export function FramerLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-label="Framer Motion">
      <path d="M4 2h16v7.3H12L4 2zm0 7.3h8l8 7.4H4V9.3zm8 7.4l-8 7.3v-7.3h8z" fill="#0055FF" />
    </svg>
  );
}

export function NeonLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-label="Neon DB">
      <circle cx="12" cy="12" r="10" fill="#00E599" fillOpacity="0.15" />
      <circle cx="12" cy="12" r="9" stroke="#00E599" strokeWidth="2" fill="none" />
      <path d="M7 16l4-8h2l4 8h-2.5l-.8-2h-3.4l-.8 2H7zm4.2-3.8h2.1L12 9.5l-.8 2.7z" fill="#00E599" />
    </svg>
  );
}

export function GraphQLLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-label="GraphQL">
      <path d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2z" stroke="#E10098" strokeWidth="1.8" fill="none" />
      <circle cx="12" cy="2" r="1.8" fill="#E10098" />
      <circle cx="20.7" cy="7" r="1.8" fill="#E10098" />
      <circle cx="20.7" cy="17" r="1.8" fill="#E10098" />
      <circle cx="12" cy="22" r="1.8" fill="#E10098" />
      <circle cx="3.3" cy="17" r="1.8" fill="#E10098" />
      <circle cx="3.3" cy="7" r="1.8" fill="#E10098" />
      <path d="M12 4.5l6.5 3.8v7.4L12 19.5l-6.5-3.8V8.3L12 4.5z" stroke="#E10098" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export function NodeLogo({ className = 'w-5 h-5' }: LogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-label="Node.js">
      <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2z" fill="#339933" />
      <path d="M12 4.5l6.8 3.9v7.8L12 20.1l-6.8-3.9V8.4L12 4.5z" fill="#ffffff" />
      <path d="M12 7l4.5 2.6v5.2L12 17.4l-4.5-2.6V9.6L12 7z" fill="#339933" />
    </svg>
  );
}

/**
 * Universal TechLogo Component:
 * 1. If `icon` is an uploaded Image URL (http/https, /uploads, data:image), renders `<img>`
 * 2. If `icon` or `name` matches a framework, renders authentic official SVG logo
 * 3. Falls back gracefully to generic tech icon
 */
export function TechLogo({
  name = '',
  icon = '',
  className = 'w-5 h-5',
}: {
  name?: string;
  icon?: string;
  className?: string;
}) {
  // Check if icon is an image URL or data URI
  const isImageUrl =
    typeof icon === 'string' &&
    (icon.startsWith('http://') ||
      icon.startsWith('https://') ||
      icon.startsWith('/') ||
      icon.startsWith('data:image/'));

  if (isImageUrl) {
    return (
      <img
        src={icon}
        alt={name || 'Tech logo'}
        className={`${className} object-contain`}
        loading="lazy"
        onError={(e) => {
          // Fallback if image fails to load
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  }

  // Combine query string to match framework name
  const query = `${icon} ${name}`.toLowerCase();

  if (query.includes('react')) return <ReactLogo className={className} />;
  if (query.includes('next')) return <NextjsLogo className={className} />;
  if (query.includes('tailwind')) return <TailwindLogo className={className} />;
  if (query.includes('typescript') || query.includes('ts')) return <TypeScriptLogo className={className} />;
  if (query.includes('javascript') || query.includes('js') || query.includes('es6')) return <JavaScriptLogo className={className} />;
  if (query.includes('html')) return <HTML5Logo className={className} />;
  if (query.includes('css') || query.includes('sass')) return <CSS3Logo className={className} />;
  if (query.includes('git') || query.includes('github')) return <GitLogo className={className} />;
  if (query.includes('vite')) return <ViteLogo className={className} />;
  if (query.includes('webpack')) return <WebpackLogo className={className} />;
  if (query.includes('figma')) return <FigmaLogo className={className} />;
  if (query.includes('framer')) return <FramerLogo className={className} />;
  if (query.includes('neon') || query.includes('postgres') || query.includes('sql') || query.includes('database')) return <NeonLogo className={className} />;
  if (query.includes('graphql') || query.includes('api') || query.includes('rest')) return <GraphQLLogo className={className} />;
  if (query.includes('node')) return <NodeLogo className={className} />;

  return <Cpu className={className} />;
}
