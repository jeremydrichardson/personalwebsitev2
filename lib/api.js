import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import gitlog from "gitlog";
import { parseJSON } from "date-fns";

export function getPostBySlug(slug) {
  const file = fs
    .readdirSync("posts")
    .filter((filename) => filename.includes(slug))[0];

  const fileLocation = path.join("posts", file);

  const markdownWithMeta = fs.readFileSync(fileLocation, "utf-8");
  const gitCommit = gitlog({ repo: ".", number: 1, file: fileLocation });

  const { data, content } = matter(markdownWithMeta);
  const { createDate, ...frontmatter } = data;

  const modifiedDateISO = parseJSON(gitCommit[0].authorDate).toISOString();

  return {
    frontmatter,
    slug,
    content,
    createDate: createDate || null,
    modifiedDate: modifiedDateISO,
  };
}

export async function markdownToHtml(markdown) {
  const htmlContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(markdown);
  return htmlContent.toString();
}
