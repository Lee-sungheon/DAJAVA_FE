import './globals.css';

import { Geist, Geist_Mono } from 'next/font/google';
import { ReactNode } from 'react';

import Alert, { AlertProvider } from '@dajava/components/ui/Alert';

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

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang={'ko'}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <JotaiProvider>
          <ReactQueryProvider>
            {children}
            <Alert />
          </ReactQueryProvider>
        </JotaiProvider>
      </body>
    </html>
  );
};

RootLayout.displayName = 'RootLayout';

export default RootLayout;
