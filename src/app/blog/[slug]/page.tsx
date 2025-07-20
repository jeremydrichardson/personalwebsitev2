import Link from "next/link";
import Layout from "../../../components/Layout";
import { format, parseISO } from "date-fns";
import { getPosts, getPost, getTagsByPost } from "../../../lib/wordpress";
import { polyfill } from "interweave-ssr";
import { WpRenderBlock } from "../../../components/WpRenderBlock/WpRenderBlock";

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

  return (
    <>
      <Layout>
        <div className="container prose prose-sm md:prose">
          <Link href="/" className="btn btn-back">
            Go Back
          </Link>
          <div className="card card-page">
            <h1
              className="post-title"
              dangerouslySetInnerHTML={{ __html: title.rendered }}
            />
            <div className="post-create-date">
              Posted:&nbsp;
              <time dateTime={date}>{createDateFormatted}</time>
            </div>
            {createDateFormatted !== modifiedDateFormatted && (
              <div className="post-modified-date">
                Last modified:&nbsp;
                <time dateTime={modified}>{modifiedDateFormatted}</time>
              </div>
            )}
            {tags && postTags && (
              <div className="post-tags">
                Tags: {postTags.map((postTag) => postTag.name).join(", ")}
              </div>
            )}
            {parsed_content?.map((block, index) => {
              return <WpRenderBlock key={index} block={block} />;
            })}
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function generateStaticParams() {
  const wpPosts = await getPosts("publish", 99);
  return wpPosts.map((post) => ({
    slug: post.slug,
  }));
}
