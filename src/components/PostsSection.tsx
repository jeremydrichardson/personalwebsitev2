import type { WP_REST_API_Post } from "wp-types";
import { PostCard } from "./PostCard";

interface PostsSectionProps {
  posts: WP_REST_API_Post[];
}

export function PostsSection({ posts }: PostsSectionProps) {
  return (
    <section className="section" id="posts" aria-labelledby="posts-heading">
      <h2 id="posts-heading" className="section-heading">
        Posts
      </h2>
      <p className="section-lede">
        Field notes from building APIs, component libraries, and the occasional
        side quest.
      </p>
      <div className="posts-list">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
