import { format, parseISO } from "date-fns";
import {
  WelkBadge,
  WelkBreadCrumbs,
  WelkDivider,
} from "@welkui/react";
import { getPosts, getPost, getTagsByPost } from "../../../lib/wordpress";
import { polyfill } from "interweave-ssr";
import { WpRenderBlock } from "../../../components/WpRenderBlock/WpRenderBlock";
import { BlogBackButton } from "../../../components/BlogBackButton";

polyfill();

interface Params {
  slug: string;
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  const postTags = await getTagsByPost(post.id);

  const { modified, date, title, tags, parsed_content } = post;

  const createDateFormatted = date
    ? format(parseISO(date), "MMM d, yyyy")
    : null;
  const modifiedDateFormatted = modified
    ? format(parseISO(modified), "MMM d, yyyy")
    : null;
  const plainTitle = title.rendered.replace(/<[^>]+>/g, "");

  return (
    <main>
      <article className="section">
        <BlogBackButton />
        <WelkBreadCrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/#posts" },
            { label: plainTitle },
          ]}
        />

        <header className="blog-header comic-panel" style={{ marginTop: "1rem" }}>
          <h1
            className="blog-title"
            dangerouslySetInnerHTML={{ __html: title.rendered }}
          />
          <div className="blog-meta">
            {createDateFormatted && (
              <time dateTime={date}>Posted {createDateFormatted}</time>
            )}
            {createDateFormatted !== modifiedDateFormatted &&
              modifiedDateFormatted && (
                <time dateTime={modified}>
                  Updated {modifiedDateFormatted}
                </time>
              )}
          </div>
          {tags && postTags && postTags.length > 0 && (
            <div className="blog-tags">
              {postTags.map((postTag) => (
                <WelkBadge key={postTag.id} size="sm" variant="default">
                  {postTag.name}
                </WelkBadge>
              ))}
            </div>
          )}
        </header>

        <WelkDivider variant="dotted" style={{ margin: "1.25rem 0" }} />

        <div className="blog-body comic-panel">
          {parsed_content?.map((block, index) => {
            return <WpRenderBlock key={index} block={block} />;
          })}
        </div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  const wpPosts = await getPosts("publish", 99);
  return wpPosts.map((post) => ({
    slug: post.slug,
  }));
}
