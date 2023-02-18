import Link from "next/link";
import { format, parseISO } from "date-fns";
import { WP_REST_API_Post } from "wp-types";

interface PostData {
  content: string;
  createDate: string;
  modifiedDate: string;
  slug: string;
  frontmatter: any;
}

interface PostProps {
  post: WP_REST_API_Post;
}

export default function Post({ post }: PostProps) {
  return (
    <div className="post-item">
      <h3>
        <Link href={`/blog2/${post.slug}`} legacyBehavior>
          <a
            className="post-item-title"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </Link>
      </h3>
      <time className="post-item-date">
        {format(parseISO(post.date), "MMM d, yyyy")}
      </time>
      <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
    </div>
  );
}
