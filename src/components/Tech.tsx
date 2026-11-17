"use client";

import TechIcon from "./TechIcon";

const techItems = [
  {
    id: "react",
    name: "react",
    title: "React",
    tooltip:
      "I love working in React! Its simplicity belies its power and flexibility. It comes with the danger of decision fatigue but with experience I have found the packages and methodologies that serve my purposes.",
  },
  {
    id: "js",
    name: "js",
    title: "Javascript",
    tooltip:
      "Been working with Javascript since the late 90s. Used many of the libraries that dealt with Javascript and browser shortcomings (Mootools, Prototype, jQuery, etc...). Now I attempt vanilla Javascript first before reaching for a custom library from npm.",
  },
  {
    id: "html5",
    name: "html5",
    title: "HTML5",
    tooltip:
      "HTML and I go way back to building band sites in the mid-90s. These days JSX keeps me grounded in HTML fundamentals, one of the reasons I like it so much. I still keep abreast of HTML trends in my quest to find the best semantic answer to a problem.",
  },
  {
    id: "css3",
    name: "css3-alt",
    title: "CSS3",
    tooltip:
      "Been using CSS for a long time and come through a number of iterations (remember floats and clearfix?). I'm mostly using CSS within a framework of some kind these days but understanding the roots and CSS foundations allow me to be effective with them.",
  },
  {
    id: "jest",
    name: "vial",
    family: "classic" as const,
    title: "Jest",
    tooltip:
      "Testing with Jest and React Testing Library is one of those guilty pleasures I have. Seeing those green PASS indicators just gives me warm fuzzies.",
  },
  {
    id: "node",
    name: "node-js",
    title: "NodeJS",
    tooltip:
      "Node has been integral as we built our API. Node was used to ingest and transform data on the fly to the new API architecture using Express. Of course it also underpins all our tooling for building, validating, and testing our code.",
  },
  {
    id: "aws",
    name: "aws",
    title: "AWS",
    tooltip:
      "AWS is amazing. I have worked with a number of AWS services that have provided amazing flexibility in our products. I have dabled as a devops engineer using infrastructure as code to build our products.",
  },
  {
    id: "swagger",
    name: "file-code",
    family: "classic" as const,
    title: "OpenAPI/Swagger",
    tooltip:
      "I'm always looking to find the standards that can guide the architecture of the systems I build. OpenAPI provided a flexible standard that we could use to describe our API both to the interacting systems and to our human users.",
  },
  {
    id: "git",
    name: "git-alt",
    title: "Git",
    tooltip:
      "Git provides me the confidence to build fast and not worry about losing anything. I have implemented Git tooling to validate commit messages as well as use those messages to automatically build changelogs using semantic versioning.",
  },
];

const Tech = () => {
  return (
    <section className="section" aria-labelledby="tech-heading">
      <h2 id="tech-heading">Tech</h2>
      <div className="tech-logos">
        {techItems.map((item) => (
          <TechIcon key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export { Tech };
