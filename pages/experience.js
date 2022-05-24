import Link from "next/link";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { DiReact } from "react-icons/di";
import { Tdc } from "../components/experience/Tdc";
import { Su } from "../components/experience/Su";
import { FaBriefcase } from "react-icons/fa";

export default function Experience() {
  return (
    <main className="main">
      <Link href="/">
        <a className="btn btn-back">Go Back</a>
      </Link>
      <VerticalTimeline layout="1-column-left" lineColor="#eee">
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#eee" }}
          contentArrowStyle={{ borderRight: "7px solid  #999" }}
          date="2020 - present"
          iconStyle={{ background: "#444", color: "#fff" }}
          icon={<FaBriefcase />}
        >
          <Tdc />
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#eee" }}
          contentArrowStyle={{ borderRight: "7px solid  #999" }}
          date="2020 - present"
          iconStyle={{ background: "#444", color: "#fff" }}
          icon={<FaBriefcase />}
        >
          <Su />
        </VerticalTimelineElement>
      </VerticalTimeline>
    </main>
  );
}
