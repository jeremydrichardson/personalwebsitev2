import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TimelineMarker } from "./TimelineMarker";

const meta = {
  title: "Design System/Molecules/TimelineMarker",
  component: TimelineMarker,
  tags: ["autodocs"],
  args: {
    iconName: "briefcase",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: "relative",
          padding: "1rem 0 1rem 3rem",
          minHeight: 64,
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TimelineMarker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AlternateIcon: Story = {
  args: {
    iconName: "building",
  },
};
