import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Details } from "./Details";

const meta = {
  title: "Design System/Atoms/Details",
  component: Details,
  tags: ["autodocs"],
  args: {
    summary: "Overview",
    appearance: "outlined",
    children: (
      <p>
        Expandable disclosure content used for longer project notes on the
        experience page.
      </p>
    ),
  },
} satisfies Meta<typeof Details>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const Open: Story = {
  args: {
    open: true,
  },
};

export const Stack: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Details summary="Overview" appearance="outlined">
        <p>High-level context for the project.</p>
      </Details>
      <Details summary="Implementation notes" appearance="outlined">
        <p>Details about architecture and delivery.</p>
      </Details>
    </div>
  ),
};
