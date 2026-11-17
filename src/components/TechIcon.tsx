"use client";

interface TechIconProps {
  id: string;
  name: string;
  title: string;
  tooltip: string;
  family?: "brands" | "classic";
}

export default function TechIcon({
  id,
  name,
  title,
  tooltip,
  family = "brands",
}: TechIconProps) {
  const iconId = `tech-${id}`;

  return (
    <>
      <button
        type="button"
        className="tech-icon"
        id={iconId}
        aria-label={title}
      >
        <wa-icon name={name} family={family} label={title} />
      </button>
      <wa-tooltip for={iconId} placement="top" style={{ "--max-width": "280px" }}>
        {tooltip}
      </wa-tooltip>
    </>
  );
}
