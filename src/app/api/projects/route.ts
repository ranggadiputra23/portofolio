import { NextResponse } from 'next/server';
import { getProjects, createProject } from '@/lib/db';
import { verifyAdminPassword } from '@/lib/auth';

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json({ success: true, data: projects });
  } catch {
    return NextResponse.json({ success: false, error: 'Gagal mengambil proyek' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('x-admin-token') || request.headers.get('x-admin-pass') || '';
    if (!(await verifyAdminPassword(authHeader))) {
      return NextResponse.json({ success: false, error: 'Akses Ditolak: Password Admin Salah' }, { status: 401 });
    }

    const body = await request.json();
    const newProj = await createProject(body);
    return NextResponse.json({ success: true, data: newProj }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Gagal menambahkan proyek' }, { status: 500 });
  }
}
