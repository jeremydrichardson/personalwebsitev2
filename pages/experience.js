import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Tdc } from "../components/experience/Tdc";
import { Su } from "../components/experience/Su";
import { FaBriefcase } from "react-icons/fa";
import { SiteNav } from "../components/SiteNav";
import { Mint } from "../components/experience/Mint";

export default function Experience() {
  return (
    <>
      <SiteNav />
      <main className="main">
        <VerticalTimeline layout="1-column-left" lineColor="#eee">
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#eee" }}
            contentArrowStyle={{ borderRight: "7px solid  #999" }}
            iconStyle={{ background: "#444", color: "#fff" }}
            icon={<FaBriefcase />}
          >
            <Mint />
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#eee" }}
            contentArrowStyle={{ borderRight: "7px solid  #999" }}
            iconStyle={{ background: "#444", color: "#fff" }}
            icon={<FaBriefcase />}
          >
            <Tdc />
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#eee" }}
            contentArrowStyle={{ borderRight: "7px solid  #999" }}
            iconStyle={{ background: "#444", color: "#fff" }}
            icon={<FaBriefcase />}
          >
            <Su />
          </VerticalTimelineElement>
        </VerticalTimeline>
      </main>
    </>
  );
}
