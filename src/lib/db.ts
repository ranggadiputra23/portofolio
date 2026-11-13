import { neon } from '@neondatabase/serverless';
import crypto from 'crypto';
import { Project, Skill, Experience, Profile, Message, AdminUser } from './types';
import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialExperiences,
  initialMessages,
  initialAdmin,
} from './mockData';

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// In-memory cache for fallback when DATABASE_URL is not set
let memoryProfile: Profile = { ...initialProfile };
let memoryProjects: Project[] = [...initialProjects];
let memorySkills: Skill[] = [...initialSkills];
let memoryExperiences: Experience[] = [...initialExperiences];
let memoryMessages: Message[] = [...initialMessages];
let memoryAdmin: AdminUser = { ...initialAdmin };

function getNeonSql() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl || dbUrl.trim() === '' || dbUrl.includes('YOUR_NEON_DATABASE_URL')) {
    return null;
  }
  try {
    return neon(dbUrl);
  } catch (error) {
    console.warn('Failed to initialize Neon client:', error);
    return null;
  }
}

// Auto-initialize DB tables if Neon SQL connection is active
let tablesInitialized = false;
async function ensureTablesExist(sql: any) {
  if (tablesInitialized || !sql) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS portfolio_profile (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        title TEXT NOT NULL,
        bio TEXT NOT NULL,
        about_text TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        location TEXT,
        github TEXT,
        linkedin TEXT,
        twitter TEXT,
        instagram TEXT,
        resume_url TEXT,
        avatar_url TEXT
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS portfolio_projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL,
        description TEXT NOT NULL,
        long_description TEXT,
        image_url TEXT NOT NULL,
        tech_stack TEXT[] NOT NULL,
        demo_url TEXT,
        github_url TEXT,
        category TEXT NOT NULL,
        featured BOOLEAN DEFAULT FALSE,
        published BOOLEAN DEFAULT TRUE,
        created_at TEXT NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS portfolio_skills (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        icon TEXT NOT NULL,
        proficiency INT NOT NULL,
        sort_order INT NOT NULL,
        published BOOLEAN DEFAULT TRUE
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS portfolio_experiences (
        id TEXT PRIMARY KEY,
        role TEXT NOT NULL,
        company TEXT NOT NULL,
        location TEXT,
        period TEXT NOT NULL,
        description TEXT NOT NULL,
        highlights TEXT[] NOT NULL,
        sort_order INT NOT NULL,
        published BOOLEAN DEFAULT TRUE
      );
    `;

    // Ensure published column exists on previously created tables
    await sql`ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT TRUE;`;
    await sql`ALTER TABLE portfolio_skills ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT TRUE;`;
    await sql`ALTER TABLE portfolio_experiences ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT TRUE;`;

    await sql`
      CREATE TABLE IF NOT EXISTS portfolio_messages (
        id TEXT PRIMARY KEY,
        sender_name TEXT NOT NULL,
        sender_email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TEXT NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS portfolio_admin (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_plain TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT
      );
    `;

    // Seed admin if table is empty
    const adminRows = await sql`SELECT COUNT(*) FROM portfolio_admin`;
    if (parseInt(adminRows[0].count, 10) === 0) {
      const now = new Date().toISOString();
      await sql`
        INSERT INTO portfolio_admin (id, username, password_plain, password_hash, created_at, updated_at)
        VALUES (${initialAdmin.id}, ${initialAdmin.username}, ${initialAdmin.passwordPlain}, ${initialAdmin.passwordHash}, ${now}, ${now})
      `;
    }

    // Seed initial data if tables are empty
    const profileRows = await sql`SELECT COUNT(*) FROM portfolio_profile`;
    if (parseInt(profileRows[0].count, 10) === 0) {
      await sql`
        INSERT INTO portfolio_profile (id, name, title, bio, about_text, email, phone, location, github, linkedin, twitter, instagram, resume_url, avatar_url)
        VALUES (${initialProfile.id}, ${initialProfile.name}, ${initialProfile.title}, ${initialProfile.bio}, ${initialProfile.aboutText}, ${initialProfile.email}, ${initialProfile.phone || ''}, ${initialProfile.location}, ${initialProfile.github}, ${initialProfile.linkedin}, ${initialProfile.twitter || ''}, ${initialProfile.instagram || ''}, ${initialProfile.resumeUrl}, ${initialProfile.avatarUrl})
      `;

      for (const p of initialProjects) {
        await sql`
          INSERT INTO portfolio_projects (id, title, slug, description, long_description, image_url, tech_stack, demo_url, github_url, category, featured, published, created_at)
          VALUES (${p.id}, ${p.title}, ${p.slug}, ${p.description}, ${p.longDescription || ''}, ${p.imageUrl}, ${p.techStack}, ${p.demoUrl || ''}, ${p.githubUrl || ''}, ${p.category}, ${p.featured}, ${p.published ?? true}, ${p.createdAt})
        `;
      }

      for (const s of initialSkills) {
        await sql`
          INSERT INTO portfolio_skills (id, name, category, icon, proficiency, sort_order, published)
          VALUES (${s.id}, ${s.name}, ${s.category}, ${s.icon}, ${s.proficiency}, ${s.sortOrder}, ${s.published ?? true})
        `;
      }

      for (const e of initialExperiences) {
        await sql`
          INSERT INTO portfolio_experiences (id, role, company, location, period, description, highlights, sort_order, published)
          VALUES (${e.id}, ${e.role}, ${e.company}, ${e.location || ''}, ${e.period}, ${e.description}, ${e.highlights}, ${e.sortOrder}, ${e.published ?? true})
        `;
      }

      for (const m of initialMessages) {
        await sql`
          INSERT INTO portfolio_messages (id, sender_name, sender_email, subject, message, is_read, created_at)
          VALUES (${m.id}, ${m.senderName}, ${m.senderEmail}, ${m.subject}, ${m.message}, ${m.isRead}, ${m.createdAt})
          ON CONFLICT (id) DO NOTHING
        `;
      }
    }

    tablesInitialized = true;
  } catch (error) {
    console.error('Error creating database tables on Neon:', error);
  }
}

// Data Access Object Functions

export async function getProfile(): Promise<Profile> {
  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      const rows = await sql`SELECT * FROM portfolio_profile LIMIT 1`;
      if (rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          name: r.name,
          title: r.title,
          bio: r.bio,
          aboutText: r.about_text,
          email: r.email,
          phone: r.phone,
          location: r.location,
          github: r.github,
          linkedin: r.linkedin,
          twitter: r.twitter,
          instagram: r.instagram,
          resumeUrl: r.resume_url,
          avatarUrl: r.avatar_url,
        };
      }
    } catch (e) {
      console.warn('Neon DB query failed, using memory profile fallback:', e);
    }
  }
  return memoryProfile;
}

export async function updateProfile(data: Partial<Profile>): Promise<Profile> {
  const updated = { ...memoryProfile, ...data };
  memoryProfile = updated;

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      await sql`
        UPDATE portfolio_profile SET
          name = ${updated.name},
          title = ${updated.title},
          bio = ${updated.bio},
          about_text = ${updated.aboutText},
          email = ${updated.email},
          phone = ${updated.phone || ''},
          location = ${updated.location},
          github = ${updated.github},
          linkedin = ${updated.linkedin},
          twitter = ${updated.twitter || ''},
          instagram = ${updated.instagram || ''},
          resume_url = ${updated.resumeUrl},
          avatar_url = ${updated.avatarUrl}
        WHERE id = ${updated.id}
      `;
    } catch (e) {
      console.error('Failed to update profile on Neon DB:', e);
    }
  }
  return updated;
}

export async function getProjects(): Promise<Project[]> {
  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      const rows = await sql`SELECT * FROM portfolio_projects ORDER BY created_at DESC`;
      if (rows.length > 0) {
        return rows.map((r: any) => ({
          id: r.id,
          title: r.title,
          slug: r.slug,
          description: r.description,
          longDescription: r.long_description,
          imageUrl: r.image_url,
          techStack: r.tech_stack || [],
          demoUrl: r.demo_url,
          githubUrl: r.github_url,
          category: r.category,
          featured: Boolean(r.featured),
          published: r.published !== undefined ? Boolean(r.published) : true,
          createdAt: r.created_at,
        }));
      }
    } catch (e) {
      console.warn('Neon DB projects query failed, using memory fallback:', e);
    }
  }
  return memoryProjects;
}

export async function createProject(project: Omit<Project, 'id' | 'createdAt'>): Promise<Project> {
  const newProj: Project = {
    ...project,
    published: project.published !== undefined ? project.published : true,
    id: `proj-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
  };
  memoryProjects.unshift(newProj);

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      await sql`
        INSERT INTO portfolio_projects (id, title, slug, description, long_description, image_url, tech_stack, demo_url, github_url, category, featured, published, created_at)
        VALUES (${newProj.id}, ${newProj.title}, ${newProj.slug}, ${newProj.description}, ${newProj.longDescription || ''}, ${newProj.imageUrl}, ${newProj.techStack}, ${newProj.demoUrl || ''}, ${newProj.githubUrl || ''}, ${newProj.category}, ${newProj.featured}, ${newProj.published}, ${newProj.createdAt})
      `;
    } catch (e) {
      console.error('Failed to insert project into Neon DB:', e);
    }
  }
  return newProj;
}

