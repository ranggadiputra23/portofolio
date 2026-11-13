import { NextResponse } from 'next/server';
import { updateSkill, deleteSkill } from '@/lib/db';
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
    const updated = await updateSkill(id, body);
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, error: 'Gagal memperbarui skill' }, { status: 500 });
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
    await deleteSkill(id);
    return NextResponse.json({ success: true, message: 'Skill berhasil dihapus' });
  } catch {
    return NextResponse.json({ success: false, error: 'Gagal menghapus skill' }, { status: 500 });
  }
}
