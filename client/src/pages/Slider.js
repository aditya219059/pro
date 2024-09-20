import React from "react";
import "./slider.css";
import HeroSlider, { Slide } from "hero-slider";
import slide1 from "./assests/images/slide1.jpg";
import slide2 from "./assests/images/slide2.jpg";
import slide3 from "./assests/images/slide3.jpg";
import slide4 from "./assests/images/slide4.jpg";
import slide5 from "./assests/images/slide5.jpg";

const slideImages = [
  {
    url: slide1,
    caption: "First",
  },
  {
    url: slide2,
    caption: "Second",
  },
  {
    url: slide3,
    caption: "Third",
  },
  {
    url: slide4,
    caption: "Fourth",
  },
  {
    url: slide5,
    caption: "Fifth",
  },
];

const Slider = () => {
  return (
    <div className="slide-container">
      <HeroSlider
        height="100vh"
        autoplay
        controller={{
          initialSlide: 1,
          slidingDuration: 500,
          slidingDelay: 100,
          onSliding: (nextSlide) =>
            console.debug("onSliding(nextSlide): ", nextSlide),
          onBeforeSliding: (previousSlide, nextSlide) =>
            console.debug(
              "onBeforeSliding(previousSlide, nextSlide): ",
              previousSlide,
              nextSlide
            ),
          onAfterSliding: (nextSlide) =>
            console.debug("onAfterSliding(nextSlide): ", nextSlide),
        }}
      >
        <Slide
          background={{
            backgroundImageSrc: slide1,
          }}
        />
        <Slide
          background={{
            backgroundImageSrc: slide2,
          }}
        />
      </HeroSlider>
    </div>
  );
};

export default Slider;
