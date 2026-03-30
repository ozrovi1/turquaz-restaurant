import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "gunes.estetikatolye.com", pathname: "/**" },
      { protocol: "https", hostname: "turkuazaldershot.co.uk", pathname: "/**" },
      { protocol: "https", hostname: "www.turkuazcrawley.co.uk", pathname: "/**" },
      { protocol: "https", hostname: "turkuazcrawley.co.uk", pathname: "/**" },
    ],
  },
};

export default nextConfig;
