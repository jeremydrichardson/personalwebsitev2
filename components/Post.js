import Link from "next/link";

export default function Post({ post }) {
  return (
    <div className="post-item">
      <h3>
        <Link href={`/blog/${post.slug}`}>
          <a className="post-item-title">{post.frontmatter.title}</a>
        </Link>
      </h3>
      <p className="post-item-desc">
        {post.frontmatter.description}
        <Link href={`/blog/${post.slug}`}>
          <a className="post-item-more"> Read More →</a>
        </Link>
      </p>
      <time className="post-item-date">{post.createDate}</time>
    </div>
  );
}
