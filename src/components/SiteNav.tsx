"use client";

import { Button } from "../design-system";

const links = [
  { href: "/", label: "About" },
  { href: "/#posts", label: "Blog" },
  { href: "/experience", label: "Experience" },
] as const;

export function SiteNav() {
  return (
    <header className="site-header">
      <nav className="site-navigation" aria-label="Primary">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Button
                href={link.href}
                appearance="plain"
                variant="neutral"
                size="small"
              >
                {link.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
