import {
  WP_REST_API_Posts,
  WP_REST_API_Post,
  WP_REST_API_Tags,
  WP_REST_API_Attachment,
} from "wp-types";
import { WP_REST_API_Post_Expanded } from "../types/WordPress";

const BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const REST_USERNAME = process.env.REST_USERNAME || "";
const REST_PASSWORD = process.env.REST_PASSWORD || "";
const basicAuth = Buffer.from(REST_USERNAME + ":" + REST_PASSWORD).toString(
  "base64"
);

export async function getPosts(
  status = "publish",
  per_page: number
): Promise<WP_REST_API_Post_Expanded[]> {
  // try {
  const postsRes = await fetch(
    `${BASE_URL}/wp-json/wp/v2/posts?_embed&status=${status}&per_page=${per_page}&_fields=title,slug,date,excerpt`,
    {
      headers: {
        Authorization: `Basic ${basicAuth}`,
      },
    }
  );
  const posts: WP_REST_API_Post_Expanded[] = await postsRes.json();
  return posts;
  // } catch (err) {
  //   throw new Error("There was an error retrieving this post.", err);
  // }
}

export async function getPost(
  slug: string
): Promise<WP_REST_API_Post_Expanded> {
  // try {
  const postsRes = await fetch(
    `${BASE_URL}/wp-json/wp/v2/posts/?_embed&slug=${slug}`,
    {
      headers: {
        Authorization: `Basic ${basicAuth}`,
      },
    }
  );
  const posts: WP_REST_API_Post_Expanded[] = await postsRes.json();
  console.log("posts", posts[0].parsed_content);
  if (posts.length !== 1)
    throw new Error("There was an error retrieving this post.");

  const post = posts[0];

  return post;
  // } catch (err) {
  //   throw new Error("There was an error retrieving this post.");
  // }
}

export async function getTagsByPost(postId: number): Promise<WP_REST_API_Tags> {
  // try {
  const tagsRes = await fetch(
    `${BASE_URL}/wp-json/wp/v2/tags?_embed&post=${postId}`
  );
  const tags: WP_REST_API_Tags = await tagsRes.json();
  return tags;
  // } catch (err) {
  //   throw new Error("There was an error retrieving the list of tags.");
  // }
}

export async function getAttachment(
  id: number
): Promise<WP_REST_API_Attachment> {
  // try {
  const mediaRes = await fetch(`${BASE_URL}/wp-json/wp/v2/media/${id}`, {
    headers: {
      Authorization: `Basic ${basicAuth}`,
    },
  });
  const media: WP_REST_API_Attachment = await mediaRes.json();

  return media;
  // } catch (err) {
  //   throw new Error("There was an error retrieving this post.");
  // }
}
