import { NextResponse } from 'next/server';
import { markMessageRead, deleteMessage } from '@/lib/db';
import { verifyAdminPassword } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
    let isRead: boolean | undefined = undefined;
    try {
      const body = await request.json();
      if (typeof body.isRead === 'boolean') {
        isRead = body.isRead;
      }
    } catch {
      // Body is optional
    }

    await markMessageRead(id, isRead);
    return NextResponse.json({ success: true, message: 'Status pesan berhasil diperbarui' });
  } catch {
    return NextResponse.json({ success: false, error: 'Gagal mengupdate status pesan' }, { status: 500 });
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
    await deleteMessage(id);
    return NextResponse.json({ success: true, message: 'Pesan berhasil dihapus' });
  } catch {
    return NextResponse.json({ success: false, error: 'Gagal menghapus pesan' }, { status: 500 });
  }
}