export async function updateProject(id: string, data: Partial<Project>): Promise<Project | null> {
  const index = memoryProjects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updated = { ...memoryProjects[index], ...data };
  if (updated.published === undefined) {
    updated.published = true;
  }
  memoryProjects[index] = updated;

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      await sql`
        UPDATE portfolio_projects SET
          title = ${updated.title},
          slug = ${updated.slug},
          description = ${updated.description},
          long_description = ${updated.longDescription || ''},
          image_url = ${updated.imageUrl},
          tech_stack = ${updated.techStack},
          demo_url = ${updated.demoUrl || ''},
          github_url = ${updated.githubUrl || ''},
          category = ${updated.category},
          featured = ${updated.featured},
          published = ${updated.published}
        WHERE id = ${id}
      `;
    } catch (e) {
      console.error('Failed to update project on Neon DB:', e);
    }
  }
  return updated;
}

export async function deleteProject(id: string): Promise<boolean> {
  memoryProjects = memoryProjects.filter((p) => p.id !== id);

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      await sql`DELETE FROM portfolio_projects WHERE id = ${id}`;
    } catch (e) {
      console.error('Failed to delete project on Neon DB:', e);
    }
  }
  return true;
}

export async function getSkills(): Promise<Skill[]> {
  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      const rows = await sql`SELECT * FROM portfolio_skills ORDER BY sort_order ASC`;
      if (rows.length > 0) {
        return rows.map((r: any) => ({
          id: r.id,
          name: r.name,
          category: r.category,
          icon: r.icon,
          proficiency: Number(r.proficiency),
          sortOrder: Number(r.sort_order),
          published: r.published !== undefined ? Boolean(r.published) : true,
        }));
      }
    } catch (e) {
      console.warn('Neon DB skills query failed, using memory fallback:', e);
    }
  }
  return memorySkills;
}

