import type { NextConfig } from 'next';

const cspHeader = `
    default-src 'self' https://sdk.dajava.link https://dajava.pg.chsan626.co.kr http://54.180.254.109;
    script-src 'self' 'unsafe-inline' https://sdk.dajava.link;
    connect-src 'self' https://2z1dj6gdya.execute-api.ap-northeast-2.amazonaws.com https://sdk.dajava.link https://dajava.pg.chsan626.co.kr;
    style-src 'self' 'unsafe-inline';
    img-src 'self' https://2z1dj6gdya.execute-api.ap-northeast-2.amazonaws.com https://sdk.dajava.link blob: data:;
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
