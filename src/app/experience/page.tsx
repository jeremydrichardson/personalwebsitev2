"use client";

import { WelkAccordion, WelkBadge } from "@welkui/react";
import { Mint } from "../../components/experience/Mint";
import { Tdc } from "../../components/experience/Tdc";
import { Su } from "../../components/experience/Su";

export default function Experience() {
  return (
    <main>
      <section className="section" aria-labelledby="experience-heading">
        <h1 id="experience-heading" className="section-heading">
          Experience
        </h1>
        <p className="section-lede">
          Open a chapter to dig into the missions, tools, and plot twists.
        </p>

        <div className="experience-stack">
          <WelkAccordion
            title={
              <>
                Mint Mobile / Ultra Mobile{" "}
                <WelkBadge size="sm" variant="success">
                  2022 – Present
                </WelkBadge>
              </>
            }
          >
            <Mint />
          </WelkAccordion>

          <WelkAccordion
            title={
              <>
                Thought Development{" "}
                <WelkBadge size="sm" variant="info">
                  2020 – 2022
                </WelkBadge>
              </>
            }
          >
            <Tdc />
          </WelkAccordion>

          <WelkAccordion
            title={
              <>
                Shiloh University{" "}
                <WelkBadge size="sm" variant="warning">
                  2019 – 2020
                </WelkBadge>
              </>
            }
          >
            <Su />
          </WelkAccordion>
        </div>
      </section>
    </main>
  );
}
