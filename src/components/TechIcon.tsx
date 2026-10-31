"use client";

import { IconType } from "react-icons/lib";
import { WelkTooltip } from "@welkui/react";

interface Props {
  Icon: IconType;
  title: string;
  tooltip: string;
}

export default function TechIcon({ Icon, title, tooltip }: Props) {
  return (
    <WelkTooltip content={tooltip} variant="speech">
      <button type="button" className="tech-tile" aria-label={title}>
        <Icon size="2.35em" aria-hidden />
      </button>
    </WelkTooltip>
  );
}
