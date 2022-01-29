import Link from "next/link";
import { format, parseISO } from "date-fns";
import { MDXRemote } from "next-mdx-remote";
import mdxComponents from "./mdxComponents";

export default function Post({ post }) {
  return (
    <div className="post-item">
      <h3>
        <Link href={`/blog/${post.slug}`}>
          <a className="post-item-title">{post.frontmatter.title}</a>
        </Link>
      </h3>
      <MDXRemote {...post.frontmatter.description} components={mdxComponents} />

      <time className="post-item-date">
        {format(parseISO(post.createDate), "MMM d, yyyy")}
      </time>
    </div>
  );
}
