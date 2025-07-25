import { ParsedBlock } from "@wordpress/block-serialization-default-parser";
import { Markup, MarkupProps } from "interweave";
import { Code } from "./Code";
import { Image } from "./Image";
import { Quote } from "./Quote";

interface WpRenderBlockProps {
  block: ParsedBlock;
  markupProps?: MarkupProps;
}

interface CoreEmbedAttributes {
  url?: string;
}

export const WpRenderBlock = ({ block, markupProps }: WpRenderBlockProps) => {
  if (block.blockName === "core/list") {
    const listItems = block.innerBlocks.map((innerBlock) => {
      return innerBlock.innerHTML;
    });

    return <Markup noWrap={true} content={`<ul>${listItems.join("")}</ul>`} />;
  }
  if (block.blockName === "core/code") {
    // console.log("block in render", block);
    return <Code block={block} />;
  }

  if (block.blockName === "core/embed") {
    const coreAttributes = block.attrs as CoreEmbedAttributes;
    if (coreAttributes.url && /youtube.com/i.test(coreAttributes.url)) {
      return (
        <iframe
          width="560"
          height="315"
          src={coreAttributes.url}
          title="YouTube video player"
          // frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          // allowfullscreen
        ></iframe>
      );
    }
  }

  if (block.blockName === "core/image") {
    return <Image block={block} />;
  }

  if (block.blockName === "core/quote") {
    return <Quote block={block} />;
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
