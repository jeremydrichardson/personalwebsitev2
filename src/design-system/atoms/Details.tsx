"use client";

import type { ReactNode } from "react";
import "../register";

export type DetailsAppearance =
  | "filled"
  | "outlined"
  | "filled-outlined"
  | "plain";

export type DetailsProps = {
  summary: string;
  children: ReactNode;
  appearance?: DetailsAppearance;
  open?: boolean;
  className?: string;
};

export function Details({
  summary,
  children,
  appearance = "outlined",
  open,
  className,
}: DetailsProps) {
  return (
    <wa-details
      summary={summary}
      appearance={appearance}
      open={open}
      className={className}
    >
      {children}
    </wa-details>
  );
}
