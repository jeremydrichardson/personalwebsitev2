import { ParsedBlock } from "@wordpress/block-serialization-default-parser/build-types";
import { Markup } from "interweave";
import { WpRenderBlock } from "./WpRenderBlock";

interface QuoteProps {
  block: ParsedBlock;
}

export const Quote = ({ block }: QuoteProps) => {
  return (
    <blockquote className="wp-block-quote">
      {block.innerBlocks.map((innerBlock, index) => (
        <WpRenderBlock key={index} block={innerBlock} />
      ))}
    </blockquote>
  );
};
