export default function Layout({ children }) {
  return (
    <div>
      <main style={{ maxWidth: "660px", margin: "0 auto" }}>{children}</main>
    </div>
  );
}
