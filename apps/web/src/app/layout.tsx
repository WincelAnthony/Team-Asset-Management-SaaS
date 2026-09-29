import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AssetForge',
  description: 'Team asset management for growing organizations.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
