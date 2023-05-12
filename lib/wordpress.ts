import {
  WP_REST_API_Posts,
  WP_REST_API_Post,
  WP_REST_API_Tags,
} from "wp-types";

const BASE_URL =
  "https://public-api.wordpress.com/wp/v2/sites/jeremyrichardson.home.blog";

export async function getPosts(
  status = "publish",
  per_page: number
): Promise<WP_REST_API_Posts> {
  try {
    const postsRes = await fetch(
      `${BASE_URL}/posts?_embed&status=${status}&per_page=${per_page}&_fields=title,slug,date,excerpt`,
      {
        headers: {
          Authorization: `BEARER ${process.env.WP_ACCESS_TOKEN}`,
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
          Authorization: `BEARER ${process.env.WP_ACCESS_TOKEN}`,
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
