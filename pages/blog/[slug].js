import fs from "fs";
import path from "path";
import Link from "next/link";
import Layout from "../../components/Layout";
import Head from "next/head";
import { getPostBySlug, markdownToHtml } from "../../lib/api";

export default function PostPage({
  frontmatter: { title, tags },
  slug,
  content,
  modifiedDate,
  createDate,
}) {
  return (
    <Layout>
      <Head>
        <title>Jeremy&apos;s blog - {title}</title>
      </Head>
      <div className="container prose prose-sm md:prose">
        <Link href="/">
          <a className="btn btn-back">Go Back</a>
        </Link>
        <div className="card card-page">
          <h1 className="post-title">{title}</h1>
          <div className="post-create-date">
            Posted:&nbsp;
            <time dateTime={createDate && new Date(createDate).toISOString()}>
              {createDate}
            </time>
          </div>
          <div className="post-modified-date">
            Last modified:&nbsp;
            <time
              dateTime={modifiedDate && new Date(modifiedDate).toISOString()}
            >
              {modifiedDate}
            </time>
          </div>
          {tags && <div className="post-tags">Tags: {tags}</div>}
          <div className="post-body">
            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            ></div>
          </div>
        </div>
      </div>
    </Layout>
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

  return {
    props: {
      content: await markdownToHtml(content),
      ...post,
    },
  };
}