export async function createSkill(skill: Omit<Skill, 'id'>): Promise<Skill> {
  const newSkill: Skill = {
    ...skill,
    published: skill.published !== undefined ? skill.published : true,
    id: `sk-${Date.now()}`,
  };
  memorySkills.push(newSkill);

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      await sql`
        INSERT INTO portfolio_skills (id, name, category, icon, proficiency, sort_order, published)
        VALUES (${newSkill.id}, ${newSkill.name}, ${newSkill.category}, ${newSkill.icon}, ${newSkill.proficiency}, ${newSkill.sortOrder}, ${newSkill.published})
      `;
    } catch (e) {
      console.error('Failed to insert skill into Neon DB:', e);
    }
  }
  return newSkill;
}

export async function updateSkill(id: string, skill: Partial<Skill>): Promise<Skill | null> {
  const index = memorySkills.findIndex((s) => s.id === id);
  if (index !== -1) {
    memorySkills[index] = { ...memorySkills[index], ...skill };
  }

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      const existing = await sql`SELECT * FROM portfolio_skills WHERE id = ${id}`;
      if (existing.length > 0) {
        const cur = existing[0];
        const name = skill.name ?? cur.name;
        const category = skill.category ?? cur.category;
        const icon = skill.icon ?? cur.icon;
        const proficiency = skill.proficiency !== undefined ? Number(skill.proficiency) : Number(cur.proficiency);
        const sortOrder = skill.sortOrder !== undefined ? Number(skill.sortOrder) : Number(cur.sort_order);
        const published = skill.published !== undefined ? Boolean(skill.published) : (cur.published !== undefined ? Boolean(cur.published) : true);

        await sql`
          UPDATE portfolio_skills
          SET name = ${name}, category = ${category}, icon = ${icon}, proficiency = ${proficiency}, sort_order = ${sortOrder}, published = ${published}
          WHERE id = ${id}
        `;

        return {
          id,
          name,
          category,
          icon,
          proficiency,
          sortOrder,
          published,
        };
      }
    } catch (e) {
      console.error('Failed to update skill on Neon DB:', e);
    }
  }

  return memorySkills.find((s) => s.id === id) || null;
}

