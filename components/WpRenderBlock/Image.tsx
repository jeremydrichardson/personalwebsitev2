import { ParsedBlock } from "@wordpress/block-serialization-default-parser";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import { Parser, parseDocument } from "htmlparser2";
import { findOne } from "domutils";
import render from "dom-serializer";
import { Markup } from "interweave";
import NextImage from "next/image";

interface ImageProps {
  block: ParsedBlock;
}

type ImageAttributes = { className: string };

export const Image = ({ block }: ImageProps) => {
  console.log("img block", block);
  const dom = parseDocument(block.innerHTML.trim());
  const imgElement = findOne((elem) => {
    return elem.name === "img";
  }, dom.childNodes);
  console.log(imgElement);

  if (!imgElement?.attribs.src) return null;

  return (
    <div style={{ position: "relative" }}>
      <NextImage
        src={imgElement?.attribs.src}
        alt={imgElement.attribs.alt}
        sizes="50vw"
        width={parseInt(imgElement.attribs.width)}
        height={parseInt(imgElement.attribs.height)}
        style={{ height: "auto", width: "100%" }}
      />
    </div>
  );
};
