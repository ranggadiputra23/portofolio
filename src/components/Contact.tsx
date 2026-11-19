"use client";

import { useState } from "react";
import { Profile } from "@/lib/types";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";

interface ContactProps {
  profile: Profile;
}

export default function Contact({ profile }: ContactProps) {
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          type: "success",
          message: "Terima kasih! Pesan Anda telah terkirim.",
        });
        setFormData({
          senderName: "",
          senderEmail: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Gagal mengirim pesan.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Terjadi kesalahan koneksi server.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400 bg-blue-50/80 dark:bg-sky-950/50 px-3.5 py-1.5 rounded-full border border-blue-200/60 dark:border-sky-500/30">
            Hubungi Saya
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-3 tracking-tight text-slate-900 dark:text-white">
            Mari Kolaborasi & Diskusi Proyek
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base">
            Punya ide proyek menarik atau ingin konsultasi seputar pengembangan
            web? Kirimkan pesan Anda di bawah ini.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Cards Column */}
          <div className="lg:col-span-5 space-y-4">
            <GlassCard
              hoverEffect
              className="p-5 flex items-start gap-3.5 gsap-contact-card border border-white/80 dark:border-white/10"
            >
              <div className="p-3 rounded-xl bg-blue-500/10 dark:bg-sky-400/10 text-blue-600 dark:text-sky-400 shrink-0">
                <Mail className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-0.5">
                  Email Direktori
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 mb-1.5">
                  Respon cepat dalam 24 jam kerja
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-block py-1 text-xs sm:text-sm font-semibold text-blue-600 dark:text-sky-400 hover:underline break-all rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
                >
                  {profile.email}
                </a>
              </div>
            </GlassCard>

            <GlassCard
              hoverEffect
              className="p-5 flex items-start gap-3.5 gsap-contact-card border border-white/80 dark:border-white/10"
            >
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-0.5">
                  Lokasi Domisili
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 mb-1.5">
                  Siap bekerja Remote & Hybrid
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {profile.location}
                </p>
              </div>
            </GlassCard>
          </div>

          {/* Contact Form Column */}
          <GlassCard className="lg:col-span-7 p-6 sm:p-8 gsap-contact-card border border-white/80 dark:border-white/10">
            {status && (
              <div
                role={status.type === "error" ? "alert" : "status"}
                aria-live="polite"
                className={`p-3.5 rounded-xl mb-5 text-xs font-semibold flex items-center gap-2.5 ${
                  status.type === "success"
                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2
                    className="w-4 h-4 shrink-0"
                    aria-hidden="true"
                  />
                ) : (
                  <AlertCircle
                    className="w-4 h-4 shrink-0"
                    aria-hidden="true"
                  />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Nama Anda <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Masukkan nama lengkap"
                    value={formData.senderName}
                    onChange={(e) =>
                      setFormData({ ...formData, senderName: e.target.value })
                    }
                    className="glass-input w-full px-3.5 py-2.5 text-xs rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Email Anda <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={formData.senderEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, senderEmail: e.target.value })
                    }
                    className="glass-input w-full px-3.5 py-2.5 text-xs rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Subjek Pesan
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Contoh: Penawaran Proyek Next.js"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="glass-input w-full px-3.5 py-2.5 text-xs rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Isi Pesan <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Ceritakan tentang proyek atau ide yang ingin Anda kembangkan bersama..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="glass-input w-full px-3.5 py-2.5 text-xs rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-11 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-sky-400 dark:hover:bg-sky-300 text-white dark:text-slate-950 font-bold text-xs shadow-md shadow-blue-600/20 dark:shadow-sky-400/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-sky-400"
              >
                <Send className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{loading ? "Mengirim..." : "Kirim Pesan Sekarang"}</span>
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
