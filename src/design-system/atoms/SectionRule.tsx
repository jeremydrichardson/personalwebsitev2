export type SectionRuleProps = {
  className?: string;
};

/** Quiet horizontal rule used between page sections. */
export function SectionRule({ className }: SectionRuleProps) {
  return <hr className={["section-rule", className].filter(Boolean).join(" ")} />;
}
