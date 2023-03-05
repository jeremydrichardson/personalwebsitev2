const config = {
  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jeremyrichardsonhome.files.wordpress.com",
        pathname: "/**",
      },
    ],
  },
};
export default config;
