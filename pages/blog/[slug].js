import { useEffect } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { remark } from "remark";
import html from "remark-html";
import Prism from "prismjs";

export default function PostPage({
  frontmatter: { title, date },
  slug,
  content,
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, []);

  return (
    <>
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
    </>
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

  const htmlContent = await remark().use(html).process(content);

  return {
    props: {
      frontmatter,
      slug,
      content: htmlContent.toString(),
    },
  };
}
