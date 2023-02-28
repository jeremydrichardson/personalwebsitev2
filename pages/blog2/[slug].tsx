import Link from "next/link";
import Layout from "../../components/Layout";
import Head from "next/head";
import { format, parseISO } from "date-fns";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { DiscussionEmbed } from "disqus-react";
import { getPosts, getPost, getTagsByPost } from "../../lib/wordpress";
import { WP_REST_API_Post, WP_REST_API_Tags } from "wp-types";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  parse,
  ParsedBlock,
} from "@wordpress/block-serialization-default-parser";
import { polyfill } from "interweave-ssr";
import { InnerBlocks } from "../../lib/wp-block-renderer/types";
import { WpRenderBlock } from "../../components/WpRenderBlock/WpRenderBlock";

polyfill();

export default function PostPage(props: {
  post: WP_REST_API_Post;
  postTags: WP_REST_API_Tags;
}) {
  const { slug, content, modified, date, title, tags } = props.post;
  const blocks = content.raw !== undefined ? parse(content.raw) : [];

  const parsedBlockToInnerBlocks = (parsedBlock: ParsedBlock): InnerBlocks => {
    return {
      blockName: parsedBlock.blockName || "",
      attrs: parsedBlock.attrs as Record<string, unknown>,
      innerBlocks: parsedBlock.innerBlocks.map((block) =>
        parsedBlockToInnerBlocks(block)
      ),
      innerHTML: parsedBlock.innerHTML,
    };
  };

  const createDateFormatted = date
    ? format(parseISO(date), "MMM d, yyyy")
    : null;
  const modifiedDateFormatted = modified
    ? format(parseISO(modified), "MMM d, yyyy")
    : null;

  return (
    <ErrorBoundary>
      <Layout>
        <Head>
          <title>{`Jeremy&apos;s blog - ${title.rendered}`}</title>
        </Head>
        <div className="container prose prose-sm md:prose">
          <Link href="/" legacyBehavior>
            <a className="btn btn-back">Go Back</a>
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
            {tags && props.postTags && (
              <div className="post-tags">
                Tags: {props.postTags.map((postTag) => postTag.name).join(", ")}
              </div>
            )}
            {blocks.map((block, index) => {
              return <WpRenderBlock key={index} block={block} />;
            })}
          </div>
        </div>
        <DiscussionEmbed
          shortname="jeremyrichardson"
          config={{
            url: `https://jeremyrichardson.dev/blog/${slug}`,
            identifier: slug,
            title: title.rendered,
          }}
        />
      </Layout>
    </ErrorBoundary>
  );
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const wpPosts = await getPosts();
  const paths = wpPosts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  { post: WP_REST_API_Post },
  Params
> = async (context) => {
  if (!context.params?.slug) throw new Error();

  const slug = context.params.slug;
  const post = await getPost(slug);
  const postTags = await getTagsByPost(post.id);

  return {
    props: {
      post,
      postTags,
    },
  };
};
