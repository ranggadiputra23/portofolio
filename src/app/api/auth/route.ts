import { NextResponse } from 'next/server';
import { authenticateAdmin, createAdminToken, verifyAdminPassword } from '@/lib/auth';
import { getAdminUser, updateAdminCredentials } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Support both username+password and legacy single password login
    const targetUsername = username ? String(username).trim() : 'rangga';

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password wajib diisi.' },
        { status: 400 }
      );
    }

    const authResult = await authenticateAdmin(targetUsername, String(password));

    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error || 'Username atau Password salah.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Autentikasi Berhasil',
      token: authResult.token,
      username: authResult.username,
    });
  } catch (error) {
    console.error('Error during admin auth:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan sistem.' },
      { status: 500 }
    );
  }
}

// Update Admin Username & Password in Neon DB
export async function PUT(request: Request) {
  try {
    const authHeader =
      request.headers.get('x-admin-token') ||
      request.headers.get('x-admin-pass') ||
      '';

    const isAuthorized = await verifyAdminPassword(authHeader);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: 'Akses Ditolak: Anda belum login sebagai admin' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { newUsername, newPassword, currentPassword } = body;

    if (!newUsername || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Username baru dan Password baru wajib diisi.' },
        { status: 400 }
      );
    }

    // Verify current password for safety
    if (currentPassword) {
      const currentValid = await verifyAdminPassword(currentPassword);
      if (!currentValid) {
        return NextResponse.json(
          { success: false, error: 'Password lama tidak cocok.' },
          { status: 400 }
        );
      }
    }

    const updatedAdmin = await updateAdminCredentials(newUsername, newPassword);
    const newToken = createAdminToken(updatedAdmin);

    return NextResponse.json({
      success: true,
      message: 'Username dan Password admin berhasil diperbarui di Neon DB.',
      token: newToken,
      username: updatedAdmin.username,
    });
  } catch (error) {
    console.error('Error updating admin credentials:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memperbarui kredensial admin.' },
      { status: 500 }
    );
  }
}
