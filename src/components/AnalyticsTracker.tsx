'use client';

import { useEffect } from 'react';

const COOLDOWN_MS = 30 * 60 * 1000;

export default function AnalyticsTracker({ path = '/' }: { path?: string }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.pathname.startsWith('/admin')) return;

    const storageKey = `portfolio_analytics_last_${path}`;
    try {
      const lastTracked = Number(sessionStorage.getItem(storageKey) || '0');
      if (lastTracked && Date.now() - lastTracked < COOLDOWN_MS) {
        return;
      }
      sessionStorage.setItem(storageKey, String(Date.now()));
    } catch {
      // Ignore storage errors in restricted browsing modes
    }

    const payload = JSON.stringify({
      path,
      referrer: document.referrer || '',
    });

    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {
      // Silent fail so analytics never impacts visitor UX
    });
  }, [path]);

  return null;
}
