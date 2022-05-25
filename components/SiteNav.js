import Link from "next/link";

export function SiteNav() {
  return (
    <nav className="site-navigation">
      <ul>
        <li>
          <Link href="/">About</Link>
        </li>
        <li>
          <Link href="/#posts">Blog</Link>
        </li>
        <li>
          <Link href="/experience">Experience</Link>
        </li>
      </ul>
    </nav>
  );
}
