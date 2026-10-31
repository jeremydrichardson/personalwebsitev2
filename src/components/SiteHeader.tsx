"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { WelkButton, WelkDrawer, WelkMenu } from "@welkui/react";
import { useState } from "react";

const navItems = [
  { title: "Home", route: "/" },
  { title: "Blog", route: "/#posts" },
  { title: "Experience", route: "/experience" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeRoute = pathname === "/experience" ? "/experience" : "/";

  const go = (route: string) => {
    setMenuOpen(false);
    if (route === "/#posts") {
      if (pathname === "/") {
        document.getElementById("posts")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }
      router.push("/#posts");
      return;
    }
    router.push(route);
  };

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-brand" aria-label="Jeremy Richardson home">
          <span className="site-brand-mark" aria-hidden="true">
            JR
          </span>
          <span>Jeremy Richardson</span>
        </Link>

        <nav className="site-nav-desktop" aria-label="Primary">
          {navItems.map((item) => {
            const isActive =
              item.route === "/experience"
                ? pathname === "/experience"
                : item.route === "/"
                  ? pathname === "/"
                  : false;

            return (
              <WelkButton
                key={item.route}
                size="sm"
                variant={isActive ? "primary" : "ghost"}
                onClick={() => go(item.route)}
              >
                {item.title}
              </WelkButton>
            );
          })}
        </nav>

        <div className="site-nav-mobile">
          <WelkButton
            size="sm"
            variant="secondary"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </WelkButton>
          <WelkDrawer
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            title="Navigate"
            position="right"
          >
            <div id="mobile-nav-drawer">
              <WelkMenu
                items={navItems}
                activeRoute={activeRoute}
                aria-label="Mobile primary"
              />
            </div>
          </WelkDrawer>
        </div>
      </div>
    </header>
  );
}
