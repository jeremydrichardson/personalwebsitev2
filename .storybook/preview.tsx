import type { Preview } from "@storybook/nextjs-vite";
import "@awesome.me/webawesome/dist/styles/webawesome.css";
import "../src/styles/globals.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    backgrounds: {
      default: "site",
      values: [
        { name: "site", value: "#f5f7fb" },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
};

export default preview;
