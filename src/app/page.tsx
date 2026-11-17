import WpPost from "../components/WpPost";
import { getPosts } from "../lib/wordpress";
import { SiteNav } from "../components/SiteNav";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Tech } from "../components/Tech";

export default async function Home() {
  const wpPosts = await getPosts("publish", 99);

  return (
    <>
      <SiteNav />
      <Hero />

      <main className="main">
        <section className="section" aria-labelledby="about-heading">
          <About />
        </section>

        <hr className="section-rule" />

        <Tech />

        <hr className="section-rule" />

        <section className="section" aria-labelledby="posts">
          <h2 id="posts">Posts</h2>
          <article className="prose">
            {wpPosts.map((post) => (
              <WpPost key={post.slug} post={post} />
            ))}
          </article>
        </section>
      </main>
    </>
  );
}
