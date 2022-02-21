export default function TechIcon({ Icon, title }) {
  return (
    <>
      <div className="tech-tooltip-triangle arrow-down" />
      <Icon title={title} size="3em" />
    </>
  );
}
