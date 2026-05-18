import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import AICopilot from '@/components/ai/AICopilot';
import CommandPalette from '@/components/dashboard/CommandPalette';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AI Company Operating System (AI-CoOS)',
  description: 'Enterprise-grade real-time SaaS command center & operations hub.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden flex bg-background text-foreground font-sans grid-bg`}
        style={{ fontFamily: "'Outfit', var(--font-geist-sans), sans-serif" }}
        suppressHydrationWarning
      >
        {/* Glow ambient blurs in background */}
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-accent-blue/5 filter blur-[120px] pointer-events-none select-none animate-pulse-glow-blue" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] rounded-full bg-accent-purple/5 filter blur-[150px] pointer-events-none select-none animate-pulse-glow-purple" />

        {/* Left collapsable sidebar */}
        <Sidebar />

        {/* Right side primary workspace */}
        <div className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden bg-gradient-to-br from-background-from via-background-via to-background-to">
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8">
            {children}
          </main>
        </div>

        {/* Floating Widgets */}
        <AICopilot />
        <CommandPalette />
      </body>
    </html>
  );
}
