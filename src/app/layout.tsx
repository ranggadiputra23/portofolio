import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AmbientBackground } from '@/components/AmbientBackground';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rangga Adi Putra - Frontend Web Developer Portfolio',
  description:
    'Portofolio profesional Rangga Adi Putra, seorang Frontend Web Developer berpengalaman dengan spesialisasi Next.js, React, TypeScript, dan Tailwind CSS.',
  keywords: [
    'Rangga Adi Putra',
    'Frontend Developer',
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Web Developer Indonesia',
    'Portfolio',
  ],
  authors: [{ name: 'Rangga Adi Putra' }],
  openGraph: {
    title: 'Rangga Adi Putra - Frontend Web Developer Portfolio',
    description:
      'Portofolio profesional Rangga Adi Putra dengan tampilan clean, dark mode, dan performa tinggi.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.className} antialiased min-h-screen bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white dark:selection:bg-sky-400 dark:selection:text-slate-950 transition-colors duration-500`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AmbientBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
