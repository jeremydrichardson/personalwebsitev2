import React from "react";
import Image from "next/image";
import profilePic from "../public/img/jeremy-profile@2x.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="title">
            Hi, I&apos;m <span className="name">Jeremy Richardson</span>
          </h1>
          <p className="prose">
            I&apos;m a full stack developer building software solutions to make
            your life better
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
  );
};

export { Hero };
