import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Layout from "../../components/Layout";
import Head from "next/head";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrism from "rehype-prism-plus";

export default function PostPage({
  frontmatter: { title, date },
  slug,
  content,
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
          <div className="post-date">Posted on {date}</div>
          <div className="post-body">
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
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
  const file = fs
    .readdirSync("posts")
    .filter((filename) => filename.includes(slug))[0];

  const markdownWithMeta = fs.readFileSync(path.join("posts", file), "utf-8");

  const { data: frontmatter, content } = matter(markdownWithMeta);

  const htmlContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(content);

  return {
    props: {
      frontmatter,
      slug,
      content: htmlContent.toString(),
    },
  };
}
