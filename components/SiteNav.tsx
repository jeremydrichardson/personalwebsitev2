import Link from "next/link";
import styles from "./../styles/sitenav.module.css";

export function SiteNav() {
  return (
    <nav className={`site-navigation ${styles.siteNavigation}`}>
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
