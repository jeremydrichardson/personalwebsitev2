import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconWithTooltip } from "./IconWithTooltip";

const meta = {
  title: "Design System/Molecules/IconWithTooltip",
  component: IconWithTooltip,
  tags: ["autodocs"],
  args: {
    id: "react",
    name: "react",
    title: "React",
    family: "brands",
    tooltip:
      "I love working in React! Its simplicity belies its power and flexibility.",
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "5rem 2rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof IconWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ClassicIcon: Story = {
  args: {
    id: "jest",
    name: "vial",
    family: "classic",
    title: "Jest",
    tooltip: "Testing with Jest and React Testing Library.",
  },
};

export const TechRow: Story = {
  render: () => (
    <div className="tech-logos">
      <IconWithTooltip
        id="react"
        name="react"
        title="React"
        tooltip="React applications and component libraries."
      />
      <IconWithTooltip
        id="js"
        name="js"
        title="Javascript"
        tooltip="Vanilla JavaScript first, libraries when needed."
      />
      <IconWithTooltip
        id="aws"
        name="aws"
        title="AWS"
        tooltip="Infrastructure and cloud services on AWS."
      />
      <IconWithTooltip
        id="git"
        name="git-alt"
        title="Git"
        tooltip="Git workflows, hooks, and changelog automation."
      />
    </div>
  ),
};
