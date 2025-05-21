"use client";
import React from "react";
import UniversalFoto from "./../asset/images/R.jpg";
import Moltivation from "./Motivation/page";
import Gallery from "./components/GalleryComponent/Gallery";
import Yogaroom from "./../asset/images/IMG_4093.jpg";
import Yogaequirtment from "./../asset/images/IMG_7707.jpg";
import Yogawindow from "./../asset/images/IMG_3001.jpg";
import VisitRoom from "./../asset/images/IMG_4955.jpg";
import Terapybed from "./../asset/images/IMG_2949.jpg";
import Terapybed2 from "./../asset/images/IMG_2931.png";
import Ratingpage from "./components/Rating/page";
import ÜberMich from "./components/Ubermich/page";
import DynamicSection from "./Deatails/page";
import { HeroSection } from "./components/HeroComponent/HeroSection";
import { useScrollAnimation } from "./components/Animationscroll/ScrollAnimation";

export default function Home() {
  useScrollAnimation();
  return (
    <main className="dark:bg-gray-100 font-[family-name:var(--font-geist-sans)]">
      <div>
        <HeroSection
          backgroundImage={UniversalFoto.src}
          title="Nikolina Baus"
          subtitle="Holistische Physiotherapie auf dem neusten Stand der Wissenschaft"
        />
      </div>
      <div className="flex flex-col justify-center items-center ">
        <Moltivation />
      </div>
      <div className="flex flex-col justify-center items-center ">
        <ÜberMich />
      </div>
      <div>
        <div className="flex flex-col items-center justify-center pb-24 mt-32 p-6 text-center ">
          <h3 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            Meine Angebote
          </h3>
          <p className="my-6 dark:text-gray-600 text-sm md:text-base lg:text-lg">
            Für gesetzlich, privat versicherte Patienten und Selbstzahler
          </p>
          <DynamicSection />
        </div>
      </div>
      <div className="pb-24">
        <Gallery
          title=""
          images={[
            { src: VisitRoom.src, alt: "Yoga room view", label: "" },
            { src: Yogaroom.src, alt: "Yoga room view", label: "" },
            { src: Yogaequirtment.src, alt: "Yoga room view", label: "" },
            { src: Yogawindow.src, alt: "Yoga room view", label: "" },
            { src: Terapybed.src, alt: "Yoga room view", label: "" },
            { src: Terapybed2.src, alt: "Yoga room view", label: "" },
          ]}
          moreLink="#"
        />
      </div>
      <div className="pb-24">
        <Ratingpage />
      </div>
    </main>
  );
}
