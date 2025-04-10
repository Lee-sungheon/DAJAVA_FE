import './globals.css';

import { Provider } from 'jotai';
import { Geist, Geist_Mono } from 'next/font/google';
import { ReactNode } from 'react';

import Alert from '@dajava/components/ui/Alert';

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
    <html lang={'ko'} className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel={'icon'} href={'/dajava-logo.png'} />
        <link rel={'apple-touch-icon'} href={'/dajava-logo.png'} />
      </head>
      <body>
        <Provider>
          <JotaiProvider>
            <ReactQueryProvider>
              {children}
              <Alert />
            </ReactQueryProvider>
          </JotaiProvider>
        </Provider>
      </body>
    </html>
  );
};

RootLayout.displayName = 'RootLayout';

export default RootLayout;
