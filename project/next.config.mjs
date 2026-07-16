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
      {
        source: "/pt-br",
        destination: "/",
        permanent: false,
      },
      {
        source: "/pt-br/:path*",
        destination: "/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
