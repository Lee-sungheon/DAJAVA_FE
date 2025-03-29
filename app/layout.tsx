import './globals.css';

import { Geist, Geist_Mono } from 'next/font/google';
import React from 'react';

import JotaiProvider from '../components/providers/JotaiProvider';
import ReactQueryProvider from '../components/providers/ReactQueryProvider';

import type { Metadata } from 'next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DAJAVA',
  description: '사용자 행동 패턴 분석 솔루션',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={'ko'}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <JotaiProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
