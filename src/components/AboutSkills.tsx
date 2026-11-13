"use client";

import { useState } from "react";
import { Skill, Profile } from "@/lib/types";
import { CheckCircle2 } from "lucide-react";
import { TechLogo } from "@/components/icons/TechIcons";
import { GlassCard } from "@/components/GlassCard";

interface AboutSkillsProps {
  profile: Profile;
  skills: Skill[];
}

export default function AboutSkills({ profile, skills }: AboutSkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const categories = [
    "Semua",
    "Frontend",
    "Styling & UI",
    "Tools & Utilities",
    "Backend & DB",
  ];

  const filteredSkills =
    selectedCategory === "Semua"
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400 bg-blue-50/80 dark:bg-sky-950/50 px-3.5 py-1.5 rounded-full border border-blue-200/60 dark:border-sky-500/30">
            Keahlian & Pengalaman
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-3 tracking-tight text-slate-900 dark:text-white">
            Membangun Interface Web Modern
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Kombinasi antara keahlian teknis modern, perhatian pada estetik UI,
            dan optimasi performa web.
          </p>
        </div>

        {/* Bio Summary & Core Values Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <GlassCard className="lg:col-span-7 p-6 sm:p-8 gsap-about-card border border-white/80 dark:border-white/10">
            <h3 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-2 text-slate-900 dark:text-white">
              <span
                className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-sky-400"
                aria-hidden="true"
              />
              Tentang Rangga Adi Putra
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm mb-6">
              {profile.aboutText}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-slate-200/60 dark:border-white/10">
              {[
                "Tata Letak Responsif Lintas Perangkat",
                "Arsitektur Modern Next.js App Router",
                "Optimasi Kinerja & Core Web Vitals",
                "Integrasi API & Manajemen State",
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  <CheckCircle2
                    className="w-4 h-4 text-emerald-500 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gsap-about-card border border-white/80 dark:border-white/10">
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-slate-900 dark:text-white">
                Informasi Kontak
              </h3>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-2 border-b border-slate-200/60 dark:border-white/10">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    Lokasi:
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {profile.location}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200/60 dark:border-white/10">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    Email:
                  </span>
                  <span className="font-semibold text-blue-600 dark:text-sky-400">
                    {profile.email}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200/60 dark:border-white/10">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    Spesialisasi:
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {profile.title}
                  </span>
                </div>
                {/* <div className="flex justify-between py-2">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Status:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Tersedia untuk Proyek</span>
                </div> */}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-white/10">
              <a
                href="#contact"
                className="w-full min-h-[44px] py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-sky-400 dark:hover:bg-sky-300 text-white dark:text-slate-950 font-bold text-xs text-center flex items-center justify-center transition-all shadow-md shadow-blue-600/20 dark:shadow-sky-400/20 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
              >
                Diskusi Proyek Anda
              </a>
            </div>
          </GlassCard>
        </div>

        {/* Skills Filter & Grid */}
        <div>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[40px] px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400 ${
                  selectedCategory === cat
                    ? "bg-blue-600 dark:bg-sky-400 text-white dark:text-slate-950 shadow-md shadow-blue-600/20 dark:shadow-sky-400/20"
                    : "bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-white/80 dark:border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-4">
            {filteredSkills.map((skill) => (
              <GlassCard
                key={skill.id}
                hoverEffect
                className="p-4 flex items-center gap-3 border border-white/80 dark:border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/70 dark:border-white/10 flex items-center justify-center p-2 shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                  <TechLogo
                    name={skill.name}
                    icon={skill.icon}
                    className="w-5 h-5"
                    aria-hidden="true"
                  />
                </div>
                <div className="overflow-hidden min-w-0 flex-1">
                  <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                    {skill.name}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 truncate mt-0.5">
                    {skill.category}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
