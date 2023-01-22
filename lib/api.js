import fs from "fs";
import path from "path";
import matter from "gray-matter";
import gitlog from "gitlog";
import { parseJSON } from "date-fns";

export function getPostBySlug(slug) {
  const file = fs
    .readdirSync("posts")
    .filter((filename) => filename.includes(slug))[0];

  const fileLocation = path.join("posts", file);

  const fileContent = fs.readFileSync(fileLocation, "utf-8");
  const gitCommit = gitlog.default({
    repo: ".",
    number: 1,
    file: fileLocation,
  });

  const { data, content } = matter(fileContent);
  const { createDate, ...frontmatter } = data;

  const modifiedDateISO = gitCommit.length
    ? parseJSON(gitCommit[0].authorDate).toISOString()
    : null;

  return {
    frontmatter,
    slug,
    content,
    createDate: createDate || null,
    modifiedDate: modifiedDateISO,
  };
}
