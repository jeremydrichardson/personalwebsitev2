export function Tdc() {
  return (
    <>
      <h2 className="company-name">
        Thought Development&nbsp;&nbsp;&nbsp;
        <span className="position-title">Product Development Manager</span>
      </h2>
      <p className="position-date-range">2020 - Present</p>

      <h3>Custom API for flagship product</h3>
      <ul className="project-summary">
        <li>Designed API with OpenAPI</li>
        <li>Implemented using AWS API Gateway</li>
        <li>Redesigned data structures</li>
      </ul>
      <details>
        <summary>Overview</summary>

        <p>
          In order to release a legacy flagship product from its FileMaker
          roots, we needed to build a method to access the data. We decided upon
          building our own API for the following reasons:
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
      </details>
      <details>
        <summary>AWS API Gateway and OpenAPI</summary>
        <p>
          AWS API Gateway provides an effective framework for building an API.
          We designed the system using CloudFormation in order to assure
          repeatability and that all infrastructure was managed as code.
        </p>

        <p>
          OpenAPI provides the perfect standards based definition for our API.
          It includes all the tools we needed such as describing paths, models,
          and AWS specific integrations.
        </p>

        <p>
          We opted to build our own data transformation layer using Node Express
          for flexibility instead of using something like VTL as we weren&apos;t
          totally sure what we were going to encounter in the data (multi-valued
          fields, inconsistent data, no real data types, we ran into it all...).
        </p>

        <p>
          After analyzing the existing data we simplified and cleaned the data
          structure into what makes sense for present day usage while providing
          flexibility for the future.
        </p>
      </details>
      <details>
        <summary>Node Express Server</summary>
        <p>
          The API Gateway is integrated with a Node Express server to handle the
          requests. This gave us the opportunity to transform the data as
          necessary and conform it to the new data structure. Express would then
          make the required requests to the FileMaker server and return the
          correctly transformed data to the client.
        </p>
        <p>
          FileMaker doesn&apos;t provide an ORM of any kind for its data API,
          which makes it cumbersome to build each request with expiring access
          tokens and the like. We found an exceptional library by{" "}
          <a href="https://github.com/Luidog">Luidog</a> called{" "}
          <a href="https://github.com/Luidog/fms-api-client">fms-api-client</a>{" "}
          to help with this.
        </p>
        <p>
          Using OpenAPI custom extensions we map the new field name with the
          old, and the FileMaker data type to the API data type. This method is
          bi-directional giving a template for both how to read and write data
          to the database.
        </p>
        <p>
          The Express app also has access to the OpenAPI definition file that we
          use to validate the data traveling back and forth. This is another
          benefit of using a standard like OpenAPI.
        </p>
        <p>
          I built the CI pipeline using AWS CodePipeline, CodeBuild, and
          CodeDeploy. It is triggered when the staging or master branch is
          updated, pulling the code from BitBucket. The buildspec also manually
          pulls files from another repo container the OpenAPI definition to make
          sure it has the latest source. Tests are run and the build step run
          before an automated release is triggered based on semantic versioning.
        </p>
      </details>

      <h3>Built a PWA that augments legacy product features</h3>
      <ul className="project-summary">
        <li>Utilized react-admin framework</li>
        <li>Implemented SAML federated login</li>
        <li>React-query for caching data</li>
        <li>Material UI components and custom theme</li>
        <li>AWS Amplify CI/CD pipeline</li>
      </ul>
      <details>
        <summary>Overview</summary>
        <p>
          {" "}
          Our existing FileMaker based solution requires the FileMaker Pro
          client to run. We needed to move to a more modern app based approach.
          We decided to begin with a React based frontend as a progressive web
          app (PWA).
        </p>

        <p>
          We use react-admin that provides a framework for fetching data and
          presenting it to the user. It uses react-query to cache the data in a
          local store to enhance the user experience and Material UI as the UI
          component library. For authentication we use AWS Amplify with a
          Cognito backend which is federated using SAML with whatever IdP the
          client uses (Okta, Ping, Microsoft ADFS, etc...).
        </p>

        <p>
          Deployment is done using AWS Amplify which includes CI/CD. I built the
          pipeline to run tests, build the source before an automated release is
          triggered based on semantic versioning.
        </p>
      </details>
      <h3>
        Designed and Implemented Cloud Infrastructure for flagship product
      </h3>
      <ul className="project-summary">
        <li>CloudFormation infrastructure</li>
        <li>AppStream client configuration</li>
        <li>Legacy product lift to cloud</li>
        <li>Flexible deployment with parameters</li>

        <li>Secure network design</li>
        <li>SAML federation with multiple IdPs</li>
        <li>Automated Windows config with PowerShell</li>
      </ul>
      <details>
        <summary>Overview</summary>
        <p>
          In order to be able to build any web based products on top of the
          legacy flagship product, we would need to move it to the cloud. This
          led to the creation of a turnkey version of the product that provides
          not only the software, but the infrastructure that it runs on.
        </p>

        <p>
          The system was initial built and designed by myself and one other
          developer. That developer eventually left the company and since I have
          refactored and rewritten the entire infrastructure myself.
        </p>

        <p>
          CloudFormation allows us to automate the process of implementation, a
          key element for reproducibility and avoidance of human error. All
          servers and infrastructure are defined here. I also took advantage of
          the `UserData` property to insert PowerShell scripts that customize
          the Windows environment based on CloudFormation parameters.{" "}
        </p>

        <p>
          We decided upon a multi-stack design that gave us flexibility and
          solved some issues with CloudFormation&apos;s rigidity in having to
          rebuild certain resources.
        </p>

        <p>
          CloudFormation parameters were used to give the ability to customize a
          deployment based on the needs of the customer. Utilizing
          CloudFormation conditions we were able to keep a single template base
          that could be applied to all customers, even with varying technical
          needs.
        </p>

        <p>
          The system was designed with security in mind so that there is no
          public access to the FileMaker server. AppStream provides the client
          window to the user, which is an encrypted video stream.
        </p>
      </details>
      <h3>Mentor</h3>
      <ul className="project-summary">
        <li>Train FileMaker developers from scratch</li>
        <li>Mentor junior developer</li>
        <li>Frequent pair programming</li>
        <li>Development of training materials</li>
      </ul>
      <details>
        <summary>Overview</summary>
        <p>
          Two of our team had been exclusively FileMaker developers. We needed a
          way to expand their skills to match the direction of new development.
          We had also recently hired a junior developer who was also in need of
          training. I was tasked with training them in Javascript, React, and
          AWS.
        </p>

        <p>
          I led daily developer sessions where I taught them the basics of
          Javascript while explaining our code base. I developed materials that
          would assist them in their learning and pair programmed regularly to
          give them exposure to the real world problems we were solving.
        </p>
      </details>
    </>
  );
}
