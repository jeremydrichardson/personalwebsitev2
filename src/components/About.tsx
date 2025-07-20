import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <>
      <h2>About</h2>
      <div className="prose">
        <p>
          My current mission with{" "}
          <a href="https://www.mintmobile.com">Mint Mobile</a> is to lead a team
          as we build a modern a UI component library to support the ecommerce
          division using <a href="https://reactjs.org/">React</a>.{" "}
          <em>
            <Link href="/experience">Learn more...</Link>
          </em>
        </p>
        <p>
          My past had led me through a number of creative fields including film
          and television production, audio production as both a musician and
          engineer, as well as live theatrical sound and lighting.
        </p>
        <p>
          Each of those ventures always led me back to the web where the
          innovation in technology attracted me time and time again. I love
          building tools that people love to use, especially in the creative and
          entertainment realms.
        </p>
      </div>
    </>
  );
};

export { About };