export async function deleteSkill(id: string): Promise<boolean> {
  memorySkills = memorySkills.filter((s) => s.id !== id);

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      await sql`DELETE FROM portfolio_skills WHERE id = ${id}`;
    } catch (e) {
      console.error('Failed to delete skill on Neon DB:', e);
    }
  }
  return true;
}

export async function getExperiences(): Promise<Experience[]> {
  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      const rows = await sql`SELECT * FROM portfolio_experiences ORDER BY sort_order ASC`;
      if (rows.length > 0) {
        return rows.map((r: any) => ({
          id: r.id,
          role: r.role,
          company: r.company,
          location: r.location,
          period: r.period,
          description: r.description,
          highlights: r.highlights || [],
          sortOrder: Number(r.sort_order),
          published: r.published !== undefined ? Boolean(r.published) : true,
        }));
      }
    } catch (e) {
      console.warn('Neon DB experiences query failed, using memory fallback:', e);
    }
  }
  return memoryExperiences;
}

export async function createExperience(exp: Omit<Experience, 'id'>): Promise<Experience> {
  const newExp: Experience = {
    ...exp,
    published: exp.published !== undefined ? exp.published : true,
    id: `exp-${Date.now()}`,
  };
  memoryExperiences.push(newExp);

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      await sql`
        INSERT INTO portfolio_experiences (id, role, company, location, period, description, highlights, sort_order, published)
        VALUES (${newExp.id}, ${newExp.role}, ${newExp.company}, ${newExp.location || ''}, ${newExp.period}, ${newExp.description}, ${newExp.highlights}, ${newExp.sortOrder}, ${newExp.published})
      `;
    } catch (e) {
      console.error('Failed to insert experience into Neon DB:', e);
    }
  }
  return newExp;
}

export async function updateExperience(id: string, exp: Partial<Experience>): Promise<Experience | null> {
  const index = memoryExperiences.findIndex((e) => e.id === id);
  if (index !== -1) {
    memoryExperiences[index] = { ...memoryExperiences[index], ...exp };
  }

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      const existing = await sql`SELECT * FROM portfolio_experiences WHERE id = ${id}`;
      if (existing.length > 0) {
        const cur = existing[0];
        const role = exp.role ?? cur.role;
        const company = exp.company ?? cur.company;
        const location = exp.location ?? cur.location ?? '';
        const period = exp.period ?? cur.period;
        const description = exp.description ?? cur.description;
        const highlights = exp.highlights ?? cur.highlights ?? [];
        const sortOrder = exp.sortOrder !== undefined ? Number(exp.sortOrder) : Number(cur.sort_order);
        const published = exp.published !== undefined ? Boolean(exp.published) : (cur.published !== undefined ? Boolean(cur.published) : true);

        await sql`
          UPDATE portfolio_experiences
          SET role = ${role}, company = ${company}, location = ${location}, period = ${period}, description = ${description}, highlights = ${highlights}, sort_order = ${sortOrder}, published = ${published}
          WHERE id = ${id}
        `;

        return {
          id,
          role,
          company,
          location,
          period,
          description,
          highlights,
          sortOrder,
          published,
        };
      }
    } catch (e) {
      console.error('Failed to update experience on Neon DB:', e);
    }
  }

  return memoryExperiences.find((e) => e.id === id) || null;
}

export async function deleteExperience(id: string): Promise<boolean> {
  memoryExperiences = memoryExperiences.filter((e) => e.id !== id);

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      await sql`DELETE FROM portfolio_experiences WHERE id = ${id}`;
    } catch (e) {
      console.error('Failed to delete experience on Neon DB:', e);
    }
  }
  return true;
}

export async function getMessages(): Promise<Message[]> {
  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      const rows = await sql`SELECT * FROM portfolio_messages ORDER BY created_at DESC`;
      return rows.map((r: any) => ({
        id: r.id,
        senderName: r.sender_name,
        senderEmail: r.sender_email,
        subject: r.subject,
        message: r.message,
        isRead: Boolean(r.is_read),
        createdAt: r.created_at,
      }));
    } catch (e) {
      console.warn('Neon DB messages query failed, using memory fallback:', e);
    }
  }
  return memoryMessages;
}

