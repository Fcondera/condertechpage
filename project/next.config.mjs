/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/desenvolvimento-de-sites/:cidade",
        destination: "/empresa-de-tecnologia/:cidade",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
