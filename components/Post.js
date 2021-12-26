export default function Post({ post }) {
  return (
    <div>
      <h3>{post.frontmatter.title}</h3>
      <p>{post.frontmatter.description}</p>
    </div>
  );
}
