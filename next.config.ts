import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Two dials decide how a photograph looks, and conflating them is what
    // wrecked the portraits before: how many pixels it is served at, and how
    // hard those pixels are compressed.
    //
    // Pixels: the optimiser is on, so every <Image> is resized per device from
    // the camera original behind it. A card 384px wide gets ~828px rather than
    // the full 2336px — the visitor cannot see more than their screen holds.
    //
    // Compression: 90, and 90 is the *only* allowed value. Next clamps any
    // unmatched `quality` to the nearest entry in this list, so a component
    // that passes nothing gets 90 instead of the framework's default of 75 —
    // which is what every card, insight and practice thumbnail was quietly
    // being served at. Measured on a camera original at the size a card is
    // actually displayed: quality 90 is 40 KB against 1.9 MB for the untouched
    // file, at SSIM 0.984 with a mean channel difference of 1.4/255. The step
    // from 90 to 100 buys 1.7 dB for three times the bytes; the step down to
    // 75 is where artefacts start showing in skin and fabric.
    qualities: [90],
    // Artwork uploaded through the admin lands in the firm's Cloudinary
    // account. Scoped to that one cloud and to delivered assets, so the
    // optimiser can't be pointed at arbitrary hosts.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: `/${process.env.NEXT_PUBLIC_CLOUD_NAME || "de7yugvwl"}/**`,
        search: "",
      },
    ],
  },
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
