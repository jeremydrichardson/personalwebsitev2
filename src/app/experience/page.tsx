"use client";

import { TimelineMarker } from "../../design-system";
import { Mint } from "../../components/experience/Mint";
import { Su } from "../../components/experience/Su";
import { SiteNav } from "../../components/SiteNav";
import { Tdc } from "../../components/experience/Tdc";

const roles = [
  { id: "mint", content: <Mint /> },
  { id: "tdc", content: <Tdc /> },
  { id: "su", content: <Su /> },
] as const;

export default function Experience() {
  return (
    <>
      <SiteNav />
      <main className="main">
        <h1>Experience</h1>
        <ol className="experience-timeline">
          {roles.map((role) => (
            <li key={role.id} className="experience-item">
              <TimelineMarker />
              <div className="experience-panel">{role.content}</div>
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}
