"use client";

import {
  IconWithTooltip,
  type IconWithTooltipProps,
} from "../design-system";

export type TechIconProps = IconWithTooltipProps;

export default function TechIcon(props: TechIconProps) {
  return <IconWithTooltip {...props} />;
}
