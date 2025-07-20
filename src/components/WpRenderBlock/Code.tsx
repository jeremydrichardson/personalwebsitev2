import { ParsedBlock } from "@wordpress/block-serialization-default-parser";
import { Code as BrightCode } from "bright";
import { unescape } from "lodash-es";

interface CodeProps {
  block: ParsedBlock;
}

type CodeAttributes = { programmingLanguage: string; code: string };

BrightCode.theme = "dark-plus";

export const Code = async ({ block }: CodeProps) => {
  const { code, programmingLanguage } = block.attrs as CodeAttributes;
  const codeHtml = unescape(code);

  return <BrightCode lang={programmingLanguage}>{codeHtml}</BrightCode>;
};
