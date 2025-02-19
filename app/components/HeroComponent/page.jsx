"use client";
import React from "react";

const HeroSection = ({
  backgroundImage,
  title,
  discritption = "",
  titleStyles = "",
  containerStyles = "",
  overlayStyles = "",
}) => {
  return (
    <section className={`w-full ${containerStyles}`}>
      <div
        className={`w-full h-[700px] bg-cover bg-center bg-no-repeat bg-fixed flex flex-col justify-center items-center ${overlayStyles}`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className=" bg-opacity-50 p-6 rounded-lg text-center">
          <p
            className={`text-white xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl leading-snug ${titleStyles}`}
          >
            {discritption}
          </p>
          <p
            className={`text-white font-bold xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl leading-snug ${titleStyles}`}
          >
            {title}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
