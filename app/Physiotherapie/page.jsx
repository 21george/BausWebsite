"use client";

import HeroSection from "../components/HeroComponent/page";
import PhysiotherapieImage from "../../asset/images/IMG_2950.png";
import ArticleSection from "../components/ArticleSection/page";
import PromoCards from "../components/ProductCards/page";

const cardsData = [
  {
    id: 1,
    title: "Yorga",
    description: "Trendy and stylish clothing.",
    videoSrc: "/videos/video1.mp4",
  },
  {
    id: 2,
    title: "Begginer Yorga class",
    email: "summer@fashion.com",
    videoSrc: "/videos/video2.mp4",
  },
];

export default function Physiotherapie() {
  return (
    <>
      <HeroSection
        backgroundImage={PhysiotherapieImage.src}
        title="Physiotherapie"
        titleStyles="text-lg font-bold"
        containerStyles="mb-8"
      />
      <ArticleSection />
        <PromoCards/>
     
      
    </>
  );
}
