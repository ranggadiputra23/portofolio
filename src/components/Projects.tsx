"use client";

import { useState, useEffect } from "react";
import { Project } from "@/lib/types";
import { ExternalLink, Search, Star, Layers, X } from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { GlassCard } from "@/components/GlassCard";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(
    null,
  );

  const categories = ["Semua", "Frontend", "Fullstack", "UI/UX"];

  // Close modal on Escape key press (R-32)
  useEffect(() => {
    if (!activeModalProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalProject]);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "Semua" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 gsap-projects-header">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400 bg-blue-50/80 dark:bg-sky-950/50 px-3.5 py-1.5 rounded-full border border-blue-200/60 dark:border-sky-500/30">
            Portofolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-3 tracking-tight text-slate-900 dark:text-white">
            Karya & Proyek Terpilih
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Koleksi aplikasi web responsif dan sistem antarmuka modern yang
            terhubung ke database.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-10 gsap-projects-filter">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-10 px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400 ${
                  selectedCategory === cat
                    ? "bg-blue-600 dark:bg-sky-400 text-white dark:text-slate-950 shadow-md shadow-blue-600/20 dark:shadow-sky-400/20"
                    : "bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-white/80 dark:border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full sm:w-72">
            <Search
              className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Cari proyek atau teknologi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Cari proyek atau teknologi"
              className="glass-input w-full pl-10 pr-4 py-2.5 text-xs rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
            />
          </div>
        </div>

        {/* Projects Cards Grid */}
        {filteredProjects.length === 0 ? (
          <GlassCard className="p-10 text-center max-w-md mx-auto my-12">
            <Layers
              className="w-10 h-10 text-slate-400 mx-auto mb-3"
              aria-hidden="true"
            />
            <p className="font-bold text-base mb-1 text-slate-900 dark:text-white">
              Tidak Ada Proyek Ditemukan
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Coba ubah kata kunci pencarian atau kategori filter Anda.
            </p>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gsap-projects-grid">
            {filteredProjects.map((project) => (
              <GlassCard
                key={project.id}
                hoverEffect
                className={`gsap-project-card overflow-hidden flex flex-col group relative will-change-transform ${
                  project.featured
                    ? "border-blue-400/50 dark:border-sky-400/40 shadow-lg shadow-blue-500/5 dark:shadow-sky-500/10"
                    : ""
                }`}
              >
                {/* Specular Spotlight Layer for GSAP interactive quickTo hover */}
                <div
                  aria-hidden="true"
                  className="gsap-spotlight pointer-events-none absolute -top-32 -left-32 w-64 h-64 rounded-full bg-blue-500/15 dark:bg-sky-400/20 blur-2xl opacity-0 transition-opacity duration-300 z-10 will-change-transform"
                />

                {/* Project Image & Badges */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    width={800}
                    height={500}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md">
                      <Star
                        className="w-3.5 h-3.5 fill-slate-950"
                        aria-hidden="true"
                      />
                      Unggulan
                    </div>
                  )}

                  {/* Category Tag */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-950/75 backdrop-blur-xs text-white border border-white/20">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base mb-2 text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-medium rounded-md bg-blue-50 dark:bg-slate-800/80 text-blue-700 dark:text-sky-300 border border-blue-100 dark:border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links & Details Action */}
                  <div className="flex items-center justify-between pt-3.5 border-t border-slate-200/60 dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => setActiveModalProject(project)}
                      className="min-h-11 px-2 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-sky-400 dark:hover:text-sky-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
                    >
                      Lihat Detail
                    </button>

                    <div className="flex items-center gap-1">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="min-w-11 min-h-11 flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
                          title="Source Code"
                          aria-label={`Source code ${project.title} di GitHub`}
                        >
                          <GithubIcon className="w-4 h-4" aria-hidden="true" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="min-w-11 min-h-11 flex items-center justify-center rounded-lg text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
                          title="Live Demo"
                          aria-label={`Live demo ${project.title}`}
                        >
                          <ExternalLink
                            className="w-4 h-4"
                            aria-hidden="true"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal with backdrop dismissal & Escape key listener */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setActiveModalProject(null);
            }
          }}
        >
          <GlassCard className="w-full max-w-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl border border-white/80 dark:border-white/10">
            <button
              type="button"
              onClick={() => setActiveModalProject(null)}
              className="min-w-11 min-h-11 absolute top-4 right-4 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
              aria-label="Tutup Detail Proyek"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="aspect-video rounded-xl overflow-hidden mb-5 bg-slate-900">
              <img
                src={activeModalProject.imageUrl}
                alt={activeModalProject.title}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
              />
            </div>

            <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-blue-50 dark:bg-sky-950/50 text-blue-700 dark:text-sky-300 border border-blue-200/50 dark:border-sky-500/20 mb-3 inline-block">
              {activeModalProject.category}
            </span>

            <h3
              id="modal-title"
              className="text-xl sm:text-2xl font-bold mb-3 text-slate-900 dark:text-white"
            >
              {activeModalProject.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              {activeModalProject.longDescription ||
                activeModalProject.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Teknologi:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeModalProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200/60 dark:border-white/10">
              {activeModalProject.demoUrl && (
                <a
                  href={activeModalProject.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-11 px-5 py-2.5 rounded-xl bg-blue-600 dark:bg-sky-400 hover:bg-blue-700 dark:hover:bg-sky-300 text-white dark:text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-600/20 dark:shadow-sky-400/20 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  Kunjungi Live Demo
                </a>
              )}
              {activeModalProject.githubUrl && (
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-11 px-5 py-2.5 rounded-xl bg-white/80 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-slate-700 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
                >
                  <GithubIcon className="w-4 h-4" aria-hidden="true" />
                  Source Code di GitHub
                </a>
              )}
            </div>
          </GlassCard>
        </div>
      )}
    </section>
  );
}
