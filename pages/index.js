import Head from "next/head";
import Image from "next/image";
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
import { DiReact, DiSass } from "react-icons/Di";
import {
  IoLogoJavascript,
  IoLogoHtml5,
  IoLogoCss3,
  IoLogoNodejs,
} from "react-icons/io5";
import { FaAws, FaGitAlt } from "react-icons/Fa";
import { SiSwagger } from "react-icons/Si";

export default function Home({ posts }) {
  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <Head>
          <title>Jeremy Richardson&apos;s personal website</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="title">Hi, I&apos;m Jeremy Richardson</h1>
              <p>
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
          <p>
            My current mission with{" "}
            <a href="https://www.thought-dev.com">Thought Development</a> is to
            lead a team as we transform ON-Air Pro&mdash;a legacy FileMaker
            application for the broadcast industry&mdash;into a modern web
            application using node, react, and AWS.{" "}
          </p>
          <p>
            We have to support the existing customer base who continues to use
            the legacy product along-side the new product, which means
            we&apos;re using the FileMaker data API to retrieve data, transform
            it, and serve it to the client application through our newly defined
            REST API.
          </p>
          <p>
            My past had led me through a number of creative fields including
            film and television production, audio production as both a musician
            and engineer, as well as live theatrical sound and lighting.
          </p>
          <p>
            Each of those ventures always led me back to the web where the
            innovation in technology attracted me time and time again. I love
            building tools that people love to use, especially in the creative
            and entertainment realms.
          </p>
          <h2>Tech</h2>
          <div className="tech-logos">
            <DiReact size="3em" title="React" />
            <IoLogoJavascript size="3em" title="Javascript" />
            <IoLogoHtml5 size="3em" title="HTML5" />
            <IoLogoCss3 size="3em" title="CSS3" />
            <DiSass size="3em" title="Sass" />
            <IoLogoNodejs size="3em" title="NodeJS" />
            <FaAws size="3em" title="AWS" />
            <SiSwagger size="3em" title="OpenAPI/Swagger" />
            <FaGitAlt size="3em" title="Git" />
          </div>
          <h2>Posts</h2>
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
