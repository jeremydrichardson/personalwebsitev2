import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tooltip } from "./Tooltip";

const meta = {
  title: "Design System/Atoms/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  args: {
    for: "demo-target",
    children: "Short contextual help for the control.",
    placement: "top",
    maxWidth: "240px",
  },
  render: (args) => (
    <div style={{ padding: "4rem", display: "inline-block" }}>
      <button type="button" id={args.for} className="tech-icon">
        Hover me
      </button>
      <Tooltip {...args} />
    </div>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Bottom: Story = {
  args: {
    placement: "bottom",
    children: "Tooltip anchored below the target.",
  },
};
