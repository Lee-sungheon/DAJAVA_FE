/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self' https://sdk.dajava.link https://dajava.chsan626.co.kr http://54.180.254.109:8080; connect-src 'self' https://sdk.dajava.link https://dajava.chsan626.co.kr http://54.180.254.109:8080; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://sdk.dajava.link https://dajava.chsan626.co.kr http://54.180.254.109:8080",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
