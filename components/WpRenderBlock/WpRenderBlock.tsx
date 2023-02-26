import { ParsedBlock } from "@wordpress/block-serialization-default-parser";
import { Markup, MarkupProps } from "interweave";
import { Code } from "./Code";

interface WpRenderBlockProps {
  block: ParsedBlock;
  markupProps?: MarkupProps;
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
