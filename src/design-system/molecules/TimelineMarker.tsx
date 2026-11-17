"use client";

import { Icon } from "../atoms/Icon";

export type TimelineMarkerProps = {
  iconName?: string;
  label?: string;
};

/** Circular timeline node used on the experience rail. */
export function TimelineMarker({
  iconName = "briefcase",
  label = "",
}: TimelineMarkerProps) {
  return (
    <div className="experience-marker" aria-hidden={label ? undefined : true}>
      <Icon name={iconName} label={label} />
    </div>
  );
}
