"use client";

import type { ReactNode } from "react";
import "../register";

export type ButtonAppearance =
  | "accent"
  | "filled"
  | "outlined"
  | "filled-outlined"
  | "plain";

export type ButtonVariant =
  | "neutral"
  | "brand"
  | "success"
  | "warning"
  | "danger";

export type ButtonSize =
  | "xs"
  | "s"
  | "m"
  | "l"
  | "xl"
  | "small"
  | "medium"
  | "large";

export type ButtonProps = {
  children?: ReactNode;
  href?: string;
  appearance?: ButtonAppearance;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  target?: "_blank" | "_parent" | "_self" | "_top";
  rel?: string;
};

export function Button({
  children,
  href,
  appearance = "plain",
  variant = "neutral",
  size = "small",
  className,
  target,
  rel,
}: ButtonProps) {
  return (
    <wa-button
      href={href}
      appearance={appearance}
      variant={variant}
      size={size}
      className={className}
      target={target}
      rel={rel}
    >
      {children}
    </wa-button>
  );
}
