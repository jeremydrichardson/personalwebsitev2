import type { StorybookConfig } from "@storybook/nextjs-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: [
    "../src/design-system/**/*.mdx",
    "../src/design-system/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-docs"],
  framework: "@storybook/nextjs-vite",
  // Avoid copying all of public (and a nested public/sb) into the Storybook build.
  staticDirs: [
    { from: "../public/fonts", to: "/fonts" },
    { from: "../public/img", to: "/img" },
  ],
  async viteFinal(viteConfig) {
    // Absolute /sb/ for Vercel preview embedding; relative for local standalone builds.
    const base = process.env.STORYBOOK_BASE_PATH ?? "./";
    return mergeConfig(viteConfig, { base });
  },
};

export default config;
