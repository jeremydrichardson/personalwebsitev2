"use client";

import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";

export type BackButtonProps = {
  href?: string;
  label?: string;
};

/** Plain text-style back control with a leading arrow icon. */
export function BackButton({ href = "/", label = "Go Back" }: BackButtonProps) {
  return (
    <div className="blog-back">
      <Button href={href} appearance="plain" variant="neutral" size="small">
        <Icon slot="start" name="arrow-left" />
        {label}
      </Button>
    </div>
  );
}
