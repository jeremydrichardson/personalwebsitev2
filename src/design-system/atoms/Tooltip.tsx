"use client";

import type { ReactNode } from "react";
import "../register";

export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end";

export type TooltipProps = {
  for: string;
  children: ReactNode;
  placement?: TooltipPlacement;
  maxWidth?: string;
};

export function Tooltip({
  for: forId,
  children,
  placement = "top",
  maxWidth = "280px",
}: TooltipProps) {
  return (
    <wa-tooltip
      for={forId}
      placement={placement}
      style={{ "--max-width": maxWidth }}
    >
      {children}
    </wa-tooltip>
  );
}
