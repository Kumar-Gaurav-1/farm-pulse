import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AgriPulse AI - Precision Agriculture Intelligence',
  description: 'AI-powered decision tools for modern agriculture, from smallholders to commercial farms.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Source+Code+Pro&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/20" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}