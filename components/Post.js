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
      <div
        className="post-item-desc"
        dangerouslySetInnerHTML={{
          __html: post.frontmatter.description,
        }}
      />
      <time className="post-item-date">
        {format(parseISO(post.createDate), "MMM d, yyyy")}
      </time>
    </div>
  );
}