export async function createMessage(msg: Omit<Message, 'id' | 'isRead' | 'createdAt'>): Promise<Message> {
  const newMsg: Message = {
    ...msg,
    id: `msg-${Date.now()}`,
    isRead: false,
    createdAt: new Date().toISOString(),
  };
  memoryMessages.unshift(newMsg);

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      await sql`
        INSERT INTO portfolio_messages (id, sender_name, sender_email, subject, message, is_read, created_at)
        VALUES (${newMsg.id}, ${newMsg.senderName}, ${newMsg.senderEmail}, ${newMsg.subject}, ${newMsg.message}, ${newMsg.isRead}, ${newMsg.createdAt})
      `;
    } catch (e) {
      console.error('Failed to save message to Neon DB:', e);
    }
  }
  return newMsg;
}

export async function toggleMessageRead(id: string, isRead?: boolean): Promise<boolean> {
  const msg = memoryMessages.find((m) => m.id === id);
  if (msg) {
    msg.isRead = typeof isRead === 'boolean' ? isRead : !msg.isRead;
  }

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      if (typeof isRead === 'boolean') {
        await sql`UPDATE portfolio_messages SET is_read = ${isRead} WHERE id = ${id}`;
      } else {
        await sql`UPDATE portfolio_messages SET is_read = NOT is_read WHERE id = ${id}`;
      }
    } catch (e) {
      console.error('Failed to update message status on Neon DB:', e);
    }
  }
  return true;
}

export const markMessageRead = toggleMessageRead;

export async function deleteMessage(id: string): Promise<boolean> {
  memoryMessages = memoryMessages.filter((m) => m.id !== id);

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      await sql`DELETE FROM portfolio_messages WHERE id = ${id}`;
    } catch (e) {
      console.error('Failed to delete message on Neon DB:', e);
    }
  }
  return true;
}

export function isDbConnected(): boolean {
  return Boolean(process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('YOUR_NEON_DATABASE_URL'));
}

// Admin Authentication DAO Functions
export async function getAdminUser(): Promise<AdminUser | null> {
  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      const rows = await sql`SELECT * FROM portfolio_admin LIMIT 1`;
      if (rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          username: r.username,
          passwordPlain: r.password_plain,
          passwordHash: r.password_hash,
          createdAt: r.created_at,
          updatedAt: r.updated_at,
        };
      }
    } catch (e) {
      console.warn('Neon DB getAdminUser failed:', e);
    }
  }
  return memoryAdmin;
}

export async function getAdminByUsername(username: string): Promise<AdminUser | null> {
  const cleanUsername = username.trim().toLowerCase();
  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      const rows = await sql`
        SELECT * FROM portfolio_admin 
        WHERE LOWER(username) = LOWER(${cleanUsername}) 
        LIMIT 1
      `;
      if (rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          username: r.username,
          passwordPlain: r.password_plain,
          passwordHash: r.password_hash,
          createdAt: r.created_at,
          updatedAt: r.updated_at,
        };
      }
    } catch (e) {
      console.warn('Neon DB getAdminByUsername failed:', e);
    }
  }

  if (memoryAdmin && memoryAdmin.username.toLowerCase() === cleanUsername) {
    return memoryAdmin;
  }
  return null;
}

export async function updateAdminCredentials(newUsername: string, newPasswordPlain: string): Promise<AdminUser> {
  const hash = hashPassword(newPasswordPlain);
  const now = new Date().toISOString();
  const cleanUsername = newUsername.trim();

  const sql = getNeonSql();
  if (sql) {
    try {
      await ensureTablesExist(sql);
      const existing = await sql`SELECT id FROM portfolio_admin LIMIT 1`;
      const adminId = existing.length > 0 ? existing[0].id : 'admin-1';
      await sql`
        INSERT INTO portfolio_admin (id, username, password_plain, password_hash, created_at, updated_at)
        VALUES (${adminId}, ${cleanUsername}, ${newPasswordPlain}, ${hash}, ${now}, ${now})
        ON CONFLICT (id) DO UPDATE SET
          username = EXCLUDED.username,
          password_plain = EXCLUDED.password_plain,
          password_hash = EXCLUDED.password_hash,
          updated_at = EXCLUDED.updated_at
      `;
    } catch (e) {
      console.warn('Neon DB updateAdminCredentials failed:', e);
    }
  }

  memoryAdmin = {
    ...memoryAdmin,
    username: cleanUsername,
    passwordPlain: newPasswordPlain,
    passwordHash: hash,
    updatedAt: now,
  };
  return memoryAdmin;
}

