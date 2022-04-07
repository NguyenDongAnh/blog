module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["192.168.2.179", "localhost"],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    BASE_SERVER: process.env.BASE_SERVER || "http://rabbitworld.ddns.net"
  }
}
