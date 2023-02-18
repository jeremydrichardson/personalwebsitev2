import { WP_REST_API_Posts, WP_REST_API_Post } from "wp-types";

const BASE_URL =
  "https://public-api.wordpress.com/wp/v2/sites/jeremyrichardson.home.blog";

export async function getPosts(): Promise<WP_REST_API_Posts> {
  try {
    const postsRes = await fetch(BASE_URL + "/posts?_embed");
    const posts: WP_REST_API_Posts = await postsRes.json();
    return posts;
  } catch (err) {
    throw new Error("There was an error retrieving this post.");
  }
}

export async function getPost(slug: string): Promise<WP_REST_API_Post> {
  try {
    const postsRes = await fetch(`${BASE_URL}/posts/?_embed&slug=${slug}`);
    const posts: WP_REST_API_Posts = await postsRes.json();

    if (posts.length !== 1)
      throw new Error("There was an error retrieving this post.");

    const post = posts[0];

    return post;
  } catch (err) {
    throw new Error("There was an error retrieving this post.");
  }
}
