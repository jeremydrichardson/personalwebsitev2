import { ParsedBlock } from "@wordpress/block-serialization-default-parser";
import { Markup, MarkupProps } from "interweave";
import Highlight, { defaultProps, Language } from "prism-react-renderer";

interface WpRenderBlockProps {
  block: ParsedBlock;
  markupProps: MarkupProps;
}

export const WpRenderBlock = ({ block, markupProps }: WpRenderBlockProps) => {
  if (block.blockName === "core/list") {
    const listItems = block.innerBlocks.map((innerBlock) => {
      return innerBlock.innerHTML;
    });

    return <Markup noWrap={true} content={`<ul>${listItems.join("")}</ul>`} />;
  }

  if (block.blockName === "core/code") {
    return <Code block={block} />;
  }

  return (
    <Markup
      noWrap={true}
      disableLineBreaks
      {...markupProps}
      content={block.innerHTML}
    />
  );
};

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

const Code = (props: CodeProps) => {
  const attributes = props.block.attrs as CodeAttributes;
  const languageClassname = attributes.className.match(/(?<=lang-[^.]*?)\w+/);
  console.log("languageClassname", languageClassname);
  if (languageClassname === null) return <h1>no language set</h1>;

  if (!isValidLanguage(languageClassname[0]))
    return <h1>This is not a supported language</h1>;

  return (
    <Highlight
      {...defaultProps}
      code={props.block.innerHTML}
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
  // return <Interweave noWrap={true} content={props.html} />;
};
