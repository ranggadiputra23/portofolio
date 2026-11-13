import { NextResponse } from 'next/server';
import { updateExperience, deleteExperience } from '@/lib/db';
import { verifyAdminPassword } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('x-admin-token') || request.headers.get('x-admin-pass') || '';
    if (!(await verifyAdminPassword(authHeader))) {
      return NextResponse.json({ success: false, error: 'Akses Ditolak: Password Admin Salah' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const updated = await updateExperience(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Pengalaman tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, error: 'Gagal memperbarui pengalaman' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('x-admin-token') || request.headers.get('x-admin-pass') || '';
    if (!(await verifyAdminPassword(authHeader))) {
      return NextResponse.json({ success: false, error: 'Akses Ditolak: Password Admin Salah' }, { status: 401 });
    }

    const { id } = await params;
    await deleteExperience(id);
    return NextResponse.json({ success: true, message: 'Pengalaman berhasil dihapus' });
  } catch {
    return NextResponse.json({ success: false, error: 'Gagal menghapus pengalaman' }, { status: 500 });
  }
}
