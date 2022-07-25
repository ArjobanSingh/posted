/** @type {import('next').NextConfig} */
const domains =
  process.env.NODE_ENV === "development"
    ? ["res.cloudinary.com", "loremflickr.com", "cloudflare-ipfs.com"]
    : ["res.cloudinary.com"];

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains,
  },
};

module.exports = nextConfig;
