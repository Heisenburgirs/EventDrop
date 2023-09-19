/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: config => {
      config.resolve.fallback = { fs: false, net: false, tls: false };
      return config;
    },
    images: {
      domains: ['cdn.discordapp.com', 'ipfs.io']
    },
  };
  
  
  module.exports = nextConfig;
  