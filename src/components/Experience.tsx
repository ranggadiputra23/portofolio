'use client';

import { Experience as ExpType } from '@/lib/types';
import { Briefcase, Calendar, MapPin, CheckCircle, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';

interface ExperienceProps {
  experiences: ExpType[];
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-sky-400 bg-blue-50/80 dark:bg-sky-950/40 px-3.5 py-1.5 rounded-full border border-blue-200/60 dark:border-sky-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Rekam Jejak Karir
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-3 tracking-tight text-slate-900 dark:text-white">
            Pengalaman Kerja Profesional
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Perjalanan karir dan pencapaian saya dalam pengembangan produk digital web.
          </p>
        </div>

        {/* Timeline Items Container */}
        <div className="relative pl-6 sm:pl-8 space-y-8 sm:space-y-10">
          {/* Vertical Timeline Guide Line (Centered exactly at x=0) */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-3 bottom-3 w-0.5 bg-slate-200/90 dark:bg-white/10 -translate-x-1/2 pointer-events-none"
          />

          {experiences.map((exp) => (
            <div key={exp.id} className="relative group gsap-exp-item">
              {/* Timeline Bullet Node (Mathematically centered on the line at x=0) */}
              <div
                aria-hidden="true"
                className="absolute -left-6 sm:-left-8 top-5 sm:top-6 -translate-x-1/2 w-5 h-5 rounded-full bg-blue-600 dark:bg-sky-400 border-4 border-white dark:border-slate-950 shadow-md group-hover:scale-125 transition-transform z-10"
              />

              {/* Experience Card */}
              <GlassCard hoverEffect className="p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-600 dark:text-sky-400 mt-0.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <span className="px-2.5 py-1 rounded-full bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-white/10 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-blue-500 dark:text-sky-400" />
                      {exp.period}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Highlights List */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="space-y-1.5 pt-3.5 border-t border-slate-200/60 dark:border-white/10">
                    {exp.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
