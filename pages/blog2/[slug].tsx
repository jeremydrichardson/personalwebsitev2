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
import {
  parse,
  ParsedBlock,
} from "@wordpress/block-serialization-default-parser";
import { BlockRenderer } from "../../lib/wp-block-renderer";
import Highlight, { defaultProps } from "prism-react-renderer";
import htmlParse from "html-react-parser";
import { Interweave, Node } from "interweave";
import { polyfill } from "interweave-ssr";
import { InnerBlocks } from "../../lib/wp-block-renderer/types";

polyfill();

function transform(node: HTMLElement, children: Node[]): React.ReactNode {
  // return <h1>I transform</h1>;
  if (node.tagName === "pre") {
    return <code>{children}</code>;
  }
}

const TestComponent = (props: any) => {
  return (
    <Interweave noWrap={true} content={props.html} transform={transform} />
  );
};

const renderBlock = (block: ParsedBlock) => {
  if (!block.innerBlocks) return block.innerHTML;

  let index = 0;
  return block.innerContent.reduce((previous, current) => {
    if (current === null) {
      const innerBlock = renderBlock(block.innerBlocks[index]);
      previous += innerBlock || "";
      index++;
      return previous;
    }

    previous += current || "";
    return previous;
  }, "");
};

export default function PostPage(props: { post: WP_REST_API_Post }) {
  const { slug, content, modified, date, title, tags, parsedContent } =
    props.post;
  const blocks = content.raw !== undefined ? parse(content.raw) : [];

  console.log("blocks", blocks);
  // console.log("rendered blocks", renderBlock(blocks[0]));

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

  const innerBlocks: InnerBlocks[] = blocks
    .map((block): InnerBlocks => parsedBlockToInnerBlocks(block))
    .filter((block) => block.blockName !== "");

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
                innerBlocks={innerBlocks}
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
