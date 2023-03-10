import { ParsedBlock } from "@wordpress/block-serialization-default-parser";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import { Parser, parseDocument } from "htmlparser2";
import { findOne, removeElement, getElementsByTagName } from "domutils";
import render from "dom-serializer";

interface CodeProps {
  block: ParsedBlock;
}

type CodeAttributes = { className: string };

// Based on includeLangs.js in prism-react-renderer
const includeLangs: Language[] = [
  "markup",
  "bash",
  "clike",
  "c",
  "cpp",
  "css",
  "javascript",
  "jsx",
  "coffeescript",
  "actionscript",
  "css-extr",
  "diff",
  "git",
  "go",
  "graphql",
  "handlebars",
  "json",
  "less",
  "makefile",
  "markdown",
  "objectivec",
  "ocaml",
  "python",
  "reason",
  "sass",
  "scss",
  "sql",
  "stylus",
  "tsx",
  "typescript",
  "wasm",
  "yaml",
];

const isValidLanguage = (lang: string) => {
  for (const includeLang of includeLangs) {
    if (includeLang === lang) return true;
  }
  return false;
};

export const Code = ({ block }: CodeProps) => {
  const dom = parseDocument(block.innerHTML.trim());
  const codeElement = getElementsByTagName("code", dom);
  const rawCode = render(codeElement[0].children, { encodeEntities: false });

  const attributes = block.attrs as CodeAttributes;
  const languageClassname = attributes.className
    ? attributes.className.match(/lang-[^.]*?(\w+)/)
    : "";

  if (languageClassname === null || !isValidLanguage(languageClassname[0])) {
    return <pre className="code">{rawCode}</pre>;
  }

  return (
    <Highlight
      {...defaultProps}
      code={rawCode}
      language={languageClassname[0] as Language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={i} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
