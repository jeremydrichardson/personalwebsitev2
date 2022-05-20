import Link from "next/link";

export default function Experience() {
  return (
    <main className="main">
      <Link href="/">Back</Link>
      <h2>Thought Development</h2>
      <p>Product Development Manager</p>
      <p>2020 - Present</p>

      <h3>Custom API for flagship product</h3>
      <ul className="project-summary">
        <li>Designed API with OpenAPI</li>
        <li>Implemented using AWS API Gateway</li>
        <li>Redesigned data structures</li>
      </ul>
      <p>
        In order to release a legacy flagship product from its FileMaker roots,
        we needed to build a method to access the data. We decided upon building
        our own API for the following reasons:
      </p>
      <ol>
        <li>
          <em>Streamline</em> - Although FileMaker provides API access, its
          implementation is clunky for our use case. We wanted clients and
          integrations to have clear documentation and easy access.
        </li>
        <li>
          <em>Security</em> - The FileMaker server is hosted in a private AWS
          VPC with no direct access for security reasons. This requires an API
          Gateway.
        </li>
        <li>
          <em>Data structure</em> - ON-AIR Pro is more than 20 years old.
          FileMaker does not lend itself to refactors so legacy residuals such
          as table structures and field naming that no longer made sense. This
          gave us the opportunity to redefine our models and data structure.
        </li>
      </ol>
    </main>
  );
}
