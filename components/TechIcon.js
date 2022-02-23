export default function TechIcon({ Icon, title, tooltip }) {
  return (
    <>
      <div className="tech-tooltip" data-text={tooltip}>
        <Icon title={title} size="3em" />
      </div>
    </>
  );
}
