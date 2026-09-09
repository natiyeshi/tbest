import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Files under public/ are served with `Cache-Control: max-age=0` by
        // default, so the hero footage and the team clips are re-fetched on
        // every visit. They are large and effectively immutable — a new cut
        // gets a new filename — so let the browser keep them for a year.
        source: "/new/:path*.webm",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
