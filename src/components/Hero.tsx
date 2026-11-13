"use client";

import { useState } from "react";
import { Profile } from "@/lib/types";
import { Download, Mail, Code2, MapPin, User } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { GlassCard } from "@/components/GlassCard";

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="hero" className="relative pt-12 pb-16 md:pt-16 md:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Glass Container for Hero */}
        <GlassCard className="p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline, Bio, and CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Main Headline */}
              <h1 className="gsap-hero-title text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] mb-4 text-slate-900 dark:text-white">
                Halo, Saya <br className="hidden sm:inline" />
                <span className="gradient-text">{profile.name}</span>
              </h1>

              {/* Professional Title */}
              <p className="gsap-hero-subtitle text-lg sm:text-xl font-bold text-blue-600 dark:text-sky-400 mb-3">
                {profile.title}
              </p>

              {/* Short Bio */}
              <p className="gsap-hero-bio text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6 max-w-xl">
                {profile.bio}
              </p>

              {/* Quick Tech Badge Stack */}
              <div className="gsap-hero-stack flex flex-wrap items-center gap-2 mb-8">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 mr-1">
                  Tech Stack:
                </span>
                {["Next.js", "React", "TypeScript", "Tailwind CSS"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-lg bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 shadow-2xs"
                    >
                      {tech}
                    </span>
                  ),
                )}
              </div>

              {/* CTA Action Buttons */}
              <div className="gsap-hero-cta flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <a
                  href="#projects"
                  className="min-h-[44px] px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-sky-400 dark:hover:bg-sky-300 text-white dark:text-slate-950 font-bold text-sm shadow-md shadow-blue-600/20 dark:shadow-sky-400/20 flex items-center justify-center transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
                >
                  Lihat Proyek
                </a>

                <a
                  href="#contact"
                  className="min-h-[44px] px-6 py-3 rounded-xl bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-sm border border-slate-200/80 dark:border-white/10 shadow-2xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
                >
                  <Mail
                    className="w-4 h-4 text-blue-600 dark:text-sky-400"
                    aria-hidden="true"
                  />
                  Hubungi Saya
                </a>

                {profile.resumeUrl && profile.resumeUrl !== "#" && (
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    download={
                      profile.resumeUrl.endsWith(".pdf")
                        ? `CV_${profile.name.replace(/\s+/g, "_")}.pdf`
                        : undefined
                    }
                    className="min-h-[44px] px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
                    title="Download Resume / CV (PDF)"
                    aria-label="Download Resume / CV (PDF)"
                  >
                    <Download
                      className="w-4 h-4 text-blue-600 dark:text-sky-400"
                      aria-hidden="true"
                    />
                    CV / Resume (PDF)
                  </a>
                )}
              </div>

              {/* Social Links */}
              <div className="gsap-hero-social flex items-center gap-2 mt-6 pt-6 border-t border-slate-200/60 dark:border-white/10 w-full">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 mr-1">
                  Connect:
                </span>
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
                    title="GitHub"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-sky-400 hover:bg-white/80 dark:hover:bg-slate-800 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
                    title="LinkedIn"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-sky-400 hover:bg-white/80 dark:hover:bg-slate-800 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
                    title="Email"
                    aria-label="Kirim Email"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Visual Avatar Card */}
            <div className="gsap-hero-avatar lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm">
                {/* Avatar Card */}
                <div className="relative rounded-2xl overflow-hidden border border-white/80 dark:border-white/10 shadow-xl bg-slate-900 aspect-4/5 group">
                  {imgError && profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      width={400}
                      height={500}
                      fetchPriority="high"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    // Default Developer Avatar Fallback
                    <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-b from-slate-800 via-slate-900 to-[#090D16] p-6 text-center">
                      <div className="w-24 h-24 rounded-full bg-linear-to-tr from-blue-600 to-sky-400 p-1 mb-4 shadow-md shadow-blue-500/20">
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white">
                          <User
                            className="w-12 h-12 text-slate-300"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-sky-200 text-xs font-semibold border border-blue-500/30">
                        {profile.name}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Code2
                        className="w-3.5 h-3.5 text-sky-400 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-xs font-semibold text-sky-200">
                        {profile.title}
                      </span>
                    </div>
                    <p className="font-extrabold text-lg leading-snug">
                      {profile.name}
                    </p>
                    {profile.location && (
                      <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                        <MapPin
                          className="w-3 h-3 text-slate-400 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{profile.location}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
