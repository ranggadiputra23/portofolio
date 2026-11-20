import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getAnalyticsSummary, recordAnalyticsVisit } from '@/lib/db';
import { verifyAdminPassword } from '@/lib/auth';

const BOT_PATTERN =
  /bot|crawler|spider|crawling|headless|lighthouse|pingdom|uptime|slurp|bingpreview|facebookexternalhit|whatsapp|telegrambot|discordbot/i;

function parseDeviceType(ua: string): string {
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet';
  if (/mobile|iphone|ipod|android.*mobile|blackberry|iemobile|opera mini/i.test(ua)) {
    return 'Mobile';
  }
  return 'Desktop';
}

function parseBrowser(ua: string): string {
  if (/edg\//i.test(ua)) return 'Edge';
  if (/opr\//i.test(ua) || /opera/i.test(ua)) return 'Opera';
  if (/chrome|crios/i.test(ua) && !/edg/i.test(ua)) return 'Chrome';
  if (/firefox|fxios/i.test(ua)) return 'Firefox';
  if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) return 'Safari';
  return 'Other';
}

function parseOS(ua: string): string {
  if (/windows/i.test(ua)) return 'Windows';
  if (/iphone|ipad|ipod/i.test(ua)) return 'iOS';
  if (/android/i.test(ua)) return 'Android';
  if (/macintosh|mac os x/i.test(ua)) return 'macOS';
  if (/linux/i.test(ua)) return 'Linux';
  return 'Other';
}

function parseReferrer(rawReferrer: unknown, requestHost: string): string {
  if (typeof rawReferrer !== 'string' || !rawReferrer.trim()) {
    return 'Direct';
  }
  try {
    const parsed = new URL(rawReferrer);
    const host = parsed.hostname.replace(/^www\./i, '');
    if (!host || host === requestHost.replace(/^www\./i, '').split(':')[0]) {
      return 'Direct';
    }
    return host;
  } catch {
    return 'Direct';
  }
}

function safeDecodeCity(rawCity: string | null): string {
  if (!rawCity) return '-';
  try {
    return decodeURIComponent(rawCity);
  } catch {
    return rawCity;
  }
}

export async function GET(request: Request) {
  try {
    const authHeader =
      request.headers.get('x-admin-token') ||
      request.headers.get('x-admin-pass') ||
      '';
    if (!(await verifyAdminPassword(authHeader))) {
      return NextResponse.json(
        { success: false, error: 'Akses Ditolak: Password Admin Salah' },
        { status: 401 }
      );
    }

    const summary = await getAnalyticsSummary();
    return NextResponse.json({ success: true, data: summary });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data analitik' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const ua = request.headers.get('user-agent') || '';
    if (!ua || BOT_PATTERN.test(ua)) {
      return NextResponse.json({ success: true, skipped: true });
    }

    const body = await request.json().catch(() => ({}));
    const rawPath = typeof body?.path === 'string' && body.path.trim() ? body.path.trim() : '/';
    if (rawPath.startsWith('/admin')) {
      return NextResponse.json({ success: true, skipped: true });
    }

    const forwardedFor = request.headers.get('x-forwarded-for') || '';
    const ip =
      forwardedFor.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const dayKey = new Date().toISOString().slice(0, 10);
    const visitorHash = crypto
      .createHash('sha256')
      .update(`${ip}|${ua}|${dayKey}`)
      .digest('hex')
      .slice(0, 24);

    const country =
      request.headers.get('x-vercel-ip-country') ||
      request.headers.get('cf-ipcountry') ||
      'Local / Unknown';
    const city = safeDecodeCity(request.headers.get('x-vercel-ip-city'));
    const host = request.headers.get('host') || '';

    const visit = await recordAnalyticsVisit({
      path: rawPath,
      visitorHash,
      deviceType: parseDeviceType(ua),
      browser: parseBrowser(ua),
      os: parseOS(ua),
      country,
      city,
      referrer: parseReferrer(body?.referrer, host),
    });

    return NextResponse.json({ success: true, data: visit }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Gagal mencatat analitik' },
      { status: 500 }
    );
  }
}
