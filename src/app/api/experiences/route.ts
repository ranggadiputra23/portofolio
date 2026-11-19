import { NextResponse } from 'next/server';
import { getExperiences, createExperience, reorderExperiences } from '@/lib/db';
import { verifyAdminPassword } from '@/lib/auth';

export async function GET() {
  try {
    const experiences = await getExperiences();
    return NextResponse.json({ success: true, data: experiences });
  } catch {
    return NextResponse.json({ success: false, error: 'Gagal mengambil data pengalaman' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('x-admin-token') || request.headers.get('x-admin-pass') || '';
    if (!(await verifyAdminPassword(authHeader))) {
      return NextResponse.json({ success: false, error: 'Akses Ditolak: Password Admin Salah' }, { status: 401 });
    }

    const body = await request.json();
    const newExp = await createExperience(body);
    return NextResponse.json({ success: true, data: newExp }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Gagal menambahkan pengalaman' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const authHeader = request.headers.get('x-admin-token') || request.headers.get('x-admin-pass') || '';
    if (!(await verifyAdminPassword(authHeader))) {
      return NextResponse.json({ success: false, error: 'Akses Ditolak: Password Admin Salah' }, { status: 401 });
    }

    const body = await request.json();
    const orderedIds = Array.isArray(body?.orderedIds)
      ? body.orderedIds.filter((id: unknown): id is string => typeof id === 'string' && id.length > 0)
      : [];

    if (orderedIds.length === 0) {
      return NextResponse.json({ success: false, error: 'Daftar urutan pengalaman tidak valid' }, { status: 400 });
    }

    const updated = await reorderExperiences(orderedIds);
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, error: 'Gagal menyimpan urutan pengalaman' }, { status: 500 });
  }
}
