import Link from "next/link";
import Layout from "../../components/Layout";
import Head from "next/head";
import { format, parseISO } from "date-fns";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { DiscussionEmbed } from "disqus-react";
import { getPosts, getPost } from "../../lib/wordpress";
import { WP_REST_API_Post } from "wp-types";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { parse } from "@wordpress/block-serialization-default-parser";
import BlockRenderer, { Fragment } from "wp-block-renderer";

const TestComponent = () => {
  return <h1>Yep, I here</h1>;
};

export default function PostPage(props: { post: WP_REST_API_Post }) {
  const { slug, content, modified, date, title, tags, parsedContent } =
    props.post;
  const blocks = content.raw !== undefined ? parse(content.raw) : [];
  console.log(blocks.map((block) => block.blockName));

  if (typeof window !== "undefined" && content.raw !== undefined) {
    console.log("window is not undefined");
    console.log("content", parse(content.raw));
  }

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
            {tags && <div className="post-tags">Tags: {tags.join(",")}</div>}
            {content.raw && (
              <BlockRenderer
                innerBlocks={blocks}
                blockMap={{
                  fragment: ({ children }) => <>{children}</>,
                  "syntaxhighlighter/code": TestComponent,
                }}
              />
            )}
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

  return {
    props: {
      post,
    },
  };
};
