import { NextResponse } from 'next/server';
import { getMessages, createMessage } from '@/lib/db';
import { verifyAdminPassword } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('x-admin-token') || request.headers.get('x-admin-pass') || '';
    if (!(await verifyAdminPassword(authHeader))) {
      return NextResponse.json({ success: false, error: 'Akses Ditolak: Password Admin Salah' }, { status: 401 });
    }

    const messages = await getMessages();
    return NextResponse.json({ success: true, data: messages });
  } catch {
    return NextResponse.json({ success: false, error: 'Gagal mengambil pesan' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { senderName, senderEmail, subject, message } = body;

    if (!senderName || !senderEmail || !message) {
      return NextResponse.json(
        { success: false, error: 'Nama, Email, dan Pesan wajib diisi.' },
        { status: 400 }
      );
    }

    const newMsg = await createMessage({
      senderName,
      senderEmail,
      subject: subject || 'Pesan Baru dari Portofolio',
      message,
    });

    return NextResponse.json({ success: true, data: newMsg, message: 'Pesan Anda berhasil terkirim!' }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Gagal mengirim pesan' }, { status: 500 });
  }
}
