import Link from "next/link";
import { WelkBadge, WelkDivider } from "@welkui/react";

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <h2 id="about-heading" className="section-heading">
        About
      </h2>
      <p className="section-lede">
        A little origin story before the plot twists.
      </p>
      <div className="about-grid comic-panel">
        <div style={{ marginBottom: "0.85rem" }}>
          <WelkBadge variant="success">Mint Mobile</WelkBadge>
        </div>
        <p>
          My current mission with{" "}
          <a href="https://www.mintmobile.com">Mint Mobile</a> is to lead a team
          as we build a modern UI component library to support the ecommerce
          division using <a href="https://reactjs.org/">React</a>.{" "}
          <em>
            <Link href="/experience">Learn more...</Link>
          </em>
        </p>
        <WelkDivider variant="dashed" />
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
    </section>
  );
}
