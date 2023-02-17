import React from "react";
import { IconType } from "react-icons/lib";

interface Props {
  Icon: IconType;
  title: string;
  tooltip: string;
}

export default function TechIcon({ Icon, title, tooltip }: Props) {
  return (
    <div className="tech-tooltip" data-text={tooltip}>
      <Icon title={title} size="3em" />
    </div>
  );
}
