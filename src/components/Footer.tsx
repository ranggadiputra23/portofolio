"use client";

import { Profile } from "@/lib/types";
import { Heart, Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";

interface FooterProps {
  profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-10 border-t border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Left Column */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="font-bold text-sm text-slate-900 dark:text-white mb-1">
            {profile.name}{" "}
            <span className="text-blue-600 dark:text-sky-400">
              &copy; {new Date().getFullYear()}
            </span>
          </p>
          {/* <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-pink-500 fill-pink-500 inline" /> Next.js, Tailwind CSS & Neon DB.
          </p> */}
        </div>

        {/* Middle Social Icons */}
        <div className="flex items-center gap-2">
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800 transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-sky-400 hover:bg-white/80 dark:hover:bg-slate-800 transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          )}
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="p-2 rounded-lg text-slate-500 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-white/80 dark:hover:bg-slate-800 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Right Scroll to top button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="px-3.5 py-1.5 rounded-xl bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/60 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
        >
          <span>Ke Atas</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
