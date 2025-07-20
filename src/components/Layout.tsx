interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <main style={{ maxWidth: "660px", margin: "0 auto" }}>{children}</main>
    </div>
  );
}
