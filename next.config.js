/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    // pdfjs-dist tries to import 'canvas' for Node.js — disable it for the browser
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

module.exports = nextConfig;
