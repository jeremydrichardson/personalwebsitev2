import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const sourceDir = "storybook-static";
const targetDir = join("public", "sb");
const baseHref = "/sb/";

rmSync(targetDir, { recursive: true, force: true });
mkdirSync(targetDir, { recursive: true });
cpSync(sourceDir, targetDir, { recursive: true });

// Manager HTML uses relative asset URLs. A <base> tag keeps them working when
// Next serves the shell at /sb (no trailing slash) after rewriting.
for (const fileName of ["index.html", "iframe.html"]) {
  const filePath = join(targetDir, fileName);
  const html = readFileSync(filePath, "utf8");
  if (html.includes(`<base href="${baseHref}"`)) {
    continue;
  }

  const withBase = html.replace(/<head([^>]*)>/i, `<head$1>\n    <base href="${baseHref}" />`);
  writeFileSync(filePath, withBase);
}

console.log(`Embedded Storybook into ${targetDir} with base ${baseHref}`);
