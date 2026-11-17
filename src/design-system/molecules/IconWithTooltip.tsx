"use client";

import { Icon, type IconFamily } from "../atoms/Icon";
import { Tooltip, type TooltipPlacement } from "../atoms/Tooltip";

export type IconWithTooltipProps = {
  id: string;
  name: string;
  title: string;
  tooltip: string;
  family?: IconFamily;
  placement?: TooltipPlacement;
  maxWidth?: string;
};

/** Interactive icon control with an accessible hover/focus tooltip. */
export function IconWithTooltip({
  id,
  name,
  title,
  tooltip,
  family = "brands",
  placement = "top",
  maxWidth = "280px",
}: IconWithTooltipProps) {
  const iconId = `icon-${id}`;

  return (
    <>
      <button
        type="button"
        className="tech-icon"
        id={iconId}
        aria-label={title}
      >
        <Icon name={name} family={family} label={title} />
      </button>
      <Tooltip for={iconId} placement={placement} maxWidth={maxWidth}>
        {tooltip}
      </Tooltip>
    </>
  );
}
