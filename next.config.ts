import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 志賀高原は1件の登録から、スキー場ごとの登録に分けた
      {
        source: "/resorts/shiga",
        destination: "/area/nagano",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
