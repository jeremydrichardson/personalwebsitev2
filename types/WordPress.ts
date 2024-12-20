import { ParsedBlock } from "@wordpress/block-serialization-default-parser";
import { WP_REST_API_Post } from "wp-types";

export interface WP_REST_API_Post_Expanded extends WP_REST_API_Post {
  parsed_content: ParsedBlock[];
}
