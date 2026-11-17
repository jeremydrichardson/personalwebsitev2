"use client";

import "./webawesome/register";

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
              <wa-button
                href={link.href}
                appearance="plain"
                variant="neutral"
                size="small"
              >
                {link.label}
              </wa-button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
