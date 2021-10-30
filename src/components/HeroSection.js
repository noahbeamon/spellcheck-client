import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="hero-container">
      {/* <video src="/videos/video-1.mp4" autoPlay loop muted /> */}
      <video
        src="https://player.vimeo.com/external/470239015.sd.mp4?s=a2c6c32b83bef0a63850bda44b4644f3eb49c027&profile_id=139&oauth2_token_id=57447761"
        autoPlay
        loop
        muted
      />
      <h1>SpellCheck</h1>
      <p>An educational spelling device for youth ages 5-7.</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          Services
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={console.log("hey")}
        >
          Download Words <i className="fa fa-download" />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
