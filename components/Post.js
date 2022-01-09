import Link from "next/link";
import { format, parseISO } from "date-fns";

export default function Post({ post }) {
  return (
    <div className="post-item">
      <h3>
        <Link href={`/blog/${post.slug}`}>
          <a className="post-item-title">{post.frontmatter.title}</a>
        </Link>
      </h3>
      <p className="post-item-desc">
        {post.frontmatter.description}&nbsp;
        <Link href={`/blog/${post.slug}`} className="post-link">
          <a className="post-item-more">Read More →</a>
        </Link>
      </p>
      <time className="post-item-date">
        {format(parseISO(post.createDate), "MMM d, yyyy")}
      </time>
    </div>
  );
}
