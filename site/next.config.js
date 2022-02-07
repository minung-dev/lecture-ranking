/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: '/api/lectures/:comp/:date',
        destination: `https://raw.githubusercontent.com/hmu332233/action.new-lecture/main/action/history/:comp/:date.json`,
      },
    ]
  },
}

module.exports = nextConfig
