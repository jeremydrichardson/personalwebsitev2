import {
  WP_REST_API_Posts,
  WP_REST_API_Post,
  WP_REST_API_Tags,
} from "wp-types";

const BASE_URL = "https://wp.jeremyrichardson.dev/wp-json/wp/v2";
const REST_USERNAME = process.env.REST_USERNAME || "";
const REST_PASSWORD = process.env.REST_PASSWORD || "";
const basicAuth = Buffer.from(REST_USERNAME + ":" + REST_PASSWORD).toString(
  "base64"
);

export async function getPosts(
  status = "publish",
  per_page: number
): Promise<WP_REST_API_Posts> {
  try {
    const postsRes = await fetch(
      `${BASE_URL}/posts?_embed&status=${status}&per_page=${per_page}&_fields=title,slug,date,excerpt`,
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
        },
      }
    );
    const posts: WP_REST_API_Posts = await postsRes.json();
    return posts;
  } catch (err) {
    throw new Error("There was an error retrieving this post.");
  }
}

export async function getPost(slug: string): Promise<WP_REST_API_Post> {
  try {
    const postsRes = await fetch(
      `${BASE_URL}/posts/?_embed&context=edit&slug=${slug}`,
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
        },
      }
    );
    const posts: WP_REST_API_Posts = await postsRes.json();

    if (posts.length !== 1)
      throw new Error("There was an error retrieving this post.");

    const post = posts[0];

    return post;
  } catch (err) {
    throw new Error("There was an error retrieving this post.");
  }
}

export async function getTagsByPost(postId: number): Promise<WP_REST_API_Tags> {
  try {
    const tagsRes = await fetch(`${BASE_URL}/tags?_embed&post=${postId}`);
    const tags: WP_REST_API_Tags = await tagsRes.json();
    return tags;
  } catch (err) {
    throw new Error("There was an error retrieving the list of tags.");
  }
}
