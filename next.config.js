/** @type {import('next').NextConfig} */
const config = {
  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  reactStrictMode: true,
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wp.jeremyrichardson.dev",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  // Storybook is copied into public/sb during `pnpm build`.
  // Serve the SPA shell at /sb (Next would otherwise 404 without index routing).
  async rewrites() {
    return [
      {
        source: "/sb",
        destination: "/sb/index.html",
      },
    ];
  },
};
export default config;
