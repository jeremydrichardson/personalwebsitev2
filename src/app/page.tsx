import styles from "../styles/Home.module.css";
import WpPost from "../components/WpPost";
import { getPosts } from "../lib/wordpress";
import { SiteNav } from "../components/SiteNav";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Tech } from "../components/Tech";
import { WP_REST_API_Posts } from "wp-types";

export default async function Home() {
  const wpPosts = await getPosts("publish", 99);

  return (
    <>
      <div className={styles.headerTest}>
        <SiteNav />
      </div>
      <div className={styles.container}>
        <Hero />

        <main className="main">
          <About />
          &nbsp;
          <Tech />
          &nbsp;
          <h2 id="posts">Posts</h2>
          <article className="container prose prose-sm md:prose">
            {wpPosts.map((post) => (
              <WpPost key={post.slug} post={post} />
            ))}
          </article>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    </>
  );
}
