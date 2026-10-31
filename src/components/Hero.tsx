"use client";

import { useRouter } from "next/navigation";
import { WelkAvatar, WelkButton } from "@welkui/react";

export function Hero() {
  const router = useRouter();

  const goToPosts = () => {
    const posts = document.getElementById("posts");
    if (posts) {
      posts.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    router.push("/#posts");
  };

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-brand">Jeremy Richardson</h1>
          <p className="hero-tagline">
            Full stack developer building software solutions that make life
            better — with a little comic relief.
          </p>
          <div className="hero-actions">
            <WelkButton size="lg" onClick={goToPosts}>
              Read the blog
            </WelkButton>
            <WelkButton
              size="lg"
              variant="secondary"
              onClick={() => router.push("/experience")}
            >
              See experience
            </WelkButton>
          </div>
        </div>
        <div className="hero-portrait">
          <div className="hero-portrait-frame">
            <WelkAvatar
              alt="Jeremy Richardson"
              src="/img/jeremy-profile@2x.png"
              size="lg"
              growOnHover
              style={{ width: "12rem", height: "12rem" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
