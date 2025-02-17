"use client";
import React from "react";

const HeroSection = ({
  backgroundImage,
  title,
  discritption ="",
  titleStyles = "",
  containerStyles = "",
  overlayStyles = "",
}) => {
  return (
    <section className={`w-full ${containerStyles}`}>
      <div className={`w-full h-[520px] bg-cover bg-no-repeat bg-center bg-fixed flex flex-col justify-center items-center  ${overlayStyles}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="sm:py-12 lg:py-10">
          <p className={`text-white text-center xl:text-5xl lg:text-4xl md:text-3xl sm:text-3xl xs:text-3xl  leading-snug${titleStyles}`}>
            {discritption}
          </p>
          <p className={`text-white text-center xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl  leading-snug ${titleStyles}`}> 
            {title}
            </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
