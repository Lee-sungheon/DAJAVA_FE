import type { NextConfig } from 'next';

const cspHeader = `
    default-src 'self' https://sdk.dajava.link https://dajava.chsan626.co.kr http://54.180.254.109;
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://sdk.dajava.link http://54.180.254.109;
    style-src 'self' 'unsafe-inline';
    img-src 'self' https://static.zaritalk.com blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
