import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import fs from "fs";
import Post from "../components/Post";
import { getPostBySlug } from "../lib/api";
import { differenceInDays, parseISO } from "date-fns";
import profilePic from "../public/img/jeremy-profile@2x.png";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import imageSize from "rehype-img-size";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { DiReact } from "react-icons/di";
import {
  IoLogoJavascript,
  IoLogoHtml5,
  IoLogoCss3,
  IoLogoNodejs,
} from "react-icons/io5";
import { FaAws, FaGitAlt } from "react-icons/fa";
import { SiSwagger, SiJest } from "react-icons/si";
import TechIcon from "../components/TechIcon";
import { SiteNav } from "../components/SiteNav";

export default function Home({ posts }) {
  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <Head>
          <title>Jeremy Richardson&apos;s personal website</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <SiteNav />
        <div className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="title">
                Hi, I&apos;m <span className="name">Jeremy Richardson</span>
              </h1>
              <p className="prose">
                I&apos;m a full stack developer building software solutions that
                increase user productivity
              </p>
            </div>
            <div className="hero-image hero-section">
              <div className="profile-picture-border">
                <Image
                  src={profilePic}
                  width="200"
                  height="200"
                  className="profile-picture"
                  alt="Jeremy Richardson"
                />
              </div>
            </div>
          </div>
        </div>
        <main className="main">
          <h2>About</h2>
          <div className="prose">
            <p>
              My current mission with{" "}
              <a href="https://www.thought-dev.com">Thought Development</a> is
              to lead a team as we transform ON-Air Pro&mdash;a legacy FileMaker
              application for the broadcast industry&mdash;into a modern web
              application using <a href="https://nodejs.org/en/">Node</a>,{" "}
              <a href="https://reactjs.org/">React</a>, and{" "}
              <a href="https://aws.amazon.com/">AWS</a>.{" "}
              <em>
                <Link href="/experience">Learn more...</Link>
              </em>
            </p>
            <p>
              My past had led me through a number of creative fields including
              film and television production, audio production as both a
              musician and engineer, as well as live theatrical sound and
              lighting.
            </p>
            <p>
              Each of those ventures always led me back to the web where the
              innovation in technology attracted me time and time again. I love
              building tools that people love to use, especially in the creative
              and entertainment realms.
            </p>
          </div>
          &nbsp;
          <h2>Tech</h2>
          <div className="tech-logos">
            <TechIcon
              Icon={DiReact}
              title="React"
              tooltip="I love working in React! Its simplicity belies its power and flexibility. 
                It comes with the danger of decision fatigue but with experience I have found the 
                packages and methodologies that serve my purposes."
            />
            <TechIcon
              Icon={IoLogoJavascript}
              title="Javascript"
              tooltip="Been working with Javascript since the late 90s. Used many of the libraries 
                that dealt with Javascript and browser shortcomings (Mootools, Prototype, jQuery, etc...). 
                Now I attempt vanilla Javascript first before reaching for a custom library from npm."
            />
            <TechIcon
              Icon={IoLogoHtml5}
              title="HTML5"
              tooltip="HTML and I go way back to building band sites in the mid-90s. These days JSX keeps 
                me grounded in HTML fundamentals, one of the reasons I like it so much. I still  
                keep abreast of HTML trends in my quest to find the best semantic answer to a problem."
            />
            <TechIcon
              Icon={IoLogoCss3}
              title="CSS3"
              tooltip="Been using CSS for a long time and come through a number
              of iterations (remember floats and clearfix?). I'm mostly using CSS within a framework of somekind these
              days but understanding the roots and CSS foundations allow me to be effective with them."
            />
            <TechIcon
              Icon={SiJest}
              title="Jest"
              tooltip="Testing with Jest and React Testing Library is one of those guilty pleasures I have. Seeing those green PASS indicators just gives me warm fuzzies."
            />
            <TechIcon
              Icon={IoLogoNodejs}
              title="NodeJS"
              tooltip="Node has been integral as we built our API. 
              Node was used to ingest and transform data on the fly to the new API architecture using Express. Of course
              it also underpins all our tooling for building, validating, and testing our code."
            />
            <TechIcon
              Icon={FaAws}
              title="AWS"
              tooltip="AWS is amazing. I have worked with a number of AWS
              services that have provided amazing flexibility in our products. I have dabled as a devops
              engineer using infrastructure as code to build our products. "
            />
            <TechIcon
              Icon={SiSwagger}
              title="OpenAPI/Swagger"
              tooltip="I'm always looking to find the standards that
              can guide the architecture of the systems I build. OpenAPI provided a flexible standard that we could use to
              describe our API both to the interacting systems and to our human users."
            />
            <TechIcon
              Icon={FaGitAlt}
              title="Git"
              tooltip="Git provides me the confidence to build fast and not worry about
              losing anything. I have implemented Git tooling to validate commit messages as well as use those messages to
              automatically build changelogs using semantic versioning."
            />
          </div>
          &nbsp;
          <h2 id="posts">Posts</h2>
          <article className="container prose prose-sm md:prose">
            {posts.map((post) => (
              <Post key={post.slug} post={post} />
            ))}
          </article>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    </ErrorBoundary>
  );
}

export async function getStaticProps() {
  const postFiles = fs.readdirSync("posts");

  const posts = await Promise.all(
    postFiles.map(async (postFile) => {
      const slug = postFile.split(".")[0].slice(11);
      const post = getPostBySlug(slug);

      const mdxSource = await serialize(post.frontmatter.description, {
        mdxOptions: {
          rehypePlugins: [rehypePrism, [imageSize, { dir: "public" }]],
          remarkPlugins: [remarkGfm],
        },
      });

      return {
        slug,
        ...post,
        frontmatter: { ...post.frontmatter, description: mdxSource },
      };
    })
  ).then((posts) =>
    posts
      .filter((post) => post.frontmatter.published)
      .sort((a, b) => {
        const modifiedDays = differenceInDays(
          parseISO(b.modifiedDate),
          parseISO(a.modifiedDate)
        );
        const createDays = differenceInDays(
          parseISO(b.createDate),
          parseISO(a.createDate)
        );

        // first try and sort by modified date, otherwise sort by create date
        return modifiedDays || createDays;
      })
  );

  return {
    props: {
      posts,
    },
  };
}
