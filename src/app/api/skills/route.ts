import { NextResponse } from 'next/server';
import { getSkills, createSkill } from '@/lib/db';
import { verifyAdminPassword } from '@/lib/auth';

export async function GET() {
  try {
    const skills = await getSkills();
    return NextResponse.json({ success: true, data: skills });
  } catch {
    return NextResponse.json({ success: false, error: 'Gagal mengambil skills' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('x-admin-token') || request.headers.get('x-admin-pass') || '';
    if (!(await verifyAdminPassword(authHeader))) {
      return NextResponse.json({ success: false, error: 'Akses Ditolak: Password Admin Salah' }, { status: 401 });
    }

    const body = await request.json();
    const newSkill = await createSkill(body);
    return NextResponse.json({ success: true, data: newSkill }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Gagal menambahkan skill' }, { status: 500 });
  }
}
