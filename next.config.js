/** @type {import('next').NextConfig} */
module.exports = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          }
        ],
      },
    ]
  },
  reactStrictMode: true,
  images: {
    domains: ['books.google.com']
  },
  experimental: {
    serverActions: true,
  },
  env:{
    KEY_SECOND : process.env.KEY_SECOND,
    KEY_FIRST : process.env.KEY_FIRST,
    BASE_URL : process.env.BASE_URL,
  }
};
