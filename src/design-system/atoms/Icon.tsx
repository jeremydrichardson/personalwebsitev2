"use client";

import "../register";

export type IconFamily = "brands" | "classic";

export type IconProps = {
  name: string;
  family?: IconFamily;
  label?: string;
  slot?: string;
  className?: string;
};

export function Icon({
  name,
  family = "classic",
  label = "",
  slot,
  className,
}: IconProps) {
  return (
    <wa-icon
      name={name}
      family={family}
      label={label}
      slot={slot}
      className={className}
    />
  );
}
