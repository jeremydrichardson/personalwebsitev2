import fs from "fs";
import path from "path";
import matter from "gray-matter";
import gitlog from "gitlog";
import { parseJSON } from "date-fns";

export function getPostBySlug(slug: string) {
  const file = fs
    .readdirSync("posts")
    .find((filename) => filename.includes(slug));

  if (!file) throw new Error("The file does not exist.");

  const fileLocation = path.join("posts", file);

  const fileContent = fs.readFileSync(fileLocation, "utf-8");
  const gitCommit = gitlog({
    repo: ".",
    number: 1,
    file: fileLocation,
  });

  const { data, content } = matter(fileContent);

  const createDateISO = data.createDate || new Date().toISOString;

  const modifiedDateISO = gitCommit.length
    ? parseJSON(gitCommit[0].authorDate).toISOString()
    : createDateISO;

  return {
    frontmatter: data,
    slug,
    content,
    createDate: createDateISO,
    modifiedDate: modifiedDateISO,
  };
}
