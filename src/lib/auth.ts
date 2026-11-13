import { getAdminByUsername, getAdminUser, hashPassword } from './db';
import { AdminUser } from './types';

// Generate a session token based on DB credentials
export function createAdminToken(admin: AdminUser): string {
  const payload = `${admin.username}:${admin.passwordHash}`;
  return Buffer.from(payload).toString('base64');
}

// Verify a session token or password against Neon DB (No longer relying on process.env)
export async function verifyAdminPassword(tokenOrPass: string): Promise<boolean> {
  if (!tokenOrPass || typeof tokenOrPass !== 'string') return false;

  const trimmed = tokenOrPass.trim();

  // Try decoding as session token (base64 of username:passwordHash)
  try {
    const decoded = Buffer.from(trimmed, 'base64').toString('utf8');
    if (decoded.includes(':')) {
      const [u, h] = decoded.split(':');
      if (u && h) {
        const admin = await getAdminByUsername(u);
        if (admin && admin.passwordHash === h) {
          return true;
        }
      }
    }
  } catch {
    // Ignore decode error, proceed to direct check
  }

  // Fallback: check against any registered admin credentials in DB
  const admin = await getAdminUser();
  if (!admin) return false;

  const attemptedHash = hashPassword(trimmed);
  if (trimmed === admin.passwordPlain || attemptedHash === admin.passwordHash) {
    return true;
  }

  return false;
}

// Authenticate username and password against Neon DB
export async function authenticateAdmin(
  username: string,
  passwordAttempt: string
): Promise<{ success: boolean; token?: string; error?: string; username?: string }> {
  if (!username || !passwordAttempt) {
    return { success: false, error: 'Username dan Password wajib diisi.' };
  }

  const cleanUser = username.trim();
  const admin = await getAdminByUsername(cleanUser);

  if (!admin) {
    return { success: false, error: 'Username atau Password salah.' };
  }

  const hash = hashPassword(passwordAttempt);
  const isValid = hash === admin.passwordHash || passwordAttempt === admin.passwordPlain;

  if (!isValid) {
    return { success: false, error: 'Username atau Password salah.' };
  }

  const token = createAdminToken(admin);
  return {
    success: true,
    token,
    username: admin.username,
  };
}
