import fs from "fs";
import path from "path";
import Link from "next/link";
import Layout from "../../components/Layout";
import Head from "next/head";
import { getPostBySlug } from "../../lib/api";
import { format, parseISO } from "date-fns";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import imageSize from "rehype-img-size";
import mdxComponents from "../../components/mdxComponents";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { DiscussionEmbed } from "disqus-react";

export default function PostPage({
  frontmatter: { title, tags },
  slug,
  content,
  modifiedDate,
  createDate,
}) {
  const createDateFormatted = createDate
    ? format(parseISO(createDate), "MMM d, yyyy")
    : null;
  const modifiedDateFormatted = modifiedDate
    ? format(parseISO(modifiedDate), "MMM d, yyyy")
    : null;

  return (
    <ErrorBoundary>
      <Layout>
        <Head>
          <title>{`Jeremy&apos;s blog - ${title}`}</title>
        </Head>
        <div className="container prose prose-sm md:prose">
          <Link href="/" legacyBehavior>
            <a className="btn btn-back">Go Back</a>
          </Link>
          <div className="card card-page">
            <h1 className="post-title">{title}</h1>
            <div className="post-create-date">
              Posted:&nbsp;
              <time dateTime={createDate}>{createDateFormatted}</time>
            </div>
            {createDateFormatted !== modifiedDateFormatted && (
              <div className="post-modified-date">
                Last modified:&nbsp;
                <time dateTime={modifiedDate}>{modifiedDateFormatted}</time>
              </div>
            )}
            {tags && <div className="post-tags">Tags: {tags}</div>}
            <div className="post-body">
              <MDXRemote {...content} components={mdxComponents} />
            </div>
          </div>
        </div>
        <DiscussionEmbed
          shortname="jeremyrichardson"
          config={{
            url: `http://localhost:3000/blog/${slug}`,
            identifier: slug,
            title: title,
          }}
        />
      </Layout>
    </ErrorBoundary>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.split(".")[0].slice(11),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const { content, ...post } = getPostBySlug(slug);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypePrism, [imageSize, { dir: "public" }]],
      remarkPlugins: [remarkGfm],
    },
  });

  return {
    props: {
      content: mdxSource,
      ...post,
    },
  };
}
