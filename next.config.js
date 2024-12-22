const config = {
  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  reactStrictMode: true,
  images: {
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
};
export default config;
