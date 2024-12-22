import {
  Attributes,
  ParsedBlock,
} from "@wordpress/block-serialization-default-parser";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import { Parser, parseDocument } from "htmlparser2";
import { findOne } from "domutils";
import render from "dom-serializer";
import { Markup } from "interweave";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { WP_REST_API_Attachment } from "wp-types";

interface ImageProps {
  block: ParsedImageBlock;
}

interface ParsedImageBlock extends ParsedBlock {
  attrs: { id?: number } | null;
}

type ImageAttributes = { className: string };

export const Image = ({ block }: ImageProps) => {
  const blockId =
    block.attrs === null || !("id" in block?.attrs) ? null : block.attrs.id;
  const [mediaInfo, setMediaInfo] = useState<WP_REST_API_Attachment>();

  useEffect(() => {
    if (!blockId) return;

    fetch(`https://wp.jeremyrichardson.dev/wp-json/wp/v2/media/${blockId}`)
      .then((res) => res.json())
      .then((json) => {
        setMediaInfo(json);
        console.log("json", json);
      });
  }, [blockId]);

  const dom = parseDocument(block.innerHTML.trim());
  const imgElement = findOne((elem) => {
    return elem.name === "img";
  }, dom.childNodes);

  if (!imgElement?.attribs.src) return null;
  if (mediaInfo === null) return null;

  return (
    <div style={{ position: "relative" }}>
      <NextImage
        src={imgElement.attribs.src}
        alt={imgElement.attribs.alt}
        sizes="50vw"
        // width={parseInt(imgElement.attribs.width)}
        width={
          mediaInfo?.media_details.width
            ? (mediaInfo.media_details.width as number)
            : 100
        }
        // height={parseInt(imgElement.attribs.height)}
        height={
          mediaInfo?.media_details.height
            ? (mediaInfo.media_details.height as number)
            : 100
        }
        style={{ height: "auto", width: "100%" }}
      />
    </div>
  );
};
