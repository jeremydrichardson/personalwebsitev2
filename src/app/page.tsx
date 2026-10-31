import { getPosts } from "../lib/wordpress";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Tech } from "../components/Tech";
import { PostsSection } from "../components/PostsSection";

export default async function Home() {
  const wpPosts = await getPosts("publish", 99);

  return (
    <>
      <Hero />
      <About />
      <Tech />
      <PostsSection posts={wpPosts} />
    </>
  );
}
