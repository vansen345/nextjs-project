import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  allowedDevOrigins: ['192.168.1.18'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "res.cloudinary.com",
  //     },
  //     {
  //       protocol: "https",
  //       hostname: "piepme.s3.ap-southeast-1.amazonaws.com",
  //     },
  //   ],
  // },
};


export default nextConfig;
