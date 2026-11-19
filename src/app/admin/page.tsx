"use client";

import { useState, useEffect, useRef } from "react";
import { Reorder, useDragControls } from "framer-motion";
import {
  Lock,
  KeyRound,
  LayoutDashboard,
  FolderPlus,
  Wrench,
  Briefcase,
  User,
  Inbox,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Database,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Star,
  Eye,
  EyeOff,
  ImageIcon,
  Shield,
  Key,
  Upload,
  Mail,
  MailOpen,
  FileText,
  Loader2,
  GripVertical,
} from "lucide-react";
import { Project, Skill, Experience, Profile, Message } from "@/lib/types";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GlassCard } from "@/components/GlassCard";
import { TechLogo } from "@/components/icons/TechIcons";

interface SortableExperienceItemProps {
  exp: Experience;
  index: number;
  onDragEnd: () => void;
  onToggleVisibility: (id: string, currentPublished?: boolean) => void;
  onEdit: (exp: Experience) => void;
  onDelete: (id: string) => void;
}

function SortableExperienceItem({
  exp,
  index,
  onDragEnd,
  onToggleVisibility,
  onEdit,
  onDelete,
}: SortableExperienceItemProps) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={exp}
      dragListener={false}
      dragControls={dragControls}
      onDragEnd={onDragEnd}
      className="list-none"
      whileDrag={{ scale: 1.01 }}
    >
      <GlassCard
        className={`p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-shadow ${
          exp.published === false
            ? "opacity-75 border-dashed border-slate-300 dark:border-slate-700"
            : ""
        }`}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <button
            type="button"
            onPointerDown={(event) => dragControls.start(event)}
            className="min-w-[44px] min-h-[44px] -ml-2 -mt-1 flex flex-col items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 touch-none cursor-grab active:cursor-grabbing shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={`Geser untuk mengubah urutan pengalaman ${exp.role}`}
            title="Tahan & geser untuk ubah urutan"
          >
            <GripVertical className="w-4 h-4" aria-hidden="true" />
            <span className="text-[10px] font-bold leading-none mt-0.5">
              #{index + 1}
            </span>
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                {exp.role}
              </h4>
              <span
                className={`px-2 py-0.5 text-xs font-bold rounded-md flex items-center gap-1 ${
                  exp.published !== false
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/60 dark:border-white/10"
                }`}
              >
                {exp.published !== false ? (
                  <>
                    <Eye className="w-3 h-3" aria-hidden="true" />
                    <span>Tampil</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3 h-3" aria-hidden="true" />
                    <span>Sembunyi</span>
                  </>
                )}
              </span>
            </div>
            <p className="text-xs font-semibold text-blue-600 dark:text-sky-400 mb-2">
              {exp.company} ({exp.period})
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {exp.description}
            </p>
            {exp.highlights && exp.highlights.length > 0 && (
              <ul className="mt-2.5 space-y-1">
                {exp.highlights.map((h, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5"
                  >
                    <span className="text-blue-500 dark:text-sky-400 shrink-0 mt-0.5">
                      &bull;
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-start pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 dark:border-white/10 w-full sm:w-auto justify-end">
          {/* Switch Tampil/Sembunyi */}
          <button
            type="button"
            role="switch"
            aria-checked={exp.published !== false}
            aria-label={
              exp.published !== false
                ? `Sembunyikan pengalaman ${exp.role}`
                : `Tampilkan pengalaman ${exp.role}`
            }
            onClick={() => onToggleVisibility(exp.id, exp.published)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              exp.published !== false
                ? "bg-emerald-500 dark:bg-emerald-400"
                : "bg-slate-300 dark:bg-slate-700"
            }`}
            title={
              exp.published !== false
                ? "Status: Tampil di website portofolio (Klik untuk sembunyikan)"
                : "Status: Disembunyikan (Klik untuk tampilkan kembali)"
            }
          >
            <span
              className={`pointer-events-none flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-xs transition-transform duration-200 ease-in-out ${
                exp.published !== false ? "translate-x-5" : "translate-x-0"
              }`}
            >
              {exp.published !== false ? (
                <Eye className="w-3 h-3 text-emerald-600 block shrink-0" aria-hidden="true" />
              ) : (
                <EyeOff className="w-3 h-3 text-slate-400 block shrink-0" aria-hidden="true" />
              )}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onEdit(exp)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-blue-600 dark:text-sky-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            title="Edit Pengalaman"
            aria-label={`Edit pengalaman ${exp.role}`}
          >
            <Edit className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(exp.id)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            title="Hapus Pengalaman"
            aria-label={`Hapus pengalaman ${exp.role}`}
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </GlassCard>
    </Reorder.Item>
  );
}

export default function AdminPage() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [currentAdminUser, setCurrentAdminUser] = useState<string>("rangga");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "projects"
    | "skills"
    | "experiences"
    | "profile"
    | "messages"
    | "security"
  >("overview");

  // Admin Data State
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Security Credentials Form State
  const [securityForm, setSecurityForm] = useState({
    newUsername: "rangga",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Modals state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    slug: "",
    description: "",
    longDescription: "",
    imageUrl: "",
    techStackStr: "",
    demoUrl: "",
    githubUrl: "",
    category: "Frontend" as "Frontend" | "Fullstack" | "Mobile" | "UI/UX",
    featured: false,
    published: true,
  });

  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [uploadingSkillImg, setUploadingSkillImg] = useState(false);
  const [uploadingProjImg, setUploadingProjImg] = useState(false);
  const [uploadingAvatarImg, setUploadingAvatarImg] = useState(false);
  const [uploadingResumePdf, setUploadingResumePdf] = useState(false);
  const [skillForm, setSkillForm] = useState({
    name: "",
    category: "Frontend" as
      | "Frontend"
      | "Styling & UI"
      | "Tools & Utilities"
      | "Backend & DB",
    icon: "",
    proficiency: 85,
    sortOrder: 1,
    published: true,
  });

  const frameworkPresets = [
    { label: "React", value: "react" },
    { label: "Next.js", value: "next" },
    { label: "Tailwind", value: "tailwind" },
    { label: "TypeScript", value: "typescript" },
    { label: "JavaScript", value: "javascript" },
    { label: "HTML5", value: "html" },
    { label: "CSS3", value: "css" },
    { label: "Vite", value: "vite" },
    { label: "Webpack", value: "webpack" },
    { label: "Git", value: "git" },
    { label: "Figma", value: "figma" },
    { label: "Framer", value: "framer" },
    { label: "Neon / SQL", value: "neon" },
    { label: "GraphQL", value: "graphql" },
    { label: "Node.js", value: "node" },
  ];

  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const lastSavedExpOrderRef = useRef<string>("");
  const latestExpIdsRef = useRef<string[]>([]);
  const [expForm, setExpForm] = useState({
    role: "",
    company: "",
    location: "",
    period: "",
    description: "",
    highlightsStr: "",
    sortOrder: 1,
    published: true,
  });

  // Check saved session on mount
  useEffect(() => {
    const savedToken =
      localStorage.getItem("rangga_admin_token") ||
      localStorage.getItem("rangga_admin_pass");
    const savedUser = localStorage.getItem("rangga_admin_user");
    if (savedToken) {
      setAdminToken(savedToken);
      if (savedUser) {
        setCurrentAdminUser(savedUser);
        setSecurityForm((prev) => ({ ...prev, newUsername: savedUser }));
      }
    }
    setIsCheckingAuth(false);
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (adminToken) {
      fetchAdminData();
    }
  }, [adminToken]);

  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    "x-admin-token": adminToken || "",
    "x-admin-pass": adminToken || "",
  });

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const headers = getAuthHeaders();

      const [pRes, prRes, skRes, exRes, msgRes] = await Promise.all([
        fetch("/api/profile", { cache: "no-store" }),
        fetch("/api/projects", { cache: "no-store" }),
        fetch("/api/skills", { cache: "no-store" }),
        fetch("/api/experiences", { cache: "no-store" }),
        fetch("/api/messages", { headers, cache: "no-store" }),
      ]);

      const [pData, prData, skData, exData, msgData] = await Promise.all([
        pRes.json(),
        prRes.json(),
        skRes.json(),
        exRes.json(),
        msgRes.json(),
      ]);

      if (pData.success) setProfile(pData.data);
      if (prData.success) setProjects(prData.data);
      if (skData.success) setSkills(skData.data);
      if (exData.success) {
        setExperiences(exData.data);
        const ids = exData.data.map((item: Experience) => item.id);
        latestExpIdsRef.current = ids;
        lastSavedExpOrderRef.current = ids.join(",");
      }
      if (msgData.success) setMessages(msgData.data);
    } catch {
      showNotification("error", "Gagal memuat data dari server.");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const submitLogin = async () => {
    if (isLoggingIn) return;
    if (!usernameInput.trim() || !passwordInput.trim()) {
      setLoginError("Username dan password wajib diisi.");
      return;
    }

    setLoginError("");
    setIsLoggingIn(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.token) {
        setAdminToken(data.token);
        const resolvedUser = data.username || usernameInput || "rangga";
        setCurrentAdminUser(resolvedUser);
        setSecurityForm((prev) => ({ ...prev, newUsername: resolvedUser }));

        // Store session in localStorage (not from env)
        localStorage.setItem("rangga_admin_token", data.token);
        localStorage.setItem("rangga_admin_pass", data.token);
        localStorage.setItem("rangga_admin_user", resolvedUser);

        showNotification("success", `Selamat datang kembali, ${resolvedUser}!`);
      } else {
        setLoginError(data.error || "Username atau Password salah.");
      }
    } catch {
      setLoginError("Terjadi kesalahan koneksi server.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitLogin();
  };

  const handleLoginInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      void submitLogin();
    }
  };

  const handleLogout = () => {
    setAdminToken(null);
    setCurrentAdminUser("");
    localStorage.removeItem("rangga_admin_token");
    localStorage.removeItem("rangga_admin_pass");
    localStorage.removeItem("rangga_admin_user");
  };

  // Change Admin Username & Password in Neon DB
  const handleUpdateSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      showNotification("error", "Konfirmasi password baru tidak cocok.");
      return;
    }

    try {
      const res = await fetch("/api/auth", {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          newUsername: securityForm.newUsername,
          newPassword: securityForm.newPassword,
          currentPassword: securityForm.currentPassword,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (data.token) {
          setAdminToken(data.token);
          localStorage.setItem("rangga_admin_token", data.token);
          localStorage.setItem("rangga_admin_pass", data.token);
        }
        if (data.username) {
          setCurrentAdminUser(data.username);
          localStorage.setItem("rangga_admin_user", data.username);
        }
        showNotification(
          "success",
          "Kredensial admin (username & password) berhasil disimpan ke Neon DB!",
        );
        setSecurityForm({
          newUsername: data.username || securityForm.newUsername,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        showNotification(
          "error",
          data.error || "Gagal mengubah password admin.",
        );
      }
    } catch {
      showNotification(
        "error",
        "Terjadi kesalahan sistem saat menyimpan password.",
      );
    }
  };

  // Projects CRUD Actions
  const handleOpenNewProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: "",
      slug: "",
      description: "",
      longDescription: "",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      techStackStr: "Next.js, React, TypeScript, Tailwind CSS",
      demoUrl: "",
      githubUrl: "",
      category: "Frontend",
      featured: false,
      published: true,
    });
    setIsProjectModalOpen(true);
  };

  const handleOpenEditProjectModal = (proj: Project) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title,
      slug: proj.slug,
      description: proj.description,
      longDescription: proj.longDescription || "",
      imageUrl: proj.imageUrl,
      techStackStr: proj.techStack.join(", "),
      demoUrl: proj.demoUrl || "",
      githubUrl: proj.githubUrl || "",
      category: proj.category,
      featured: proj.featured,
      published: proj.published !== false,
    });
    setIsProjectModalOpen(true);
  };

  const handleToggleProjectVisibility = async (
    id: string,
    currentPublished?: boolean,
  ) => {
    const newStatus = currentPublished === false ? true : false;
    // Optimistic UI update
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: newStatus } : p)),
    );

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ published: newStatus }),
      });
      if (res.ok) {
        showNotification(
          "success",
          newStatus
            ? "Proyek sekarang tampil di website portofolio."
            : "Proyek disembunyikan dari website portofolio.",
        );
      } else {
        // Rollback
        setProjects((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, published: currentPublished } : p,
          ),
        );
        showNotification(
          "error",
          "Gagal memperbarui status visibilitas proyek.",
        );
      }
    } catch {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, published: currentPublished } : p,
        ),
      );
      showNotification("error", "Terjadi kesalahan jaringan.");
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: projectForm.title,
      slug:
        projectForm.slug ||
        projectForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: projectForm.description,
      longDescription: projectForm.longDescription,
      imageUrl: projectForm.imageUrl,
      techStack: projectForm.techStackStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      demoUrl: projectForm.demoUrl,
      githubUrl: projectForm.githubUrl,
      category: projectForm.category,
      featured: projectForm.featured,
      published: projectForm.published,
    };

    const headers = getAuthHeaders();

    try {
      if (editingProject) {
        const res = await fetch(`/api/projects/${editingProject.id}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          showNotification("success", "Proyek berhasil di-update!");
          setIsProjectModalOpen(false);
          fetchAdminData();
        }
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          showNotification("success", "Proyek baru berhasil ditambahkan!");
          setIsProjectModalOpen(false);
          fetchAdminData();
        }
      }
    } catch {
      showNotification("error", "Gagal menyimpan data proyek.");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus proyek ini?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        showNotification("success", "Proyek telah dihapus.");
        fetchAdminData();
      }
    } catch {
      showNotification("error", "Gagal menghapus proyek.");
    }
  };

  // File Upload Helper Function (Multipart Form Data -> /api/upload)
  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "x-admin-token": adminToken || "",
          "x-admin-pass": adminToken || "",
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success && data.url) {
        return data.url;
      }
      showNotification("error", data.error || "Gagal mengunggah file gambar.");
      return null;
    } catch {
      showNotification(
        "error",
        "Terjadi kesalahan jaringan saat mengunggah file.",
      );
      return null;
    }
  };

  const handleOpenAddSkillModal = () => {
    setEditingSkill(null);
    setSkillForm({
      name: "",
      category: "Frontend",
      icon: "",
      proficiency: 85,
      sortOrder: skills.length + 1,
      published: true,
    });
    setIsSkillModalOpen(true);
  };

  const handleOpenEditSkillModal = (skill: Skill) => {
    setEditingSkill(skill);
    setSkillForm({
      name: skill.name,
      category: skill.category,
      icon: skill.icon || "",
      proficiency: skill.proficiency,
      sortOrder: skill.sortOrder,
      published: skill.published !== false,
    });
    setIsSkillModalOpen(true);
  };

  const handleSkillFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingSkillImg(true);
    const uploadedUrl = await uploadFile(file);
    setUploadingSkillImg(false);

    if (uploadedUrl) {
      setSkillForm((prev) => ({ ...prev, icon: uploadedUrl }));
      showNotification("success", "Gambar logo skill berhasil diunggah!");
    }
  };

  const handleProjectFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingProjImg(true);
    const uploadedUrl = await uploadFile(file);
    setUploadingProjImg(false);

    if (uploadedUrl) {
      setProjectForm((prev) => ({ ...prev, imageUrl: uploadedUrl }));
      showNotification("success", "Gambar proyek berhasil diunggah!");
    }
  };

  const handleAvatarFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    setUploadingAvatarImg(true);
    const uploadedUrl = await uploadFile(file);
    setUploadingAvatarImg(false);

    if (uploadedUrl) {
      setProfile((prev) => (prev ? { ...prev, avatarUrl: uploadedUrl } : null));
      showNotification(
        "success",
        "Foto avatar berhasil diunggah! Klik Simpan Profil.",
      );
    }
  };

  const handleResumeFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      showNotification(
        "error",
        "Hanya file format PDF (.pdf) yang diperbolehkan untuk Resume / CV.",
      );
      return;
    }

    setUploadingResumePdf(true);
    const uploadedUrl = await uploadFile(file);
    setUploadingResumePdf(false);

    if (uploadedUrl) {
      setProfile((prev) => (prev ? { ...prev, resumeUrl: uploadedUrl } : null));
      showNotification(
        "success",
        "File PDF Resume berhasil diunggah! Klik 'Simpan Perubahan Profil' untuk menyimpan ke database.",
      );
    }
    e.target.value = "";
  };

  // Skills Actions
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    const headers = getAuthHeaders();
    try {
      if (editingSkill) {
        const res = await fetch(`/api/skills/${editingSkill.id}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(skillForm),
        });
        if (res.ok) {
          showNotification("success", "Skill berhasil diperbarui!");
          setIsSkillModalOpen(false);
          fetchAdminData();
        } else {
          showNotification("error", "Gagal memperbarui skill.");
        }
      } else {
        const res = await fetch("/api/skills", {
          method: "POST",
          headers,
          body: JSON.stringify(skillForm),
        });
        if (res.ok) {
          showNotification("success", "Skill berhasil ditambahkan!");
          setIsSkillModalOpen(false);
          setSkillForm({
            name: "",
            category: "Frontend",
            icon: "",
            proficiency: 85,
            sortOrder: 1,
            published: true,
          });
          fetchAdminData();
        } else {
          showNotification("error", "Gagal menambahkan skill.");
        }
      }
    } catch {
      showNotification("error", "Gagal menyimpan data skill.");
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm("Hapus keahlian ini?")) return;
    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        showNotification("success", "Skill berhasil dihapus.");
        fetchAdminData();
      }
    } catch {
      showNotification("error", "Gagal menghapus skill.");
    }
  };

  const handleToggleSkillVisibility = async (
    id: string,
    currentPublished?: boolean,
  ) => {
    const newStatus = currentPublished === false ? true : false;
    // Optimistic UI update
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, published: newStatus } : s)),
    );

    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ published: newStatus }),
      });
      if (res.ok) {
        showNotification(
          "success",
          newStatus
            ? "Skill sekarang tampil di website portofolio."
            : "Skill disembunyikan dari website portofolio.",
        );
      } else {
        // Rollback
        setSkills((prev) =>
          prev.map((s) =>
            s.id === id ? { ...s, published: currentPublished } : s,
          ),
        );
        showNotification(
          "error",
          "Gagal memperbarui status visibilitas skill.",
        );
      }
    } catch {
      setSkills((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, published: currentPublished } : s,
        ),
      );
      showNotification("error", "Terjadi kesalahan jaringan.");
    }
  };

  // Experience Actions
  const handleOpenAddExpModal = () => {
    setEditingExp(null);
    setExpForm({
      role: "",
      company: "",
      location: "",
      period: "",
      description: "",
      highlightsStr: "",
      sortOrder: experiences.length + 1,
      published: true,
    });
    setIsExpModalOpen(true);
  };

  const handleOpenEditExpModal = (exp: Experience) => {
    setEditingExp(exp);
    setExpForm({
      role: exp.role,
      company: exp.company,
      location: exp.location || "",
      period: exp.period,
      description: exp.description,
      highlightsStr: (exp.highlights || []).join("\n"),
      sortOrder: exp.sortOrder,
      published: exp.published !== false,
    });
    setIsExpModalOpen(true);
  };

  const handleToggleExperienceVisibility = async (
    id: string,
    currentPublished?: boolean,
  ) => {
    const newStatus = currentPublished === false ? true : false;
    // Optimistic UI update
    setExperiences((prev) =>
      prev.map((e) => (e.id === id ? { ...e, published: newStatus } : e)),
    );

    try {
      const res = await fetch(`/api/experiences/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ published: newStatus }),
      });
      if (res.ok) {
        showNotification(
          "success",
          newStatus
            ? "Pengalaman sekarang tampil di website portofolio."
            : "Pengalaman disembunyikan dari website portofolio.",
        );
      } else {
        // Rollback
        setExperiences((prev) =>
          prev.map((e) =>
            e.id === id ? { ...e, published: currentPublished } : e,
          ),
        );
        showNotification(
          "error",
          "Gagal memperbarui status visibilitas pengalaman.",
        );
      }
    } catch {
      setExperiences((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, published: currentPublished } : e,
        ),
      );
      showNotification("error", "Terjadi kesalahan jaringan.");
    }
  };

  const handleReorderExperiences = (reordered: Experience[]) => {
    const withOrder = reordered.map((item, idx) => ({
      ...item,
      sortOrder: idx + 1,
    }));
    latestExpIdsRef.current = withOrder.map((item) => item.id);
    setExperiences(withOrder);
  };

  const handleSaveExperienceOrder = async () => {
    const orderedIds = latestExpIdsRef.current;
    const nextOrderKey = orderedIds.join(",");
    if (orderedIds.length === 0 || nextOrderKey === lastSavedExpOrderRef.current) {
      return;
    }

    try {
      const res = await fetch("/api/experiences", {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ orderedIds }),
      });
      if (res.ok) {
        lastSavedExpOrderRef.current = nextOrderKey;
        showNotification("success", "Urutan pengalaman berhasil disimpan ke database.");
      } else {
        showNotification("error", "Gagal menyimpan urutan pengalaman.");
        fetchAdminData();
      }
    } catch {
      showNotification("error", "Terjadi kesalahan koneksi saat menyimpan urutan.");
      fetchAdminData();
    }
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      role: expForm.role,
      company: expForm.company,
      location: expForm.location,
      period: expForm.period,
      description: expForm.description,
      highlights: expForm.highlightsStr
        ? expForm.highlightsStr.split("\n").filter(Boolean)
        : [],
      sortOrder: expForm.sortOrder,
      published: expForm.published,
    };
    try {
      if (editingExp) {
        const res = await fetch(`/api/experiences/${editingExp.id}`, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          showNotification("success", "Pengalaman berhasil diperbarui!");
          setIsExpModalOpen(false);
          setEditingExp(null);
          fetchAdminData();
        } else {
          showNotification("error", "Gagal memperbarui pengalaman.");
        }
      } else {
        const res = await fetch("/api/experiences", {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          showNotification("success", "Pengalaman berhasil ditambahkan!");
          setIsExpModalOpen(false);
          setExpForm({
            role: "",
            company: "",
            location: "",
            period: "",
            description: "",
            highlightsStr: "",
            sortOrder: 1,
            published: true,
          });
          fetchAdminData();
        } else {
          showNotification("error", "Gagal menambahkan pengalaman.");
        }
      }
    } catch {
      showNotification("error", "Gagal menyimpan data pengalaman.");
    }
  };

  const handleDeleteExp = async (id: string) => {
    if (!confirm("Hapus riwayat pengalaman ini?")) return;
    try {
      const res = await fetch(`/api/experiences/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        showNotification("success", "Pengalaman telah dihapus.");
        fetchAdminData();
      }
    } catch {
      showNotification("error", "Gagal menghapus pengalaman.");
    }
  };

  // Profile Actions
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        showNotification("success", "Profil Rangga berhasil diperbarui!");
        fetchAdminData();
      }
    } catch {
      showNotification("error", "Gagal mengupdate profil.");
    }
  };

  // Messages Actions
  const handleToggleReadMessage = async (
    id: string,
    currentReadStatus: boolean,
  ) => {
    // Optimistic UI update
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead: !currentReadStatus } : m)),
    );

    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PUT",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isRead: !currentReadStatus }),
      });
      if (res.ok) {
        showNotification(
          "success",
          !currentReadStatus
            ? "Pesan ditandai sudah dibaca."
            : "Pesan ditandai belum dibaca.",
        );
      } else {
        // Rollback
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, isRead: currentReadStatus } : m,
          ),
        );
        showNotification("error", "Gagal memperbarui status pesan.");
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, isRead: currentReadStatus } : m,
        ),
      );
      showNotification("error", "Terjadi kesalahan koneksi server.");
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Hapus pesan ini secara permanen dari database?")) return;

    // Optimistic UI update: instantly removes from UI so user doesn't wait
    const prevMessages = [...messages];
    setMessages((prev) => prev.filter((m) => m.id !== id));

    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        showNotification("success", "Pesan berhasil dihapus dari database.");
        // Re-fetch in background to ensure database sync
        const msgRes = await fetch("/api/messages", {
          headers: getAuthHeaders(),
          cache: "no-store",
        });
        const msgData = await msgRes.json();
        if (msgData.success) {
          setMessages(msgData.data);
        }
      } else {
        // Rollback on failure
        setMessages(prevMessages);
        showNotification("error", "Gagal menghapus pesan dari database.");
      }
    } catch {
      setMessages(prevMessages);
      showNotification("error", "Terjadi kesalahan koneksi server.");
    }
  };

  // 1. Loading Shimmer during authentication verification (eliminates login glitch on page refresh)
  if (isCheckingAuth) {
    return <AdminDashboardSkeleton />;
  }

  // 2. Unauthenticated Username & Password Login View (Neon DB Auth)
  if (!adminToken) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <GlassCard
          className="w-full max-w-md p-8 relative overflow-hidden"
          glow
        >
          {/* Subtle Top Accent Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-blue-600 via-sky-500 to-cyan-400 dark:from-sky-400 dark:via-blue-400 dark:to-cyan-400" />

          {/* <div className="flex justify-end mb-2">
            <ThemeToggle size="sm" />
          </div> */}

          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 dark:bg-sky-400/10 border border-blue-500/20 dark:border-sky-400/20 text-blue-600 dark:text-sky-400 flex items-center justify-center mx-auto mb-4 shadow-xs">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-1 text-slate-900 dark:text-white">
              Admin Login Portal
            </h1>
            {/* <p className="text-xs text-slate-500 dark:text-slate-400">
              Autentikasi Database Neon DB 
            </p> */}
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} noValidate className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Username Admin
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  disabled={isLoggingIn}
                  autoComplete="username"
                  placeholder="Masukkan Username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  onKeyDown={handleLoginInputKeyDown}
                  className="glass-input w-full pl-10 pr-4 py-2.5 text-xs rounded-xl disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Password Admin
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  disabled={isLoggingIn}
                  autoComplete="current-password"
                  placeholder="Masukkan Password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={handleLoginInputKeyDown}
                  className="glass-input w-full pl-10 pr-4 py-2.5 text-xs rounded-xl disabled:opacity-60"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full min-h-11 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-sky-400 dark:hover:bg-sky-300 text-white dark:text-slate-950 font-bold text-xs shadow-md shadow-blue-600/25 dark:shadow-sky-400/20 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              {isLoggingIn ? (
                <>
                  <Loader2
                    className="w-3.5 h-3.5 animate-spin"
                    aria-hidden="true"
                  />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Masuk ke Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* <div className="mt-5 text-center border-t border-slate-200/60 dark:border-white/10 pt-3.5">
            <a
              href="/"
              className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
            >
              &larr; Kembali ke Portfolio Publik
            </a>
          </div> */}
        </GlassCard>
      </div>
    );
  }

  // Authenticated Admin Dashboard Layout with Glassmorphism
  return (
    <div className="min-h-screen p-3 sm:p-5 lg:p-8 flex flex-col md:flex-row gap-5">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl text-xs font-bold shadow-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top duration-200 ${
            notification.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
              : "bg-rose-50 dark:bg-rose-950 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-500 dark:text-rose-400" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Admin Glass Sidebar */}
      <GlassCard className="w-full md:w-64 p-5 flex flex-col justify-between shrink-0 self-start md:sticky md:top-5 md:h-[calc(100vh-2.5rem)]">
        <div>
          {/* Brand header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200/60 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 dark:bg-sky-400 flex items-center justify-center text-white dark:text-slate-950 font-extrabold text-sm shadow-sm">
                R
              </div>
              <div>
                <p className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                  Admin CMS
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  @{currentAdminUser}
                </p>
              </div>
            </div>
            <ThemeToggle size="sm" />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {[
              {
                id: "overview",
                name: "Dashboard",
                icon: LayoutDashboard,
              },
              { id: "projects", name: "Kelola Proyek", icon: FolderPlus },
              { id: "skills", name: "Kelola Skills", icon: Wrench },
              { id: "experiences", name: "Kelola Pengalaman", icon: Briefcase },
              { id: "profile", name: "Profil & Bio", icon: User },
              {
                id: "messages",
                name: "Pesan Masuk",
                icon: Inbox,
                badge: messages.length,
                unreadBadge: messages.filter((m) => !m.isRead).length,
              },
              { id: "security", name: "Akun & Password", icon: Key },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-600 dark:bg-sky-400 text-white dark:text-slate-950 shadow-md shadow-blue-600/20 dark:shadow-sky-400/20"
                      : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 hover:bg-white/60 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span
                      className={`px-2 py-0.5 text-[10px] rounded-full font-bold flex items-center gap-1 ${
                        isActive
                          ? "bg-white text-blue-600 dark:bg-slate-900 dark:text-sky-300"
                          : tab.unreadBadge && tab.unreadBadge > 0
                            ? "bg-blue-600 text-white"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                      title={
                        tab.unreadBadge
                          ? `${tab.unreadBadge} pesan belum dibaca`
                          : `${tab.badge} total pesan`
                      }
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 space-y-2 mt-4">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full py-2 px-3 rounded-xl bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-white/70 dark:border-white/10"
          >
            <Eye className="w-3.5 h-3.5 text-blue-500 dark:text-sky-400" />
            <span>Lihat Website User</span>
          </a>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-950/70 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-rose-200 dark:border-rose-900/50 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Admin</span>
          </button>
        </div>
      </GlassCard>

      {/* Main Glass Content View */}
      <div className="flex-1 space-y-5">
        {/* Top Header Glass Bar */}
        <GlassCard className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm sm:text-2xl font-extrabold text-slate-900 dark:text-white capitalize">
              {activeTab === "overview" && "Ringkasan Dashboard"}
              {activeTab === "projects" && "Manajemen Proyek Portofolio"}
              {activeTab === "skills" && "Manajemen Skills & Keahlian"}
              {activeTab === "experiences" && "Manajemen Riwayat Pengalaman"}
              {activeTab === "profile" && "Pengaturan Profil Rangga"}
              {activeTab === "messages" && "Kotak Pesan Pengunjung"}
              {activeTab === "security" &&
                "Keamanan Akun & Kredensial Database"}
            </h2>
            {/* <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Data dan akun admin tersimpan langsung di Neon DB (tidak memakai
              env).
            </p> */}
          </div>

          {/* <div className="flex items-center gap-2.5">
            DB Status Badge
            <div className="px-3 py-1.5 rounded-full bg-white/70 dark:bg-slate-900/70 border border-white/80 dark:border-white/10 text-xs flex items-center gap-2 shadow-xs">
              <Database className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
              <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">Database:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Neon DB Live
              </span>
            </div>
          </div> */}
        </GlassCard>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <GlassCard className="p-4 sm:p-5">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Total Proyek
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-sky-400">
                  {projects.length}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  {projects.filter((p) => p.published !== false).length} Tampil
                  &bull; {projects.filter((p) => p.published === false).length}{" "}
                  Sembunyi
                </p>
              </GlassCard>

              <GlassCard className="p-4 sm:p-5">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Total Skills
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {skills.length}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  {skills.filter((s) => s.published !== false).length} Tampil
                  &bull; {skills.filter((s) => s.published === false).length}{" "}
                  Sembunyi
                </p>
              </GlassCard>

              <GlassCard className="p-4 sm:p-5">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Pengalaman
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-sky-400">
                  {experiences.length}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  {experiences.filter((e) => e.published !== false).length}{" "}
                  Tampil &bull;{" "}
                  {experiences.filter((e) => e.published === false).length}{" "}
                  Sembunyi
                </p>
              </GlassCard>

              <GlassCard className="p-4 sm:p-5">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Pesan Masuk
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-sky-400">
                  {messages.length}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  {messages.filter((m) => !m.isRead).length} Belum Dibaca
                </p>
              </GlassCard>
            </div>

            {/* Featured Projects Highlight Card */}
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  Proyek Unggulan (Featured Projects)
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab("projects")}
                  className="text-xs font-semibold text-blue-600 dark:text-sky-400 hover:underline"
                >
                  Kelola Semua Proyek &rarr;
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projects
                  .filter((p) => p.featured)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-xl bg-white/50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-white/10 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-12 h-12 rounded-lg object-cover shrink-0 bg-slate-800"
                        />
                        <div className="overflow-hidden">
                          <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                            {p.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {p.category} &bull; {p.techStack.join(", ")}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleOpenEditProjectModal(p)}
                        className="p-2 rounded-lg bg-white/80 dark:bg-slate-700/80 hover:bg-white dark:hover:bg-slate-700 text-blue-600 dark:text-sky-400 text-xs font-semibold shrink-0 cursor-pointer shadow-xs"
                        title="Edit Proyek"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
              </div>
            </GlassCard>
          </div>
        )}

        {/* TAB 2: PROJECTS CRUD */}
        {activeTab === "projects" && (
          <div className="space-y-4">
            <GlassCard className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">
                  Daftar Proyek
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total {projects.length} proyek &bull;{" "}
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {projects.filter((p) => p.published !== false).length}{" "}
                    Tampil
                  </span>{" "}
                  &bull;{" "}
                  <span className="text-slate-400 font-semibold">
                    {projects.filter((p) => p.published === false).length}{" "}
                    Sembunyi
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenNewProjectModal}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-sky-400 dark:hover:bg-sky-300 text-white dark:text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-600/20 dark:shadow-sky-400/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Proyek Baru</span>
              </button>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <GlassCard
                  key={proj.id}
                  className={`p-4 sm:p-5 flex flex-col justify-between transition-all ${
                    proj.published === false
                      ? "opacity-75 border-dashed border-slate-300 dark:border-slate-700"
                      : ""
                  }`}
                >
                  <div>
                    <div className="flex gap-3 mb-3">
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-800 border border-slate-200/50 dark:border-white/10"
                      />
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center gap-1.5 flex-wrap mb-1">
                          {/* Visibility badge */}
                          <span
                            className={`px-2 py-0.5 text-[9px] font-bold rounded-md flex items-center gap-1 ${
                              proj.published !== false
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60"
                                : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border border-slate-200/60 dark:border-white/10"
                            }`}
                          >
                            {proj.published !== false ? (
                              <>
                                <Eye className="w-2.5 h-2.5" />
                                <span>Tampil</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-2.5 h-2.5" />
                                <span>Sembunyi</span>
                              </>
                            )}
                          </span>

                          {proj.featured && (
                            <span className="px-2 py-0.5 text-[9px] font-extrabold rounded-md bg-amber-400 text-slate-950">
                              Featured
                            </span>
                          )}
                          <span className="px-2 py-0.5 text-[9px] font-bold rounded-md bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-sky-300 border border-blue-100 dark:border-white/10">
                            {proj.category}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                          {proj.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                          {proj.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {proj.techStack.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[10px] rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-white/10 gap-2">
                    {/* Switch Tampil/Sembunyi */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={proj.published !== false}
                      onClick={() =>
                        handleToggleProjectVisibility(proj.id, proj.published)
                      }
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${
                        proj.published !== false
                          ? "bg-emerald-500 dark:bg-emerald-400"
                          : "bg-slate-300 dark:bg-slate-700"
                      }`}
                      title={
                        proj.published !== false
                          ? "Status: Tampil di website portofolio (Klik untuk sembunyikan)"
                          : "Status: Disembunyikan (Klik untuk tampilkan kembali)"
                      }
                    >
                      <span
                        className={`pointer-events-none flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-xs transition-transform duration-200 ease-in-out ${
                          proj.published !== false
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      >
                        {proj.published !== false ? (
                          <Eye className="w-3 h-3 text-emerald-600 block shrink-0" />
                        ) : (
                          <EyeOff className="w-3 h-3 text-slate-400 block shrink-0" />
                        )}
                      </span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {proj.demoUrl && (
                        <a
                          href={proj.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Buka Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => handleOpenEditProjectModal(proj)}
                        className="p-1.5 rounded-lg text-blue-600 dark:text-sky-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Edit Proyek"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors cursor-pointer"
                        title="Hapus Proyek"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SKILLS CRUD */}
        {activeTab === "skills" && (
          <div className="space-y-4">
            <GlassCard className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">
                  Daftar Keahlian
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total {skills.length} keahlian &bull;{" "}
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {skills.filter((s) => s.published !== false).length} Tampil
                  </span>{" "}
                  &bull;{" "}
                  <span className="text-slate-400 font-semibold">
                    {skills.filter((s) => s.published === false).length}{" "}
                    Sembunyi
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenAddSkillModal}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Skill Baru</span>
              </button>
            </GlassCard>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skills.map((s) => (
                <GlassCard
                  key={s.id}
                  className={`p-3.5 flex items-center justify-between transition-all ${
                    s.published === false
                      ? "opacity-75 border-dashed border-slate-300 dark:border-slate-700"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-white/10 flex items-center justify-center p-1.5 shadow-xs shrink-0">
                      <TechLogo
                        name={s.name}
                        icon={s.icon}
                        className="w-5 h-5"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                          {s.name}
                        </h4>
                        {s.published === false && (
                          <span className="px-1.5 py-0.2 text-[8px] font-bold rounded bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                            Sembunyi
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {s.category} &bull;{" "}
                        <span className="font-semibold text-blue-600 dark:text-sky-400">
                          {s.proficiency}%
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Switch Tampil/Sembunyi */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={s.published !== false}
                      onClick={() =>
                        handleToggleSkillVisibility(s.id, s.published)
                      }
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${
                        s.published !== false
                          ? "bg-emerald-500 dark:bg-emerald-400"
                          : "bg-slate-300 dark:bg-slate-700"
                      }`}
                      title={
                        s.published !== false
                          ? "Status: Tampil di website portofolio (Klik untuk sembunyikan)"
                          : "Status: Disembunyikan (Klik untuk tampilkan kembali)"
                      }
                    >
                      <span
                        className={`pointer-events-none flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-xs transition-transform duration-200 ease-in-out ${
                          s.published !== false
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      >
                        {s.published !== false ? (
                          <Eye className="w-3 h-3 text-emerald-600 block shrink-0" />
                        ) : (
                          <EyeOff className="w-3 h-3 text-slate-400 block shrink-0" />
                        )}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenEditSkillModal(s)}
                      className="p-1.5 rounded-lg text-blue-600 dark:text-sky-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Edit Skill & Logo"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(s.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors cursor-pointer"
                      title="Hapus Skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EXPERIENCES CRUD */}
        {activeTab === "experiences" && (
          <div className="space-y-4">
            <GlassCard className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">
                  Riwayat Pengalaman
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total {experiences.length} pengalaman kerja &bull;{" "}
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {experiences.filter((e) => e.published !== false).length}{" "}
                    Tampil
                  </span>{" "}
                  &bull;{" "}
                  <span className="text-slate-400 font-semibold">
                    {experiences.filter((e) => e.published === false).length}{" "}
                    Sembunyi
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenAddExpModal}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Pengalaman</span>
              </button>
            </GlassCard>

            <Reorder.Group
              axis="y"
              values={experiences}
              onReorder={handleReorderExperiences}
              className="space-y-3"
            >
              {experiences.map((e, index) => (
                <SortableExperienceItem
                  key={e.id}
                  exp={e}
                  index={index}
                  onDragEnd={handleSaveExperienceOrder}
                  onToggleVisibility={handleToggleExperienceVisibility}
                  onEdit={handleOpenEditExpModal}
                  onDelete={handleDeleteExp}
                />
              ))}
            </Reorder.Group>
          </div>
        )}

        {/* TAB 5: PROFILE SETTINGS */}
        {activeTab === "profile" && profile && (
          <GlassCard className="p-6">
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Gelar / Job Title
                  </label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) =>
                      setProfile({ ...profile, title: e.target.value })
                    }
                    className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Bio Ringkas (Hero Section)
                </label>
                <textarea
                  rows={2}
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Kontak
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) =>
                      setProfile({ ...profile, location: e.target.value })
                    }
                    className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Avatar URL (Foto Hero)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={profile.avatarUrl}
                      onChange={(e) =>
                        setProfile({ ...profile, avatarUrl: e.target.value })
                      }
                      className="glass-input flex-1 px-3.5 py-2 text-xs rounded-xl"
                    />
                    <label className="px-3 py-2 rounded-xl bg-blue-50 dark:bg-sky-950/40 border border-blue-200/60 dark:border-sky-500/30 text-blue-700 dark:text-sky-300 text-xs font-bold flex items-center gap-1.5 hover:bg-blue-100 dark:hover:bg-sky-900/50 cursor-pointer shrink-0 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>
                        {uploadingAvatarImg ? "Uploading..." : "Upload"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploadingAvatarImg}
                        onChange={handleAvatarFileChange}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    File Resume / CV (Upload PDF atau URL Dokumen)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="https://... atau /uploads/resume.pdf"
                      value={profile.resumeUrl}
                      onChange={(e) =>
                        setProfile({ ...profile, resumeUrl: e.target.value })
                      }
                      className="glass-input flex-1 px-3.5 py-2 text-xs rounded-xl"
                    />
                    <label className="px-3 py-2 rounded-xl bg-blue-50 dark:bg-sky-950/40 border border-blue-200/60 dark:border-sky-500/30 text-blue-700 dark:text-sky-300 text-xs font-bold flex items-center gap-1.5 hover:bg-blue-100 dark:hover:bg-sky-900/50 cursor-pointer shrink-0 transition-colors shadow-xs">
                      <FileText className="w-3.5 h-3.5" />
                      <span>
                        {uploadingResumePdf ? "Uploading..." : "Upload PDF"}
                      </span>
                      <input
                        type="file"
                        accept=".pdf,application/pdf"
                        className="hidden"
                        disabled={uploadingResumePdf}
                        onChange={handleResumeFileChange}
                      />
                    </label>
                  </div>
                  {profile.resumeUrl && profile.resumeUrl !== "#" && (
                    <div className="mt-2 flex items-center justify-between text-[11px] p-2 rounded-xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/5">
                      <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5 truncate max-w-60 sm:max-w-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate font-mono text-[10px] text-blue-600 dark:text-sky-400">
                          {profile.resumeUrl}
                        </span>
                      </span>
                      <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-blue-600 dark:text-sky-400 hover:underline flex items-center gap-1 shrink-0 text-xs"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Preview / Download
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={profile.github}
                    onChange={(e) =>
                      setProfile({ ...profile, github: e.target.value })
                    }
                    className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={profile.linkedin}
                    onChange={(e) =>
                      setProfile({ ...profile, linkedin: e.target.value })
                    }
                    className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-sky-400 dark:hover:bg-sky-300 text-white dark:text-slate-950 font-bold text-xs shadow-md cursor-pointer"
              >
                Simpan Perubahan Profil
              </button>
            </form>
          </GlassCard>
        )}

        {/* TAB 6: MESSAGES */}
        {activeTab === "messages" && (
          <div className="space-y-4">
            {/* Messages Header & Stats */}
            <GlassCard className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">
                  Kotak Pesan Pengunjung
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total{" "}
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {messages.length} pesan
                  </span>{" "}
                  (
                  <span className="font-semibold text-blue-600 dark:text-sky-400">
                    {messages.filter((m) => !m.isRead).length} belum dibaca
                  </span>
                  ) tersimpan di Neon DB
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={fetchAdminData}
                  className="px-3 py-1.5 rounded-xl bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/10 flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                  title="Sinkronisasi Pesan dari Neon DB"
                >
                  <Database className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                  <span>Sync Database</span>
                </button>
              </div>
            </GlassCard>

            <div className="space-y-3">
              {messages.length === 0 ? (
                <GlassCard className="p-12 text-center text-slate-500 dark:text-slate-400 text-xs">
                  <Inbox className="w-10 h-10 mx-auto mb-3 opacity-30 text-slate-400" />
                  <p className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">
                    Kotak Masuk Kosong
                  </p>
                  <p>
                    Belum ada pesan masuk dari pengunjung website portofolio
                    Anda.
                  </p>
                </GlassCard>
              ) : (
                messages.map((m) => (
                  <GlassCard
                    key={m.id}
                    className={`p-5 flex flex-col justify-between transition-all ${
                      !m.isRead
                        ? "border-blue-300/80 dark:border-sky-500/40 shadow-[0_4px_20px_0_rgba(37,99,235,0.08)] dark:shadow-[0_4px_20px_0_rgba(56,189,248,0.1)]"
                        : ""
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2.5 gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                              {m.senderName}
                            </h4>
                            {!m.isRead ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-sky-950/70 text-blue-700 dark:text-sky-300 border border-blue-200/70 dark:border-sky-500/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400 animate-pulse" />
                                Baru
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                Sudah Dibaca
                              </span>
                            )}
                          </div>
                          <a
                            href={`mailto:${m.senderEmail}`}
                            className="text-xs text-blue-600 dark:text-sky-400 hover:underline"
                          >
                            {m.senderEmail}
                          </a>
                        </div>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                          {new Date(m.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2">
                        Subjek:{" "}
                        <span className="font-bold text-slate-900 dark:text-white">
                          {m.subject}
                        </span>
                      </p>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white/50 dark:bg-slate-900/60 p-3.5 rounded-xl mb-3 border border-slate-200/50 dark:border-white/5">
                        {m.message}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-200/50 dark:border-white/5">
                      <button
                        type="button"
                        onClick={() => handleToggleReadMessage(m.id, m.isRead)}
                        className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 flex items-center gap-1.5 cursor-pointer py-1 px-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        {m.isRead ? (
                          <>
                            <Mail className="w-3.5 h-3.5" />
                            <span>Tandai Belum Dibaca</span>
                          </>
                        ) : (
                          <>
                            <MailOpen className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                            <span className="text-blue-600 dark:text-sky-400">
                              Tandai Sudah Dibaca
                            </span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteMessage(m.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                        title="Hapus Pesan secara Permanen dari Neon DB"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus Pesan</span>
                      </button>
                    </div>
                  </GlassCard>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 7: SECURITY & DATABASE CREDENTIALS (NEON DB) */}
        {activeTab === "security" && (
          <div className="space-y-5">
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200/60 dark:border-white/10">
                <div className="p-2.5 rounded-xl bg-blue-500/10 dark:bg-sky-400/10 text-blue-600 dark:text-sky-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Pengaturan Akun & Password (Neon DB)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Kredensial disimpan langsung ke tabel{" "}
                    <code className="text-blue-600 dark:text-sky-400 font-mono">
                      portfolio_admin
                    </code>{" "}
                    di Neon DB (termasuk kolom hash terenkripsi dan plain text).
                    Tidak bergantung pada file env.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleUpdateSecurity}
                className="space-y-4 max-w-xl"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Username Admin Baru
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={securityForm.newUsername}
                      onChange={(e) =>
                        setSecurityForm({
                          ...securityForm,
                          newUsername: e.target.value,
                        })
                      }
                      className="glass-input w-full pl-10 pr-4 py-2.5 text-xs rounded-xl"
                      placeholder="Username admin"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Password Baru
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={securityForm.newPassword}
                      onChange={(e) =>
                        setSecurityForm({
                          ...securityForm,
                          newPassword: e.target.value,
                        })
                      }
                      className="glass-input w-full pl-10 pr-4 py-2.5 text-xs rounded-xl"
                      placeholder="Masukkan password baru"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Konfirmasi Password Baru
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={securityForm.confirmPassword}
                      onChange={(e) =>
                        setSecurityForm({
                          ...securityForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="glass-input w-full pl-10 pr-4 py-2.5 text-xs rounded-xl"
                      placeholder="Ulangi password baru"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-sky-400 dark:hover:bg-sky-300 text-white dark:text-slate-950 font-bold text-xs shadow-md shadow-blue-600/20 dark:shadow-sky-400/20 flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Perbarui Akun ke Database Neon</span>
                  </button>
                </div>
              </form>
            </GlassCard>
          </div>
        )}
      </div>

      {/* Project Form Modal with Glassmorphism and Real-Time Image Preview */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
          <GlassCard className="w-full max-w-3xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
              {editingProject ? "Edit Proyek" : "Tambah Proyek Baru"}
            </h3>
            <form onSubmit={handleSaveProject} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Judul Proyek *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: E-Commerce Dashboard"
                  value={projectForm.title}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, title: e.target.value })
                  }
                  className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Kategori *
                </label>
                <select
                  value={projectForm.category}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      category: e.target.value as any,
                    })
                  }
                  className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Fullstack">Fullstack</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Mobile">Mobile</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi Singkat *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Ringkasan proyek yang akan tampil di kartu portofolio..."
                  value={projectForm.description}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      description: e.target.value,
                    })
                  }
                  className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                />
              </div>

              {/* URL Gambar & Real-time Preview */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  URL Gambar Proyek (Upload/Link URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/... atau /uploads/..."
                    value={projectForm.imageUrl}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        imageUrl: e.target.value,
                      })
                    }
                    className="glass-input flex-1 px-3.5 py-2 text-xs rounded-xl"
                  />
                  <label className="px-3 py-2 rounded-xl bg-blue-50 dark:bg-sky-950/40 border border-blue-200/60 dark:border-sky-500/30 text-blue-700 dark:text-sky-300 text-xs font-bold flex items-center gap-1.5 hover:bg-blue-100 dark:hover:bg-sky-900/50 cursor-pointer shrink-0 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>
                      {uploadingProjImg ? "Uploading..." : "Upload File"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploadingProjImg}
                      onChange={handleProjectFileChange}
                    />
                  </label>
                </div>
                {/* Instant image preview */}
                {projectForm.imageUrl && (
                  <div className="mt-2 relative rounded-xl overflow-hidden aspect-video bg-slate-900 border border-slate-200/60 dark:border-white/10 max-h-36">
                    <img
                      src={projectForm.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      Live Preview
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tech Stack (pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  placeholder="Next.js, React, TypeScript, Tailwind CSS"
                  value={projectForm.techStackStr}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      techStackStr: e.target.value,
                    })
                  }
                  className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={projectForm.demoUrl}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        demoUrl: e.target.value,
                      })
                    }
                    className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    GitHub Repo URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://github.com/..."
                    value={projectForm.githubUrl}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        githubUrl: e.target.value,
                      })
                    }
                    className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi Lengkap (Opsional untuk Modal)
                </label>
                <textarea
                  rows={3}
                  placeholder="Penjelasan detail tentang fitur, arsitektur, dan tantangan yang diselesaikan..."
                  value={projectForm.longDescription}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      longDescription: e.target.value,
                    })
                  }
                  className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                />
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="project-published"
                    checked={projectForm.published}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        published: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-emerald-600 dark:text-emerald-400 rounded cursor-pointer"
                  />
                  <label
                    htmlFor="project-published"
                    className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Tampilkan di Website Portofolio (Publik)</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      (Bisa diubah kapan saja lewat tombol switch)
                    </span>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={projectForm.featured}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        featured: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-blue-600 dark:text-sky-400 rounded cursor-pointer"
                  />
                  <label
                    htmlFor="featured"
                    className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    Tampilkan sebagai Proyek Featured (Unggulan)
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200/60 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-sky-400 dark:hover:bg-sky-300 text-white dark:text-slate-950 font-bold text-xs shadow-md cursor-pointer transition-all"
                >
                  Simpan Proyek
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {/* Skill Form Modal with Glassmorphism */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
          <GlassCard className="w-full max-w-2xl p-6 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold mb-3 text-slate-900 dark:text-white">
              {editingSkill ? "Edit Keahlian" : "Tambah Skill Baru"}
            </h3>
            <form onSubmit={handleSaveSkill} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Skill / Framework *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: React.js, Next.js, Tailwind CSS"
                  value={skillForm.name}
                  onChange={(e) =>
                    setSkillForm({ ...skillForm, name: e.target.value })
                  }
                  className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kategori *
                  </label>
                  <select
                    value={skillForm.category}
                    onChange={(e) =>
                      setSkillForm({
                        ...skillForm,
                        category: e.target.value as any,
                      })
                    }
                    className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Styling & UI">Styling & UI</option>
                    <option value="Tools & Utilities">Tools & Utilities</option>
                    <option value="Backend & DB">Backend & DB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Proficiency (0 - 100%)
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={100}
                    value={skillForm.proficiency}
                    onChange={(e) =>
                      setSkillForm({
                        ...skillForm,
                        proficiency: parseInt(e.target.value, 10),
                      })
                    }
                    className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                  />
                </div>
              </div>

              {/* Live Preview Box for Logo / Image */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Preview Logo / Gambar:
                </label>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center p-2 shadow-xs shrink-0">
                    <TechLogo
                      name={skillForm.name}
                      icon={skillForm.icon}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="overflow-hidden flex-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {skillForm.name || "Nama Skill Belum Diisi"}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      {skillForm.icon
                        ? `Icon/URL: ${skillForm.icon}`
                        : "Menggunakan logo bawaan framework otomatis"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Upload Image & Manual URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Upload Gambar Logo dari Perangkat (PNG/SVG/JPG/WebP)
                </label>
                <div className="flex gap-2">
                  <label className="flex-1 px-3 py-2 rounded-xl bg-blue-50 dark:bg-sky-950/40 border border-blue-200/60 dark:border-sky-500/30 text-blue-700 dark:text-sky-300 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-blue-100 dark:hover:bg-sky-900/50 cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>
                      {uploadingSkillImg
                        ? "Mengunggah Gambar..."
                        : "Pilih File Gambar untuk Diunggah"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploadingSkillImg}
                      onChange={handleSkillFileChange}
                    />
                  </label>
                  {skillForm.icon && (
                    <button
                      type="button"
                      onClick={() => setSkillForm({ ...skillForm, icon: "" })}
                      className="px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-100 dark:hover:bg-rose-900/50 cursor-pointer transition-colors"
                      title="Reset Icon"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Atau Input URL Gambar Logo
                </label>
                <input
                  type="text"
                  placeholder="https://... atau /uploads/..."
                  value={skillForm.icon}
                  onChange={(e) =>
                    setSkillForm({ ...skillForm, icon: e.target.value })
                  }
                  className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                />
              </div>

              {/* Quick Preset Framework Badges */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                  Atau Pilih Preset Logo Framework Cepat:
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-slate-50/50 dark:bg-slate-900/40 rounded-xl border border-slate-200/50 dark:border-white/5">
                  {frameworkPresets.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() =>
                        setSkillForm({
                          ...skillForm,
                          icon: preset.value,
                          name: skillForm.name || preset.label,
                        })
                      }
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-all cursor-pointer ${
                        skillForm.icon === preset.value
                          ? "bg-blue-600 dark:bg-sky-400 text-white dark:text-slate-950 border-transparent shadow-xs"
                          : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-white/10 hover:bg-white dark:hover:bg-slate-800"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visibility Switch */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="skill-published"
                  checked={skillForm.published}
                  onChange={(e) =>
                    setSkillForm({
                      ...skillForm,
                      published: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-emerald-600 dark:text-emerald-400 rounded cursor-pointer"
                />
                <label
                  htmlFor="skill-published"
                  className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Tampilkan di Website Portofolio (Publik)</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    (Bisa disembunyikan kapan saja)
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200/60 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsSkillModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow-md cursor-pointer transition-colors"
                >
                  {editingSkill ? "Perbarui Skill" : "Simpan Skill"}
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {/* Experience Form Modal with Glassmorphism */}
      {isExpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
          <GlassCard className="w-full max-w-2xl p-6 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold mb-3 text-slate-900 dark:text-white">
              {editingExp ? "Edit Pengalaman Kerja" : "Tambah Pengalaman Kerja"}
            </h3>
            <form onSubmit={handleSaveExp} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Posisi / Role *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Senior Frontend Developer"
                  value={expForm.role}
                  onChange={(e) =>
                    setExpForm({ ...expForm, role: e.target.value })
                  }
                  className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Perusahaan / Studio *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tech Innovate Studio"
                  value={expForm.company}
                  onChange={(e) =>
                    setExpForm({ ...expForm, company: e.target.value })
                  }
                  className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    placeholder="Jakarta, Indonesia"
                    value={expForm.location}
                    onChange={(e) =>
                      setExpForm({ ...expForm, location: e.target.value })
                    }
                    className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Periode *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="2024 - Sekarang"
                    value={expForm.period}
                    onChange={(e) =>
                      setExpForm({ ...expForm, period: e.target.value })
                    }
                    className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi Tugas *
                </label>
                <textarea
                  required
                  rows={2}
                  value={expForm.description}
                  onChange={(e) =>
                    setExpForm({ ...expForm, description: e.target.value })
                  }
                  className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Pencapaian Utama (1 baris per poin)
                </label>
                <textarea
                  rows={3}
                  placeholder="Contoh:&#10;Membangun web dengan Next.js App Router&#10;Optimasi skor Core Web Vitals"
                  value={expForm.highlightsStr}
                  onChange={(e) =>
                    setExpForm({ ...expForm, highlightsStr: e.target.value })
                  }
                  className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
                />
              </div>

              {/* Visibility Switch */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="exp-published"
                  checked={expForm.published}
                  onChange={(e) =>
                    setExpForm({
                      ...expForm,
                      published: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-emerald-600 dark:text-emerald-400 rounded cursor-pointer"
                />
                <label
                  htmlFor="exp-published"
                  className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Tampilkan di Website Portofolio (Publik)</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    (Bisa disembunyikan kapan saja)
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200/60 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsExpModalOpen(false);
                    setEditingExp(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white cursor-pointer"
                >
                  {editingExp ? "Perbarui Pengalaman" : "Simpan Pengalaman"}
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

/**
 * Glassmorphic Admin Dashboard Skeleton with shimmer effect
 * Shown during initial auth hydration to prevent the login modal flash/glitch.
 */
function AdminDashboardSkeleton() {
  return (
    <div className="min-h-screen py-6 sm:py-8 animate-in fade-in duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Sidebar Shimmer Skeleton */}
          <GlassCard className="lg:col-span-3 p-5 sm:p-6 space-y-6">
            {/* User Profile Card Shimmer */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-200/60 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-200/70 dark:bg-slate-800/70 animate-pulse shrink-0" />
                <div className="space-y-2">
                  <div className="w-24 h-3.5 rounded-md bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
                  <div className="w-16 h-2.5 rounded-md bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
                </div>
              </div>
              <div className="w-8 h-8 rounded-xl bg-slate-200/70 dark:bg-slate-800/70 animate-pulse" />
            </div>

            {/* Navigation Tab Items Shimmer */}
            <div className="space-y-2">
              {[
                { w: "w-24" },
                { w: "w-28" },
                { w: "w-20" },
                { w: "w-32" },
                { w: "w-24" },
                { w: "w-28" },
                { w: "w-30" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200/40 dark:border-white/5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-md bg-slate-200/70 dark:bg-slate-800/70 animate-pulse" />
                    <div
                      className={`h-3 rounded-md bg-slate-200/70 dark:bg-slate-800/70 animate-pulse ${item.w}`}
                    />
                  </div>
                  {idx === 5 && (
                    <div className="w-5 h-4 rounded-full bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
                  )}
                </div>
              ))}
            </div>

            {/* Sidebar Footer Buttons Shimmer */}
            <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 space-y-2">
              <div className="w-full h-8 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
              <div className="w-full h-8 rounded-xl bg-slate-200/40 dark:bg-slate-800/40 animate-pulse" />
            </div>
          </GlassCard>

          {/* Main Content Dashboard Area Shimmer */}
          <div className="lg:col-span-9 space-y-6">
            {/* Top Header Glass Card Shimmer */}
            <GlassCard className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="w-56 h-6 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
                <div className="w-80 h-3 rounded-md bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
              </div>
              <div className="w-32 h-8 rounded-full bg-slate-200/70 dark:bg-slate-800/70 animate-pulse" />
            </GlassCard>

            {/* 4 Stats Cards Shimmer */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <GlassCard key={i} className="p-4 sm:p-5 space-y-3">
                  <div className="w-20 h-3 rounded-md bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
                  <div className="w-16 h-8 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
                  <div className="w-24 h-2.5 rounded-md bg-slate-200/40 dark:bg-slate-800/40 animate-pulse" />
                </GlassCard>
              ))}
            </div>

            {/* Content Table / Card Shimmer */}
            <GlassCard className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10">
                <div className="w-44 h-5 rounded-md bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
                <div className="w-28 h-4 rounded-md bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
              </div>

              <div className="space-y-3 pt-2">
                {[1, 2, 3].map((row) => (
                  <div
                    key={row}
                    className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/50 dark:border-white/5 flex items-center justify-between"
                  >
                    <div className="space-y-2 flex-1 mr-4">
                      <div className="w-1/3 h-4 rounded-md bg-slate-200/80 dark:bg-slate-800/80 animate-pulse" />
                      <div className="w-2/3 h-3 rounded-md bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-200/70 dark:bg-slate-800/70 animate-pulse" />
                      <div className="w-8 h-8 rounded-lg bg-slate-200/70 dark:bg-slate-800/70 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
