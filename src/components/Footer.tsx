"use client";

import { Profile } from "@/lib/types";
import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";

interface FooterProps {
  profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-10 border-t border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Left Column */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="font-bold text-sm text-slate-900 dark:text-white">
            {profile.name}{" "}
            <span className="text-blue-600 dark:text-sky-400">
              &copy; {new Date().getFullYear()}
            </span>
          </p>
        </div>

        {/* Middle Social Icons */}
        <div className="flex items-center gap-2">
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="min-w-11 min-h-11 flex items-center justify-center rounded-lg text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white bg-white/50 dark:bg-slate-800/50 hover:bg-white/85 dark:hover:bg-slate-800 border border-white/70 dark:border-white/10 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
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
              className="min-w-11 min-h-11 flex items-center justify-center rounded-lg text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-sky-400 bg-white/50 dark:bg-slate-800/50 hover:bg-white/85 dark:hover:bg-slate-800 border border-white/70 dark:border-white/10 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
              title="LinkedIn"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="min-w-11 min-h-11 flex items-center justify-center rounded-lg text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-sky-400 bg-white/50 dark:bg-slate-800/50 hover:bg-white/85 dark:hover:bg-slate-800 border border-white/70 dark:border-white/10 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
              title="Email"
              aria-label="Kirim Email"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
        </div>

        {/* Right Scroll to top button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="min-h-11 px-4 py-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 border border-white/80 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
        >
          <span>Ke Atas</span>
          <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
